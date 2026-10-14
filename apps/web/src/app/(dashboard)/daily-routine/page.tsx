'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mic, Clock, ArrowRight, CheckCircle2, RotateCcw, Play, Pause, Award } from 'lucide-react';
import { Waveform, Button, ProgressMeter } from '@executive-voice/ui';

export default function DailyRoutinePage() {
  const [day, setDay] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Breadcrumb Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            DAY {day} OF 28 • 9 MINUTES A DAY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            The "Tell Me About Yourself" Executive Anchor
          </h1>
        </div>

        <div className="flex space-x-2">
          <Link
            href="/roadmap"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
          >
            28-Day Roadmap
          </Link>
          <Link
            href="/analytics"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Pacing Analytics
          </Link>
        </div>
      </div>

      {/* 9-Minute Protocol HUD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Today's Session Elapsed</span>
            <div className="text-5xl font-black font-mono text-white">
              {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}{' '}
              <span className="text-slate-600 text-xl font-normal">/ 09:00</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "secondary" : "primary"}
              icon={isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            >
              {isRunning ? "Pause Routine" : "Start 9 Minutes"}
            </Button>
            
            <button
              onClick={() => { setSeconds(0); setIsRunning(false); }}
              className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40">
            <span className="text-xs font-bold text-amber-400 block mb-1">Phase 1 (0:00 - 2:00)</span>
            <h4 className="text-sm font-bold text-white mb-1">Cognitive Structuring</h4>
            <p className="text-xs text-slate-400">Outline 3 core bullets. Frame around commercial leverage.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-bold text-slate-400 block mb-1">Phase 2 (2:00 - 6:00)</span>
            <h4 className="text-sm font-bold text-white mb-1">Vocal Articulation Drill</h4>
            <p className="text-xs text-slate-400">Record out loud. Eliminate fillers, maintain 135 WPM.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-bold text-slate-400 block mb-1">Phase 3 (6:00 - 9:00)</span>
            <h4 className="text-sm font-bold text-white mb-1">Executive Gravitas Audit</h4>
            <p className="text-xs text-slate-400">Score BLUF delivery, chest resonance, and brevity.</p>
          </div>
        </div>
      </div>

      {/* Live Audio Articulation Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white font-display">
            Live Articulation Waveform
          </h3>
          <Waveform isRecording={isRecording} height={120} />
          
          <Button
            onClick={() => setIsRecording(!isRecording)}
            variant={isRecording ? "danger" : "primary"}
            className="w-full"
            icon={<Mic className="w-4 h-4" />}
          >
            {isRecording ? "Stop Recording & Audit" : "Record Spoken Anchor"}
          </Button>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white font-display">
            The 3-Act Executive Anchor
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-amber-400 block">Act 1: Commercial Identity (20s)</strong>
              "I specialize in transforming fragmented engineering orgs into predictable revenue engines."
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-amber-400 block">Act 2: Milestone Multipliers (40s)</strong>
              "Scaled a 45-person org to deliver $35M in ARR while halving time-to-market."
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-amber-400 block">Act 3: Forward Alignment (30s)</strong>
              "Why your international expansion is the exact strategic match for my playbook."
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
