import { Colors } from '@ui/constants/colors';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Props = { message?: string };

export const LoadingOverlay: FC<Props> = ({ message }) => {
  return (
    <View style={styles.container}>
      {!!message && <Text style={styles.message}>{message}</Text>}
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.primary700,
  },

  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
