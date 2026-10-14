import React from 'react';
import { 
  Mic, 
  Calendar, 
  Sparkles, 
  Award, 
  Sliders, 
  Flame,
  Volume2, 
  Sun, 
  Type,
  Cpu,
  User,
  BookOpen,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  completedCount, 
  totalMinutes, 
  currentDay,
  onOpenWarmup,
  highContrast,
  setHighContrast,
  fontScale,
  setFontScale,
  onOpenMicSettings,
  selectedDeviceLabel,
  deviceCount = 1,
  onOpenProfileModal,
  activeProfile,
  ollamaOnline = false
}) {
  const tabs = [
    { id: 'studio', label: '9-Min Daily Sprint', icon: Mic, badge: `Day ${currentDay}` },
    { id: 'vocabulary', label: 'Executive Lexicon', icon: BookOpen, badge: 'Vocab & Quiz' },
    { id: 'builder', label: 'Tell Me About Yourself', icon: Sparkles, badge: 'Crucial' },
    { id: 'analyzer', label: 'Articulation Lab', icon: Sliders },
    { id: 'curriculum', label: '28-Day Roadmap', icon: Calendar, badge: `${completedCount}/28` },
    { id: 'playbook', label: 'Executive Playbook', icon: Award }
  ];

  const cycleFontScale = () => {
    if (fontScale === 1) setFontScale(1.25);
    else if (fontScale === 1.25) setFontScale(1.5);
    else if (fontScale === 1.5) setFontScale(2.0);
    else setFontScale(1);
  };

  const activeTabObj = tabs.find(t => t.id === activeTab) || tabs[0];
  const ActiveIcon = activeTabObj.icon;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. LEFT-HAND EXECUTIVE SIDEBAR (LAPTOP & DESKTOP: lg:flex)                 */}
      {/* ========================================================================= */}
      <aside 
        className={`hidden lg:flex fixed top-0 bottom-0 left-0 w-72 z-50 flex-col justify-between border-r transition-colors select-none ${
          highContrast 
            ? 'bg-black border-white text-white' 
            : 'bg-slate-950/95 border-slate-800 backdrop-blur-2xl'
        }`}
        aria-label="Executive Left Navigation"
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          
          {/* Brand Logo & Title Header */}
          <div 
            onClick={() => setActiveTab('studio')}
            className="flex items-center space-x-3 cursor-pointer group min-h-[56px] p-2 rounded-2xl hover:bg-slate-900/60 transition-all"
            role="button"
            tabIndex={0}
            aria-label="ExecutiveVoice Home"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Mic className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-display">
                  Executive<span className="text-amber-400">Voice</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Command the Room • 9 Min/Day
              </p>
            </div>
          </div>

          {/* Active Target Role & LLaMA 3.2 Status Card */}
          <div 
            onClick={onOpenProfileModal}
            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer group ${
              highContrast
                ? 'bg-black hover:bg-slate-900 border-white text-white'
                : 'bg-slate-900/90 hover:bg-slate-850 border-amber-500/30 hover:border-amber-400 text-slate-200'
            }`}
            role="button"
            tabIndex={0}
            title="Candidate Dossier & Target Role Settings"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Target Dossier</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full ${ollamaOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {ollamaOnline ? 'LLaMA' : 'AI'}
                </span>
              </div>
            </div>
            <div className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
              {activeProfile?.title || 'VP Information Security'}
            </div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">
              {activeProfile?.company || 'Enterprise Leader'}
            </div>
          </div>

          {/* Vertical Menu Navigation - WCAG 2.2 AAA with 56px Minimum Tap Target */}
          <nav className="space-y-2 pt-2" aria-label="Main Navigation Menu">
            <span className="block text-[10px] uppercase font-black tracking-wider text-slate-500 px-3 mb-2">
              Leadership Curriculum
            </span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between min-h-[56px] px-4 rounded-2xl font-bold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20 border-2 border-amber-300 font-extrabold'
                      : highContrast
                      ? 'bg-black text-white border-2 border-slate-700 hover:border-white'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-2 border-slate-850/80'
                  }`}
                  style={{ fontSize: `${0.875 * fontScale}rem` }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black flex-shrink-0 ml-2 ${
                      isActive 
                        ? 'bg-slate-950 text-amber-300' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Controls & Hardware Diagnostics */}
        <div className="p-5 border-t border-slate-800/80 space-y-3 bg-slate-950">
          {/* Microphone Selector & Live Test */}
          <button
            onClick={onOpenMicSettings}
            className={`w-full flex items-center justify-between min-h-[56px] px-4 rounded-2xl border-2 transition-all cursor-pointer font-bold text-xs ${
              highContrast
                ? 'bg-black hover:bg-slate-900 border-white text-white'
                : 'bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-amber-400/60 text-slate-200 hover:text-white'
            }`}
            title="Microphone Device Selector & Live Voice Test"
            aria-label={`Microphone Settings: currently using ${selectedDeviceLabel || 'Default Microphone'}`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="relative flex-shrink-0">
                <Mic className="w-4 h-4 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-left truncate">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold leading-none">
                  Mic ({deviceCount})
                </span>
                <span className="block text-xs font-bold text-amber-300 truncate leading-tight mt-0.5">
                  {selectedDeviceLabel || 'Select Mic'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </button>

          {/* Progress Summary Pill */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800/60 text-[11px] text-slate-400 font-bold">
            <span className="flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Sprint: {completedCount}/28 Days</span>
            </span>
            <span className="text-slate-300 font-mono">{totalMinutes} Mins</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. TOP HEADER (DESKTOP: BREADCRUMBS & ACCESSIBILITY; MOBILE: FULL NAV)     */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors lg:pl-72 ${
        highContrast 
          ? 'bg-black border-white text-white' 
          : 'bg-slate-950/90 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[64px] sm:min-h-[72px] py-2">
            
            {/* Desktop View: Active Page Breadcrumb Indicator */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30">
                <ActiveIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white font-display tracking-tight flex items-center space-x-2">
                  <span>{activeTabObj.label}</span>
                  {activeTabObj.badge && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-amber-300 border border-slate-700">
                      {activeTabObj.badge}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400">
                  {activeProfile?.title ? `Calibrated for ${activeProfile.title} (${activeProfile.company})` : 'Leadership Articulation Training'}
                </p>
              </div>
            </div>

            {/* Mobile View: Brand Logo (< lg) */}
            <div 
              onClick={() => setActiveTab('studio')}
              className="lg:hidden flex items-center space-x-2.5 cursor-pointer min-h-[56px]"
              role="button"
              tabIndex={0}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-[1.5px] flex-shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                  <Mic className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white font-display">
                Executive<span className="text-amber-400">Voice</span>
              </span>
            </div>

            {/* Accessibility Controls & Action Buttons (Present on both Desktop & Mobile) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Mobile Target Role Button (< lg) */}
              <button
                onClick={onOpenProfileModal}
                className={`lg:hidden flex items-center justify-center min-h-[56px] px-3 rounded-2xl border-2 transition-all cursor-pointer font-bold text-xs ${
                  highContrast
                    ? 'bg-black border-white text-white'
                    : 'bg-slate-900 border-amber-500/40 text-slate-200'
                }`}
                title="Target Role Settings"
              >
                <Cpu className="w-4 h-4 text-amber-400 mr-1" />
                <span className="text-[11px]">Role</span>
              </button>

              {/* Mobile Microphone Button (< lg) */}
              <button
                onClick={onOpenMicSettings}
                className={`lg:hidden flex items-center justify-center min-h-[56px] px-3 rounded-2xl border-2 transition-all cursor-pointer font-bold text-xs ${
                  highContrast
                    ? 'bg-black border-white text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-200'
                }`}
                title="Microphone Settings"
              >
                <Mic className="w-4 h-4 text-amber-400 mr-1" />
                <span className="text-[11px]">Mic</span>
              </button>

              {/* Dynamic Font Scaler (100% - 200%) */}
              <button
                onClick={cycleFontScale}
                className="flex items-center justify-center min-h-[56px] min-w-[56px] px-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 text-slate-200 hover:text-white transition-all cursor-pointer font-bold text-xs"
                title="Scale Font Size (100% - 200%)"
                aria-label={`Dynamic Font Scale: currently ${Math.round(fontScale * 100)}%`}
              >
                <Type className="w-4 h-4 mr-1 text-amber-400" />
                <span>{Math.round(fontScale * 100)}%</span>
              </button>

              {/* Strict High Contrast Toggle (7:1+) */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center justify-center min-h-[56px] min-w-[56px] px-3.5 rounded-2xl border-2 transition-all cursor-pointer font-bold text-xs ${
                  highContrast
                    ? 'bg-amber-400 text-black border-white'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
                title="Toggle Strict High-Contrast Mode (WCAG AAA 7:1+)"
                aria-label="Toggle High-Contrast Mode"
              >
                <Sun className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">AAA Contrast</span>
              </button>

              {/* 60s Vocal Warmup Button */}
              <button
                onClick={onOpenWarmup}
                className="flex items-center justify-center min-h-[56px] px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-2 border-slate-700 transition-colors text-xs font-bold cursor-pointer"
                title="60-Second Vocal Resonance Warmup"
              >
                <Volume2 className="w-4 h-4 text-amber-400 mr-1.5" />
                <span className="hidden md:inline">60s Warmup</span>
                <span className="md:hidden">Warmup</span>
              </button>

            </div>

          </div>

          {/* Mobile Only: Horizontal Scrollable Tab Bar (< lg) */}
          <nav className="lg:hidden flex items-center space-x-2 overflow-x-auto py-2.5 pb-3" aria-label="Mobile Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 min-h-[56px] px-4 rounded-2xl font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md border-2 border-amber-300'
                      : highContrast
                      ? 'bg-black text-white border-2 border-slate-700'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-2 border-slate-800'
                  }`}
                  style={{ fontSize: `${0.875 * fontScale}rem` }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-200'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>
      </header>
    </>
  );
}
