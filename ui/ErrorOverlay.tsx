import { Button } from '@ui/Button';
import { Colors } from '@ui/constants/colors';
import { FC, ReactNode } from 'react';
import { PressableProps, StyleSheet, Text, View } from 'react-native';

type Props = {
  message?: ReactNode;
  actionText?: string;
  onConfirm: PressableProps['onPress'];
};

export const ErrorOverlay: FC<Props> = ({
  message = 'Unknown error',
  actionText = 'Okay',
  onConfirm,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>{actionText}</Button>
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

  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.text_primary,
  },

  title: { fontSize: 20, fontWeight: 'bold' },
});
