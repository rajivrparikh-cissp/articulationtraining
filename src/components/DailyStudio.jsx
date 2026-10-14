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
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine, analyzeTranscript } from '../utils/audioUtils';
import { saveCompletedDay, saveDayNotes, getDayNotes } from '../utils/storage';

const PHASES = [
  {
    id: 1,
    name: "Phase 1: Cognitive Structuring",
    timeRange: "0:00 - 2:00",
    startSec: 0,
    endSec: 120,
    description: "Organize your mental outline before vocalizing. Do not write a word-for-word script. Pick 3 strategic bullets.",
    actionPrompt: "Read the framework and today's Manager vs. Leader comparison below. Formulate your 3 core bullet points."
  },
  {
    id: 2,
    name: "Phase 2: Vocal Articulation Drill",
    timeRange: "2:00 - 6:00",
    startSec: 120,
    endSec: 360,
    description: "Hit record. Deliver your answer out loud into the microphone. Maintain steady 130 WPM and grounded chest resonance.",
    actionPrompt: "Click 'Start Mic Practice' and answer today's prompt. Eliminate filler words and verbal hedging."
  },
  {
    id: 3,
    name: "Phase 3: Executive Gravitas Audit",
    timeRange: "6:00 - 9:00",
    startSec: 360,
    endSec: 540,
    description: "Listen to your recording or review the transcript. Score yourself honestly against the 4 Executive Pillars.",
    actionPrompt: "Audit your delivery: Did you deliver the headline in the first 5 seconds? Did you speak from the diaphragm?"
  }
];

