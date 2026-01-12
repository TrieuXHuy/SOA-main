import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { http } from 'src/utils/http';

type ChangePasswordParams = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

type ChangePasswordResponse = {
  success: boolean;
  message: string;
};

type UseMutateChangePasswordResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  mutate: UseMutateFunction<ChangePasswordResponse, Error, ChangePasswordParams, unknown>;
  data?: ChangePasswordResponse;
};

export const useMutateChangePassword = (): UseMutateChangePasswordResponse => {
  const { mutate, isLoading, isError, error, data } = useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordParams
  >({
    mutationFn: async (params: ChangePasswordParams) => {
      const res = await http.post('/change-password', params);
      return res.data;
    },
    onSuccess: (response) => {
      console.log('Change password success', response);
    },
    onError: (err) => {
      console.log('Change password error', err);
    }
  });
  return { mutate, isLoading, isError, error, data };
};
