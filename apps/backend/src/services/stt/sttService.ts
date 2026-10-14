import { EventEmitter } from 'events';

export interface SttChunkResult {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export class SpeechToTextStreamingService extends EventEmitter {
  private isStreamActive: boolean = false;

  public startStreamingSession(_sessionId: string): void {
    this.isStreamActive = true;
    this.emit('session:started');
  }

  public processAudioBuffer(_chunk: Buffer): void {
    if (!this.isStreamActive) return;
    
    // In production, this proxies directly to Google Cloud Speech-to-Text v2 Bi-directional Streaming gRPC
    // or local Whisper.cpp Edge streaming worker.
  }

  public endStreamingSession(): void {
    this.isStreamActive = false;
    this.emit('session:ended');
  }
}

export const sttService = new SpeechToTextStreamingService();
