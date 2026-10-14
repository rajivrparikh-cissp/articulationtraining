import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  FileText,
  Volume2
} from 'lucide-react';
import { getSavedScripts, saveScripts } from '../utils/storage';
import { soundEngine, analyzeTranscript } from '../utils/audioUtils';

const PRESET_TEMPLATES = [
  {
    role: "Engineering Manager → VP of Engineering",
    identity: "I am an engineering leader specializing in turning high-velocity, complex technical teams into predictable revenue-generating engines.",
    wins: "Over the last 4 years, I scaled an engineering org from 22 to 75 across three timezones, reducing customer onboarding latency by 60% while directly unlocking $24M in new enterprise ARR.",
    alignment: "What drew me to your VP role is your upcoming European expansion. Scaling architectures while preserving team velocity through rapid inflection is precisely where my playbook delivers maximum enterprise value."
  },
  {
    role: "Product Manager → Director / VP of Product",
    identity: "I specialize in bridging executive strategy and customer pain points to drive rapid, high-margin product adoption in competitive B2B SaaS markets.",
    wins: "Recently, I restructured our core product portfolio around automated workflow intelligence, lifting net retention from 94% to 118% and cutting churn by $3.2M within 14 months.",
    alignment: "Your transition toward self-serve enterprise tiering represents the exact structural inflection where my commercial product framework delivers outsized EBITDA acceleration."
  },
  {
    role: "Operations Manager → Director / VP of Operations",
    identity: "I am an operations executive who builds scalable, resilient operational architectures that allow high-growth companies to expand without ballooning headcount.",
    wins: "In my previous role, I automated our multi-channel logistics triage, cutting fulfillment overhead by 34% and absorbing a 3x order surge with zero additional hiring.",
    alignment: "As you scale toward your Series C milestones, institutionalizing operational leverage and margin predictability is where my operational governance creates immediate stability."
  },
  {
    role: "Commercial / Sales Manager → VP of Sales / Revenue",
    identity: "I build high-discipline, predictable enterprise sales organizations that convert complex technical value into seven-figure multi-year agreements.",
    wins: "Over the past 3 years, I restructured our enterprise go-to-market motion, elevating our average contract value from $60k to $240k and driving 140% quota attainment across 8 direct teams.",
    alignment: "Your mandate to penetrate Tier-1 financial accounts aligns precisely with the consultative, value-led enterprise playbook I've refined over the last decade."
  }
];

