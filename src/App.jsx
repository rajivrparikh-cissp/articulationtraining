import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DailyStudio from './components/DailyStudio';
import TellMeAboutYourselfBuilder from './components/TellMeAboutYourselfBuilder';
import VoiceStudio from './components/VoiceStudio';
import ProgressDashboard from './components/ProgressDashboard';
import ExecutivePlaybook from './components/ExecutivePlaybook';
import VocalWarmup from './components/VocalWarmup';
import { CURRICULUM } from './data/curriculum';
import { getCompletedDays, getTotalMinutes } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [currentDayNumber, setCurrentDayNumber] = useState(1);
  const [completedDays, setCompletedDays] = useState(getCompletedDays());
  const [totalMinutes, setTotalMinutes] = useState(getTotalMinutes());
  const [warmupOpen, setWarmupOpen] = useState(false);

  useEffect(() => {
    // If Day 1 is completed and user returns, set to next uncompleted day
    const completed = getCompletedDays();
    setCompletedDays(completed);
    setTotalMinutes(getTotalMinutes());
  }, []);

  const handleDaySelect = (dayNum) => {
    setCurrentDayNumber(dayNum);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDayCompleted = (dayNum) => {
    const updated = getCompletedDays();
    setCompletedDays([...updated]);
    setTotalMinutes(getTotalMinutes());
  };

  const currentDayData = CURRICULUM.find((d) => d.day === currentDayNumber) || CURRICULUM[0];
  const isCurrentDayDone = completedDays.includes(currentDayNumber);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Sticky Executive Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedCount={completedDays.length}
        totalMinutes={totalMinutes}
        currentDay={currentDayNumber}
        onOpenWarmup={() => setWarmupOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'studio' && (
          <DailyStudio
            dayData={currentDayData}
            onSelectDay={setCurrentDayNumber}
            isCompleted={isCurrentDayDone}
            onDayCompleted={handleDayCompleted}
            totalDays={CURRICULUM.length}
          />
        )}

        {activeTab === 'builder' && (
          <TellMeAboutYourselfBuilder />
        )}

        {activeTab === 'analyzer' && (
          <VoiceStudio />
        )}

        {activeTab === 'curriculum' && (
          <ProgressDashboard
            completedDays={completedDays}
            onSelectDay={handleDaySelect}
            totalMinutes={totalMinutes}
          />
        )}

        {activeTab === 'playbook' && (
          <ExecutivePlaybook
            onLaunchDay={handleDaySelect}
            onOpenWarmup={() => setWarmupOpen(true)}
          />
        )}
      </main>

      {/* 60-Second Diaphragmatic Warmup Modal */}
      <VocalWarmup
        isOpen={warmupOpen}
        onClose={() => setWarmupOpen(false)}
      />

      {/* Executive Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="text-slate-400 font-medium">
            "Resume and certificates get you in the room. Voice and articulation get you the job."
          </p>
          <p className="text-[11px] text-slate-600">
            If you want to just look busy, read books. But to take leadership jobs as VP or Director, train your speaking skills. 9 minutes a day for 28 days.
          </p>
          <div className="pt-2 text-[10px] text-slate-600">
            ExecutiveVoice • 28-Day Articulation Lab for Leaders, Directors & VPs
          </div>
        </div>
      </footer>

    </div>
  );
}
