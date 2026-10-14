import crypto from 'crypto';

export class SecurityService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor() {
    // 32-byte key derived from env or generated for local dev
    const rawKey = process.env.ENCRYPTION_MASTER_KEY || '0123456789abcdef0123456789abcdef';
    this.key = Buffer.from(rawKey.padEnd(32, '0').slice(0, 32));
  }

  /**
   * Encrypts raw audio buffer before persistence in Cloud Storage
   */
  public encryptAudioBuffer(audioBuffer: Buffer): { encryptedData: Buffer; iv: Buffer; authTag: Buffer } {
    const iv = crypto.randomBytes(12); // Standard 96-bit IV for GCM
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    const encryptedData = Buffer.concat([cipher.update(audioBuffer), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return { encryptedData, iv, authTag };
  }

  /**
   * Decrypts audio buffer for authorized playback
   */
  public decryptAudioBuffer(encryptedData: Buffer, iv: Buffer, authTag: Buffer): Buffer {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  }
}

export const securityService = new SecurityService();
