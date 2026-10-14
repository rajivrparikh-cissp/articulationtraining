import { 
  AudioDiagnosticMetrics, 
  ExecutiveArticulationScorecard,
  ThoughtStructuringScore,
  SignalToNoiseScore,
  ExecutiveCadenceScore,
  ConvictionDecisivenessScore,
  TheFirst60SecondsScore
} from '@executive-voice/shared-types';

export const FILLER_WORDS: readonly string[] = [
  'um', 'uh', 'er', 'ah', 'like', 'basically', 'actually', 'literally',
  'sort of', 'kind of', 'you know', 'i mean', 'right', 'honestly', 'throat-clearing'
];

export const WEAK_VERBAL_HEDGES: readonly string[] = [
  'i think maybe', 'i feel like', 'in my humble opinion',
  'i could be wrong', 'does that make sense', 'just wanted to',
  'hopefully', 'sort of', 'kind of', 'at least i tried', 'i guess',
  'i tried to', 'probably', 'we kinda'
];

export const OWNERSHIP_PHRASES: readonly string[] = [
  'i orchestrated', 'i established', 'i led the transformation',
  'we decided', 'the mandate was', 'i take accountability',
  'we achieved', 'my strategy', 'we institutionalized', 'i delivered',
  'i built', 'we accelerated', 'we remediated'
];

export const CHRONOLOGICAL_RESUME_CLUES: readonly string[] = [
  'i graduated in', 'i graduated from', 'started my career as',
  'my first job was', 'after college', 'then in 201', 'then in 202',
  'as you can see on my resume', 'my resume shows', 'back in 20',
  'then i got promoted to', 'worked at company a'
];

export const EXECUTIVE_THESIS_CLUES: readonly string[] = [
  'i specialize in', 'i am an executive leader', 'my leadership centers on',
  'turning complex', 'scaling organizations', 'commercial revenue',
  'predictable velocity', 'delivering margin', 'enterprise value',
  'cross-functional leverage', 'transforming fragmented'
];

export const WANDERING_TRAILING_CLUES: readonly string[] = [
  'so yeah', "that's pretty much it", 'and stuff like that',
  'and things like that', 'you know what i mean', "i guess that's all",
  'and whatever', 'etcetera etcetera'
];

