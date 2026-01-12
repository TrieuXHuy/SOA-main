import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutateUserLogin } from 'src/hooks/useMutateUserLogin';
import { LoginFormValues, loginInputSchema } from 'src/utils/inputSchema';
import { isAxiosUnprocessableEntityError } from 'src/utils/axiosError';
import { ErrorResponseApi } from 'src/types/util.type';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/context/authContext';
import { path } from '../../constants/path';

import Button from 'src/components/button/Button';
import Input from 'src/components/Input/Input';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginInputSchema)
  });

  const { mutate: mutateUser, error: mutateUserLoginError, data, isLoading } = useMutateUserLogin();
  const { setIsAuthenticated, setProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmitHandler: SubmitHandler<LoginFormValues> = (data) => {
    setServerError('');
    mutateUser({ email: data.email, password: data.password });
  };

  useEffect(() => {
    // Handle response format: {code, message, data, timestamp}
    if (data) {
      if (data.code === 200 && data.data?.user) {
        setIsAuthenticated(true);
        setProfile(data.data.user);
        navigate(path.home);
      } else if (data.code === 401) {
        setServerError(data.message || 'Email hoặc mật khẩu không chính xác');
      } else if (data.code >= 400) {
        setServerError(data.message || 'Có lỗi xảy ra, vui lòng thử lại');
      }
    }

    // Handle axios errors
    if (mutateUserLoginError) {
      const error = mutateUserLoginError as any;
      let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Email hoặc mật khẩu không chính xác';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Dữ liệu không hợp lệ';
      } else if (error.response?.status === 500) {
        errorMessage = 'Lỗi máy chủ. Vui lòng thử lại sau';
      }

      setServerError(errorMessage);
    }

    // Handle form validation errors
    if (isAxiosUnprocessableEntityError<ErrorResponseApi<LoginFormValues>>(mutateUserLoginError)) {
      const formError = mutateUserLoginError.response?.data.data;

      if (formError) {
        Object.keys(formError).forEach((property) => {
          setError(property as keyof LoginFormValues, {
            type: 'Server error',
            message: formError[property as keyof LoginFormValues]
          });
        });
      }
    }
  }, [data, mutateUserLoginError, navigate, setError, setIsAuthenticated, setProfile]);

  return (
    <div className='bg-blue-200'>
      {/* Cập nhật tiêu đề trang */}
      <title>Đăng nhập | Shopee Clone</title>
      <meta name='description' content='Đăng nhập vào hệ thống Shopee' />

      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='rounded bg-white p-10 shadow-sm' noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              
              {/* Server Error */}
              {serverError && (
                <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm'>
                  ❌ {serverError}
                </div>
              )}
              
              {/* Input Email */}
              <Input
                register={register}
                name='email'
                type='email'
                className='mt-8'
                placeholder='Email'
                autoComplete='on'
                errorMessage={errors.email?.message}
              />
              
              {/* Input Password */}
              <Input
                register={register}
                name='password'
                type='password'
                className='mt-2'
                placeholder='Mật khẩu'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              
              <div className='mt-3'>
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type='submit'
                  className='flex w-full items-center justify-center bg-blue-300 py-4 px-2 text-sm uppercase text-white hover:bg-blue-400'
                >
                  Đăng nhập
                </Button>
              </div>
              
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='ml-1 text-red-400' to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;