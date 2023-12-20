import { Redirect } from 'expo-router';

const isLoggedIn = false;

export default function RootScreen() {
  return isLoggedIn ? <Redirect href="/home/" /> : <Redirect href="/login" />;
}
