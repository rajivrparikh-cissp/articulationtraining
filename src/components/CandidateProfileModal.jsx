import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Briefcase, 
  Award, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Sparkles, 
  RefreshCw,
  Plus,
  ExternalLink,
  ChevronRight,
  Target
} from 'lucide-react';
import { 
  RAJIV_CANDIDATE_DNA, 
  getAllProfiles, 
  getActiveProfileId, 
  setActiveProfileId,
  saveCustomRole 
} from '../data/candidateProfiles';
import { checkOllamaHealth } from '../utils/ollamaClient';

export default function CandidateProfileModal({
  isOpen,
  onClose,
  activeProfile,
  onSelectProfile,
  highContrast = false
}) {
  const [ollamaStatus, setOllamaStatus] = useState({ online: false, checking: true, models: [] });
  const [testingLlama, setTestingLlama] = useState(false);
  const [testResult, setTestResult] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customCompany, setCustomCompany] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customJdText, setCustomJdText] = useState('');

  const allProfiles = getAllProfiles();

  useEffect(() => {
    if (isOpen) {
      verifyOllama();
    }
  }, [isOpen]);

  const verifyOllama = async () => {
    setOllamaStatus({ online: false, checking: true, models: [] });
    const health = await checkOllamaHealth();
    setOllamaStatus({ online: health.online, checking: false, models: health.models, activeModel: health.activeModel });
  };

  const handleTestLlama = async () => {
    setTestingLlama(true);
    setTestResult('');
    try {
      const health = await checkOllamaHealth();
      if (!health.online) {
        setTestResult('⚠️ Ollama offline. Ensure Ollama is running in background (ollama run llama3.2).');
      } else {
        setTestResult(`✅ Local LLaMA 3.2 active! Model: ${health.activeModel} (Endpoint: ${health.endpoint})`);
      }
    } catch (err) {
      setTestResult(`❌ Connection error: ${err.message}`);
    } finally {
      setTestingLlama(false);
    }
  };

  const handleCreateCustomRole = (e) => {
    e.preventDefault();
    if (!customCompany || !customTitle) return;

    const newRole = {
      id: `custom_${Date.now()}`,
      company: customCompany,
      title: customTitle,
      altitude: "Director / VP / Senior Technology Leader",
      badge: "Custom Role",
      tagline: `Targeted for ${customCompany}`,
      evaluationPersona: `Executive Hiring Panel at ${customCompany} evaluating business altitude, leadership presence, and strategic value.`,
      rubricFocus: [
        "Executive Altitude: Focuses on commercial outcomes and systemic leverage.",
        "Thought Structuring: Clear PREP structure with closing takeaways.",
        "Decisive Leadership: Zero defensive hedging."
      ],
      samplePrompts: [
        `Why are you the right leader for ${customTitle} at ${customCompany}?`,
        `Describe a major crisis or transformation you spearheaded that aligns with ${customCompany}'s priorities.`,
        `How do you balance operational excellence with strategic innovation?`
      ],
      tailoredOpeningThesis: `With over 25 years of technology leadership and verified Tier-1 financial operations at Commonwealth Bank, I bring institutional resilience, proactive governance, and strategic execution to the ${customTitle} mandate at ${customCompany}.`
    };

    saveCustomRole(newRole);
    onSelectProfile(newRole);
    setShowAddCustom(false);
    setCustomCompany('');
    setCustomTitle('');
    setCustomJdText('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-dossier-title"
    >
      <div 
        className={`w-full max-w-4xl my-auto rounded-3xl border-2 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto ${
          highContrast
            ? 'bg-black border-white text-white'
            : 'bg-slate-900 border-amber-500/40 text-slate-100'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center min-w-[56px] min-h-[56px] rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close Profile Dossier"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Banner */}
        <div className="space-y-2 pr-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Personalized Executive Dossier & Knowledge Base</span>
          </div>
          <h2 id="profile-dossier-title" className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {RAJIV_CANDIDATE_DNA.fullName}
          </h2>
          <p className="text-xs text-slate-300">
            {RAJIV_CANDIDATE_DNA.currentRole} • {RAJIV_CANDIDATE_DNA.currentCompany} • {RAJIV_CANDIDATE_DNA.totalExperience} Leadership Experience
          </p>
        </div>

        {/* Local LLaMA 3.2 Second Brain Status Card */}
        <div className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3 ${
          ollamaStatus.online 
            ? 'bg-emerald-950/30 border-emerald-500/40' 
            : 'bg-amber-950/20 border-amber-500/30'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <Cpu className={`w-5 h-5 ${ollamaStatus.online ? 'text-emerald-400' : 'text-amber-400'}`} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Local LLaMA 3.2 "Second Brain" Status
                </span>
                <span className="text-sm font-extrabold text-white flex items-center space-x-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${ollamaStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>
                    {ollamaStatus.checking 
                      ? "Probing local Ollama (localhost:11434)..." 
                      : ollamaStatus.online 
                      ? `Online & Active (${ollamaStatus.activeModel})` 
                      : "Ollama Offline (Using Heuristic Fallback)"}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleTestLlama}
                disabled={testingLlama}
                className="min-h-[44px] px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white border border-slate-600 transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingLlama ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
            </div>
          </div>

          {testResult && (
            <p className="text-xs font-mono p-2.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">
              {testResult}
            </p>
          )}

          {typeof window !== 'undefined' && window.location.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(window.location.hostname) && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-400/40 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Cloud Run (HTTPS) vs. Local Laptop LLaMA 3.2:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                You are currently viewing ExecutiveVoice hosted on <strong>Google Cloud Run</strong> (<code className="text-amber-200">https://...run.app</code>). Browser security (Mixed Content & Private Network Access policies) prevents external cloud sites from accessing your laptop's private port (<code className="text-amber-200">http://127.0.0.1:11434</code>).
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-amber-200 space-y-1">
                <span className="font-bold block text-white">How to connect local LLaMA 3.2:</span>
                <span>Run <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">start-local-app.bat</code> in your project folder, then open <strong className="text-white">http://localhost:3000</strong>.</span>
              </div>
            </div>
          )}

          {!ollamaStatus.online && !ollamaStatus.checking && (
            <p className="text-[11px] text-amber-300/80 leading-relaxed">
              💡 <strong>On Cloud Run:</strong> The app automatically uses the integrated Heuristic AI Evaluator. For local LLaMA 3.2, run locally at <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-200">http://localhost:3000</code>.
            </p>
          )}
        </div>

        {/* Target Role Selector (The 3 Canonical Roles from Resume Lab) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Select Active Target Role & Evaluation Persona:</span>
            </span>
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold inline-flex items-center space-x-1 cursor-pointer min-h-[40px] px-2"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>{showAddCustom ? "Cancel" : "Import / Add Role"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allProfiles.map((p) => {
              const isSelected = activeProfile.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveProfileId(p.id);
                    onSelectProfile(p);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400 shadow-xl shadow-amber-400/15'
                      : highContrast
                      ? 'bg-black border-slate-700 hover:border-white'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected 
                          ? 'bg-amber-400 text-slate-950' 
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {p.badge || p.company}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <h4 className="text-sm font-extrabold text-white leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {p.company} • {p.altitude}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2.5 pt-2 border-t border-slate-800/80 leading-relaxed italic">
                    "{p.tagline}"
                  </p>
                </div>
              );
            })}
          </div>

          {/* Add Custom Role Drawer */}
          {showAddCustom && (
            <form onSubmit={handleCreateCustomRole} className="p-4 rounded-2xl bg-slate-950 border border-amber-400/40 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Add New Target Role from Your Applications Folder:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Target Company (e.g. Westpac, Seek, HelloFresh)"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="Target Role Title (e.g. Director of Infrastructure)"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <textarea
                placeholder="Optional: Paste key JD responsibilities or notes..."
                value={customJdText}
                onChange={(e) => setCustomJdText(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustom(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black hover:bg-amber-300 cursor-pointer"
                >
                  Save & Calibrate Profile
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Verified Credentials & Master Experience Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Credentials */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Executive Credentials:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {RAJIV_CANDIDATE_DNA.credentials.map((cred, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-200">
                  {cred}
                </span>
              ))}
            </div>
          </div>

          {/* Core Governance & Regulatory Standards */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Regulatory Assurance Domains:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {RAJIV_CANDIDATE_DNA.regulatoryAssurance.map((reg, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-emerald-300">
                  {reg}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Hard ROI & Scale Metrics */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block">
            Signature Scale & Impact Metrics (For PREP Proof Points):
          </span>
          <ul className="space-y-1.5 text-slate-300 list-disc pl-5">
            {RAJIV_CANDIDATE_DNA.coreMetrics.map((metric, idx) => (
              <li key={idx} className="leading-relaxed">
                {metric}
              </li>
            ))}
          </ul>
        </div>

        {/* Tailored Elevator Pitch */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs">
          <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] block">
            Calibrated Opening Anchor for {activeProfile.title}:
          </span>
          <p className="text-slate-200 italic leading-relaxed font-medium">
            "{activeProfile.tailoredOpeningThesis}"
          </p>
        </div>

        {/* Done / Confirm Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center min-h-[56px] px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 cursor-pointer transition-all"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span>Apply Profile & Start Articulation Sprint</span>
          </button>
        </div>

      </div>
    </div>
  );
}