export default function TellMeAboutYourselfBuilder() {
  const [scripts, setScripts] = useState(getSavedScripts());
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('builder'); // 'builder' | 'rehearsal'
  
  // Rehearsal Teleprompter state
  const [isRecording, setIsRecording] = useState(false);
  const [rehearsalSeconds, setRehearsalSeconds] = useState(90);
  const [teleprompterRunning, setTeleprompterRunning] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    saveScripts(scripts);
  }, [scripts]);

  // Speech Recognition for rehearsal
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

  // Countdown timer for 90s rehearsal
  useEffect(() => {
    let interval = null;
    if (teleprompterRunning && rehearsalSeconds > 0) {
      interval = setInterval(() => {
        setRehearsalSeconds((s) => s - 1);
      }, 1000);
    } else if (teleprompterRunning && rehearsalSeconds === 0) {
      setTeleprompterRunning(false);
      setIsRecording(false);
      soundEngine.playExecutiveChime('phase');
    }
    return () => clearInterval(interval);
  }, [teleprompterRunning, rehearsalSeconds]);

  const loadPreset = (preset) => {
    setScripts({
      identity: preset.identity,
      wins: preset.wins,
      alignment: preset.alignment
    });
  };

  const fullExecutiveAnswer = `${scripts.identity} ${scripts.wins} ${scripts.alignment}`.trim();
  const wordCount = fullExecutiveAnswer.split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.round((wordCount / 135) * 60);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullExecutiveAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startRehearsal = () => {
    soundEngine.playExecutiveChime('start');
    setRehearsalSeconds(90);
    setTranscript('');
    setTeleprompterRunning(true);
    setIsRecording(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
  };

  const stopRehearsal = () => {
    setTeleprompterRunning(false);
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  const analysis = analyzeTranscript(transcript);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The High-Stakes Opening Question</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            The 90-Second Executive Anchor
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            "Tell me about yourself" is the opening test of the interview. 
            Managers recite their resume chronologically. Leaders state their strategic 
            identity, two milestone multipliers, and forward alignment with unshakeable clarity.
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Jumpstart with an Executive Career Track Template:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_TEMPLATES.map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(tpl)}
              className="text-left p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-xs group"
            >
              <span className="font-semibold text-slate-200 group-hover:text-amber-300 block mb-1">
                {tpl.role}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-2">
                "{tpl.identity}"
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Navigation: Builder vs Live Rehearsal */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex items-center space-x-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'builder'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Interactive 3-Act Builder</span>
        </button>
        <button
          onClick={() => setActiveTab('rehearsal')}
          className={`flex items-center space-x-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'rehearsal'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>90-Second Vocal Rehearsal Mode</span>
        </button>
      </div>

      {activeTab === 'builder' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: 3-Act Builder Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Act 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Act 1: The Commercial Identity (Target: 20 Seconds)
                </span>
                <span className="text-xs text-slate-500">~40-50 words</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Do NOT say your degree or year of graduation. State the high-value commercial problem you specialize in solving.
              </p>
              <textarea
                value={scripts.identity}
                onChange={(e) => setScripts({ ...scripts, identity: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                placeholder="I am an engineering leader specializing in..."
              />
            </div>

            {/* Act 2 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Act 2: The Two Milestone Multipliers (Target: 40 Seconds)
                </span>
                <span className="text-xs text-slate-500">~80-100 words</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Pick 2 strategic inflection points. State business outcomes: revenue saved/generated, latency slashed, headcount scaled with leverage.
              </p>
              <textarea
                value={scripts.wins}
                onChange={(e) => setScripts({ ...scripts, wins: e.target.value })}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                placeholder="Over the last 4 years, I led two major inflection points..."
              />
            </div>

            {/* Act 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Act 3: Forward Trajectory & Strategic Fit (Target: 30 Seconds)
                </span>
                <span className="text-xs text-slate-500">~60-70 words</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Why this VP/Director role? Match their growth stage to your strategic wheelhouse.
              </p>
              <textarea
                value={scripts.alignment}
                onChange={(e) => setScripts({ ...scripts, alignment: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                placeholder="What drawn me to this leadership opportunity is..."
              />
            </div>

          </div>

          {/* Right Column: Compiled Preview & Comparison (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Script Output Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Your Executive Anchor
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{wordCount} words • Est. {estimatedSeconds}s at 135 WPM</span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Script'}</span>
                </button>
              </div>

              {/* Word Count Health Status */}
              <div className="mb-4">
                {wordCount < 100 ? (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center space-x-2">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>A bit brief ({wordCount} words). Expand on your 2 core business wins.</span>
                  </div>
                ) : wordCount > 230 ? (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 flex items-center space-x-2">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Too long ({wordCount} words). Trim down to under 210 words for a 90s delivery.</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Perfect length ({wordCount} words). Ideal for a confident 80-90 second delivery!</span>
                  </div>
                )}
              </div>

              {/* Full Text Render */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed font-normal max-h-60 overflow-y-auto mb-6">
                <p className="mb-3 text-amber-200/90 font-medium">{scripts.identity}</p>
                <p className="mb-3 text-slate-300">{scripts.wins}</p>
                <p className="text-slate-300">{scripts.alignment}</p>
              </div>

              {/* Launch Rehearsal Button */}
              <button
                onClick={() => setActiveTab('rehearsal')}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
              >
                <Mic className="w-4 h-4" />
                <span>Test & Rehearse Aloud Now (90s)</span>
              </button>

            </div>

          </div>

        </div>
      ) : (
        /* Vocal Rehearsal Mode */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Live Teleprompter & Articulation Drill
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                90-Second Executive Anchor Rehearsal
              </h3>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-black font-mono text-amber-400">
                {rehearsalSeconds}s
              </div>

              {!teleprompterRunning ? (
                <button
                  onClick={startRehearsal}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-colors"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start 90s Drill</span>
                </button>
              ) : (
                <button
                  onClick={stopRehearsal}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-500 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>

          {/* Teleprompter Display */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 mb-6 text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">
              Look directly at your camera lens and speak with deep chest resonance
            </span>
            <p className="text-xl sm:text-2xl font-medium text-slate-100 leading-relaxed font-display max-w-2xl mx-auto">
              "{fullExecutiveAnswer}"
            </p>
          </div>

          {/* Rehearsal Results Analysis */}
          {transcript && (
            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Live Rehearsal Audit:
              </h4>
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="p-3 bg-slate-900 rounded-lg">
                  <span className="text-[11px] text-slate-400 block">Words Spoken</span>
                  <span className="text-lg font-bold text-white">{analysis.wordCount}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg">
                  <span className="text-[11px] text-slate-400 block">Filler Words</span>
                  <span className={`text-lg font-bold ${analysis.fillerCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {analysis.fillerCount}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg">
                  <span className="text-[11px] text-slate-400 block">Verbal Hedges</span>
                  <span className={`text-lg font-bold ${analysis.hedgesDetected.length === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysis.hedgesDetected.length}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic">
                "{transcript}"
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
