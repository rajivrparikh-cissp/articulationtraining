import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Mic, 
  MicOff, 
  CheckCircle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  Flame, 
  Search, 
  Filter, 
  ArrowRight, 
  RotateCcw, 
  Cpu, 
  Plus, 
  Trash2, 
  Share2, 
  ShieldCheck, 
  ChevronRight, 
  MessageSquare
} from 'lucide-react';
import { 
  CORE_EXECUTIVE_VOCABULARY, 
  EXECUTIVE_QUIZ_QUESTIONS, 
  VOCABULARY_CATEGORIES, 
  getDailyWordsForDay 
} from '../data/executiveVocabulary';
import { 
  getMasteredWords, 
  toggleMasteredWord, 
  getVocabQuizHistory, 
  saveVocabQuizResult, 
  getCustomVocabList, 
  saveCustomVocabTerm, 
  deleteCustomVocabTerm 
} from '../utils/storage';
import { generateExecutiveVocabWithAi, checkOllamaHealth } from '../utils/ollamaClient';

export default function VocabularyStudio({
  currentDay = 1,
  highContrast = false,
  fontScale = 1.0,
  activeProfile = null,
  selectedDeviceId = null,
  onOpenMicSettings = null
}) {
  const [activeSubTab, setActiveSubTab] = useState('daily'); // 'daily' | 'library' | 'quiz' | 'ai_generator'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [masteredIds, setMasteredIds] = useState([]);
  const [customTerms, setCustomTerms] = useState([]);
  
  // Audio Speech Practice State
  const [practicingWord, setPracticingWord] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [speechSuccess, setSpeechSuccess] = useState(null); // true | false | null
  const recognitionRef = useRef(null);

  // Daily Sprint State
  const [dailySprintWords, setDailySprintWords] = useState([]);
  const [dailySprintStep, setDailySprintStep] = useState(0);

  // Boardroom Quiz State
  const [quizQuestions, setQuizQuestions] = useState(EXECUTIVE_QUIZ_QUESTIONS);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizRationale, setShowQuizRationale] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);

  // AI Generator State
  const [aiTopic, setAiTopic] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedItems, setAiGeneratedItems] = useState([]);
  const [ollamaStatus, setOllamaStatus] = useState({ online: false, model: 'llama3.2:latest' });

  // Load initial state
  useEffect(() => {
    setMasteredIds(getMasteredWords());
    setCustomTerms(getCustomVocabList());
    setQuizHistory(getVocabQuizHistory());
    setDailySprintWords(getDailyWordsForDay(currentDay));

    checkOllamaHealth().then(status => {
      setOllamaStatus(status);
    }).catch(() => {
      setOllamaStatus({ online: false, model: 'llama3.2:latest' });
    });
  }, [currentDay]);

  // All words combined (core + custom)
  const allWords = [...CORE_EXECUTIVE_VOCABULARY, ...customTerms];

  // Filtered library words
  const filteredWords = allWords.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.boardroomContext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Toggle mastery
  const handleToggleMastery = (wordId) => {
    const updated = toggleMasteredWord(wordId);
    setMasteredIds([...updated]);
  };

  // Browser Text-to-Speech Pronunciation
  const handleSpeakWord = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Measured, deliberate executive cadence
    utterance.pitch = 0.95; // Authoritative lower frequency
    window.speechSynthesis.speak(utterance);
  };

  // Start Mic Voice Recognition Practice
  const startSpeechRecognition = (targetSentence) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }

    setSpokenTranscript('');
    setSpeechSuccess(null);
    setIsRecording(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalStr = '';
      for (let i = 0; i < event.results.length; i++) {
        finalStr += event.results[i][0].transcript + ' ';
      }
      const cleaned = finalStr.trim();
      setSpokenTranscript(cleaned);

      // Check if target word is articulated
      if (practicingWord) {
        const wordClean = practicingWord.word.toLowerCase();
        if (cleaned.toLowerCase().includes(wordClean)) {
          setSpeechSuccess(true);
        }
      }
    };

    recognition.onerror = (err) => {
      console.warn("Speech recognition error:", err);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsRecording(false);
  };

  // AI Vocabulary Generator Trigger
  const handleGenerateAiVocab = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);
    setAiGeneratedItems([]);

    try {
      const generated = await generateExecutiveVocabWithAi({
        topic: aiTopic,
        targetRole: activeProfile?.title || 'VP Information Security / Head of Technology',
        onToken: () => {},
        onComplete: (items) => {
          setAiGeneratedItems(items);
          setIsGeneratingAi(false);
        },
        onError: () => {
          setIsGeneratingAi(false);
        }
      });
      if (generated && generated.length > 0) {
        setAiGeneratedItems(generated);
      }
    } catch {
      setIsGeneratingAi(false);
    }
  };

  const handleSaveAiTerm = (term) => {
    const updated = saveCustomVocabTerm(term);
    setCustomTerms([...updated]);
  };

  const handleDeleteCustom = (termId) => {
    const updated = deleteCustomVocabTerm(termId);
    setCustomTerms([...updated]);
  };

  // Quiz Handling
  const handleSelectQuizOption = (index) => {
    if (showQuizRationale) return;
    setSelectedAnswer(index);
    setShowQuizRationale(true);

    const currentQ = quizQuestions[currentQuizIdx];
    if (currentQ.options[index].isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowQuizRationale(false);
    } else {
      setQuizFinished(true);
      const result = {
        score: selectedAnswer !== null && quizQuestions[currentQuizIdx].options[selectedAnswer]?.isCorrect ? quizScore : quizScore,
        total: quizQuestions.length,
        role: activeProfile?.title || 'Senior Executive'
      };
      const updatedHistory = saveVocabQuizResult(result);
      setQuizHistory([...updatedHistory]);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswer(null);
    setShowQuizRationale(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Calculate mastery percentage
  const masteryPercentage = Math.round((masteredIds.length / (allWords.length || 1)) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Executive Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 mb-8 shadow-2xl transition-all ${
        highContrast 
          ? 'bg-black border-white text-white' 
          : 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border-amber-500/30'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="p-2.5 rounded-xl bg-amber-400 text-slate-950 shadow-md">
                <BookOpen className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                Executive Lexicon & Boardroom Mastery
              </span>
              <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                • Day {currentDay} of 28
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Leadership Lexicon & Boardroom Articulation
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              "Amateurs talk about tasks and tools. Executives speak in terms of fiduciary stewardship, non-fungible talent, dispassionate triage, and systemic resilience."
            </p>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="flex items-center space-x-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">{masteredIds.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Mastered</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">{masteryPercentage}%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Board Ready</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-400">{allWords.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Terms</div>
            </div>
          </div>
        </div>

        {/* Sub-Tabs: Daily Sprint | Lexicon Library | Boardroom Quiz | AI Generator */}
        <div className="flex items-center space-x-2 overflow-x-auto mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'daily', label: 'Daily 3-Min Sprint', icon: Sparkles, badge: `Day ${currentDay}` },
            { id: 'library', label: 'Executive Lexicon Library', icon: BookOpen, badge: `${allWords.length}` },
            { id: 'quiz', label: 'Boardroom Quiz', icon: Award, badge: quizHistory.length > 0 ? `Best ${quizHistory[0]?.score}/${quizHistory[0]?.total}` : 'Test' },
            { id: 'ai_generator', label: 'AI Lexicon (Second Brain)', icon: Cpu, badge: ollamaStatus.online ? 'LLaMA 3.2' : 'AI Assistant' }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center space-x-2 min-h-[50px] px-4 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md border-2 border-amber-300'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-2 border-slate-800'
                }`}
                style={{ fontSize: `${0.875 * fontScale}rem` }}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DAILY 3-MINUTE EXECUTIVE VOCABULARY SPRINT                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'daily' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white flex items-center space-x-2">
                <span>🎯 Day {currentDay} Executive Vocabulary Sprint</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Listen, calibrate your vocal resonance, and practice articulating this term in a boardroom context.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
              <Flame className="w-4 h-4" />
              <span>Word {dailySprintStep + 1} of {dailySprintWords.length}</span>
            </div>
          </div>

          {dailySprintWords.length > 0 && (
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Word Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
                      {dailySprintWords[dailySprintStep].word}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono italic">
                      {dailySprintWords[dailySprintStep].phonetic}
                    </span>
                    <span className="text-[11px] bg-slate-800 text-amber-300 px-2.5 py-0.5 rounded-full uppercase font-bold">
                      {dailySprintWords[dailySprintStep].partOfSpeech}
                    </span>
                  </div>
                  <p className="text-base text-slate-200 mt-2 font-medium">
                    {dailySprintWords[dailySprintStep].definition}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleSpeakWord(dailySprintWords[dailySprintStep].word)}
                    className="flex items-center space-x-2 min-h-[50px] px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
                    title="Listen to Executive Pronunciation"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Pronounce</span>
                  </button>

                  <button
                    onClick={() => handleToggleMastery(dailySprintWords[dailySprintStep].id)}
                    className={`flex items-center space-x-2 min-h-[50px] px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      masteredIds.includes(dailySprintWords[dailySprintStep].id)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{masteredIds.includes(dailySprintWords[dailySprintStep].id) ? 'Mastered' : 'Mark Mastered'}</span>
                  </button>
                </div>
              </div>

              {/* Contrast Card: Amateur vs Executive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                    ⚠️ Amateur / Tactical Cadence (Weeds)
                  </span>
                  <p className="text-xs sm:text-sm text-rose-200 italic">
                    "{dailySprintWords[dailySprintStep].amateurVsExecutive?.amateur}"
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    💎 VP & Director Altitude (Boardroom Ready)
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                    "{dailySprintWords[dailySprintStep].amateurVsExecutive?.executive}"
                  </p>
                </div>
              </div>

              {/* Boardroom Context Example */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 flex items-center space-x-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>How to Use When Addressing the Board or Senior Leaders:</span>
                </span>
                <p className="text-sm sm:text-base text-slate-200 italic font-serif">
                  "{dailySprintWords[dailySprintStep].boardroomContext}"
                </p>
              </div>

              {/* Spoken Drill & Microphone Practice */}
              <div className="p-5 rounded-2xl bg-amber-950/10 border-2 border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-amber-400 block">
                      🎤 Vocalization Drill (Speak Aloud into Mic)
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {dailySprintWords[dailySprintStep].drillPrompt}
                    </p>
                  </div>
                  {onOpenMicSettings && (
                    <button
                      onClick={onOpenMicSettings}
                      className="text-xs text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Select Mic</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    onClick={() => {
                      setPracticingWord(dailySprintWords[dailySprintStep]);
                      if (isRecording) {
                        stopSpeechRecognition();
                      } else {
                        startSpeechRecognition(dailySprintWords[dailySprintStep].boardroomContext);
                      }
                    }}
                    className={`flex items-center justify-center space-x-2 min-h-[56px] px-6 rounded-2xl font-black text-sm transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span>{isRecording ? 'Stop Recording' : 'Speak Boardroom Sentence'}</span>
                  </button>

                  <button
                    onClick={() => handleSpeakWord(dailySprintWords[dailySprintStep].boardroomContext)}
                    className="flex items-center justify-center space-x-2 min-h-[56px] px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Hear Sentence Pacing</span>
                  </button>
                </div>

                {/* Spoken Feedback Stream */}
                {spokenTranscript && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Your Spoken Cadence:</span>
                    <p className="text-sm text-slate-100 font-mono">"{spokenTranscript}"</p>
                    {speechSuccess && (
                      <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold pt-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Executive pronunciation confirmed: "{dailySprintWords[dailySprintStep].word}" cleanly articulated.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={dailySprintStep === 0}
                  onClick={() => {
                    setDailySprintStep(prev => Math.max(0, prev - 1));
                    setSpokenTranscript('');
                    setSpeechSuccess(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white transition-all cursor-pointer"
                >
                  Previous Word
                </button>

                <div className="flex items-center space-x-1.5">
                  {dailySprintWords.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === dailySprintStep ? 'bg-amber-400 scale-125' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (dailySprintStep < dailySprintWords.length - 1) {
                      setDailySprintStep(prev => prev + 1);
                      setSpokenTranscript('');
                      setSpeechSuccess(null);
                    } else {
                      setActiveSubTab('quiz');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <span>{dailySprintStep < dailySprintWords.length - 1 ? 'Next Word' : 'Take Daily Quiz'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EXECUTIVE LEXICON LIBRARY (FILTER, SEARCH, FLASHCARDS)             */}
      {/* ========================================================================= */}
      {activeSubTab === 'library' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search executive terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {Object.entries(VOCABULARY_CATEGORIES).map(([catKey, catLabel]) => (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === catKey
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {catLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Lexicon Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWords.map((item) => {
              const isMastered = masteredIds.includes(item.id);
              const isCustom = item.id.startsWith('custom-') || item.id.startsWith('ai-');

              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                    isMastered
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                      : highContrast
                      ? 'bg-black border-slate-700'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-2xl font-black text-white font-display">
                            {item.word}
                          </h3>
                          <span className="text-xs text-slate-400 font-mono">
                            {item.phonetic}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                            {VOCABULARY_CATEGORIES[item.category] || item.category}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            {item.partOfSpeech}
                          </span>
                          {isCustom && (
                            <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800">
                              AI Custom
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleSpeakWord(item.word)}
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                          title="Listen to Pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleMastery(item.id)}
                          className={`p-2.5 rounded-xl transition-colors ${
                            isMastered ? 'bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                          }`}
                          title={isMastered ? 'Mastered' : 'Mark as Mastered'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        {isCustom && (
                          <button
                            onClick={() => handleDeleteCustom(item.id)}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-rose-400 transition-colors"
                            title="Remove Term"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Definition */}
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                      {item.definition}
                    </p>

                    {/* Boardroom Context */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">
                        Boardroom Delivery Example:
                      </span>
                      <p className="text-xs text-slate-200 italic font-serif">
                        "{item.boardroomContext}"
                      </p>
                    </div>

                    {/* Interview Excerpt */}
                    {item.interviewApplication && (
                      <div className="p-3.5 rounded-2xl bg-amber-950/10 border border-amber-900/30 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-amber-300 block">
                          VP / Director Interview Application:
                        </span>
                        <p className="text-xs text-slate-200">
                          "{item.interviewApplication}"
                        </p>
                      </div>
                    )}

                    {/* Contrast Box */}
                    {item.amateurVsExecutive && (
                      <div className="text-[11px] space-y-1 pt-1 border-t border-slate-800">
                        <div className="text-rose-400">
                          <span className="font-bold">Manager:</span> "{item.amateurVsExecutive.amateur}"
                        </div>
                        <div className="text-emerald-400">
                          <span className="font-bold">Director/VP:</span> "{item.amateurVsExecutive.executive}"
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vocal Drill Action Button */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setPracticingWord(item);
                        handleSpeakWord(item.boardroomContext);
                      }}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Boardroom Pacing</span>
                    </button>
                    <button
                      onClick={() => {
                        setDailySprintWords([item]);
                        setDailySprintStep(0);
                        setActiveSubTab('daily');
                      }}
                      className="text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1"
                    >
                      <span>Practice in Studio</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWords.length === 0 && (
            <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800">
              <p className="text-slate-400 text-sm">No executive terms matched your query.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs font-bold text-amber-400 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BOARDROOM ARTICULATION QUIZ                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6 animate-fade-in">
          {!quizFinished ? (
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Quiz Progress Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                    Boardroom Scenario Simulation
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Question {currentQuizIdx + 1} of {quizQuestions.length}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 block">Current Score</span>
                  <span className="text-xl font-black text-emerald-400">{quizScore} / {currentQuizIdx}</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                  {quizQuestions[currentQuizIdx].question}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuizIdx].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const showResult = showQuizRationale;
                  const isCorrect = option.isCorrect;

                  let cardStyle = 'bg-slate-900/90 border-slate-800 hover:border-amber-400/50 text-slate-200';
                  if (showResult) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-100';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'bg-rose-950/40 border-rose-500 text-rose-100';
                    } else {
                      cardStyle = 'bg-slate-950 border-slate-850 opacity-40 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={showQuizRationale}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3.5 ${cardStyle}`}
                    >
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black">
                        {showResult && isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : showResult && isSelected && !isCorrect ? (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium leading-relaxed">
                          {option.text}
                        </p>
                        {showResult && (
                          <p className={`text-[11px] font-bold mt-2 pt-2 border-t ${
                            isCorrect ? 'text-emerald-400 border-emerald-900/50' : 'text-rose-400 border-rose-900/50'
                          }`}>
                            {option.critique}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Rationale & Next Button */}
              {showQuizRationale && (
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-300 max-w-xl">
                    <span className="font-bold text-amber-400">Executive Takeaway: </span>
                    {quizQuestions[currentQuizIdx].explanation}
                  </div>
                  <button
                    onClick={handleNextQuizQuestion}
                    className="min-h-[50px] px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center space-x-2 flex-shrink-0"
                  >
                    <span>{currentQuizIdx < quizQuestions.length - 1 ? 'Next Scenario' : 'View Executive Score'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Score Card */
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center">
                <Award className="w-10 h-10 text-amber-400" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white font-display">
                  Boardroom Simulation Complete
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Calibrated for {activeProfile?.title || 'Senior Technology Leader'}
                </p>
              </div>

              <div className="text-5xl font-black text-amber-400">
                {quizScore} <span className="text-2xl text-slate-400">/ {quizQuestions.length}</span>
              </div>

              <p className="text-sm max-w-md mx-auto text-slate-200">
                {quizScore === quizQuestions.length 
                  ? "Flawless boardroom altitude. You demonstrate command over fiduciary language, systemic risk governance, and executive persuasion."
                  : quizScore >= 3 
                  ? "Solid executive framing. Continue replacing tactical engineering jargon with strategic, quantified governance terminology."
                  : "Watch out for tactical weeds and defensive hedging. Re-read the amateur vs. executive contrast cards in the library."}
              </p>

              <div className="flex items-center justify-center space-x-4 pt-4">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Quiz</span>
                </button>
                <button
                  onClick={() => setActiveSubTab('library')}
                  className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  Review Library
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AI LEXICON GENERATOR (LOCAL LLAMA 3.2 SECOND BRAIN)                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'ai_generator' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Local LLaMA 3.2 Second Brain Lexicon Engine
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  Generate Bespoke Executive Vocabulary for Any Domain
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Input a niche interview topic, regulatory standard (e.g., APRA CPS 230), or company domain to generate C-suite terms with boardroom delivery examples.
                </p>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-bold">
                <span className={`w-2 h-2 rounded-full ${ollamaStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-slate-300">{ollamaStatus.online ? `Ollama (${ollamaStatus.activeModel || 'llama3.2'})` : 'AI Assistant (Fallback Ready)'}</span>
              </div>
            </div>

            {/* Topic Input Box */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase">
                Topic or Specific Domain Scenario:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. APRA CPS 230 Operational Resilience, Zero-Trust at CBA, or Cloud Transformation at Downer"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="flex-1 bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  disabled={isGeneratingAi || !aiTopic.trim()}
                  onClick={handleGenerateAiVocab}
                  className="min-h-[50px] px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  {isGeneratingAi ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Lexicon...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Executive Terms</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pt-2">
                <span className="text-[11px] text-slate-400 flex-shrink-0">Quick Domains:</span>
                {[
                  'APRA CPS 234 & 230 Cyber Resilience',
                  'Bank of America Insider Threat Risk',
                  'Downer Cloud Proxy Modernization',
                  'Boardroom Capital Justification'
                ].map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAiTopic(pill)}
                    className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-300 whitespace-nowrap transition-colors"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Items Stream */}
            {aiGeneratedItems.length > 0 && (
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Synthesized Executive Terms ({aiGeneratedItems.length}):</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiGeneratedItems.map((item, idx) => {
                    const isAlreadySaved = customTerms.some(t => t.word.toLowerCase() === item.word.toLowerCase());
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h5 className="text-lg font-black text-amber-400 font-display">{item.word}</h5>
                            <span className="text-[10px] text-slate-400 font-mono">{item.phonetic}</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">
                            {item.partOfSpeech}
                          </span>
                          <p className="text-xs text-slate-300 mt-2 font-medium">
                            {item.definition}
                          </p>
                          <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[9px] uppercase font-bold text-amber-400 block mb-1">
                              Boardroom Usage:
                            </span>
                            <p className="text-[11px] text-slate-200 italic font-serif">
                              "{item.boardroomContext}"
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSaveAiTerm(item)}
                          disabled={isAlreadySaved}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                            isAlreadySaved
                              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                          }`}
                        >
                          {isAlreadySaved ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Saved to Lexicon</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Personal Lexicon</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
