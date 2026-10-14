import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { evaluationService } from '../services/evaluation/executiveEvaluationService';

export const apiRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Health & Liveness
  fastify.get('/health', async () => {
    return { status: 'ok', service: 'executive-voice-backend', timestamp: new Date().toISOString() };
  });

  // Evaluate Spoken Articulation
  fastify.post('/v1/evaluation/audit', async (request, reply) => {
    const body = request.body as {
      transcript: string;
      durationSeconds: number;
      frameworkUsed: any;
    };

    if (!body || !body.transcript) {
      return reply.code(400).send({ error: 'Missing transcript in request payload' });
    }

    const evaluation = evaluationService.evaluateDelivery({
      transcript: body.transcript,
      durationSeconds: body.durationSeconds || 60,
      frameworkUsed: body.frameworkUsed || 'PREP'
    });

    return reply.code(200).send(evaluation);
  });
};
