import { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Colors } from '../constants/colors';

export const LoadingOverlay: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.primary700,
  },
});