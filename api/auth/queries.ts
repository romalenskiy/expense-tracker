import { useMutation } from '@tanstack/react-query';

import { AuthController } from './controller';

enum AuthQueryKeys {}

export const useSignup = () =>
  useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      AuthController.get().signup(params),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      AuthController.get().login(params),
  });
