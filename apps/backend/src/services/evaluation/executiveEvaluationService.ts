import { 
  auditTranscript, 
  evaluateExecutiveArticulationEngine,
  FILLER_WORDS, 
  WEAK_VERBAL_HEDGES 
} from '@executive-voice/audio-core';
import { 
  AudioDiagnosticMetrics, 
  GravitasRubricScores, 
  FrameworkType,
  ExecutiveArticulationScorecard 
} from '@executive-voice/shared-types';

export interface EvaluationPayload {
  transcript: string;
  durationSeconds: number;
  frameworkUsed: FrameworkType;
  isOpeningQuestion?: boolean;
}

export class ExecutiveEvaluationService {
  /**
   * Evaluates spoken answer against Instruction 2: Executive Articulation Engine & Core Frameworks
   * 1. Thought Structuring (PREP)
   * 2. Signal-to-Noise Ratio (fillers / 100w)
   * 3. Executive Cadence (135–155 WPM & strategic pauses)
   * 4. Conviction & Decisiveness (Minimizing defensive hedging)
   * 5. The First 60 Seconds (Executive thesis vs chronological recap)
   */
  public evaluateDelivery(payload: EvaluationPayload): {
    metrics: AudioDiagnosticMetrics;
    scorecard: ExecutiveArticulationScorecard;
    rubric: GravitasRubricScores;
    actionableFeedback: string[];
    suggestedUpgrades: Array<{ original: string; upgraded: string }>;
  } {
    const scorecard = evaluateExecutiveArticulationEngine(
      payload.transcript, 
      payload.durationSeconds, 
      payload.isOpeningQuestion
    );

    const metrics = auditTranscript(payload.transcript, payload.durationSeconds);
    const feedback: string[] = [];
    const upgrades: Array<{ original: string; upgraded: string }> = [];

    // Synthesize feedback from the 5 capabilities
    feedback.push(scorecard.thoughtStructuring.feedback);
    feedback.push(scorecard.signalToNoise.feedback);
    feedback.push(scorecard.executiveCadence.feedback);
    feedback.push(scorecard.convictionDecisiveness.feedback);
    feedback.push(scorecard.theFirst60Seconds.feedback);

    // Operational manager weeds detection
    const lower = payload.transcript.toLowerCase();
    const weedKeywords = ['jira', 'tickets', 'worked hard', 'put in hours', 'coding', 'my team did'];
    const weedDetected = weedKeywords.filter(k => lower.includes(k));
    if (weedDetected.length > 0) {
      feedback.push(`Avoid operational task phrasing ("${weedDetected.join(', ')}"). Frame effort around business leverage, revenue protection, and organizational velocity.`);
    }

    // Vocabulary upgrades
    if (lower.includes('handled a lot')) {
      upgrades.push({ original: 'handled a lot of things', upgraded: 'orchestrated cross-functional execution' });
    }
    if (lower.includes('fixed the problem') || lower.includes('fixed the bug')) {
      upgrades.push({ original: 'fixed the problem', upgraded: 'remediated the root cause and instituted regression guardrails' });
    }
    if (lower.includes('i think maybe')) {
      upgrades.push({ original: 'I think maybe we should', upgraded: 'The operational data points directly toward' });
    }

    const rubric: GravitasRubricScores = {
      headlineClarity: scorecard.thoughtStructuring.prepComponents.pointIdentified ? 5 : 3,
      brevityAndPacing: scorecard.executiveCadence.inTargetZone ? 5 : 3,
      chestResonance: Math.max(1, Math.min(5, Math.round(metrics.chestResonanceScore / 20))),
      strategicAltitude: scorecard.theFirst60Seconds.commercialThesisDetected ? 5 : 3,
      overallExecutiveScore: scorecard.overallExecutiveReadiness
    };

    return {
      metrics,
      scorecard,
      rubric,
      actionableFeedback: feedback,
      suggestedUpgrades: upgrades
    };
  }
}

export const evaluationService = new ExecutiveEvaluationService();
