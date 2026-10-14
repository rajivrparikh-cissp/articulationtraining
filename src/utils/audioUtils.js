// Web Audio API Synthesizer Chimes & Sounds
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playExecutiveChime(type = 'start') {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'start') {
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'phase') {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        osc.start(now);
        osc.stop(now + 1.0);
      } else if (type === 'success') {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.connect(g);
          g.connect(this.ctx.destination);
          const t = now + idx * 0.12;
          o.frequency.setValueAtTime(freq, t);
          g.gain.setValueAtTime(0.18, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
          o.start(t);
          o.stop(t + 0.7);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

export const soundEngine = new SoundEngine();

// ----------------------------------------------------------------------------
// Executive Articulation Engine Constants
// ----------------------------------------------------------------------------
export const FILLER_WORDS_LIST = [
  'um', 'uh', 'er', 'ah', 'like', 'basically', 'actually', 'literally',
  'sort of', 'kind of', 'you know', 'i mean', 'right', 'honestly', 'throat-clearing'
];

export const WEAK_HEDGES = [
  'i think maybe', 'i feel like', 'in my humble opinion',
  'i could be wrong', 'does that make sense', 'just wanted to',
  'hopefully', 'sort of', 'kind of', 'at least i tried', 'i guess',
  'i tried to', 'probably', 'we kinda'
];

export const OWNERSHIP_LEADERSHIP_PHRASES = [
  'i orchestrated', 'i established', 'i led the transformation',
  'we decided', 'the mandate was', 'i take accountability',
  'we achieved', 'my strategy', 'we institutionalized', 'i delivered',
  'i built', 'we accelerated', 'we remediated', 'the operational data points'
];

export const CHRONOLOGICAL_RESUME_RECAP_CLUES = [
  'i graduated in', 'i graduated from', 'started my career as',
  'my first job was', 'after college', 'then in 201', 'then in 202',
  'as you can see on my resume', 'my resume shows', 'back in 20',
  'then i got promoted to', 'worked at company a'
];

export const EXECUTIVE_THESIS_CLUES = [
  'i specialize in', 'i am an executive leader', 'my leadership centers on',
  'turning complex', 'scaling organizations', 'commercial revenue',
  'predictable velocity', 'delivering margin', 'enterprise value',
  'cross-functional leverage', 'transforming fragmented'
];

export const WANDERING_TRAILING_CLUES = [
  'so yeah', "that's pretty much it", 'and stuff like that',
  'and things like that', 'you know what i mean', "i guess that's all",
  'and whatever', 'etcetera'
];

export const CRISP_TAKEAWAY_CLUES = [
  'the key takeaway is', 'ultimately,', 'which is why we prioritize',
  'the bottom line is', 'that is the velocity i bring', 'the direct outcome was',
  'which ensures that', 'this guarantees'
];

/**
 * Full Analysis conforming to Instruction 2: Executive Articulation Engine & Core Frameworks
 */
export function analyzeTranscript(text, elapsedSeconds = 60) {
  if (!text || typeof text !== 'string') {
    return {
      wordCount: 0,
      fillerCount: 0,
      detectedFillers: {},
      hedgesDetected: [],
      wpm: 0,
      scorecard: null
    };
  }

  const clean = text.toLowerCase().trim();
  const words = clean.match(/\b[a-z']+\b/g) || [];
  const wordCount = words.length;

  const detectedFillers = {};
  let fillerCount = 0;

  FILLER_WORDS_LIST.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches && matches.length > 0) {
      detectedFillers[filler] = matches.length;
      fillerCount += matches.length;
    }
  });

  const hedgesDetected = WEAK_HEDGES.filter((hedge) =>
    clean.includes(hedge)
  );

  const minutes = Math.max(0.1, elapsedSeconds / 60);
  const wpm = Math.round(wordCount / minutes);

  // 1. Thought Structuring (PREP)
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

  // 2. Signal-to-Noise Ratio (Fillers / 100 Words)
  const fillersPer100Words = wordCount > 0 
    ? Number(((fillerCount / wordCount) * 100).toFixed(1))
    : 0;

  let snrGrade = 'ELITE_EXECUTIVE';
  if (fillersPer100Words >= 5.0) {
    snrGrade = 'RAMBLING_HAZARD';
  } else if (fillersPer100Words >= 2.5) {
    snrGrade = 'MID_LEVEL_MANAGER';
  } else if (fillersPer100Words >= 1.0) {
    snrGrade = 'SENIOR_DIRECTOR';
  }

  // 3. Executive Cadence (135–155 WPM)
  const inCadenceTargetZone = wpm >= 135 && wpm <= 155;
  let cadenceClassification = 'OPTIMAL_EXECUTIVE';
  if (wpm > 155) cadenceClassification = 'RUSHING';
  if (wpm < 135 && elapsedSeconds > 10) cadenceClassification = 'HALTING_LETHARGIC';

  let pacingScore = 100;
  if (cadenceClassification === 'RUSHING') {
    pacingScore = Math.max(40, 100 - (wpm - 155) * 2);
  } else if (cadenceClassification === 'HALTING_LETHARGIC') {
    pacingScore = Math.max(40, 100 - (135 - wpm) * 2);
  }

  // 4. Conviction & Decisiveness
  const ownershipPhrasesDetected = OWNERSHIP_LEADERSHIP_PHRASES.filter(p => clean.includes(p));
  let convictionScore = 80 - (hedgesDetected.length * 15) + (ownershipPhrasesDetected.length * 10);
  convictionScore = Math.max(15, Math.min(100, convictionScore));

  // 5. The First 60 Seconds (Executive Thesis vs Chronological Recap)
  const chronologicalWordsDetected = CHRONOLOGICAL_RESUME_RECAP_CLUES.filter(clue => clean.includes(clue));
  const commercialThesisDetected = EXECUTIVE_THESIS_CLUES.some(clue => clean.includes(clue));
  const isChronologicalTrap = chronologicalWordsDetected.length > 0 && !commercialThesisDetected;

  let first60Score = 80;
  if (chronologicalWordsDetected.length > 0) first60Score -= 40;
  if (commercialThesisDetected) first60Score += 20;
  first60Score = Math.max(10, Math.min(100, first60Score));

  const overallExecutiveReadiness = Math.round(
    (thoughtScore * 0.25) +
    (Math.max(10, 100 - fillersPer100Words * 15) * 0.20) +
    (pacingScore * 0.20) +
    (convictionScore * 0.20) +
    (first60Score * 0.15)
  );

  let executiveRank = 'ASPIRING MANAGER';
  if (overallExecutiveReadiness >= 88) executiveRank = 'C-SUITE / VP READY';
  else if (overallExecutiveReadiness >= 75) executiveRank = 'SENIOR DIRECTOR';
  else if (overallExecutiveReadiness < 60) executiveRank = 'IN-THE-WEEDS';

  return {
    wordCount,
    fillerCount,
    detectedFillers,
    hedgesDetected,
    wpm,
    scorecard: {
      thoughtStructuring: {
        score: thoughtScore,
        wanderingDetected,
        crispClosingTakeawayPresent,
        prepComponents,
        feedback: wanderingDetected 
          ? "Conversational wandering detected at close. Conclude with a crisp, definitive takeaway sentence."
          : "Structured PREP flow maintained."
      },
      signalToNoise: {
        fillersPer100Words,
        snrGrade,
        totalFillerCount: fillerCount,
        detectedFillers,
        feedback: fillersPer100Words <= 1.0 
          ? "Elite executive signal-to-noise ratio."
          : `High verbal crutch density (${fillersPer100Words}/100w). Replace fillers with silent pauses.`
      },
      executiveCadence: {
        wpm,
        targetWpmRange: '135-155 WPM',
        inTargetZone: inCadenceTargetZone,
        pacingClassification: cadenceClassification,
        pacingScore,
        feedback: inCadenceTargetZone 
          ? "Optimal executive cadence (135–155 WPM)."
          : cadenceClassification === 'RUSHING'
          ? "Rushing (>155 WPM). Take deliberate 1.5s pauses before pivots."
          : "Cadence under 135 WPM. Project dynamic forward momentum."
      },
      convictionDecisiveness: {
        score: convictionScore,
        tentativeHedgesDetected: hedgesDetected,
        ownershipPhrasesDetected,
        hedgingCount: hedgesDetected.length,
        ownershipCount: ownershipPhrasesDetected.length,
        feedback: hedgesDetected.length > 0 
          ? `Flagged defensive hedging: "${hedgesDetected.join('", "')}". Speak with decisive ownership.`
          : "High conviction and decisive ownership."
      },
      theFirst60Seconds: {
        score: first60Score,
        verdict: isChronologicalTrap ? 'CHRONOLOGICAL_RECAP_TRAP' : 'EXECUTIVE_THESIS',
        chronologicalWordsDetected,
        commercialThesisDetected,
        feedback: isChronologicalTrap 
          ? `Avoid chronological resume recap ("${chronologicalWordsDetected[0]}"). Lead with commercial thesis.`
          : "Strong executive thesis."
      },
      overallExecutiveReadiness,
      executiveRank
    }
  };
}
