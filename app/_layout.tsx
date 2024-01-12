import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import { ReactQueryProvider } from '@api/QueryProvider';
import { AuthContextProvider, useAuthContext } from '@store/authContext';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBarStyle, setStatusBarStyle } from 'expo-status-bar';
import { useEffect, useLayoutEffect } from 'react';
import { AppState } from 'react-native';

const statusBarStyle: StatusBarStyle = 'light';

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const { isTryingInitLogin } = useAuthContext();

  useLayoutEffect(() => {
    setStatusBarStyle(statusBarStyle);
  }); // No deps intentionally

  useEffect(() => {
    const sub = AppState.addEventListener('change', () => {
      setStatusBarStyle(statusBarStyle);
    });

    return () => sub.remove();
  }, []);

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
    <ReactQueryProvider>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </ReactQueryProvider>
  );
}
