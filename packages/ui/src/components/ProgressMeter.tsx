import React from 'react';

export interface ProgressMeterProps {
  completedDays: number;
  totalDays?: number;
  label?: string;
}

export const ProgressMeter: React.FC<ProgressMeterProps> = ({
  completedDays,
  totalDays = 28,
  label = "Curriculum Completion"
}) => {
  const percent = Math.min(100, Math.round((completedDays / totalDays) * 100));

  return (
    <div 
      className="space-y-2 w-full"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${completedDays} of ${totalDays} days completed (${percent}%)`}
    >
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-slate-300">{label}</span>
        <span className="font-mono font-bold text-amber-400">{completedDays} / {totalDays} Days ({percent}%)</span>
      </div>
      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
