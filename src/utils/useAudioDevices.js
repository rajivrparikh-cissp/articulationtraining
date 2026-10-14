import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'exec_voice_selected_mic_id';

/**
 * Custom Hook for Audio Input Devices, Permission, and Real-Time Level Diagnostics
 */
export function useAudioDevices() {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'unsupported'
  const [isTesting, setIsTesting] = useState(false);
  const [testAudioLevel, setTestAudioLevel] = useState(0); // 0 to 100%
  const [testTranscript, setTestTranscript] = useState('');
  const [voiceDetected, setVoiceDetected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const testStreamRef = useRef(null);
  const testAudioCtxRef = useRef(null);
  const testAnalyserRef = useRef(null);
  const testAnimFrameRef = useRef(null);
  const testRecognitionRef = useRef(null);

  // Enumerate all audio input devices
  const refreshDevices = useCallback(async (requestPermissionIfEmpty = false) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setPermissionState('unsupported');
      return [];
    }

    try {
      let list = await navigator.mediaDevices.enumerateDevices();
      let audioInputs = list.filter((d) => d.kind === 'audioinput');

      // If device labels are blank, prompt for temporary permission so the browser reveals device names
      const hasLabels = audioInputs.some((d) => Boolean(d.label));
      if (!hasLabels && requestPermissionIfEmpty) {
        try {
          const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          tempStream.getTracks().forEach((track) => track.stop());
          list = await navigator.mediaDevices.enumerateDevices();
          audioInputs = list.filter((d) => d.kind === 'audioinput');
          setPermissionState('granted');
        } catch (permErr) {
          if (permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError') {
            setPermissionState('denied');
          }
        }
      } else if (hasLabels) {
        setPermissionState('granted');
      }

      const formatted = audioInputs.map((d, idx) => ({
        deviceId: d.deviceId,
        label: d.label || `Microphone ${idx + 1} (${d.deviceId.slice(0, 8)}...)`,
        groupId: d.groupId
      }));

      setDevices(formatted);

      // If current selectedDeviceId is not in the list, fallback to default or first
      if (formatted.length > 0) {
        setSelectedDeviceId((current) => {
          const exists = formatted.some((d) => d.deviceId === current);
          if (!exists) {
            const defaultDev = formatted.find((d) => d.deviceId === 'default') || formatted[0];
            const newId = defaultDev ? defaultDev.deviceId : '';
            try {
              localStorage.setItem(STORAGE_KEY, newId);
            } catch {}
            return newId;
          }
          return current;
        });
      }

      return formatted;
    } catch (err) {
      console.warn('Could not enumerate audio devices:', err);
      setErrorMessage(err.message || 'Error detecting audio devices');
      return [];
    }
  }, []);

  // Set device ID and store in localStorage
  const changeSelectedDevice = useCallback((deviceId) => {
    setSelectedDeviceId(deviceId);
    try {
      localStorage.setItem(STORAGE_KEY, deviceId);
    } catch {}
  }, []);

  // Listen for device changes (plugging/unplugging headsets or USB mics)
  useEffect(() => {
    refreshDevices(false);

    const handleDeviceChange = () => {
      refreshDevices(false);
    };

    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
      return () => {
        navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
      };
    }
  }, [refreshDevices]);

  // Stop testing stream
  const stopTest = useCallback(() => {
    if (testAnimFrameRef.current) {
      cancelAnimationFrame(testAnimFrameRef.current);
    }
    if (testStreamRef.current) {
      testStreamRef.current.getTracks().forEach((t) => t.stop());
      testStreamRef.current = null;
    }
    if (testAudioCtxRef.current) {
      try {
        testAudioCtxRef.current.close();
      } catch {}
      testAudioCtxRef.current = null;
    }
    if (testRecognitionRef.current) {
      try {
        testRecognitionRef.current.stop();
      } catch {}
      testRecognitionRef.current = null;
    }
    setIsTesting(false);
    setTestAudioLevel(0);
  }, []);

  // Start real-time microphone test
  const startTest = useCallback(async (overrideDeviceId) => {
    stopTest();
    setErrorMessage('');
    setTestTranscript('');
    setVoiceDetected(false);

    const devId = overrideDeviceId !== undefined ? overrideDeviceId : selectedDeviceId;

    try {
      // 1. Acquire media stream with constraints
      const constraints = {
        audio: devId
          ? {
              deviceId: { exact: devId },
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          : {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (fallbackErr) {
        console.warn('Exact device constraint failed, falling back to general audio:', fallbackErr);
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      testStreamRef.current = stream;
      setPermissionState('granted');
      setIsTesting(true);

      // Refresh devices to make sure labels are populated now that permission is granted
      refreshDevices(false);

      // 2. Set up Web Audio Analyser for real-time RMS level meter
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      testAudioCtxRef.current = audioCtx;
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      testAnalyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkLevel = () => {
        if (!testAnalyserRef.current) return;
        testAnalyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume level
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        // Map average (0 to 255) to a responsive 0-100 percentage
        const level = Math.min(100, Math.round((avg / 128) * 100));
        setTestAudioLevel(level);

        if (level > 12) {
          setVoiceDetected(true);
        }

        testAnimFrameRef.current = requestAnimationFrame(checkLevel);
      };

      checkLevel();

      // 3. Optional test speech recognition if available
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (e) => {
            let str = '';
            for (let i = e.resultIndex; i < e.results.length; ++i) {
              str += e.results[i][0].transcript;
            }
            if (str) {
              setTestTranscript(str);
              setVoiceDetected(true);
            }
          };

          recognition.onerror = (e) => {
            console.log('Speech test recognition notice:', e.error);
          };

          recognition.start();
          testRecognitionRef.current = recognition;
        } catch (recErr) {
          console.warn('Speech recognition test failed:', recErr);
        }
      }
    } catch (err) {
      console.error('Failed to start microphone test:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionState('denied');
        setErrorMessage('Microphone access denied. Please click the lock or camera icon in your browser URL bar to allow microphone access.');
      } else {
        setErrorMessage(`Microphone error: ${err.message || 'Device unavailable'}`);
      }
      setIsTesting(false);
    }
  }, [selectedDeviceId, refreshDevices, stopTest]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTest();
    };
  }, [stopTest]);

  return {
    devices,
    selectedDeviceId,
    setSelectedDeviceId: changeSelectedDevice,
    permissionState,
    refreshDevices,
    isTesting,
    testAudioLevel,
    testTranscript,
    voiceDetected,
    errorMessage,
    startTest,
    stopTest
  };
}

/**
 * Helper to obtain a MediaStream with preferred deviceId & fallback
 */
export async function getMicrophoneStream(preferredDeviceId) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Web Audio media devices not supported in this browser.');
  }

  const primaryConstraints = {
    audio: preferredDeviceId
      ? {
          deviceId: { exact: preferredDeviceId },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      : {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
  };

  try {
    return await navigator.mediaDevices.getUserMedia(primaryConstraints);
  } catch (exactErr) {
    console.warn('Exact device constraint failed, trying fallback default:', exactErr);
    return await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
  }
}
