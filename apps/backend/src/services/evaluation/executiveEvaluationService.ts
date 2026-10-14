import { 
  auditTranscript, 
  FILLER_WORDS, 
  WEAK_VERBAL_HEDGES 
} from '@executive-voice/audio-core';
import { 
  AudioDiagnosticMetrics, 
  GravitasRubricScores, 
  FrameworkType 
} from '@executive-voice/shared-types';

export interface EvaluationPayload {
  transcript: string;
  durationSeconds: number;
  frameworkUsed: FrameworkType;
}

export class ExecutiveEvaluationService {
  /**
   * Evaluates spoken answer against C-Suite and Boardroom standards
   */
  public evaluateDelivery(payload: EvaluationPayload): {
    metrics: AudioDiagnosticMetrics;
    rubric: GravitasRubricScores;
    actionableFeedback: string[];
    suggestedUpgrades: Array<{ original: string; upgraded: string }>;
  } {
    const metrics = auditTranscript(payload.transcript, payload.durationSeconds);
    const feedback: string[] = [];
    const upgrades: Array<{ original: string; upgraded: string }> = [];

    // Headline / BLUF Evaluation
    let headlineScore = metrics.blufDeliveredInFirst5Seconds ? 5 : 3;
    if (!metrics.blufDeliveredInFirst5Seconds) {
      feedback.push("Start with your conclusion (BLUF). State the business outcome in the first 5 seconds rather than providing background context first.");
    }

    // Brevity & Pacing Evaluation
    let brevityScore = 5;
    if (metrics.wpmClassification === 'RUSHING') {
      brevityScore = 3;
      feedback.push(`Speaking at ${metrics.wpm} WPM signals nervous urgency. Practice deliberate 2-second pauses to ground your pace between 120-140 WPM.`);
    } else if (metrics.wpmClassification === 'HALTING') {
      brevityScore = 3;
      feedback.push(`Speaking at ${metrics.wpm} WPM lacks dynamic forward momentum. Structure your points using PREP before vocalizing.`);
    }

    // Filler Words & Hesitation
    let resonanceScore = 5;
    if (metrics.fillerCount > 0) {
      resonanceScore = Math.max(1, 5 - metrics.fillerCount);
      feedback.push(`Detected ${metrics.fillerCount} filler sounds. Replace verbal fillers with deliberate, comfortable silence.`);
    }

    // Strategic Altitude / Manager Weeds check
    let altitudeScore = 4;
    const lower = payload.transcript.toLowerCase();
    const weedKeywords = ['jira', 'tickets', 'worked hard', 'put in hours', 'coding', 'my team did'];
    const weedDetected = weedKeywords.filter(k => lower.includes(k));
    if (weedDetected.length > 0) {
      altitudeScore = 2;
      feedback.push(`Avoid operational task phrasing ("${weedDetected.join(', ')}"). Frame effort around business leverage, revenue protection, and organizational velocity.`);
    }

    // Vocabulary replacements
    if (lower.includes('handled a lot')) {
      upgrades.push({ original: 'handled a lot of things', upgraded: 'orchestrated cross-functional execution' });
    }
    if (lower.includes('fixed the problem') || lower.includes('fixed the bug')) {
      upgrades.push({ original: 'fixed the problem', upgraded: 'remediated the root cause and instituted regression guardrails' });
    }
    if (lower.includes('i think maybe')) {
      upgrades.push({ original: 'I think maybe we should', upgraded: 'The operational data points directly toward' });
    }

    const compositeScore = Math.round(
      (headlineScore * 0.3 + brevityScore * 0.25 + resonanceScore * 0.25 + altitudeScore * 0.2) * 20
    );

    const rubric: GravitasRubricScores = {
      headlineClarity: headlineScore,
      brevityAndPacing: brevityScore,
      chestResonance: resonanceScore,
      strategicAltitude: altitudeScore,
      overallExecutiveScore: compositeScore
    };

    return {
      metrics,
      rubric,
      actionableFeedback: feedback,
      suggestedUpgrades: upgrades
    };
  }
}

export const evaluationService = new ExecutiveEvaluationService();
