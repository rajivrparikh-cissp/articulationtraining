import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Gauge,
  HelpCircle,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  Layers,
  Award
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

  const activeText = (transcript || customText).trim();
  const analysis = analyzeTranscript(activeText, Math.max(1, elapsedSeconds));
  const sc = analysis.scorecard;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Instruction 2: Executive Articulation Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-display">
              Core Frameworks & Biometric Diagnostic Lab
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              To move an applicant from mid-level manager to Director or VP, this engine evaluates 
              <strong> structure, pacing, and presence</strong>, not just grammar. 
              Real-time audit across 5 operational measurements: PREP, Signal-to-Noise Ratio, Cadence (135–155 WPM), Conviction, and The First 60 Seconds.
            </p>
          </div>

          {sc && (
            <div className="p-4 bg-slate-950/90 border border-amber-400/40 rounded-xl text-center min-w-[180px]">
              <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">Executive Readiness</span>
              <span className="text-3xl font-black font-mono text-amber-400 block my-1">
                {sc.overallExecutiveReadiness} <span className="text-xs text-slate-500">/ 100</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                {sc.executiveRank}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Practice Station & Transcript (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Question Selector */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select High-Stakes Director/VP Question:
            </label>
            <select
              value={selectedQuestion.id}
              onChange={(e) => {
                const q = MOCK_INTERVIEW_QUESTIONS.find((item) => item.id === Number(e.target.value));
                setSelectedQuestion(q);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-medium focus:ring-amber-500 focus:border-amber-500 mb-2"
            >
              {MOCK_INTERVIEW_QUESTIONS.map((q) => (
                <option key={q.id} value={q.id}>
                  [{q.category}] {q.question}
                </option>
              ))}
            </select>
            <span className="text-xs text-amber-300 block">
              <strong>Recommended Pedagogical Focus: </strong>{selectedQuestion.framework}
            </span>
          </div>

          {/* Recording Console */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Diagnostic Microphone
                </span>
                <span className="text-sm font-semibold text-white">
                  {isRecording ? "Live Listening & Pacing Tracking..." : "Ready for Articulation Drill"}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-2xl font-mono font-bold text-white">
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

            {/* Live Transcript / Custom Paste Area */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs text-slate-400">
                <span>Spoken Transcript / Written Response ({analysis.wordCount} words):</span>
                {transcript && (
                  <button 
                    onClick={() => { setTranscript(''); setCustomText(''); }} 
                    className="text-[11px] text-slate-500 hover:text-slate-300"
                  >
                    Clear
                  </button>
                )}
              </div>
              <textarea
                value={activeText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Speak into microphone or paste your answer here to run the 5-Pillar Executive Articulation Audit..."
                className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Quick Vocabulary Upgrades */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Manager Phrasing → Executive Polish
            </span>
            <div className="space-y-2">
              {EXECUTIVE_VOCABULARY_DICTIONARY.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-rose-400 line-through opacity-80">"{item.weak}"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mx-2" />
                  <span className="text-emerald-300 font-medium">"{item.executive}"</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: The 5-Pillar Executive Scorecard (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-display flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Core 5 Executive Measurements</span>
            </h3>
            <span className="text-xs text-slate-400">Pedagogical Audit</span>
          </div>

          {/* 1. Thought Structuring (PREP) */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">1. Thought Structuring (PREP)</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                sc?.thoughtStructuring.wanderingDetected 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {sc?.thoughtStructuring.wanderingDetected ? "Wandering Warning" : "Crisp Structure"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              <strong>Focus:</strong> Point → Reason → Example → Point. Detects conversational wandering; penalizes answers without a crisp closing takeaway.
            </p>
            <div className="grid grid-cols-4 gap-1 pt-1 text-[10px] text-center">
              <div className={`p-1 rounded ${sc?.thoughtStructuring.prepComponents.pointIdentified ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-950 text-slate-500'}`}>P - Point</div>
              <div className={`p-1 rounded ${sc?.thoughtStructuring.prepComponents.reasonIdentified ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-950 text-slate-500'}`}>R - Reason</div>
              <div className={`p-1 rounded ${sc?.thoughtStructuring.prepComponents.exampleIdentified ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-950 text-slate-500'}`}>E - Example</div>
              <div className={`p-1 rounded ${sc?.thoughtStructuring.prepComponents.closingPointIdentified ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-950 text-slate-500'}`}>P - Closing Takeaway</div>
            </div>
            {sc && (
              <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                "{sc.thoughtStructuring.feedback}"
              </p>
            )}
          </div>

          {/* 2. Signal-to-Noise Ratio */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">2. Signal-to-Noise Ratio</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                sc?.signalToNoise.snrGrade === 'ELITE_EXECUTIVE'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : sc?.signalToNoise.snrGrade === 'RAMBLING_HAZARD'
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'bg-amber-500/20 text-amber-300'
              }`}>
                {sc?.signalToNoise.fillersPer100Words ?? 0} fillers / 100w
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              <strong>Focus:</strong> Verbal crutches & filler reduction. Tracks fillers (um, uh, like, sort of, throat-clearing) per 100 words.
            </p>
            {sc && (
              <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                "{sc.signalToNoise.feedback}"
              </p>
            )}
          </div>

          {/* 3. Executive Cadence (135–155 WPM) */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">3. Executive Cadence</span>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                sc?.executiveCadence.inTargetZone 
                  ? 'bg-emerald-500/20 text-emerald-300' 
                  : 'bg-amber-500/20 text-amber-300'
              }`}>
                {sc?.executiveCadence.wpm ?? 0} WPM (Target: 135–155)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              <strong>Focus:</strong> Controlled pacing & strategic pausing. Target rate: 135–155 WPM. Penalizes rushing; rewards deliberate 1.5s silence before pivots.
            </p>
            {sc && (
              <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                "{sc.executiveCadence.feedback}"
              </p>
            )}
          </div>

          {/* 4. Conviction & Decisiveness */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">4. Conviction & Decisiveness</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                (sc?.convictionDecisiveness.hedgingCount ?? 0) === 0
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {sc?.convictionDecisiveness.hedgingCount ?? 0} Hedges Detected
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              <strong>Focus:</strong> Minimizing defensive hedging. Flags tentative language ("I think maybe", "I tried to", "hopefully") and rewards ownership.
            </p>
            {sc && (
              <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                "{sc.convictionDecisiveness.feedback}"
              </p>
            )}
          </div>

          {/* 5. The First 60 Seconds */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">5. The First 60 Seconds</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                sc?.theFirst60Seconds.verdict === 'EXECUTIVE_THESIS'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {sc?.theFirst60Seconds.verdict === 'EXECUTIVE_THESIS' ? "Executive Commercial Thesis" : "Chronological Resume Trap"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              <strong>Focus:</strong> High-impact "Tell Me About Yourself". Evaluates whether opening provides an executive thesis rather than chronological resume recap.
            </p>
            {sc && (
              <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                "{sc.theFirst60Seconds.feedback}"
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
