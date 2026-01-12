import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutateChangePassword } from 'src/hooks/useMutateChangePassword';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/context/authContext';
import { path } from '../../constants/path';
import Button from 'src/components/button/Button';
import Input from 'src/components/Input/Input';
import { isAxiosUnprocessableEntityError } from 'src/utils/axiosError';
import { ErrorResponseApi } from 'src/types/util.type';

type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirm_password: string;
};

const changePasswordSchema = yup
  .object()
  .shape({
    oldPassword: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu hiện tại là bắt buộc'),
    newPassword: yup
      .string()
      .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
      .required('Mật khẩu mới là bắt buộc'),
    confirm_password: yup
      .string()
      .min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự')
      .required('Xác nhận mật khẩu là bắt buộc')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
  })
  .required();

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(changePasswordSchema)
  });

  const { mutate, isLoading, error: mutateError, data } = useMutateChangePassword();
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmitHandler: SubmitHandler<ChangePasswordFormValues> = (formData) => {
    if (!profile?.email) {
      setServerError('Email không tìm thấy. Vui lòng đăng nhập lại.');
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError('newPassword', {
        type: 'manual',
        message: 'Mật khẩu mới không được giống mật khẩu cũ'
      });
      return;
    }

    setServerError('');
    mutate({
      email: profile.email,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    });
  };

  useEffect(() => {
    // Handle API response format: {code, message, data, timestamp}
    if (data) {
      if (data.code === 200) {
        // Success
        setServerError('');
        reset();
        // Clear auth data
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile');
        // Force reload and redirect to login
        setTimeout(() => {
          window.location.href = `${window.location.origin}${path.login}`;
        }, 2000);
      } else if (data.code === 400 || data.code === 401) {
        // Bad request or unauthorized - likely old password wrong
        setServerError(data.message || 'Mật khẩu cũ không chính xác');
      }
    }

    // Handle axios errors
    if (isAxiosUnprocessableEntityError<ErrorResponseApi<ChangePasswordFormValues>>(mutateError)) {
      const formError = mutateError.response?.data.data;
      if (formError) {
        Object.keys(formError).forEach((property) => {
          setError(property as keyof ChangePasswordFormValues, {
            type: 'Server error',
            message: formError[property as keyof ChangePasswordFormValues]
          });
        });
      }
    } else if (mutateError) {
      setServerError('Lỗi server, vui lòng thử lại');
    }
  }, [mutateError, data, setError, reset, navigate]);

  if (!profile) {
    return (
      <div className='bg-blue-200 min-h-screen flex items-center justify-center'>
        <div className='bg-white p-10 rounded shadow-sm'>
          <p className='text-red-500'>Vui lòng đăng nhập trước</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-blue-200'>
      <title>Đổi mật khẩu | Shopee Clone</title>
      <meta name='description' content='Đổi mật khẩu tài khoản Shopee' />

      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            {isLoading && (
              <div className='rounded bg-white p-10 shadow-sm flex items-center justify-center'>
                <div className='text-lg'>Đang xử lý...</div>
              </div>
            )}
            {!isLoading && (
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className='rounded bg-white p-10 shadow-sm'
                noValidate
                autoComplete='off'
              >
                <div className='text-2xl mb-6'>Đổi mật khẩu</div>

                {/* Email Display */}
                <div className='mb-4'>
                  <label className='block text-sm text-gray-600 mb-2'>Email</label>
                  <input
                    type='email'
                    value={profile.email}
                    disabled
                    className='w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600'
                  />
                </div>

                {/* Old Password */}
                <Input
                  register={register}
                  name='oldPassword'
                  type='password'
                  className='mt-2'
                  placeholder='Mật khẩu hiện tại'
                  autoComplete='off'
                  errorMessage={errors.oldPassword?.message}
                />

                {/* New Password */}
                <Input
                  register={register}
                  name='newPassword'
                  type='password'
                  className='mt-2'
                  placeholder='Mật khẩu mới'
                  autoComplete='off'
                  errorMessage={errors.newPassword?.message}
                />

                {/* Confirm Password */}
                <Input
                  register={register}
                  name='confirm_password'
                  type='password'
                  className='mt-2'
                  placeholder='Nhập lại mật khẩu mới'
                  autoComplete='off'
                  errorMessage={errors.confirm_password?.message}
                />

                {/* Server Error */}
                {serverError && (
                  <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm'>
                    {serverError}
                  </div>
                )}

                {/* Success Message */}
                {data?.success && (
                  <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm'>
                    ✅ {data.message}
                  </div>
                )}

                {/* Buttons */}
                <div className='mt-6 flex gap-3'>
                  <button
                    type='reset'
                    className='flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
                  >
                    Làm mới
                  </button>
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    type='submit'
                    className='flex-1 flex items-center justify-center bg-blue-300 py-2 px-4 text-sm uppercase text-white hover:bg-blue-400 rounded'
                  >
                    Đổi mật khẩu
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
