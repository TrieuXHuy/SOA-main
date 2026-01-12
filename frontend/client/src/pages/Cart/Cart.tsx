import { produce } from 'immer';
import { keyBy } from 'lodash';
import React, { useContext, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import QuantityController from 'src/components/QuantityController/QuantityController';
import Button from 'src/components/button/Button';
import { path } from 'src/constants/path';
import { formatCurrency, generateNameId } from 'src/utils/helper';
import noproduct from 'src/assets/images/no-product.png';
import { AuthContext } from 'src/context/authContext';
import { useCart } from 'src/hooks/useCart';
import { useMutateCart } from 'src/hooks/useMutateCart';
import { CartItem, ExtendedCartItem } from 'src/types/cart.type';
import { rateSale } from 'src/types/util.type';

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AuthContext);
  const { data: cartItems } = useCart();

  const { mutate, isLoading } = useMutateCart();

  const location = useLocation();
  const choosenCartItemId = (location.state as { cartItemId: string } | null)?.cartItemId;

  const isAllChecked = useMemo(() => extendedPurchases.every((item) => item.checked), [extendedPurchases]);
  const checkedItems = useMemo(() => extendedPurchases.filter((item) => item.checked), [extendedPurchases]);
  const checkedItemsCount = checkedItems.length;
  const totalCheckedPrice = useMemo(
    () =>
      checkedItems.reduce((result, current) => {
        const discountedPrice = current.exportPrice * (1 - current.sale);
        return result + discountedPrice * current.totalItems;
      }, 0),
    [checkedItems]
  );

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const prevMap = keyBy(prev, 'cartItemID');
      return (
        cartItems?.map((item: CartItem) => {
          const isChoosen = choosenCartItemId === item.cartItemID;
          return {
            ...item,
            disabled: false,
            checked: isChoosen || Boolean(prevMap[item.cartItemID]?.checked)
          } as ExtendedCartItem;
        }) || []
      );
    });
  }, [cartItems, choosenCartItemId, setExtendedPurchases]);

  useEffect(() => {
    return () => {
      history.replaceState(null, '');
    };
  }, []);

  const handleCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[index].checked = event.target.checked;
      })
    );
  };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked
      }))
    );
  };

  const handleTypeQuantity = (index: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[index].totalItems = value;
      })
    );
  };

  const handleQuantity = (index: number, value: number, enable: boolean) => {
    if (enable) {
      const item = extendedPurchases[index];
      setExtendedPurchases(
        produce((draft) => {
          draft[index].disabled = true;
        })
      );
      mutate({ updateProductQuantity: { product_id: item.productID, buy_count: value } });
    }
  };

  const handleDelete = (index: number) => () => {
    const itemId = extendedPurchases[index].cartItemID;
    mutate({ deleteIds: [itemId] });
  };

  const handleDeleteManyItems = () => {
    const ids = checkedItems.map((item) => item.cartItemID);
    mutate({ deleteIds: ids });
  };

  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    if (checkedItems.length === 0) return;

    navigate(path.checkout, {
      state: {
        items: checkedItems,
        totalPrice: totalCheckedPrice
      }
    });
  };

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                {/* Header Table */}
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>

                {/* List Items */}
                <div className='my-3 rounded-sm bg-white p-5 shadow'>
                  {extendedPurchases.map((item, index) => (
                    <div
                      key={item.cartItemID}
                      className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                    >
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orange'
                              checked={item.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link
                                className='h-20 w-20 flex-shrink-0'
                                to={`${path.home}${generateNameId({ name: item.productName, id: item.productID })}`}
                              >
                                <img alt={item.productName} src={item.imageUrl} />
                              </Link>
                              <div className='flex-grow px-2 pt-1 pb-2'>
                                <Link
                                  to={`${path.home}${generateNameId({ name: item.productName, id: item.productID })}`}
                                  className='text-left line-clamp-2'
                                >
                                  {item.productName}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2 text-left'>
                            <div className='text-gray-500 line-through'>₫{formatCurrency(item.exportPrice)}</div>
                            <div className='text-orange font-medium'>
                              ₫{formatCurrency(item.exportPrice * (1 - item.sale))}
                            </div>
                            <div className='mt-1 text-xs font-semibold uppercase text-white bg-orange inline-block px-1 py-[1px] rounded-sm'>
                              Giảm {rateSale(item.exportPrice, item.exportPrice * (1 - item.sale))}
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              max={100}
                              value={item.totalItems}
                              classNameWrapper='flex items-center'
                              onIncrease={(value) => handleQuantity(index, value, value <= 100)}
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onType={handleTypeQuantity(index)}
                              onFocusOut={(value) => handleQuantity(index, value, value >= 1 && value <= 100)}
                              disabled={item.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>
                              ₫{formatCurrency(item.exportPrice * (1 - item.sale) * item.totalItems)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              onClick={handleDelete(index)}
                              className='bg-none text-black transition-colors hover:text-orange'
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Toolbar */}
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button className='mx-3 border-none bg-none hover:text-orange' onClick={handleDeleteManyItems}>
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ({checkedItemsCount} sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPrice)}</div>
                  </div>
                </div>
                <Button
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                  onClick={handleGoToCheckout}
                  disabled={isLoading}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Empty Cart State */
          <div className='text-center'>
            <img src={noproduct} alt='giỏ hàng trống' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2 uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua sắm ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}