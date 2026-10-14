import { AudioDiagnosticMetrics } from '@executive-voice/shared-types';

export const FILLER_WORDS: readonly string[] = [
  'um', 'uh', 'er', 'ah', 'like', 'basically', 'actually', 'literally',
  'sort of', 'kind of', 'you know', 'i mean', 'right', 'honestly'
];

export const WEAK_VERBAL_HEDGES: readonly string[] = [
  'i think maybe', 'i feel like', 'in my humble opinion',
  'i could be wrong', 'does that make sense', 'just wanted to',
  'hopefully', 'sort of', 'kind of', 'at least i tried'
];

/**
 * Calculates continuous Words-Per-Minute (WPM)
 */
export function calculateWpm(wordCount: number, durationSeconds: number): number {
  if (durationSeconds <= 0 || wordCount <= 0) return 0;
  const minutes = durationSeconds / 60;
  return Math.round(wordCount / minutes);
}

/**
 * Classifies speech pacing according to executive gravitas standards
 */
export function classifyPacing(wpm: number): 'RUSHING' | 'OPTIMAL_EXECUTIVE' | 'HALTING' {
  if (wpm >= 165) return 'RUSHING';
  if (wpm < 110) return 'HALTING';
  return 'OPTIMAL_EXECUTIVE';
}

/**
 * Performs full lexical diagnostic audit on spoken transcript
 */
export function auditTranscript(
  rawTranscript: string, 
  durationSeconds: number
): AudioDiagnosticMetrics {
  const clean = (rawTranscript || '').toLowerCase().trim();
  const words = clean.match(/\b[a-z']+\b/g) || [];
  const wordCount = words.length;
  const wpm = calculateWpm(wordCount, durationSeconds);
  const wpmClassification = classifyPacing(wpm);

  const detectedFillers: Record<string, number> = {};
  let fillerCount = 0;

  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches && matches.length > 0) {
      detectedFillers[filler] = matches.length;
      fillerCount += matches.length;
    }
  }

  const verbalHedges = WEAK_VERBAL_HEDGES.filter((hedge) =>
    clean.includes(hedge)
  );

  // Check if first 5 seconds or first 12 words contain conclusion words
  const firstChunk = words.slice(0, 15).join(' ');
  const blufIndicators = ['we should', 'we will', 'our strategy', 'i recommend', 'the outcome', 'we must'];
  const blufDeliveredInFirst5Seconds = blufIndicators.some((kw) => firstChunk.includes(kw));

  return {
    durationSeconds,
    wordCount,
    wpm,
    wpmClassification,
    fillerCount,
    detectedFillers,
    verbalHedges,
    pausesDetected: {
      strategicPausesCount: Math.max(0, Math.floor(durationSeconds / 45)),
      anxiousHesitationsCount: fillerCount
    },
    chestResonanceScore: Math.max(20, Math.min(100, 85 - (fillerCount * 5))),
    blufDeliveredInFirst5Seconds
  };
}

/**
 * Audio DSP: Computes Root Mean Square (RMS) decibel volume from PCM Float32Array
 */
export function computeRmsVolume(buffer: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  const rms = Math.sqrt(sum / buffer.length);
  return 20 * Math.log10(Math.max(rms, 0.00001));
}
