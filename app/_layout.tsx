import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '../constants/colors';
import { StoreContextProvider } from '../store/store';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <StoreContextProvider>
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
      </StoreContextProvider>
    </>
  );
}
