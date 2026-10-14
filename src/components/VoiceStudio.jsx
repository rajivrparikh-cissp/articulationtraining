import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  Gauge,
  HelpCircle,
  FileAudio
} from 'lucide-react';
import { 
  analyzeTranscript, 
  soundEngine 
} from '../utils/audioUtils';
import { 
  EXECUTIVE_VOCABULARY_DICTIONARY, 
  MOCK_INTERVIEW_QUESTIONS 
} from '../data/curriculum';

export default function VoiceStudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [customText, setCustomText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(MOCK_INTERVIEW_QUESTIONS[0]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (e) => {
        let finalStr = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            finalStr += e.results[i][0].transcript + ' ';
          }
        }
        if (finalStr) {
          setTranscript((prev) => prev + finalStr);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Timer loop for WPM
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const startAnalysisSession = () => {
    soundEngine.playExecutiveChime('start');
    setTranscript('');
    setElapsedSeconds(0);
    setStartTime(Date.now());
    setIsRecording(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
  };

  const stopAnalysisSession = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    soundEngine.playExecutiveChime('phase');
  };

  const activeText = transcript || customText;
  const analysis = analyzeTranscript(activeText);

  // WPM calculation
  const minutes = Math.max(0.1, elapsedSeconds / 60);
  const currentWpm = Math.round(analysis.wordCount / minutes);

  // WPM Category
  let wpmStatus = { label: 'Optimal Executive Pacing', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
  if (currentWpm > 165) {
    wpmStatus = { label: 'Too Fast (Rushing / Nervous)', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' };
  } else if (currentWpm < 110 && elapsedSeconds > 10) {
    wpmStatus = { label: 'Too Slow (Lethargic / Halting)', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          <Gauge className="w-4 h-4" />
          <span>Real-Time Biometric Speech Lab</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display mb-2">
          Voice Articulation & Pacing Diagnostics
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          The way you speak determines how hiring committees evaluate how you think. 
          Monitor your Words Per Minute (WPM), eliminate filler words in real time, 
          and upgrade manager phrasing to senior executive vocabulary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Practice Prompts & Live Diagnostic (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Question Selector */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select High-Stakes Director/VP Question:
            </label>
            <select
              value={selectedQuestion.id}
              onChange={(e) => {
                const q = MOCK_INTERVIEW_QUESTIONS.find((item) => item.id === Number(e.target.value));
                setSelectedQuestion(q);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-medium focus:ring-amber-500 focus:border-amber-500 mb-3"
            >
              {MOCK_INTERVIEW_QUESTIONS.map((q) => (
                <option key={q.id} value={q.id}>
                  [{q.category}] {q.question}
                </option>
              ))}
            </select>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-300">Recommended Framework: </span>
                {selectedQuestion.framework}
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                {selectedQuestion.targetTime}
              </span>
            </div>
          </div>

          {/* Live Recording Console */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Diagnostic Microphone
                </span>
                <span className="text-sm font-semibold text-white">
                  {isRecording ? "Live Recording & Listening..." : "Standby for Articulation Test"}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xl font-mono font-bold text-white">
                  {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
                </span>

                {!isRecording ? (
                  <button
                    onClick={startAnalysisSession}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Test</span>
                  </button>
                ) : (
                  <button
                    onClick={stopAnalysisSession}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>Stop Test</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              
              {/* WPM Gauge */}
              <div className={`p-4 rounded-xl border text-center ${wpmStatus.bg}`}>
                <span className="text-[11px] text-slate-400 block mb-1">Words / Min</span>
                <span className={`text-2xl font-black font-mono ${wpmStatus.color}`}>
                  {elapsedSeconds > 3 ? currentWpm : '--'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Target: 120-150 WPM
                </span>
              </div>

              {/* Filler Words */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-1">Filler Count</span>
                <span className={`text-2xl font-black font-mono ${analysis.fillerCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {analysis.fillerCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Target: 0 fillers
                </span>
              </div>

              {/* Word Count */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-1">Total Words</span>
                <span className="text-2xl font-black font-mono text-white">
                  {analysis.wordCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Spoken in test
                </span>
              </div>

            </div>

            {/* Transcript Area */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Transcription & Detected Fillers:
                </span>
                {transcript && (
                  <button 
                    onClick={() => setTranscript('')}
                    className="text-[11px] text-slate-500 hover:text-slate-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="text-sm text-slate-200 leading-relaxed min-h-24 max-h-48 overflow-y-auto">
                {transcript ? (
                  transcript.split(' ').map((word, idx) => {
                    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
                    const isFiller = ['um', 'uh', 'like', 'basically', 'actually', 'literally'].includes(cleanWord);
                    return (
                      <span
                        key={idx}
                        className={isFiller ? 'bg-rose-500/30 text-rose-300 px-1 py-0.5 rounded font-bold' : ''}
                      >
                        {word}{' '}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-slate-600 italic">
                    Press 'Start Test' and answer the prompt above out loud. Your voice will be analyzed for pacing, filler words, and authority.
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right: Executive Vocabulary Upgrade Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Vocabulary Upgrader</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Manager Phrasing → Executive Polish
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Replace operational junior manager phrases with executive board language:
            </p>

            <div className="space-y-3">
              {EXECUTIVE_VOCABULARY_DICTIONARY.slice(0, 6).map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div className="text-rose-400 line-through mb-1 flex items-center space-x-1.5 opacity-80">
                    <span className="font-semibold">Manager:</span>
                    <span>"{item.weak}"</span>
                  </div>
                  <div className="text-emerald-300 font-medium flex items-center space-x-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>"{item.executive}"</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 block mb-1">Executive Rule of Thumb:</strong>
              Never describe your work in terms of <em>effort</em> (e.g. "we worked long hours"). 
              Always describe your work in terms of <em>commercial leverage and margin</em> (e.g. "we achieved 40% efficiency gains").
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
