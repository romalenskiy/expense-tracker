import { useAuthContext } from '@store/authContext';
import { Colors } from '@ui/constants/colors';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

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
