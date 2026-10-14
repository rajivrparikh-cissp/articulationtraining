// ==============================================================================
// ExecutiveVoice Domain Models & Shared TypeScript Interfaces
// ==============================================================================

/**
 * User cadence status distinguishing dormant vs active daily training participation
 */
export type UserCadenceStatus = 'DORMANT' | 'ACTIVE' | 'HIGH_MOMENTUM' | 'GRADUATED';

/**
 * Executive reasoning and articulation frameworks
 */
export type FrameworkType = 
  | 'THREE_ACT_ANCHOR'       // Tell Me About Yourself 90-sec Anchor
  | 'PREP'                   // Point, Reason, Example, Point
  | 'WHAT_SO_WHAT_NOW_WHAT'  // Crisis / Status reporting
  | 'SCQA'                   // Situation, Complication, Question, Answer
  | 'EXTREME_OWNERSHIP'      // Handling failure without defensiveness
  | 'BLUF'                   // Bottom Line Up Front brevity
  | 'BOARDROOM_INVERSION';   // Table-flipping strategic counter-questions

export interface FrameworkStep {
  name: string;
  durationSeconds: number;
  description: string;
  keyPrompt: string;
}

export interface ExecutiveFramework {
  type: FrameworkType;
  name: string;
  tagline: string;
  steps: FrameworkStep[];
}

export interface ManagerVsLeaderContrast {
  weakManager: string;
  executiveLeader: string;
}

export interface DailyCurriculumDay {
  day: number; // 1 to 28
  week: 1 | 2 | 3 | 4;
  title: string;
  category: string;
  tagline: string;
  objective: string;
  coreInsight: string;
  framework: ExecutiveFramework;
  contrast: ManagerVsLeaderContrast;
  practicePrompt: string;
  keyWatchouts: string[];
}

/**
 * The 5 Core Capabilities of the Executive Articulation Engine
 */
export interface ThoughtStructuringScore {
  score: number; // 0-100
  wanderingDetected: boolean;
  crispClosingTakeawayPresent: boolean;
  closingPhraseDetected?: string;
  prepComponents: {
    pointIdentified: boolean;
    reasonIdentified: boolean;
    exampleIdentified: boolean;
    closingPointIdentified: boolean;
  };
  feedback: string;
}

export interface SignalToNoiseScore {
  fillersPer100Words: number;
  snrGrade: 'ELITE_EXECUTIVE' | 'SENIOR_DIRECTOR' | 'MID_LEVEL_MANAGER' | 'RAMBLING_HAZARD';
  totalFillerCount: number;
  detectedFillers: Record<string, number>;
  feedback: string;
}

export interface ExecutiveCadenceScore {
  wpm: number;
  targetWpmRange: '135-155 WPM';
  inTargetZone: boolean;
  pacingClassification: 'RUSHING' | 'OPTIMAL_EXECUTIVE' | 'HALTING_LETHARGIC';
  strategicPausesEstimated: number; // 1.5s deliberate silence before pivots
  pacingScore: number; // 0-100
  feedback: string;
}

export interface ConvictionDecisivenessScore {
  score: number; // 0-100
  tentativeHedgesDetected: string[];
  ownershipPhrasesDetected: string[];
  hedgingCount: number;
  ownershipCount: number;
  feedback: string;
}

export interface TheFirst60SecondsScore {
  score: number; // 0-100
  verdict: 'EXECUTIVE_THESIS' | 'CHRONOLOGICAL_RECAP_TRAP';
  chronologicalWordsDetected: string[];
  commercialThesisDetected: boolean;
  feedback: string;
}

export interface ExecutiveArticulationScorecard {
  thoughtStructuring: ThoughtStructuringScore;
  signalToNoise: SignalToNoiseScore;
  executiveCadence: ExecutiveCadenceScore;
  convictionDecisiveness: ConvictionDecisivenessScore;
  theFirst60Seconds: TheFirst60SecondsScore;
  overallExecutiveReadiness: number; // Composite 0-100
  executiveRank: 'C-SUITE / VP READY' | 'SENIOR DIRECTOR' | 'ASPIRING MANAGER' | 'IN-THE-WEEDS';
}

/**
 * Biometric Audio & Speech Diagnostic Telemetry
 */
export interface AudioDiagnosticMetrics {
  durationSeconds: number;
  wordCount: number;
  wpm: number;
  wpmClassification: 'RUSHING' | 'OPTIMAL_EXECUTIVE' | 'HALTING';
  fillerCount: number;
  detectedFillers: Record<string, number>;
  verbalHedges: string[];
  pausesDetected: {
    strategicPausesCount: number; // 1.5s - 3.0s silent pauses
    anxiousHesitationsCount: number;
  };
  chestResonanceScore: number;
  blufDeliveredInFirst5Seconds: boolean;
  scorecard?: ExecutiveArticulationScorecard;
}

/**
 * Executive Gravitas Audit Rubric
 */
export interface GravitasRubricScores {
  headlineClarity: number; // 1-5
  brevityAndPacing: number; // 1-5
  chestResonance: number; // 1-5
  strategicAltitude: number; // 1-5
  overallExecutiveScore: number; // 1-100 composite
}

/**
 * User Profile
 */
export interface UserExecutiveProfile {
  id: string;
  fullName: string;
  currentRole: string;
  targetRole: 'DIRECTOR' | 'VICE_PRESIDENT' | 'C_SUITE' | 'GENERAL_MANAGER';
  cadenceStatus: UserCadenceStatus;
  completedDays: number[];
  totalPracticeMinutes: number;
  currentStreakDays: number;
  lastTrainedAt?: string;
}

/**
 * Daily Articulation Session Telemetry & Reporting Interfaces
 */
export interface ArticulationSession {
  sessionId: string;
  userId: string;
  dayNumber: number; // Day 1 to 28
  timestamp: string;
  durationSeconds: number; // Standard: 540 seconds (9 minutes)
  promptId: string;
}

export interface MetricBreakdown {
  wordsPerMinute: number; // Target: 135 - 155 WPM
  fillerWordCount: number;
  pauseCount: number;
  averagePauseDurationSeconds: number;
  executivePresenceScore: number; // 0 - 100
  frameworkAdherence: {
    framework: 'PREP' | 'STAR';
    pointDeliveredFirst: boolean;
    clearConclusion: boolean;
  };
}

export interface UserFeedbackReport {
  sessionId: string;
  summary: string;
  metrics: MetricBreakdown;
  actionableDrills: string[];
}

