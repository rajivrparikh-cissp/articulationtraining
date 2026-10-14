import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  MicOff, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Sparkles, 
  Award, 
  Clock, 
  BookOpen, 
  Volume2, 
  Flame,
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
  Sliders,
  Radio,
  Edit3,
  Check,
  Cpu,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine, analyzeTranscript } from '../utils/audioUtils';
import { saveCompletedDay, saveDayNotes, getDayNotes } from '../utils/storage';
import { getMicrophoneStream } from '../utils/useAudioDevices';
import { streamExecutiveAudit } from '../utils/ollamaClient';

const PHASES = [
  {
    id: 1,
    name: "Phase 1: Cognitive Structuring",
    timeRange: "0:00 - 2:00",
    startSec: 0,
    endSec: 120,
    description: "Organize your mental outline before vocalizing. Do not write a word-for-word script. Pick 3 strategic bullets.",
    actionPrompt: "Read the framework below. Formulate your 3 core bullet points."
  },
  {
    id: 2,
    name: "Phase 2: Vocal Articulation Drill",
    timeRange: "2:00 - 6:00",
    startSec: 120,
    endSec: 360,
    description: "Hit record. Deliver your answer out loud into the microphone. Maintain steady 135–155 WPM and grounded chest resonance.",
    actionPrompt: "Click 'Start Practice Recording' and answer today's prompt. Eliminate filler words and verbal hedging."
  },
  {
    id: 3,
    name: "Phase 3: Executive Gravitas Audit",
    timeRange: "6:00 - 9:00",
    startSec: 360,
    endSec: 540,
    description: "Review your clear milestones. Did you deliver the headline in the first 5 seconds? Did you speak with zero defensive hedging?",
    actionPrompt: "Audit your delivery against clear plain-English executive milestones."
  }
];

