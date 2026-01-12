import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';

export const useCart = () => {
  const token = localStorage.getItem('access_token');
  let userId = '';
  try {
    const payload = JSON.parse(atob(token!.split('.')[1]));
    userId = payload.sub;
  } catch {
    console.error('Không thể lấy userId từ token');
  }

  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => http.get(`/carts/${userId}`).then(res => res.data),
    enabled: !!userId
  });

  return { data, refetch, error, isError, isLoading };
};
