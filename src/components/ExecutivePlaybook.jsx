import React from 'react';
import { 
  Award, 
  Sparkles, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { CURRICULUM, EXECUTIVE_VOCABULARY_DICTIONARY } from '../data/curriculum';

export default function ExecutivePlaybook({ onLaunchDay, onOpenWarmup }) {
  const frameworks = [
    {
      title: "The 3-Act Executive Anchor",
      day: 1,
      tag: "Tell Me About Yourself",
      formula: "Commercial Identity (20s) → Two Milestone Multipliers (40s) → Forward Trajectory Fit (30s)",
      rule: "Never list chronological job titles. State the multi-million dollar problem you eliminate."
    },
    {
      title: "PREP Model",
      day: 2,
      tag: "Crisp Answers",
      formula: "Point (direct thesis) → Reason (commercial rationale) → Example (metric proof) → Point (takeaway)",
      rule: "Deliver the direct conclusion in the first 5 seconds. Stop the moment you land on the final Point."
    },
    {
      title: "What - So What - Now What",
      day: 5,
      tag: "Crisis & Status",
      formula: "What (factual shift) → So What (financial & strategic risk) → Now What (remediation owner & timeline)",
      rule: "Spend 10% on what happened, 40% on implications, and 50% on decisive next steps."
    },
    {
      title: "SCQA Model",
      day: 9,
      tag: "C-Suite Proposals",
      formula: "Situation (baseline) → Complication (threat) → Question (core dilemma) → Answer (investment & ROI)",
      rule: "The gold standard for Board decks and pitching unbudgeted strategic investments."
    },
    {
      title: "Extreme Ownership Pivot",
      day: 10,
      tag: "Handling Failure",
      formula: "Direct Admission → Accountability Anchor → Institutional Policy Fix → Net Resilience Gain",
      rule: "Never blame vendors, junior staff, or bad luck. Executives build fail-safes."
    },
    {
      title: "The BLUF Inversion",
      day: 12,
      tag: "Executive Brevity",
      formula: "5-Second Headline → 3 Supporting Pillars → Hand-off Question ('Where should we dive deeper?')",
      rule: "Give the headline first. Executives tune out suspense novels."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Playbook Hero */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>The Executive Compendium</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-display">
              The Executive Articulation Playbook
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every promotion, every meeting, every room you will ever walk into comes down 
              to how you organize your thoughts and communicate value. 
              Here are the core mental models that separate junior managers from senior VPs.
            </p>
          </div>

          <button
            onClick={onOpenWarmup}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 whitespace-nowrap"
          >
            <Volume2 className="w-4 h-4" />
            <span>Launch Diaphragmatic Warmup</span>
          </button>
        </div>
      </div>

      {/* Philosophy Callout: The Core Axiom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5 font-display">
            The Credentials Paradox
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Certificates and resumes only earn you the interview slot. 
            Once you sit in front of the CEO, your vocal cadence, mental structuring, and gravitas 
            determine whether you land the high-paying leadership role.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5 font-display">
            The 9-Minute Neurological Rule
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Articulation is neuromuscular conditioning. 9 minutes of deliberate daily vocalization 
            re-wires your speech reflex far more effectively than passive reading. 
            Reading makes you feel busy; daily speaking drills make you an executive.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5 font-display">
            Gravitas = Stillness + Silence
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Junior managers fear silence and rush to fill pauses with filler words ('um', 'basically'). 
            Executives lean into 3-second deliberate pauses to demonstrate emotional regulation and command.
          </p>
        </div>

      </div>

      {/* 6 Core Executive Frameworks */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-lg font-bold text-white font-display">
            The 6 High-Stakes Frameworks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frameworks.map((f, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  {f.tag}
                </span>
                <button
                  onClick={() => onLaunchDay(f.day)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                >
                  <span>Practice Day {f.day}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-base font-bold text-white font-display">
                {f.title}
              </h4>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono text-amber-200/90 leading-relaxed">
                {f.formula}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300 font-semibold">Golden Rule: </strong>
                {f.rule}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Executive Vocabulary Reference */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 font-display flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>The Executive Vocabulary Lexicon</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXECUTIVE_VOCABULARY_DICTIONARY.map((v, idx) => (
            <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex flex-col justify-between">
              <span className="text-rose-400 line-through opacity-80 mb-1">
                Manager: "{v.weak}"
              </span>
              <span className="text-emerald-300 font-medium">
                VP / Director: "{v.executive}"
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