export default function DailyStudio({ 
  dayData, 
  onSelectDay, 
  isCompleted, 
  onDayCompleted, 
  totalDays,
  highContrast = false,
  fontScale = 1.0,
  selectedDeviceId = '',
  devices = [],
  onSelectDevice,
  onOpenMicSettings,
  activeProfile,
  onOpenProfileModal
}) {
  const [totalSeconds, setTotalSeconds] = useState(0); // 0 to 540 seconds (9 mins)
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  
  // Audio & Speech Recording
  const [isRecording, setIsRecording] = useState(false);
  const [prepCountdown, setPrepCountdown] = useState(null); // null | 3 | 2 | 1
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [liveAudioLevel, setLiveAudioLevel] = useState(0); // 0 - 100%
  const [voiceActivityDetected, setVoiceActivityDetected] = useState(false);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [manualTranscriptInput, setManualTranscriptInput] = useState('');
  const [customPrompt, setCustomPrompt] = useState(null);
  const [llamaCritique, setLlamaCritique] = useState('');
  const [isAuditingWithLlama, setIsAuditingWithLlama] = useState(false);
  const isRecordingRef = useRef(false);
  const recordingStartTimeRef = useRef(0);
  
  // Rubric Scores (1-5)
  const [rubricScores, setRubricScores] = useState({
    headline: 4,
    brevity: 4,
    resonance: 4,
    substance: 4
  });

  // Notes
  const [notes, setNotes] = useState('');

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  // Load Day Notes
  useEffect(() => {
    setNotes(getDayNotes(dayData.day));
    setTotalSeconds(0);
    setTimerRunning(false);
    setCurrentPhaseIndex(0);
    setTranscript('');
    setAudioUrl(null);
    setPrepCountdown(null);
  }, [dayData.day]);

  // Timer loop
  useEffect(() => {
    let interval = null;
    if (timerRunning && totalSeconds < 540) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const next = prev + 1;
          
          if (next === 120 && currentPhaseIndex === 0) {
            setCurrentPhaseIndex(1);
            soundEngine.playExecutiveChime('phase');
          } else if (next === 360 && currentPhaseIndex === 1) {
            setCurrentPhaseIndex(2);
            soundEngine.playExecutiveChime('phase');
          } else if (next === 540) {
            setTimerRunning(false);
            soundEngine.playExecutiveChime('success');
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, totalSeconds, currentPhaseIndex]);

  // Speech Recognition Setup with Auto-Restart and Resilience
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let currentInterim = '';
      let finalStr = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalStr += event.results[i][0].transcript + ' ';
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }

      if (finalStr) {
        setTranscript((prev) => prev + finalStr);
        setVoiceActivityDetected(true);
      }
      setInterimTranscript(currentInterim);
      if (currentInterim.trim().length > 0) {
        setVoiceActivityDetected(true);
      }
    };

    recognition.onerror = (event) => {
      console.log('DailyStudio SpeechRecognition notice:', event.error);
      // 'no-speech' is triggered when the user pauses; do not stop recording
    };

    recognition.onend = () => {
      // Auto-restart if user is still actively recording (fixes Chrome 2-second pause bug)
      if (isRecordingRef.current) {
        try {
          recognition.start();
        } catch {}
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, []);

  // Visualizer loop + Real-Time RMS VU Level Meter
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyser.getByteTimeDomainData(dataArray);

      // 1. Calculate real-time RMS for the VU Volume meter
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const norm = (dataArray[i] - 128) / 128.0;
        sum += norm * norm;
      }
      const rms = Math.sqrt(sum / bufferLength);
      const level = Math.min(100, Math.round(rms * 400));
      setLiveAudioLevel(level);

      if (level > 8) {
        setVoiceActivityDetected(true);
      }

      // 2. Draw Waveform
      ctx.fillStyle = highContrast ? '#000000' : '#070a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3.0;
      ctx.strokeStyle = '#fbbf24';
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  // 3-Second Preparation Countdown Trigger
  const triggerRecordingWithCountdown = () => {
    soundEngine.playExecutiveChime('start');
    setPrepCountdown(3);

    const timer = setInterval(() => {
      setPrepCountdown((prev) => {
        if (prev === 3) return 2;
        if (prev === 2) return 1;
        if (prev === 1) {
          clearInterval(timer);
          setPrepCountdown(null);
          executeStartRecording();
          return null;
        }
        return null;
      });
    }, 1000);
  };

  // Start Mic Recording with Selected Audio Device
  const executeStartRecording = async () => {
    try {
      soundEngine.init();
      audioChunksRef.current = [];
      isRecordingRef.current = true;
      setVoiceActivityDetected(false);
      setLiveAudioLevel(0);
      recordingStartTimeRef.current = Date.now();

      // Acquire media stream using preferred microphone device
      const stream = await getMicrophoneStream(selectedDeviceId);
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      drawWaveform();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (recErr) {
          console.warn('Speech recognition start note:', recErr);
        }
      }

      if (!timerRunning) {
        setTimerRunning(true);
      }
    } catch (err) {
      isRecordingRef.current = false;
      console.error('Recording initialization error:', err);
      alert("Microphone permission denied or device busy. You can choose a different device in Microphone Settings, or type your answer!");
    }
  };

  // Stop Mic Recording
  const stopRecording = () => {
    isRecordingRef.current = false;
    setLiveAudioLevel(0);

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRecording(false);
    soundEngine.playExecutiveChime('phase');
  };

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotes(val);
    saveDayNotes(dayData.day, val);
  };

  const handleCompleteDay = () => {
    saveCompletedDay(dayData.day);
    onDayCompleted(dayData.day);
    soundEngine.playExecutiveChime('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Calculated analysis
  const fullText = (transcript + ' ' + interimTranscript).trim();
  const analysis = analyzeTranscript(fullText, Math.max(1, totalSeconds));
  const sc = analysis.scorecard;

  // Minutes and seconds formatting
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const progressPercent = Math.min(100, Math.round((totalSeconds / 540) * 100));

  const activePromptText = customPrompt || dayData.practicePrompt;

  const handleRunLlamaAudit = () => {
    setIsAuditingWithLlama(true);
    setLlamaCritique('');

    streamExecutiveAudit({
      profile: activeProfile || {
        company: "Target Enterprise",
        title: "Vice President / Director",
        altitude: "Executive Leader",
        rubricFocus: [
          "Executive Altitude & Commercial Framing",
          "PREP Thought Structure",
          "Decisive Risk Ownership"
        ]
      },
      candidateDna: null,
      prompt: activePromptText,
      transcript: fullText,
      onToken: (text) => setLlamaCritique(text),
      onComplete: (finalText) => {
        setLlamaCritique(finalText);
        setIsAuditingWithLlama(false);
      },
      onError: (err) => {
        setIsAuditingWithLlama(false);
      }
    });
  };

  return (
    <div 
      className={`max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 ${
        highContrast ? 'text-white' : 'text-slate-100'
      }`}
      style={{ fontSize: `${fontScale}rem` }}
    >
      
      {/* ==================================================================== */}
      {/* ZERO-CONFUSION PRIMARY HERO ACTION (Single primary action per screen) */}
      {/* ==================================================================== */}
      {!timerRunning && totalSeconds === 0 && (
        <div className={`p-8 rounded-3xl border-2 text-center space-y-4 shadow-2xl transition-all ${
          highContrast
            ? 'bg-black border-amber-400'
            : 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-950/20 border-amber-400/40'
        }`}>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Today's Focused Leadership Sprint</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Day {dayData.day}: {dayData.title}
          </h2>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            "{dayData.tagline}"
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                soundEngine.playExecutiveChime('start');
                setTimerRunning(true);
              }}
              className="inline-flex items-center justify-center space-x-3 min-h-[64px] min-w-[280px] px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg shadow-2xl shadow-amber-400/30 transition-all hover:scale-102 cursor-pointer"
              aria-label="Start Today's 9-Minute Sprint"
            >
              <Play className="w-6 h-6 fill-slate-950" />
              <span>Start Today’s 9-Minute Sprint</span>
            </button>
          </div>
        </div>
      )}

      {/* Day Header & Navigation Bar */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-2 rounded-2xl backdrop-blur-xl ${
        highContrast ? 'bg-black border-slate-700' : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-display">
              Day {dayData.day} of {totalDays}
            </span>
            <span className="text-xs text-slate-300 font-bold">
              Week {dayData.week} • {dayData.category}
            </span>
            {isCompleted && (
              <span className="flex items-center space-x-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {dayData.title}
          </h1>
          <p className="text-sm text-slate-300 italic">
            "{dayData.tagline}"
          </p>
        </div>

        {/* Day Jump Controls (Min 56px Tap Target) */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={() => onSelectDay(Math.max(1, dayData.day - 1))}
            disabled={dayData.day === 1}
            className="min-h-[56px] min-w-[56px] flex items-center justify-center rounded-2xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-slate-700 cursor-pointer"
            title="Previous Day"
            aria-label="Previous Day"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <select
            value={dayData.day}
            onChange={(e) => onSelectDay(Number(e.target.value))}
            className="min-h-[56px] bg-slate-800 border-2 border-slate-700 text-white font-bold text-sm rounded-2xl px-4 py-2 focus:ring-4 focus:ring-amber-400"
            aria-label="Select Training Day"
          >
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>

          <button
            onClick={() => onSelectDay(Math.min(totalDays, dayData.day + 1))}
            disabled={dayData.day === totalDays}
            className="min-h-[56px] min-w-[56px] flex items-center justify-center rounded-2xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-slate-700 cursor-pointer"
            title="Next Day"
            aria-label="Next Day"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 9-Minute Protocol HUD Timer */}
      <div className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 shadow-2xl ${
        highContrast ? 'bg-black border-slate-700' : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          {/* Main Digital Clock & Controls (Minimum 56px Tap Targets) */}
          <div className="flex items-center space-x-6">
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                {timeFormatted}
              </span>
              <span className="text-sm font-bold text-slate-400 uppercase">
                / 09:00
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {!timerRunning ? (
                <button
                  onClick={() => {
                    soundEngine.playExecutiveChime('start');
                    setTimerRunning(true);
                  }}
                  className="flex items-center space-x-2 min-h-[56px] px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/25 transition-all hover:scale-102 cursor-pointer"
                  aria-label="Start 9-Minute Timer"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Resume Timer</span>
                </button>
              ) : (
                <button
                  onClick={() => setTimerRunning(false)}
                  className="flex items-center space-x-2 min-h-[56px] px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors border border-slate-700 cursor-pointer"
                  aria-label="Pause Timer"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause Timer</span>
                </button>
              )}

              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTotalSeconds(0);
                  setCurrentPhaseIndex(0);
                }}
                className="min-h-[56px] min-w-[56px] flex items-center justify-center rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                title="Reset Timer"
                aria-label="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm text-slate-300 bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>
              <strong className="text-white">Today's Standard: </strong> 
              {dayData.objective}
            </span>
          </div>
        </div>

        {/* 3-Phase Progression Tracker (Minimum 56px Tap Target) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {PHASES.map((phase, idx) => {
            const isCurrent = currentPhaseIndex === idx;
            const isDone = totalSeconds >= phase.endSec;

            return (
              <div
                key={phase.id}
                onClick={() => {
                  setCurrentPhaseIndex(idx);
                  setTotalSeconds(phase.startSec);
                }}
                className={`cursor-pointer min-h-[56px] p-5 rounded-2xl border-2 transition-all ${
                  isCurrent
                    ? 'bg-amber-400/15 border-amber-400 shadow-xl shadow-amber-400/10'
                    : isDone
                    ? 'bg-slate-950 border-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-70'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`${phase.name} (${phase.timeRange})`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-black uppercase tracking-wider ${isCurrent ? 'text-amber-400' : isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {phase.timeRange}
                  </span>
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  ) : null}
                </div>
                <h4 className="text-base font-extrabold text-white mb-1">
                  {phase.name}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Top Progress Line */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Educational Content & Contrast (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Framework Breakdown */}
          <div className="bg-slate-900/80 border-2 border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Today's Executive Framework</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              {dayData.framework.name}
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {dayData.coreInsight}
            </p>

            <div className="space-y-3">
              {dayData.framework.steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="text-sm font-bold text-amber-300 mb-1">
                    {step.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Manager vs Leader Reality Check */}
          <div className="bg-slate-900/80 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2 font-display">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Manager vs. Executive Comparison</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-950/30 border-2 border-rose-900/40">
                <span className="text-rose-400 text-xs font-black uppercase tracking-wider block mb-1">
                  ❌ Weak Manager (Rambling / Weeds)
                </span>
                <p className="text-xs text-rose-200/90 leading-relaxed italic">
                  "{dayData.managerVsLeader.manager}"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border-2 border-emerald-900/50">
                <span className="text-emerald-400 text-xs font-black uppercase tracking-wider block mb-1">
                  ✅ High-Impact VP/Director Anchor
                </span>
                <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
                  "{dayData.managerVsLeader.leader}"
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Articulation Studio & Actionable Milestones (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Practice Prompt & Live Mic Studio */}
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Vocal Practice Station
              </span>
              <span className="text-xs text-slate-300 font-bold">
                Target: 90s - 120s
              </span>
            </div>

            {/* Target Role & Speaking Prompt Container */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800/80">
                <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Target: {activeProfile?.title || 'VP Information Security'}</span>
                </span>
                {onOpenProfileModal && (
                  <button
                    onClick={onOpenProfileModal}
                    className="text-slate-400 hover:text-amber-300 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Switch Target Role
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    {customPrompt ? "⚡ Boardroom Curveball Follow-Up Prompt:" : "Today's Speaking Prompt:"}
                  </span>
                  {customPrompt && (
                    <button
                      onClick={() => setCustomPrompt(null)}
                      className="text-[11px] text-slate-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      Reset to Day's Curriculum
                    </button>
                  )}
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {activePromptText}
                </p>
              </div>
            </div>

            {/* Microphone Hardware Selector & Live Input VU Level Bar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-slate-200">
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>Audio Input Device:</span>
                </div>
                <button
                  onClick={onOpenMicSettings}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center space-x-1 cursor-pointer min-h-[36px] px-2 rounded-lg hover:bg-slate-900 transition-colors"
                  title="Open Microphone Hardware Diagnostics"
                >
                  <Sliders className="w-3.5 h-3.5 mr-1" />
                  <span>Hardware Test</span>
                </button>
              </div>

              {/* Device Selector */}
              <div>
                <select
                  value={selectedDeviceId}
                  onChange={(e) => onSelectDevice && onSelectDevice(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 cursor-pointer focus:outline-none focus:border-amber-400"
                  aria-label="Select Input Microphone"
                >
                  {devices.length === 0 ? (
                    <option value="">Default Microphone</option>
                  ) : (
                    devices.map((d, idx) => (
                      <option key={d.deviceId || idx} value={d.deviceId}>
                        {d.label || `Microphone ${idx + 1}`}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Real-time VU Input Level Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold">Live Mic Signal</span>
                  <span className={`font-mono font-bold ${
                    voiceActivityDetected ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {isRecording 
                      ? (voiceActivityDetected ? `🎤 Voice Active (${liveAudioLevel}%)` : `Listening (${liveAudioLevel}%)...`)
                      : 'Mic Standby'}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5 flex items-center">
                  <div 
                    className={`h-full rounded-full transition-all duration-75 ${
                      liveAudioLevel > 70 
                        ? 'bg-red-500' 
                        : liveAudioLevel > 20 
                        ? 'bg-amber-400' 
                        : liveAudioLevel > 5 
                        ? 'bg-emerald-400' 
                        : 'bg-slate-800'
                    }`}
                    style={{ width: `${Math.max(liveAudioLevel, isRecording ? 4 : 0)}%` }}
                  />
                </div>
              </div>

              {/* Silence Alert during recording */}
              {isRecording && totalSeconds >= 4 && !voiceActivityDetected && (
                <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>No audio signal detected from this mic. Check hardware mute or switch microphone above.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Audio Waveform Canvas */}
            <div className="w-full h-24 bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden relative flex items-center justify-center">
              <canvas 
                ref={canvasRef} 
                width="380" 
                height="96" 
                className="w-full h-full"
              />
              {!isRecording && !prepCountdown && !audioUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-xs text-slate-400 font-bold">
                  Press Record to Visualize Your Voice
                </div>
              )}
              {prepCountdown !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-400 text-slate-950 z-20 animate-pulse">
                  <span className="text-4xl font-black font-mono">{prepCountdown}</span>
                  <span className="text-xs font-black uppercase tracking-widest mt-1">
                    {prepCountdown === 3 ? "Inhale deeply into diaphragm..." : prepCountdown === 2 ? "Formulate opening headline..." : "Speak with calm authority..."}
                  </span>
                </div>
              )}
            </div>

            {/* Low-Friction 1-Button Recording with 3-Second Countdown */}
            <div>
              {!isRecording && prepCountdown === null ? (
                <button
                  onClick={triggerRecordingWithCountdown}
                  className="w-full min-h-[56px] flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-base shadow-2xl shadow-rose-600/30 transition-all hover:scale-102 cursor-pointer"
                  aria-label="Start Practice Recording with 3-second preparation countdown"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start Practice Recording (with 3s Prep)</span>
                </button>
              ) : isRecording ? (
                <button
                  onClick={stopRecording}
                  className="w-full min-h-[56px] flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl bg-slate-950 text-rose-300 border-2 border-rose-500 hover:bg-rose-950 font-black text-base transition-all animate-pulse cursor-pointer"
                  aria-label="Stop Recording and Evaluate"
                >
                  <MicOff className="w-5 h-5 text-rose-400" />
                  <span>Stop & Generate Executive Milestones</span>
                </button>
              ) : (
                <div className="w-full min-h-[56px] flex items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-bold text-sm">
                  Preparing Microphone ({prepCountdown}s)...
                </div>
              )}
            </div>

            {/* Audio Playback Player */}
            {audioUrl && (
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-300 block mb-1">
                  Listen to Your Delivery (Self-Auditing):
                </span>
                <audio controls src={audioUrl} className="w-full h-10" />
              </div>
            )}

            {/* ============================================================== */}
            {/* ACTIONABLE MILESTONE FEEDBACK (Clear Milestones over numbers) */}
            {/* ============================================================== */}
            <div className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Actionable Milestones Achieved
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {analysis.wordCount} words spoken
                </span>
              </div>

              {/* Milestone Bullet Items */}
              <div className="space-y-2 text-xs leading-relaxed">
                
                {/* Strategic Pausing Milestone */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-base leading-none">⏸️</span>
                  <div>
                    <span className="font-bold text-white block">Strategic Pausing:</span>
                    <span className="text-slate-300">
                      You paused {sc?.executiveCadence.strategicPausesEstimated ?? 1} time{sc?.executiveCadence.strategicPausesEstimated !== 1 ? 's' : ''} strategically before key pivots. Deliberate silence commands the room.
                    </span>
                  </div>
                </div>

                {/* Filler Words Milestone */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-base leading-none">
                    {analysis.fillerCount === 0 ? "✅" : "⚠️"}
                  </span>
                  <div>
                    <span className="font-bold text-white block">Signal-to-Noise Ratio:</span>
                    <span className="text-slate-300">
                      {analysis.fillerCount === 0 
                        ? "You delivered with zero verbal fillers (0.0/100w). Flawless executive signal."
                        : `You used ${analysis.fillerCount} filler word${analysis.fillerCount > 1 ? 's' : ''} (${sc?.signalToNoise.fillersPer100Words ?? 0}/100w) in your summary — replace them with a 1.5s silent pause next take.`}
                    </span>
                  </div>
                </div>

                {/* Thought Structuring Milestone */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-base leading-none">🎯</span>
                  <div>
                    <span className="font-bold text-white block">Thought Structuring (PREP):</span>
                    <span className="text-slate-300">
                      {sc?.thoughtStructuring.wanderingDetected
                        ? "Conversational wandering detected at the close — avoid trailing off; end with a crisp takeaway."
                        : "You delivered your headline upfront and avoided conversational wandering."}
                    </span>
                  </div>
                </div>

                {/* Cadence Milestone */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-base leading-none">⏱️</span>
                  <div>
                    <span className="font-bold text-white block">Executive Cadence:</span>
                    <span className="text-slate-300">
                      {sc?.executiveCadence.inTargetZone 
                        ? `Your speaking pace was ${sc?.executiveCadence.wpm} WPM — perfectly within the target executive zone (135–155 WPM).`
                        : sc?.executiveCadence.pacingClassification === 'RUSHING'
                        ? `Pacing reached ${sc?.executiveCadence.wpm} WPM. Take deliberate pauses to stay within the 135–155 WPM zone.`
                        : `Pacing was ${sc?.executiveCadence.wpm} WPM. Speak with dynamic forward momentum.`}
                    </span>
                  </div>
                </div>

                {/* Conviction Milestone */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-base leading-none">🛡️</span>
                  <div>
                    <span className="font-bold text-white block">Conviction & Decisiveness:</span>
                    <span className="text-slate-300">
                      {analysis.hedgesDetected.length === 0
                        ? "You spoke with zero defensive hedging — full ownership of results."
                        : `Flagged tentative phrases: "${analysis.hedgesDetected.join('", "')}". Replace with decisive ownership verbs.`}
                    </span>
                  </div>
                </div>

              </div>

              {/* Transcript Display with Live Speech & Manual Edit/Type Option */}
              <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                    <span>Spoken Words Transcript</span>
                    {voiceActivityDetected && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        Voice Detected
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => {
                      if (!isEditingTranscript) {
                        setManualTranscriptInput(fullText);
                      } else {
                        setTranscript(manualTranscriptInput);
                        setInterimTranscript('');
                      }
                      setIsEditingTranscript(!isEditingTranscript);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold inline-flex items-center space-x-1 cursor-pointer min-h-[36px] px-2 rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                    <span>{isEditingTranscript ? "Save & Score Words" : "Edit / Type Words"}</span>
                  </button>
                </div>

                {isEditingTranscript ? (
                  <div className="space-y-2">
                    <textarea
                      value={manualTranscriptInput}
                      onChange={(e) => setManualTranscriptInput(e.target.value)}
                      rows={3}
                      placeholder="Type or paste your spoken response here to evaluate against PREP, WPM, and executive tone frameworks..."
                      className="w-full p-3 rounded-xl bg-slate-900 border-2 border-amber-400 text-white text-xs font-mono focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400">
                      💡 Tip: If your browser blocks speech-to-text, you can type or paste what you spoke directly into this box.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200 text-xs leading-relaxed font-medium">
                    {fullText 
                      ? `"${fullText}"` 
                      : (
                        <span className="text-slate-400 italic">
                          Spoken transcript will appear here live as you practice. You can also click "Edit / Type Words" to write or adjust your answer.
                        </span>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* LLaMA 3.2 Second Brain Executive Panel Audit */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 border-2 border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    LLaMA 3.2 Second Brain • Executive Panel Audit
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-bold">
                  {activeProfile?.badge || activeProfile?.company}
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Run an offline, private AI evaluation calibrated for <strong>{activeProfile?.title}</strong> at <strong>{activeProfile?.company}</strong>.
              </p>

              {!llamaCritique && !isAuditingWithLlama && (
                <button
                  onClick={handleRunLlamaAudit}
                  disabled={!fullText}
                  className={`w-full min-h-[52px] flex items-center justify-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    fullText
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Audit My Answer with LLaMA 3.2 ({activeProfile?.company})</span>
                </button>
              )}

              {isAuditingWithLlama && (
                <div className="p-4 rounded-xl bg-slate-900 border border-amber-400/30 text-xs text-amber-200 flex items-center space-x-3">
                  <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Evaluating answer with local LLaMA 3.2 against {activeProfile?.altitude} rubric...</span>
                </div>
              )}

              {llamaCritique && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                    {llamaCritique}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={handleRunLlamaAudit}
                      disabled={isAuditingWithLlama}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold inline-flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-Audit with LLaMA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Complete Day Button (Minimum 56px Tap Target) */}
            <button
              onClick={handleCompleteDay}
              className={`w-full min-h-[56px] flex items-center justify-center space-x-3 py-4 rounded-2xl font-black text-base transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/40'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-2xl shadow-amber-400/30 hover:scale-102'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>{isCompleted ? "Day Completed (Click to Re-celebrate)" : "Mark Day 9-Minute Practice Complete"}</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
