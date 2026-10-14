import { useState } from 'react';

export function useAudioUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadSessionAudio = async (localAudioUri: string, sessionId: string) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('sessionId', sessionId);
      formData.append('audioFile', {
        uri: localAudioUri,
        type: 'audio/m4a',
        name: `session_${sessionId}.m4a`
      } as any);

      // In production, posts to backend endpoint with background retry
      console.info('Simulated native background audio upload for session:', sessionId);
      setIsUploading(false);
      return { success: true };
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
      setIsUploading(false);
      return { success: false, error: err.message };
    }
  };

  return { uploadSessionAudio, isUploading, uploadError };
}
