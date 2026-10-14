import React from 'react';
import Link from 'next/link';
import { Mic, ArrowRight, ShieldCheck, Flame, Award, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Top Bar */}
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
            <Mic className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Executive<span className="text-amber-400">Voice</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="text-xs font-semibold text-slate-300 hover:text-white"
          >
            Biometric Sign In
          </Link>
          <Link
            href="/daily-routine"
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
          >
            Start Day 1 (9 Mins)
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="space-y-8 my-auto text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>From Manager to VP & Director</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Resume and certificates get you in the room. <br />
          <span className="text-amber-400 underline decoration-amber-400/30">Your voice</span> gets you the job.
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
          The way we speak reveals how we think. Learn to organize your thoughts before you speak, 
          eliminate managerial filler words, and communicate commercial value with boardroom authority.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/daily-routine"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-400/25 transition-all hover:scale-102"
          >
            <span>Begin 28-Day Articulation Routine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/roadmap"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-semibold transition-colors"
          >
            <span>Explore 28-Day Curriculum</span>
          </Link>
        </div>

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <Flame className="w-5 h-5 text-orange-400 mb-2" />
            <h3 className="text-sm font-bold text-white mb-1">9 Minutes / Day Protocol</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Neuromuscular speaking drills: 2m cognitive priming, 4m recorded delivery, 3m executive gravitas self-audit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <Award className="w-5 h-5 text-amber-400 mb-2" />
            <h3 className="text-sm font-bold text-white mb-1">"Tell Me About Yourself" Anchor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Craft the non-generic 90-second executive anchor. No resume recitation; pure commercial leverage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="text-sm font-bold text-white mb-1">Zero-Trust Audio Vault</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Client-side WebAudio DSP, encrypted audio at rest via Cloud KMS, and optional Zero-Storage ephemeral mode.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Quote */}
      <footer className="pt-12 border-t border-slate-900 text-xs text-slate-500 text-center">
        "If you want to just look busy, read books. But to take leadership jobs as VP or Director, train your speaking skills."
      </footer>

    </div>
  );
}
