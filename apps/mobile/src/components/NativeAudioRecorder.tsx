import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface NativeAudioRecorderProps {
  onRecordingComplete: (uri: string, durationSeconds: number) => void;
}

export const NativeAudioRecorder: React.FC<NativeAudioRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const toggleRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setSeconds(0);
    } else {
      setIsRecording(false);
      onRecordingComplete('file:///simulated/cache/recording.m4a', seconds);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
      </Text>
      
      <TouchableOpacity
        onPress={toggleRecording}
        style={[styles.recordButton, isRecording && styles.recordButtonActive]}
        accessibilityLabel={isRecording ? "Stop Articulation Recording" : "Start Articulation Recording"}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Stop & Evaluate" : "Record 90s Drill"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 16,
    marginVertical: 12
  },
  timerText: {
    fontSize: 32,
    fontFamily: 'monospace',
    color: '#f8fafc',
    marginBottom: 16,
    fontWeight: 'bold'
  },
  recordButton: {
    backgroundColor: '#f59e0b',
    minHeight: 52,
    minWidth: 200,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  recordButtonActive: {
    backgroundColor: '#ef4444'
  },
  buttonText: {
    color: '#020617',
    fontWeight: 'bold',
    fontSize: 16
  }
});
