'use client';

import React from 'react';
import Link from 'next/link';
import { Gauge, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            BIOMETRIC TELEMETRY & PACING
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Speech Diagnostics & Gravitas Trends
          </h1>
        </div>

        <Link
          href="/daily-routine"
          className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
        >
          Back to 9-Min Routine
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">Average Pacing</span>
          <span className="text-3xl font-black font-mono text-emerald-400">134 WPM</span>
          <span className="text-[11px] text-slate-500 block mt-1">Target: 120 - 150 WPM</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">Filler Word Elimination</span>
          <span className="text-3xl font-black font-mono text-amber-400">92%</span>
          <span className="text-[11px] text-slate-500 block mt-1">Fillers replaced with silence</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">BLUF Discipline</span>
          <span className="text-3xl font-black font-mono text-white">88%</span>
          <span className="text-[11px] text-slate-500 block mt-1">Headline delivered in first 5s</span>
        </div>
      </div>
    </div>
  );
}
