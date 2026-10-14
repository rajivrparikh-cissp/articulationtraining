import React from 'react';
import { View } from 'react-native';
import { DailyPromptScreen } from '../screens/DailyPromptScreen';

export const RootNavigator: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#070a12' }}>
      <DailyPromptScreen />
    </View>
  );
};
