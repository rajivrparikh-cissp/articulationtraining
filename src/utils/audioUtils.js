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
        // Deep resonant tone (220 Hz -> 440 Hz)
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'phase') {
        // Double ding for phase transition
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        osc.start(now);
        osc.stop(now + 1.0);
      } else if (type === 'success') {
        // Arpeggio chord
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

// Filler Words Detector
export const FILLER_WORDS_LIST = [
  'um', 'uh', 'er', 'ah', 'like', 'basically', 'actually', 'literally',
  'sort of', 'kind of', 'you know', 'i mean', 'right', 'honestly'
];

export const WEAK_HEDGES = [
  'i think maybe', 'i feel like', 'in my humble opinion',
  'i could be wrong', 'does that make sense', 'just wanted to',
  'hopefully', 'sort of', 'kind of'
];

export function analyzeTranscript(text) {
  if (!text || typeof text !== 'string') {
    return {
      wordCount: 0,
      fillerCount: 0,
      detectedFillers: {},
      hedgesDetected: [],
      wpm: 0,
      blufDetected: false
    };
  }

  const clean = text.toLowerCase();
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

  return {
    wordCount,
    fillerCount,
    detectedFillers,
    hedgesDetected
  };
}
