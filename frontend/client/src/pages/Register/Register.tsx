import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, inputSchema } from 'src/utils/inputSchema';
import { useMutateUserRegister } from 'src/hooks/useMutateUserRegister';
import { isAxiosUnprocessableEntityError } from 'src/utils/axiosError';
import { ErrorResponseApi } from 'src/types/util.type';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/context/authContext';
import { path } from '../../constants/path';

import Button from 'src/components/button/Button';
import Input from 'src/components/Input/Input';

const registerSchema = inputSchema.pick(['email', 'password', 'confirm_password']);

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema)
  });

  const { mutate: mutateUser, error: mutateUserRegisterError, data, isLoading } = useMutateUserRegister();

  const { setIsAuthenticated, setProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    mutateUser({ email: data.email, password: data.password });
  };

  useEffect(() => {
    // Handle API response format: {code, message, data, timestamp}
    if (data && !mutateUserRegisterError && !isLoading) {
      if (data.code === 200 || data.code === 201) {
        console.log('Registration successful, redirecting to login');
        navigate(path.login);
      } else if (data.code === 409) {
        // Email already exists
        setError('email', {
          type: 'Server error',
          message: data.message || 'Email này đã được đăng ký'
        });
      } else if (data.code === 400) {
        // Bad request - show as general error
        setError('email', {
          type: 'Server error',
          message: data.message || 'Thông tin không hợp lệ'
        });
      }
    }

    // Handle axios errors
    if (
      isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormValues, 'confirm_password'>>>(mutateUserRegisterError)
    ) {
      const formError = mutateUserRegisterError.response?.data.data;

      if (formError) {
        Object.keys(formError).forEach((property) => {
          setError(property as keyof Omit<FormValues, 'confirm_password'>, {
            type: 'Server error',
            message: formError[property as keyof Omit<FormValues, 'confirm_password'>]
          });
        });
      }
    }
  }, [data, mutateUserRegisterError, isLoading, navigate, setError]);

  return (
    <div className='bg-blue-200'>
      <title>Đăng ký | Shopee Clone</title>
      <meta name='description' content='Đăng ký tài khoản Shopee website' />

      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            {isLoading && (
              <div className='rounded bg-white p-10 shadow-sm flex items-center justify-center'>
                <div className='text-lg'>Đang xử lý...</div>
              </div>
            )}
            {!isLoading && (
              <form onSubmit={handleSubmit(onSubmitHandler)} className='rounded bg-white p-10 shadow-sm' noValidate autoComplete='off'>
                <div className='text-2xl'>Đăng ký</div>
                
                <Input
                  register={register}
                  name='email'
                  type='email'
                  className='mt-8'
                  placeholder='Email'
                  autoComplete='off'
                  errorMessage={errors.email?.message}
                />
                
                <Input
                  register={register}
                  name='password'
                  type='password'
                  className='mt-2'
                  placeholder='Mật khẩu'
                  autoComplete='off'
                  errorMessage={errors.password?.message}
                />

                <Input
                  register={register}
                  name='confirm_password'
                  type='password'
                  className='mt-2'
                  placeholder='Nhập lại mật khẩu'
                  autoComplete='off'
                  errorMessage={errors.confirm_password?.message}
                />
                
                <div className='mt-2'>
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    type='submit'
                    className='flex w-full items-center justify-center bg-blue-300 py-4 px-2 text-sm uppercase text-white hover:bg-blue-400'
                  >
                    Đăng ký
                  </Button>
                </div>
                
                <div className='mt-8 flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='ml-1 text-red-400' to={path.login}>
                    Đăng nhập
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;