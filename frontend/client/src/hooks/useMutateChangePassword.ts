import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { http } from 'src/utils/http';

type ChangePasswordParams = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

type ApiResponse<T = any> = {
  code: number;
  message: string;
  data?: T;
  timestamp: string;
};

type UseMutateChangePasswordResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  mutate: UseMutateFunction<ApiResponse, Error, ChangePasswordParams, unknown>;
  data?: ApiResponse;
};

export const useMutateChangePassword = (): UseMutateChangePasswordResponse => {
  const { mutate, isLoading, isError, error, data } = useMutation<
    ApiResponse,
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
