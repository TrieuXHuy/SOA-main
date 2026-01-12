import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { http } from 'src/utils/http';

type CartItemUpdate = {
  product_id: string;
  buy_count: number;
};

type MutationProps = {
  deleteIds?: string[];
  buyProducts?: CartItemUpdate[];
  updateProductQuantity?: CartItemUpdate;
};

const handleDeleteCartItems = async (deleteIds: string[]) => {
  const responses = await Promise.all(
    deleteIds.map((id) => http.delete(`/carts/${id}`))
  );
  return responses.map((res) => res.data);
};

const handleUpdateCartItem = async ({ product_id, buy_count }: CartItemUpdate) => {
  // Get userID from token
  const token = localStorage.getItem('access_token');
  let userId = '';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.sub;
    } catch {
      console.error('Không thể lấy userId từ token');
    }
  }
  
  const res = await http.put(`/carts/${product_id}`, { 
    userID: userId,
    quantity: buy_count 
  });
  return res.data;
};

const handleBuyCartItems = async (items: CartItemUpdate[]) => {
  const res = await http.post(`/carts/buy`, items);
  return res.data;
};

export const useMutateCart = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: async ({ deleteIds, buyProducts, updateProductQuantity }: MutationProps) => {
      const results = await Promise.all([
        ...(deleteIds?.length ? await handleDeleteCartItems(deleteIds) : []),
        buyProducts && handleBuyCartItems(buyProducts),
        updateProductQuantity && handleUpdateCartItem(updateProductQuantity)
      ]);
      return results.flat();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onSuccess: (response) => {
      const msg = response.filter((item) => item?.message);
      if (msg.length > 0) {
        toast.success(msg[0].message, { position: 'top-center', autoClose: 1000 });
      }
      console.log('response', response);
    },
    onError: (err) => {
      console.error('Mutation error', err);
    }
  });

  return { mutate, isLoading, isError, error, data };
};
