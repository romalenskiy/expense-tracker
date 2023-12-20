import { Colors } from '@ui/constants/colors';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.text_primary,
        contentStyle: {
          backgroundColor: Colors.primary700,
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />

      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}
