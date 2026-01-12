import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { apiEndpoints } from '../constants/path';
import { AuthResponse } from 'src/types/auth.type';
import { http } from 'src/utils/http';

type UserRegisterParams = {
  email: string;
  password: string;
};

type ApiResponse<T> = {
  code: number;
  message: string;
  data?: T;
  timestamp: string;
};

type UserRegisterResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  mutate: UseMutateFunction<ApiResponse<AuthResponse>, Error, UserRegisterParams, unknown>;
  data?: ApiResponse<AuthResponse>;
};

export const useMutateUserRegister = (): UserRegisterResponse => {
  const { mutate, isLoading, isError, error, data } = useMutation<
    ApiResponse<AuthResponse>,
    Error,
    UserRegisterParams
  >({
    mutationFn: async (userInfo: UserRegisterParams) => {
      // Prepare payload with all required fields
      const payload = {
        userId: `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique userId
        fullName: userInfo.email.split('@')[0], // Use email prefix as fullName
        email: userInfo.email,
        password: userInfo.password,
        role: 'customer'
      };

      console.log('Registering with payload:', payload);
      const res = await http.post(apiEndpoints.register, payload);
      return res.data;
    },
    onSuccess: (response) => {
      console.log('Register success', response);
    },
    onError: (err) => {
      console.log('Register error', err);
    }
  });
  return { mutate, isLoading, isError, error, data };
};
