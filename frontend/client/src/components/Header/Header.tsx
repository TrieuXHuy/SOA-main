import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/context/authContext';
import useSearchProduct from 'src/hooks/useSearchProduct';
import Navbar from '../Navbar/Navbar';
import Popover from '../Popover/Popover';
import { path } from 'src/constants/path';
import { formatCurrency } from 'src/utils/helper';
import noproduct from '../../assets/images/no-product.png';
import { useCart } from 'src/hooks/useCart';
import { CartItem } from 'src/types/cart.type';

const MAX_PURCHASES = 5;

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const { onSubmitSearch, register } = useSearchProduct();

  const { data: cartItems } = useCart();

  return (
    <div className='bg-blue-300 pb-5 pt-2 text-white'>
      <div className='container'>
        <Navbar />
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to='/' className='col-span-2 flex items-center gap-2'>
            <svg width='50px' height='50px' viewBox='-0.5 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z'
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z'
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94'
                stroke='#ffffff'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-xl font-semibold text-white'>Mua sắm</span>
          </Link>

          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                placeholder='Tìm kiếm sản phẩm, thương hiệu và cửa hàng...'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-blue-300 py-2 px-6 text-white hover:bg-blue-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className='col-span-1 justify-self-end'>
            <div>
              <Popover
                renderPopover={
                  <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                    {cartItems && cartItems.length > 0 ? (
                      <div className='p-2'>
                        <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                        <div className='mt-5'>
                          {isAuthenticated &&
                            cartItems.slice(0, MAX_PURCHASES).map((item: CartItem) => (
                              <div className='mt-2 flex py-2 hover:bg-gray-100' key={item.cartItemID}>
                                <div className='flex-shrink-0'>
                                  <img src={item.imageUrl} alt={item.productName} className='h-11 w-11 object-cover' />
                                </div>
                                <div className='ml-2 flex-grow overflow-hidden'>
                                  <div className='truncate'>{item.productName}</div>
                                </div>
                                <div className='ml-2 flex-shrink-0'>
                                  <span className='text-orange'>₫{formatCurrency(item.exportPrice)}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className='mt-6 flex items-center justify-between'>
                          <div className='text-xs capitalize text-gray-500'>
                            {cartItems.length > MAX_PURCHASES ? cartItems.length - MAX_PURCHASES : ''} Sản phẩm khác trong giỏ hàng
                          </div>
                          <Link
                            to={path.cart}
                            className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                          >
                            Xem giỏ hàng
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                        <img src={noproduct} alt='chưa có sản phẩm' className='h-24 w-24' />
                        <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                      </div>
                    )}
                  </div>
                }
              >
                <Link to={path.cart} className='relative'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-8 w-8'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  {cartItems && cartItems.length > 0 && (
                    <span className='absolute top-[-5px] left-[17px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange'>
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}