export default function DailyStudio({ 
  dayData, 
  onSelectDay, 
  isCompleted, 
  onDayCompleted, 
  totalDays 
}) {
  const [totalSeconds, setTotalSeconds] = useState(0); // 0 to 540 seconds (9 mins)
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  
  // Audio & Speech Recording
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  
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
  }, [dayData.day]);

  // Timer loop
  useEffect(() => {
    let interval = null;
    if (timerRunning && totalSeconds < 540) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const next = prev + 1;
          
          // Phase checks
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

  // Speech Recognition Setup
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
      }
      setInterimTranscript(currentInterim);
    };

    recognition.onerror = () => {
      // Graceful fallback
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, []);

  // Visualizer loop
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#f59e0b';
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

  // Start Mic Recording
  const startRecording = async () => {
    try {
      soundEngine.init();
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Audio visualizer setup
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      drawWaveform();

      // MediaRecorder
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

      // Start recognition if supported
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {}
      }

      if (!timerRunning) {
        setTimerRunning(true);
      }
    } catch {
      alert("Microphone permission was denied or is unavailable. You can still practice speaking out loud!");
    }
  };

  // Stop Mic Recording
  const stopRecording = () => {
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
  const analysis = analyzeTranscript(fullText);

  // Minutes and seconds formatting
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const progressPercent = Math.min(100, Math.round((totalSeconds / 540) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      
      {/* Day Header & Navigation Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-slate-900/70 border border-slate-800 rounded-2xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 font-display">
              Day {dayData.day} of {totalDays}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Week {dayData.week} • {dayData.category}
            </span>
            {isCompleted && (
              <span className="flex items-center space-x-1 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Completed</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {dayData.title}
          </h1>
          <p className="text-sm text-slate-300 italic">
            "{dayData.tagline}"
          </p>
        </div>

        {/* Day Jump Controls */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={() => onSelectDay(Math.max(1, dayData.day - 1))}
            disabled={dayData.day === 1}
            className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <select
            value={dayData.day}
            onChange={(e) => onSelectDay(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
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
            className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 9-Minute Protocol HUD Timer */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          {/* Main Digital Clock & Controls */}
          <div className="flex items-center space-x-6">
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                {timeFormatted}
              </span>
              <span className="text-sm font-semibold text-slate-500 uppercase">
                / 09:00
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {!timerRunning ? (
                <button
                  onClick={() => {
                    soundEngine.playExecutiveChime('start');
                    setTimerRunning(true);
                  }}
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all hover:scale-102"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start 9 Mins</span>
                </button>
              ) : (
                <button
                  onClick={() => setTimerRunning(false)}
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Timer</span>
                </button>
              )}

              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTotalSeconds(0);
                  setCurrentPhaseIndex(0);
                }}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Daily Target Callout */}
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-300 bg-slate-900/90 px-4 py-3 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Today's Standard: </strong> 
              {dayData.objective}
            </span>
          </div>
        </div>

        {/* 3-Phase Progression Tracker */}
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
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20'
                    : isDone
                    ? 'bg-slate-900/60 border-emerald-500/30'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-amber-400' : isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {phase.timeRange}
                  </span>
                  {isDone ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  ) : null}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {phase.name}
                </h4>
                <p className="text-xs text-slate-400 leading-snug">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Top Progress Line */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Educational Content & Contrast (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Framework Breakdown */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Today's Executive Framework</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {dayData.framework.name}
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {dayData.coreInsight}
            </p>

            <div className="space-y-3">
              {dayData.framework.steps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <h4 className="text-sm font-semibold text-amber-300 mb-1">
                    {step.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Manager vs Leader Reality Check */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 font-display">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Manager vs. Executive Leader Comparison</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Weak Manager Answer */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30">
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>❌ Weak Manager (Rambling / Weeds)</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed italic">
                  "{dayData.managerVsLeader.manager}"
                </p>
              </div>

              {/* High-Caliber Leader Answer */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>✅ High-Impact VP/Director Anchor</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
                  "{dayData.managerVsLeader.leader}"
                </p>
              </div>
            </div>

            {/* Key Watchouts */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Executive Trapdoors to Avoid Today:
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {dayData.keyWatchouts.map((w, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Live Articulation & Mic Practice (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Practice Prompt & Live Mic Studio */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Vocal Practice Station
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Target: 90s - 120s
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Today's Prompt:
              </h4>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {dayData.practicePrompt}
              </p>
            </div>

            {/* Audio Waveform Canvas */}
            <div className="w-full h-24 bg-slate-950 rounded-xl border border-slate-800 mb-4 overflow-hidden relative flex items-center justify-center">
              <canvas 
                ref={canvasRef} 
                width="380" 
                height="96" 
                className="w-full h-full"
              />
              {!isRecording && !audioUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-xs text-slate-500 font-medium">
                  Press Record to Visualize Your Voice Frequency
                </div>
              )}
            </div>

            {/* Mic Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/20 transition-all hover:scale-102"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Mic Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900 font-bold text-sm transition-all animate-pulse"
                >
                  <MicOff className="w-4 h-4 text-rose-400" />
                  <span>Stop & Analyze Voice</span>
                </button>
              )}
            </div>

            {/* Audio Playback Player */}
            {audioUrl && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-4">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Listen to Your Delivery (Self-Auditing):
                </span>
                <audio controls src={audioUrl} className="w-full h-9" />
              </div>
            )}

            {/* Live Transcript & Real-Time Metrics */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300">
                  Real-Time Biometric Metrics (5 Core Pillars)
                </span>
                <span className="text-xs text-slate-400">
                  {analysis.wordCount} words
                </span>
              </div>

              {/* 4-Column Live Metric Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Signal-to-Noise</span>
                  <span className={`text-sm font-bold ${analysis.scorecard?.signalToNoise.snrGrade === 'ELITE_EXECUTIVE' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysis.scorecard?.signalToNoise.fillersPer100Words ?? 0} fillers/100w
                  </span>
                  <span className="text-[9px] text-slate-500 block">Target: &lt;1.0</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Cadence (WPM)</span>
                  <span className={`text-sm font-bold ${analysis.scorecard?.executiveCadence.inTargetZone ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysis.scorecard?.executiveCadence.wpm ?? 0} WPM
                  </span>
                  <span className="text-[9px] text-slate-500 block">Target: 135–155 WPM</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Conviction / Hedges</span>
                  <span className={`text-sm font-bold ${(analysis.scorecard?.convictionDecisiveness.hedgingCount ?? 0) === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {analysis.scorecard?.convictionDecisiveness.hedgingCount ?? 0} flagged
                  </span>
                  <span className="text-[9px] text-slate-500 block">Zero hedging</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">PREP Closing</span>
                  <span className={`text-sm font-bold ${analysis.scorecard?.thoughtStructuring.crispClosingTakeawayPresent ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysis.scorecard?.thoughtStructuring.crispClosingTakeawayPresent ? "Crisp ✓" : "Rambling"}
                  </span>
                  <span className="text-[9px] text-slate-500 block">No trailing off</span>
                </div>
              </div>

              {/* Transcript Display */}
              <div className="text-xs text-slate-300 leading-relaxed max-h-32 overflow-y-auto pr-1">
                {fullText ? (
                  <span>{fullText}</span>
                ) : (
                  <span className="text-slate-500 italic">
                    {speechSupported 
                      ? "Speech transcript will populate live as you speak..." 
                      : "Speech recognition unavailable in this browser; please use Chrome or Edge for live transcription."}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Phase 3 Self-Auditing Rubric */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center space-x-2 font-display">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Executive Gravitas Audit (Score 1-5)</span>
            </h4>

            <div className="space-y-3 text-xs">
              {[
                { key: 'headline', label: "Headline First (BLUF)", desc: "Delivered direct thesis in first 5s" },
                { key: 'brevity', label: "Pacing & Brevity", desc: "120-140 WPM without rushing or rambling" },
                { key: 'resonance', label: "Chest Resonance", desc: "Warm, grounded tone, no nasal uptalk" },
                { key: 'substance', label: "Strategic Altitude", desc: "Business metrics over tactical weeds" }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div>
                    <span className="font-semibold text-slate-200 block">{item.label}</span>
                    <span className="text-[11px] text-slate-400">{item.desc}</span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => setRubricScores({ ...rubricScores, [item.key]: score })}
                        className={`w-6 h-6 rounded text-[11px] font-bold transition-all ${
                          rubricScores[item.key] === score
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Reflections Notes */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Personal Practice Notes & Inflection Takeaways:
              </label>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Note down phrases that felt natural, or filler words you caught yourself saying..."
                className="w-full h-20 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none"
              />
            </div>

            {/* Completion Button */}
            <button
              onClick={handleCompleteDay}
              className={`w-full mt-5 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold text-sm transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 hover:scale-102'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? "Day Completed (Click to Re-celebrate)" : "Mark Day 9-Minute Practice Complete"}</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
