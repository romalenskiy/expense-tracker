import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen name="home" options={{ headerShown: false }} />

        <Stack.Screen
          name="manage-expense/[id]"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </>
  );
}
