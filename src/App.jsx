import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DailyStudio from './components/DailyStudio';
import TellMeAboutYourselfBuilder from './components/TellMeAboutYourselfBuilder';
import VoiceStudio from './components/VoiceStudio';
import ProgressDashboard from './components/ProgressDashboard';
import ExecutivePlaybook from './components/ExecutivePlaybook';
import VocalWarmup from './components/VocalWarmup';
import MicSelectorModal from './components/MicSelectorModal';
import { CURRICULUM } from './data/curriculum';
import { getCompletedDays, getTotalMinutes } from './utils/storage';
import { useAudioDevices } from './utils/useAudioDevices';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [currentDayNumber, setCurrentDayNumber] = useState(1);
  const [completedDays, setCompletedDays] = useState(getCompletedDays());
  const [totalMinutes, setTotalMinutes] = useState(getTotalMinutes());
  const [warmupOpen, setWarmupOpen] = useState(false);
  const [micModalOpen, setMicModalOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1.0); // 1.0 (100%), 1.25, 1.5, 2.0 (200%)

  // Global Audio Input Device Management & Diagnostics
  const audioDevices = useAudioDevices();

  useEffect(() => {
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

  const activeDevice = audioDevices.devices.find((d) => d.deviceId === audioDevices.selectedDeviceId);
  const selectedDeviceLabel = activeDevice 
    ? activeDevice.label 
    : (audioDevices.devices.length > 0 ? audioDevices.devices[0].label : 'Default Microphone');

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      highContrast 
        ? 'bg-black text-white selection:bg-white selection:text-black' 
        : 'bg-[#070a12] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200'
    }`}>
      
      {/* Sticky Executive Navigation Bar (WCAG 2.2 AAA with 56px Tap Targets) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedCount={completedDays.length}
        totalMinutes={totalMinutes}
        currentDay={currentDayNumber}
        onOpenWarmup={() => setWarmupOpen(true)}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        fontScale={fontScale}
        setFontScale={setFontScale}
        onOpenMicSettings={() => setMicModalOpen(true)}
        selectedDeviceLabel={selectedDeviceLabel}
        deviceCount={audioDevices.devices.length}
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
            highContrast={highContrast}
            fontScale={fontScale}
            selectedDeviceId={audioDevices.selectedDeviceId}
            devices={audioDevices.devices}
            onSelectDevice={audioDevices.setSelectedDeviceId}
            onOpenMicSettings={() => setMicModalOpen(true)}
          />
        )}

        {activeTab === 'builder' && (
          <TellMeAboutYourselfBuilder />
        )}

        {activeTab === 'analyzer' && (
          <VoiceStudio 
            selectedDeviceId={audioDevices.selectedDeviceId}
            devices={audioDevices.devices}
            onSelectDevice={audioDevices.setSelectedDeviceId}
            onOpenMicSettings={() => setMicModalOpen(true)}
          />
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

      {/* Hardware Microphone Diagnostics & Device Selection Modal */}
      <MicSelectorModal
        isOpen={micModalOpen}
        onClose={() => setMicModalOpen(false)}
        devices={audioDevices.devices}
        selectedDeviceId={audioDevices.selectedDeviceId}
        onSelectDevice={audioDevices.setSelectedDeviceId}
        onRefreshDevices={audioDevices.refreshDevices}
        isTesting={audioDevices.isTesting}
        testAudioLevel={audioDevices.testAudioLevel}
        testTranscript={audioDevices.testTranscript}
        voiceDetected={audioDevices.voiceDetected}
        errorMessage={audioDevices.errorMessage}
        onStartTest={audioDevices.startTest}
        onStopTest={audioDevices.stopTest}
        highContrast={highContrast}
      />

      {/* 60-Second Diaphragmatic Warmup Modal */}
      <VocalWarmup
        isOpen={warmupOpen}
        onClose={() => setWarmupOpen(false)}
      />

      {/* Executive Footer */}
      <footer className={`border-t py-8 px-4 sm:px-6 text-center text-xs ${
        highContrast ? 'bg-black border-slate-800 text-slate-300' : 'bg-slate-950/80 border-slate-900 text-slate-400'
      }`}>
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-bold text-white text-sm">
            "Resume and certificates get you in the room. Voice and articulation get you the job."
          </p>
          <p className="text-xs text-slate-400">
            If you want to just look busy, read books. But to take leadership jobs as VP or Director, train your speaking skills. 9 minutes a day for 28 days.
          </p>
          <div className="pt-2 text-[11px] text-slate-500 font-mono">
            ExecutiveVoice • WCAG 2.2 AAA Compliant • Minimum 56x56px Tap Targets • 7:1+ Contrast
          </div>
        </div>
      </footer>

    </div>
  );
}
