import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { apiRoutes } from './api/routes';
import { sttService } from './services/stt/sttService';

const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
  }
});

async function main() {
  await server.register(cors, {
    origin: true,
    credentials: true
  });

  await server.register(websocket);

  // Streaming WebSocket Endpoint for Real-Time Audio
  server.register(async function (fastify) {
    fastify.get('/v1/audio/stream', { websocket: true }, (socket, req) => {
      server.log.info({ ip: req.ip }, 'New client connected to streaming audio websocket');
      
      const sessionId = Math.random().toString(36).substring(7);
      sttService.startStreamingSession(sessionId);

      socket.on('message', (message: Buffer) => {
        sttService.processAudioBuffer(message);
      });

      socket.on('close', () => {
        sttService.endStreamingSession();
        server.log.info({ sessionId }, 'Streaming audio socket disconnected');
      });
    });
  });

  await server.register(apiRoutes);

  const port = Number(process.env.PORT) || 4000;
  await server.listen({ port, host: '0.0.0.0' });
  console.log(`🎙️ ExecutiveVoice Backend is listening on http://0.0.0.0:${port}`);
}

main().catch((err) => {
  server.log.error(err);
  process.exit(1);
});