export const CRISP_TAKEAWAY_CLUES: readonly string[] = [
  'the key takeaway is', 'ultimately,', 'which is why we prioritize',
  'the bottom line is', 'that is the velocity i bring', 'the direct outcome was',
  'which ensures that', 'this guarantees'
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
 * Target rate: 135-155 WPM
 */
export function classifyPacing(wpm: number): 'RUSHING' | 'OPTIMAL_EXECUTIVE' | 'HALTING_LETHARGIC' {
  if (wpm > 155) return 'RUSHING';
  if (wpm < 135) return 'HALTING_LETHARGIC';
  return 'OPTIMAL_EXECUTIVE';
}

/**
 * Comprehensive Evaluation of the 5 Core Executive Articulation Capabilities
 */
export function evaluateExecutiveArticulationEngine(
  rawTranscript: string,
  durationSeconds: number = 60,
  isOpeningQuestion: boolean = false
): ExecutiveArticulationScorecard {
  const clean = (rawTranscript || '').toLowerCase().trim();
  const words = clean.match(/\b[a-z']+\b/g) || [];
  const wordCount = words.length;
  const wpm = calculateWpm(wordCount, durationSeconds);

  // --------------------------------------------------------------------------
  // 1. Thought Structuring (PREP: Point -> Reason -> Example -> Point)
  // --------------------------------------------------------------------------
  const wanderingDetected = WANDERING_TRAILING_CLUES.some(clue => clean.includes(clue));
  const crispClosingTakeawayPresent = CRISP_TAKEAWAY_CLUES.some(clue => clean.includes(clue)) ||
    (words.length > 20 && !wanderingDetected && (clean.endsWith('.') || clean.endsWith('!') || clean.includes('which is why') || clean.includes('therefore')));

  const prepComponents = {
    pointIdentified: clean.includes('i recommend') || clean.includes('we must') || clean.includes('my stance') || clean.includes('our strategy') || clean.includes('i specialize in') || words.length >= 10,
    reasonIdentified: clean.includes('because') || clean.includes('due to') || clean.includes('the reason') || clean.includes('driver') || clean.includes('retention') || clean.includes('margin') || clean.includes('risk'),
    exampleIdentified: clean.includes('for example') || clean.includes('specifically') || clean.includes('scaled') || clean.includes('%') || clean.includes('million') || clean.includes('reduced') || clean.includes('grew'),
    closingPointIdentified: crispClosingTakeawayPresent
  };

  let thoughtScore = 70;
  if (prepComponents.pointIdentified) thoughtScore += 10;
  if (prepComponents.reasonIdentified) thoughtScore += 10;
  if (prepComponents.exampleIdentified) thoughtScore += 10;
  if (crispClosingTakeawayPresent) thoughtScore += 10;
  if (wanderingDetected) thoughtScore -= 30;
  thoughtScore = Math.max(10, Math.min(100, thoughtScore));

  const thoughtFeedback = wanderingDetected
    ? "Conversational wandering detected at close. Never end an executive response with 'so yeah' or trailing off. Conclude with a crisp, definitive takeaway sentence."
    : crispClosingTakeawayPresent
    ? "Crisp thought structuring. Clear opening thesis backed by reasons, concrete data, and a decisive closing anchor."
    : "Good progression, but elevate the ending. Conclude with an unmistakable forward-looking takeaway.";

  const thoughtStructuring: ThoughtStructuringScore = {
    score: thoughtScore,
    wanderingDetected,
    crispClosingTakeawayPresent,
    prepComponents,
    feedback: thoughtFeedback
  };

  // --------------------------------------------------------------------------
  // 2. Signal-to-Noise Ratio (Verbal Crutches & Filler Reduction)
  // --------------------------------------------------------------------------
  const detectedFillers: Record<string, number> = {};
  let totalFillerCount = 0;

  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches && matches.length > 0) {
      detectedFillers[filler] = matches.length;
      totalFillerCount += matches.length;
    }
  }

  const fillersPer100Words = wordCount > 0 
    ? Number(((totalFillerCount / wordCount) * 100).toFixed(1))
    : 0;

  let snrGrade: SignalToNoiseScore['snrGrade'] = 'ELITE_EXECUTIVE';
  if (fillersPer100Words >= 5.0) {
    snrGrade = 'RAMBLING_HAZARD';
  } else if (fillersPer100Words >= 2.5) {
    snrGrade = 'MID_LEVEL_MANAGER';
  } else if (fillersPer100Words >= 1.0) {
    snrGrade = 'SENIOR_DIRECTOR';
  }

  const snrFeedback = fillersPer100Words === 0
    ? "Exceptional Signal-to-Noise Ratio (0.0 fillers/100w). Zero vocal crutches; pure executive signal."
    : fillersPer100Words < 2.0
    ? `Strong Signal-to-Noise Ratio (${fillersPer100Words} fillers/100w). Vocal crutches are tightly controlled.`
    : `High verbal crutch density (${fillersPer100Words} fillers/100w). Practice substituting vocal fillers with comfortable silent pauses.`;

  const signalToNoise: SignalToNoiseScore = {
    fillersPer100Words,
    snrGrade,
    totalFillerCount,
    detectedFillers,
    feedback: snrFeedback
  };

  // --------------------------------------------------------------------------
  // 3. Executive Cadence (135–155 WPM & Strategic Pauses)
  // --------------------------------------------------------------------------
  const pacingClassification = classifyPacing(wpm);
  const inTargetZone = pacingClassification === 'OPTIMAL_EXECUTIVE';
  const strategicPausesEstimated = Math.max(0, Math.floor(durationSeconds / 30));

  let pacingScore = 100;
  if (pacingClassification === 'RUSHING') {
    pacingScore = Math.max(40, 100 - (wpm - 155) * 2);
  } else if (pacingClassification === 'HALTING_LETHARGIC') {
    pacingScore = Math.max(40, 100 - (135 - wpm) * 2);
  }

  const cadenceFeedback = inTargetZone
    ? `Masterful Cadence (${wpm} WPM). Perfectly positioned within the 135–155 WPM executive target rate.`
    : pacingClassification === 'RUSHING'
    ? `Pacing is too fast (${wpm} WPM). Exceeding 155 WPM signals nervous urgency. Take a deliberate 1.5s breath before key transitions.`
    : `Pacing is lagging (${wpm} WPM). Speaking under 135 WPM risks losing executive engagement. Deliver with dynamic forward momentum.`;

  const executiveCadence: ExecutiveCadenceScore = {
    wpm,
    targetWpmRange: '135-155 WPM',
    inTargetZone,
    pacingClassification,
    strategicPausesEstimated,
    pacingScore,
    feedback: cadenceFeedback
  };

  // --------------------------------------------------------------------------
  // 4. Conviction & Decisiveness (Minimizing Defensive Hedging)
  // --------------------------------------------------------------------------
  const tentativeHedgesDetected = WEAK_VERBAL_HEDGES.filter(hedge => clean.includes(hedge));
  const ownershipPhrasesDetected = OWNERSHIP_PHRASES.filter(p => clean.includes(p));

  const hedgingCount = tentativeHedgesDetected.length;
  const ownershipCount = ownershipPhrasesDetected.length;

  let convictionScore = 80 - (hedgingCount * 15) + (ownershipCount * 10);
  convictionScore = Math.max(15, Math.min(100, convictionScore));

  const convictionFeedback = hedgingCount > 0
    ? `Detected tentative hedging ("${tentativeHedgesDetected.join('", "')}"). Eliminate weak qualifiers. Take uncompromised executive ownership.`
    : ownershipCount > 0
    ? "High conviction and decisiveness. Spoken language radiates strategic ownership and accountability."
    : "Clear conviction with zero defensive hedging. Infuse more explicit ownership verbs ('I orchestrated', 'we institutionalized').";

  const convictionDecisiveness: ConvictionDecisivenessScore = {
    score: convictionScore,
    tentativeHedgesDetected,
    ownershipPhrasesDetected,
    hedgingCount,
    ownershipCount,
    feedback: convictionFeedback
  };

  // --------------------------------------------------------------------------
  // 5. The First 60 Seconds (Executive Thesis vs Chronological Recap)
  // --------------------------------------------------------------------------
  const chronologicalWordsDetected = CHRONOLOGICAL_RESUME_CLUES.filter(clue => clean.includes(clue));
  const commercialThesisDetected = EXECUTIVE_THESIS_CLUES.some(clue => clean.includes(clue));

  let first60Score = 80;
  if (chronologicalWordsDetected.length > 0) {
    first60Score -= 40;
  }
  if (commercialThesisDetected) {
    first60Score += 20;
  }
  first60Score = Math.max(10, Math.min(100, first60Score));

  const isChronologicalTrap = chronologicalWordsDetected.length > 0 && !commercialThesisDetected;
  const first60Verdict = isChronologicalTrap ? 'CHRONOLOGICAL_RECAP_TRAP' : 'EXECUTIVE_THESIS';

  const first60Feedback = isChronologicalTrap
    ? `Chronological resume recitation trap detected ("${chronologicalWordsDetected[0]}"). Replace historical job recaps with a 30,000-foot commercial identity and multiplier milestones.`
    : "Superb executive opening. Presents an executive commercial value proposition rather than a chronological timeline.";

  const theFirst60Seconds: TheFirst60SecondsScore = {
    score: first60Score,
    verdict: first60Verdict,
    chronologicalWordsDetected,
    commercialThesisDetected,
    feedback: first60Feedback
  };

  // --------------------------------------------------------------------------
  // Overall Composite Score & Executive Rank
  // --------------------------------------------------------------------------
  const overallExecutiveReadiness = Math.round(
    (thoughtScore * 0.25) +
    (Math.max(10, 100 - fillersPer100Words * 15) * 0.20) +
    (pacingScore * 0.20) +
    (convictionScore * 0.20) +
    (first60Score * 0.15)
  );

  let executiveRank: ExecutiveArticulationScorecard['executiveRank'] = 'ASPIRING MANAGER';
  if (overallExecutiveReadiness >= 88) {
    executiveRank = 'C-SUITE / VP READY';
  } else if (overallExecutiveReadiness >= 75) {
    executiveRank = 'SENIOR DIRECTOR';
  } else if (overallExecutiveReadiness < 60) {
    executiveRank = 'IN-THE-WEEDS';
  }

  return {
    thoughtStructuring,
    signalToNoise,
    executiveCadence,
    convictionDecisiveness,
    theFirst60Seconds,
    overallExecutiveReadiness,
    executiveRank
  };
}

/**
 * Backward-compatible audit wrapper returning telemetry + scorecard
 */
export function auditTranscript(
  rawTranscript: string, 
  durationSeconds: number = 60
): AudioDiagnosticMetrics {
  const scorecard = evaluateExecutiveArticulationEngine(rawTranscript, durationSeconds);
  const clean = (rawTranscript || '').toLowerCase().trim();
  const words = clean.match(/\b[a-z']+\b/g) || [];

  return {
    durationSeconds,
    wordCount: words.length,
    wpm: scorecard.executiveCadence.wpm,
    wpmClassification: scorecard.executiveCadence.pacingClassification === 'OPTIMAL_EXECUTIVE' ? 'OPTIMAL_EXECUTIVE' : scorecard.executiveCadence.pacingClassification === 'RUSHING' ? 'RUSHING' : 'HALTING',
    fillerCount: scorecard.signalToNoise.totalFillerCount,
    detectedFillers: scorecard.signalToNoise.detectedFillers,
    verbalHedges: scorecard.convictionDecisiveness.tentativeHedgesDetected,
    pausesDetected: {
      strategicPausesCount: scorecard.executiveCadence.strategicPausesEstimated,
      anxiousHesitationsCount: scorecard.signalToNoise.totalFillerCount
    },
    chestResonanceScore: Math.max(20, Math.min(100, 90 - (scorecard.signalToNoise.fillersPer100Words * 8))),
    blufDeliveredInFirst5Seconds: scorecard.thoughtStructuring.prepComponents.pointIdentified,
    scorecard
  };
}
