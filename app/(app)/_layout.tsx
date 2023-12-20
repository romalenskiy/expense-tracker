import { Colors } from '@ui/constants/colors';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.text_primary,
        contentStyle: {
          backgroundColor: Colors.primary800,
        },
      }}
    >
      <Stack.Screen name="home" options={{ headerShown: false }} />

      <Stack.Screen
        name="manage-expense/index"
        options={{ presentation: 'modal', title: 'Add Expense' }}
      />

      <Stack.Screen
        name="manage-expense/[id]"
        options={{ presentation: 'modal', title: 'Edit Expense' }}
      />
    </Stack>
  );
}
