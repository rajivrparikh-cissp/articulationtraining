import React from 'react';
import { 
  Mic, 
  Calendar, 
  Sparkles, 
  Award, 
  Sliders, 
  Flame,
  Volume2
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  completedCount, 
  totalMinutes, 
  currentDay,
  onOpenWarmup
}) {
  const tabs = [
    { id: 'studio', label: '9-Min Daily Studio', icon: Mic, badge: `Day ${currentDay}` },
    { id: 'builder', label: 'Tell Me About Yourself', icon: Sparkles, badge: 'Crucial' },
    { id: 'analyzer', label: 'Voice Articulation Lab', icon: Sliders },
    { id: 'curriculum', label: '28-Day Roadmap', icon: Calendar, badge: `${completedCount}/28` },
    { id: 'playbook', label: 'Executive Playbook', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('studio')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Mic className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white font-display">
                  Executive<span className="text-amber-400">Voice</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full">
                  VP & Director Articulation
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                9 Minutes / Day • 28 Days to Command the Room
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center space-x-6 text-xs">
            <button
              onClick={onOpenWarmup}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title="60-Second Vocal Resonance Warmup"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>60s Vocal Warmup</span>
            </button>

            <div className="flex items-center space-x-1.5 text-slate-300">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-semibold text-white">{completedCount}</span>
              <span className="text-slate-400">/ 28 Days</span>
            </div>

            <div className="h-4 w-px bg-slate-800" />

            <div className="text-slate-300">
              <span className="text-slate-400">Trained: </span>
              <span className="font-semibold text-amber-300">{totalMinutes} mins</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-amber-400 text-slate-950' 
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
      </div>
    </header>
  );
}
