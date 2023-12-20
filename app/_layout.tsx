import 'react-native-gesture-handler';

import { ReactQueryProvider } from '@api/QueryProvider';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <ReactQueryProvider>
        <Slot />
      </ReactQueryProvider>
    </>
  );
}
