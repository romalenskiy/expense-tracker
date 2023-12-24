import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import { ReactQueryProvider } from '@api/QueryProvider';
import { AuthContextProvider, useAuthContext } from '@store/authContext';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const { isTryingInitLogin } = useAuthContext();

  useEffect(() => {
    if (!isTryingInitLogin) {
      SplashScreen.hideAsync();
    }
  }, [isTryingInitLogin]);

  if (isTryingInitLogin) {
    return null;
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <ReactQueryProvider>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </ReactQueryProvider>
    </>
  );
}
