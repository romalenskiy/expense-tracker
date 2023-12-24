import { useAuthContext } from '@store/authContext';
import { useMutation } from '@tanstack/react-query';

import { AuthController } from './controller';

export const useSignup = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      AuthController.get().signup(params),

    onSuccess: (data) => {
      login(data.idToken, data.uid);
      return data;
    },
  });
};

export const useLogin = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      AuthController.get().login(params),

    onSuccess: (data) => {
      login(data.idToken, data.uid);
      return data;
    },
  });
};
