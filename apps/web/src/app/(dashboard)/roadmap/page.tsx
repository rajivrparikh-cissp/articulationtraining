'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProgressMeter } from '@executive-voice/ui';

export default function RoadmapPage() {
  const weeks = [
    { week: 1, title: "Cognitive Structuring & Executive Foundation", days: "Days 1 - 7", status: "Active (Day 1 Ready)" },
    { week: 2, title: "From Manager to Leader — Strategic Framing", days: "Days 8 - 14", status: "Locked" },
    { week: 3, title: "Vision, Gravitas & High-Stakes Storytelling", days: "Days 15 - 21", status: "Locked" },
    { week: 4, title: "The Boardroom & VP Interview Crucible", days: "Days 22 - 28", status: "Locked" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            28-DAY EXECUTIVE ROADMAP
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            The 4-Week Articulation Transformation
          </h1>
        </div>

        <Link
          href="/daily-routine"
          className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
        >
          Resume Today's Routine
        </Link>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <ProgressMeter completedDays={1} totalDays={28} />
      </div>

      <div className="space-y-4">
        {weeks.map((w) => (
          <div key={w.week} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-1">
                WEEK {w.week} • {w.days}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                {w.title}
              </h3>
              <span className="text-xs text-slate-400">{w.status}</span>
            </div>

            <Link
              href="/daily-routine"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
