import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ShieldCheck, 
  Settings, 
  Radio,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function MicSelectorModal({
  isOpen,
  onClose,
  devices,
  selectedDeviceId,
  onSelectDevice,
  onRefreshDevices,
  isTesting,
  testAudioLevel,
  testTranscript,
  voiceDetected,
  errorMessage,
  onStartTest,
  onStopTest,
  highContrast = false
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mic-settings-title"
    >
      <div 
        className={`w-full max-w-xl rounded-3xl border-2 p-6 sm:p-8 space-y-6 shadow-2xl relative ${
          highContrast
            ? 'bg-black border-white text-white'
            : 'bg-slate-900 border-amber-500/40 text-slate-100'
        }`}
      >
        {/* Close Button (56x56 tap target) */}
        <button
          onClick={() => {
            onStopTest();
            onClose();
          }}
          className="absolute top-4 right-4 flex items-center justify-center min-w-[56px] min-h-[56px] rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Microphone Settings"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title & Badge */}
        <div className="space-y-1.5 pr-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Audio Hardware Diagnostics</span>
          </div>
          <h2 id="mic-settings-title" className="text-2xl font-black text-white font-display">
            Select Microphone & Test Voice
          </h2>
          <p className="text-xs text-slate-300">
            Choose your preferred microphone (headset, USB mic, or built-in) and test live volume levels before your executive sprint.
          </p>
        </div>

        {/* Error Notification if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-500/60 text-red-200 text-xs flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Microphone Error</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Device Selection Dropdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="mic-device-select" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Available Input Microphones ({devices.length})</span>
            </label>
            <button
              onClick={() => onRefreshDevices(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold inline-flex items-center space-x-1 cursor-pointer min-h-[44px] px-2"
              title="Rescan connected audio devices"
            >
              <RotateCw className="w-3.5 h-3.5 mr-1" />
              <span>Rescan Devices</span>
            </button>
          </div>

          <div className="relative">
            <select
              id="mic-device-select"
              value={selectedDeviceId}
              onChange={(e) => {
                const newId = e.target.value;
                onSelectDevice(newId);
                if (isTesting) {
                  onStartTest(newId);
                }
              }}
              className={`w-full min-h-[56px] px-4 rounded-2xl border-2 font-medium text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
                highContrast
                  ? 'bg-black border-white text-white'
                  : 'bg-slate-950 border-slate-700 text-white hover:border-slate-600'
              }`}
            >
              {devices.length === 0 ? (
                <option value="">Default Microphone (Click 'Rescan' to grant permission)</option>
              ) : (
                devices.map((device, idx) => (
                  <option key={device.deviceId || idx} value={device.deviceId}>
                    {device.label || `Microphone ${idx + 1}`}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Live Audio Volume Meter & Voice Detection Test */}
        <div className={`p-5 rounded-2xl border-2 space-y-4 ${
          highContrast ? 'bg-black border-slate-700' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Live Mic Input Level (VU Meter)</span>
            </span>

            {isTesting && (
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center space-x-1 ${
                voiceDetected
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                <Radio className="w-3 h-3 animate-pulse" />
                <span>{voiceDetected ? 'Voice Detected' : 'Listening...'}</span>
              </span>
            )}
          </div>

          {/* Graphical VU Level Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-6 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-1 flex items-center">
              <div 
                className={`h-full rounded-full transition-all duration-75 ${
                  testAudioLevel > 75 
                    ? 'bg-red-500' 
                    : testAudioLevel > 25 
                    ? 'bg-amber-400' 
                    : testAudioLevel > 5 
                    ? 'bg-emerald-400' 
                    : 'bg-slate-700'
                }`}
                style={{ width: `${Math.max(testAudioLevel, 2)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono px-1">
              <span>0% (Silent)</span>
              <span>Input Level: {testAudioLevel}%</span>
              <span>100% (Peak)</span>
            </div>
          </div>

          {/* Live Test Transcription Preview */}
          {isTesting && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                Live Speech Recognition Output:
              </span>
              <p className="text-slate-200 italic font-medium min-h-[20px]">
                {testTranscript ? `"${testTranscript}"` : "Speak into your mic to test speech recognition (e.g., 'Testing 1 2 3')..."}
              </p>
            </div>
          )}

          {/* Test Control Action (56x56 px compliant) */}
          <div className="flex items-center space-x-3 pt-1">
            {!isTesting ? (
              <button
                onClick={() => onStartTest()}
                className="flex-1 flex items-center justify-center min-h-[56px] px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 cursor-pointer transition-all"
              >
                <Mic className="w-5 h-5 mr-2" />
                <span>Test Microphone Now</span>
              </button>
            ) : (
              <button
                onClick={onStopTest}
                className="flex-1 flex items-center justify-center min-h-[56px] px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border-2 border-slate-600 cursor-pointer transition-all"
              >
                <MicOff className="w-5 h-5 mr-2 text-red-400" />
                <span>Stop Testing</span>
              </button>
            )}
          </div>
        </div>

        {/* Best Practice Audio Tips */}
        <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
          <p className="font-bold text-slate-300 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Best Practices for Clear Executive Voice Capture:</span>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-400">
            <li><strong>Headset or Dedicated USB Mic:</strong> Highly recommended over laptop built-in microphones to eliminate room echo and keyboard clicks.</li>
            <li><strong>Browser Permission:</strong> If your browser shows "Microphone blocked", click the <strong>lock/settings icon</strong> on the left side of your browser URL bar and set Microphone to <strong>"Allow"</strong>.</li>
            <li><strong>Operating System Sound Settings:</strong> Verify in Windows/Mac Sound Settings that your microphone input volume is set to 80% or higher.</li>
          </ul>
        </div>

        {/* Footer Done Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onStopTest();
              onClose();
            }}
            className="w-full flex items-center justify-center min-h-[56px] px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border-2 border-slate-600 cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
            <span>Save & Return to Training</span>
          </button>
        </div>

      </div>
    </div>
  );
}
