import { useSignup } from '@api/auth/queries';
import { LoadingOverlay } from '@ui/LoadingOverlay';
import { Alert } from 'react-native';

import { AuthMain } from './_components/AuthMain';

export default function SignupScreen() {
  const mutation = useSignup();

  if (mutation.isPending) {
    return <LoadingOverlay message="Creating user..." />;
  }

  if (mutation.isError) {
    Alert.alert('Authentication failed!', mutation.error.message);
  }

  return <AuthMain onSubmit={mutation.mutate} />;
}
