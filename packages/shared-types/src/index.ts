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
    strategicPausesCount: number; // 2.0s - 3.5s silent pauses (positive)
    anxiousHesitationsCount: number; // micro-pauses with filler words (negative)
  };
  chestResonanceScore: number; // 1-100 scale derived from low harmonic energy ratio
  blufDeliveredInFirst5Seconds: boolean;
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
 * Live WebSocket Audio Streaming Message Contracts
 */
export interface AudioChunkPayload {
  sessionId: string;
  sequenceNumber: number;
  timestamp: number;
  isFinal: boolean;
  audioBase64OrBuffer: string;
}

export interface StreamingDiagnosticEvent {
  sessionId: string;
  partialTranscript: string;
  currentWpm: number;
  fillerAlert?: string;
  suggestedExecutiveUpgrade?: {
    managerPhrase: string;
    executiveAlternative: string;
  };
}

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
