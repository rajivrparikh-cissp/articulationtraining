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
  Type
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
  deviceCount = 1
}) {
  const tabs = [
    { id: 'studio', label: '9-Min Daily Sprint', icon: Mic, badge: `Day ${currentDay}` },
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

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
      highContrast 
        ? 'bg-black border-white text-white' 
        : 'bg-slate-950/90 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[64px] sm:min-h-[72px] py-2">
          
          {/* Brand Logo & Prominent Label */}
          <div 
            onClick={() => setActiveTab('studio')}
            className="flex items-center space-x-3 cursor-pointer group min-h-[56px] min-w-[56px]"
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
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full">
                  VP & Director
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                9 Minutes / Day • 28 Days to Command the Room
              </p>
            </div>
          </div>

          {/* Accessibility Controls & Hardware Diagnostics (WCAG AAA) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Microphone Selector & Live Test (Placed before T 100% toggle per user specification) */}
            <button
              onClick={onOpenMicSettings}
              className={`flex items-center justify-center min-h-[56px] px-3.5 sm:px-4 rounded-2xl border-2 transition-all cursor-pointer font-bold text-xs ${
                highContrast
                  ? 'bg-black hover:bg-slate-900 border-white text-white'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-amber-400/70 text-slate-200 hover:text-white'
              }`}
              title="Microphone Device Selector & Live Voice Test"
              aria-label={`Microphone Settings: currently using ${selectedDeviceLabel || 'Default Microphone'}`}
            >
              <div className="relative mr-2 flex-shrink-0">
                <Mic className="w-4 h-4 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-left hidden sm:block max-w-[130px] md:max-w-[160px] truncate">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold leading-none">
                  Mic ({deviceCount})
                </span>
                <span className="block text-xs font-bold text-amber-300 truncate leading-tight mt-0.5">
                  {selectedDeviceLabel || 'Select Mic'}
                </span>
              </div>
              <span className="sm:hidden text-xs">Mic</span>
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
              <span className="hidden md:inline">AAA Contrast</span>
            </button>

            {/* Vocal Warmup Button */}
            <button
              onClick={onOpenWarmup}
              className="hidden lg:flex items-center justify-center min-h-[56px] px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-2 border-slate-700 transition-colors text-xs font-bold"
              title="60-Second Vocal Resonance Warmup"
            >
              <Volume2 className="w-4 h-4 text-amber-400 mr-2" />
              <span>60s Warmup</span>
            </button>

          </div>

        </div>

        {/* Navigation Tabs - Minimum 56px Tap Target */}
        <nav className="flex items-center space-x-2 overflow-x-auto py-2.5 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center space-x-2.5 min-h-[56px] px-5 rounded-2xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/25 border-2 border-amber-300'
                    : highContrast
                    ? 'bg-black text-white border-2 border-slate-600 hover:border-white'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-2 border-slate-800'
                }`}
                style={{ fontSize: `${0.875 * fontScale}rem` }}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                    isActive 
                      ? 'bg-slate-950 text-amber-300' 
                      : 'bg-slate-800 text-slate-200'
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
  );
}
