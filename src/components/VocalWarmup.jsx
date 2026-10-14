import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audioUtils';

const WARMUP_STAGES = [
  {
    title: "1. The Larynx Drop & Diaphragm Reset",
    duration: 20,
    instruction: "Inhale through your nose into your belly (not shoulders) as if starting a silent yawn. Feel your larynx drop. Exhale on a slow, warm 'Haaaaa'.",
    vocalFocus: "Release throat constriction. Drop vocal cords into neutral resting position."
  },
  {
    title: "2. The Chest Sternum Hum",
    duration: 20,
    instruction: "Place your right hand firmly on your sternum. Make a sustained 'Mmmmmmm' sound at your lowest natural pitch until you feel strong chest vibrations.",
    vocalFocus: "Cultivate the deep chest resonance that signals executive authority and calm."
  },
  {
    title: "3. Downward Inflection Articulation Drills",
    duration: 20,
    instruction: "Say these three executive power words with definitive downward pitch: 'Deliver.' [pause] 'Govern.' [pause] 'Transform.' Drop pitch at the final syllable.",
    vocalFocus: "Eliminates uptalk (rising pitch) which sounds like you are seeking approval."
  }
];

export default function VocalWarmup({ isOpen, onClose }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(WARMUP_STAGES[0].duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      soundEngine.playExecutiveChime('phase');
      if (stageIndex < WARMUP_STAGES.length - 1) {
        setStageIndex((prev) => prev + 1);
        setSecondsLeft(WARMUP_STAGES[stageIndex + 1].duration);
      } else {
        setIsRunning(false);
        soundEngine.playExecutiveChime('success');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, stageIndex]);

  if (!isOpen) return null;

  const currentStage = WARMUP_STAGES[stageIndex];
  const totalCompleted = stageIndex === WARMUP_STAGES.length - 1 && secondsLeft === 0;

  const handleStart = () => {
    soundEngine.playExecutiveChime('start');
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStageIndex(0);
    setSecondsLeft(WARMUP_STAGES[0].duration);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              60-Second Diaphragmatic Warmup
            </h3>
            <p className="text-xs text-slate-400">
              Shift from high nasal tension to low resonant executive authority
            </p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {WARMUP_STAGES.map((s, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx < stageIndex || totalCompleted
                  ? 'bg-amber-400'
                  : idx === stageIndex
                  ? 'bg-amber-400/40 animate-pulse'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Active Stage Box */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
              Phase {stageIndex + 1} of 3
            </span>
            <span className="text-2xl font-mono font-bold text-amber-300">
              {secondsLeft}s
            </span>
          </div>

          <h4 className="text-base font-semibold text-white mb-2">
            {currentStage.title}
          </h4>
          
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {currentStage.instruction}
          </p>

          <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-lg text-xs text-amber-200/90">
            <strong className="text-amber-300 font-semibold">Vocal Target: </strong>
            {currentStage.vocalFocus}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          {!isRunning && !totalCompleted ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start 60s Routine</span>
            </button>
          ) : isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
            >
              <span>Pause</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-emerald-400 font-medium text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Voice Ready for High Stakes</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
