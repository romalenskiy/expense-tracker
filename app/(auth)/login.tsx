import { useLogin } from '@api/auth/queries';
import { LoadingOverlay } from '@ui/LoadingOverlay';
import { Alert } from 'react-native';

import { AuthMain } from './_components/AuthMain';

export default function LoginScreen() {
  const mutation = useLogin();

  if (mutation.isPending) {
    return <LoadingOverlay message="Logging in..." />;
  }

  if (mutation.isError) {
    Alert.alert('Authentication failed!', mutation.error.message);
  }

  return <AuthMain isLogin onSubmit={mutation.mutate} />;
}
