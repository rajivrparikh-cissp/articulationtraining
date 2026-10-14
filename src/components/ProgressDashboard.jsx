import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Award, 
  Flame, 
  Calendar, 
  Download, 
  ArrowRight, 
  Clock, 
  Check, 
  Sparkles,
  Printer
} from 'lucide-react';
import { CURRICULUM, WEEKS_META } from '../data/curriculum';
import { getUserProfile, saveUserProfile } from '../utils/storage';
import confetti from 'canvas-confetti';

export default function ProgressDashboard({ 
  completedDays, 
  onSelectDay, 
  totalMinutes 
}) {
  const [profile, setProfile] = useState(getUserProfile());
  const [showCertificate, setShowCertificate] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const completedCount = completedDays.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 28) * 100));

  const handleDownloadPlaybook = () => {
    let content = `# EXECUTIVE VOICE: 28-DAY ARTICULATION PLAYBOOK\n`;
    content += `Candidate: ${profile.name}\nTarget Role: ${profile.targetRole}\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
    content += `---\n\n`;
    content += `## CORE PREMISE\n"Resume and certificates get you in the room. Your voice and articulation get you the job."\n`;
    content += `Daily Routine: 9 Minutes a Day (2m Thought Structuring, 4m Live Vocalization, 3m Gravitas Audit)\n\n`;
    content += `---\n\n`;

    CURRICULUM.forEach((day) => {
      content += `### Day ${day.day}: ${day.title} (${day.category})\n`;
      content += `**Tagline:** "${day.tagline}"\n`;
      content += `**Standard:** ${day.objective}\n`;
      content += `**Insight:** ${day.coreInsight}\n`;
      content += `**Framework:** ${day.framework.name}\n`;
      day.framework.steps.forEach((s) => {
        content += `- ${s.name}: ${s.desc}\n`;
      });
      content += `\n**❌ Manager Answer:** "${day.managerVsLeader.manager}"\n`;
      content += `**✅ Executive Leader Anchor:** "${day.managerVsLeader.leader}"\n\n`;
      content += `---\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExecutiveVoice_28Day_Playbook_${profile.name.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleTriggerCertificate = () => {
    setShowCertificate(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Calendar className="w-4 h-4" />
              <span>28-Day Executive Articulation Roadmap</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-display">
              Your 28-Day Leadership Transformation
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              "If you want to just look busy, read books. But to take leadership jobs as VP or Director, train your speaking skills."
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadPlaybook}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {downloadSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-amber-400" />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Playbook (.md)'}</span>
            </button>

            <button
              onClick={handleTriggerCertificate}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
            >
              <Award className="w-4 h-4" />
              <span>Executive Certificate</span>
            </button>
          </div>
        </div>

        {/* Overall Progress Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Days Completed</span>
            <span className="text-2xl font-black font-mono text-amber-400">
              {completedCount} <span className="text-sm font-normal text-slate-500">/ 28</span>
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total Time Invested</span>
            <span className="text-2xl font-black font-mono text-emerald-400">
              {totalMinutes} <span className="text-sm font-normal text-slate-500">mins</span>
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Curriculum Completion</span>
            <span className="text-2xl font-black font-mono text-white">
              {progressPercent}%
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Target Trajectory</span>
            <span className="text-sm font-bold text-amber-300 truncate block mt-1">
              {profile.targetRole}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 4 Weekly Breakdown Blocks */}
      <div className="space-y-6">
        {WEEKS_META.map((w) => {
          const weekDays = CURRICULUM.filter((d) => d.week === w.week);
          const weekCompleted = weekDays.filter((d) => completedDays.includes(d.day)).length;

          return (
            <div key={w.week} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {w.daysRange}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {w.theme}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {w.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {w.subtitle}
                  </p>
                </div>

                <div className="text-xs font-medium text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  {weekCompleted} / 7 Days Mastered
                </div>
              </div>

              {/* Day Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
                {weekDays.map((day) => {
                  const isDone = completedDays.includes(day.day);

                  return (
                    <div
                      key={day.day}
                      onClick={() => onSelectDay(day.day)}
                      className={`cursor-pointer p-4 rounded-xl border text-left transition-all hover:scale-102 flex flex-col justify-between ${
                        isDone
                          ? 'bg-slate-950 border-emerald-500/40 hover:border-emerald-400 shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 hover:border-amber-400/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            Day {day.day}
                          </span>
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-700 flex-shrink-0" />
                          )}
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-snug mb-1">
                          {day.title}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                        <span>{day.category}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Graduation Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-amber-400/50 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative text-center">
            
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              ✕
            </button>

            <div className="p-8 border border-amber-400/30 rounded-xl bg-gradient-to-b from-amber-500/5 to-transparent relative">
              
              <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-400" />
              </div>

              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-2 font-display">
                Executive Articulation Certification
              </span>

              <h2 className="text-3xl font-black text-white font-display mb-2">
                Certificate of Leadership Readiness
              </h2>
              
              <p className="text-xs text-slate-400 mb-6">
                Verified Mastery: 28 Days • 252 Minutes of Diaphragmatic & Strategic Training
              </p>

              <div className="space-y-4 max-w-md mx-auto mb-6">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Candidate Name:</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => {
                      const updated = { ...profile, name: e.target.value };
                      setProfile(updated);
                      saveUserProfile(updated);
                    }}
                    className="w-full text-center bg-slate-950 border border-slate-700 rounded-lg p-2 text-base font-bold text-amber-300"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Target Leadership Seat:</label>
                  <input
                    type="text"
                    value={profile.targetRole}
                    onChange={(e) => {
                      const updated = { ...profile, targetRole: e.target.value };
                      setProfile(updated);
                      saveUserProfile(updated);
                    }}
                    className="w-full text-center bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6 italic">
                "Having systematically mastered the 90-Second Executive Anchor, PREP, SCQA, BLUF brevity, 
                and non-defensive boardroom gravitas, the candidate is hereby accredited with high-altitude executive articulation."
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-4">
                <span>Date: {new Date().toLocaleDateString()}</span>
                <span className="text-amber-400 font-semibold">Accreditation: ExecutiveVoice Lab</span>
              </div>

            </div>

            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
