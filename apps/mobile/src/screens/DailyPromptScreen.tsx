import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeAudioRecorder } from '../components/NativeAudioRecorder';

export const DailyPromptScreen: React.FC = () => {
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const handleComplete = (_uri: string, durationSeconds: number) => {
    setLastFeedback(`Recorded ${durationSeconds} seconds. Target WPM: 135. Chest resonance optimal.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>DAY 1 OF 28 • 9 MINUTES A DAY</Text>
      <Text style={styles.title}>The "Tell Me About Yourself" Executive Anchor</Text>
      <Text style={styles.tagline}>
        "Resume and certificates get you in the room. Voice and articulation get you the job."
      </Text>

      <View style={styles.promptCard}>
        <Text style={styles.cardHeader}>TODAY'S PROMPT (90 SECONDS)</Text>
        <Text style={styles.promptText}>
          Deliver your non-generic Executive Anchor: Commercial Identity (20s) → 2 Milestone Multipliers (40s) → Forward Alignment (30s).
        </Text>
      </View>

      <NativeAudioRecorder onRecordingComplete={handleComplete} />

      {lastFeedback && (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>{lastFeedback}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070a12'
  },
  content: {
    padding: 20
  },
  badge: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 6
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6
  },
  tagline: {
    color: '#94a3b8',
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 20
  },
  promptCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 16
  },
  cardHeader: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6
  },
  promptText: {
    color: '#e2e8f0',
    fontSize: 14,
    lineHeight: 22
  },
  feedbackCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 12
  },
  feedbackText: {
    color: '#10b981',
    fontSize: 13
  }
});
