import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency } from 'src/utils/helper';
import Button from 'src/components/button/Button';
import { API_URL, path } from 'src/constants/path';
import { toast } from 'react-toastify';

interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  customerTypeId: string;
}

interface DiscountOrder {
  discountOrderID: string;
  name: string;
  value: number;
  minOrderValue: number;
  maxOrderValue: number | null;
  maxDiscount: number;
  startDay: string;
  endDay: string;
  status: string;
}

interface DiscountCustomer {
  id: string;
  name: string;
  customerTypeId: string;
  discountValue: number;
  minDiscount: number;
  maxDiscount: number;
  status: string;
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { items: initialItems, totalPrice: initialTotal } = (location.state as any) || {
    items: [],
    totalPrice: 0
  };

  const [user, setUser] = useState<UserInfo | null>(null);
  const [items, setItems] = useState(initialItems);
  const [totalPrice, setTotalPrice] = useState(initialTotal);

  const [discountOrders, setDiscountOrders] = useState<DiscountOrder[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountOrder | null>(null);
  const [userSelectedDiscountID, setUserSelectedDiscountID] = useState<string | null>(null);

  const [customerDiscount, setCustomerDiscount] = useState<DiscountCustomer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MOMO'>('CASH');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      let userId = '';
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.sub;
      } catch {
        return;
      }

      try {
        const res = await fetch(`${API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUser({
          name: data.fullName || 'No name',
          email: data.email || 'No email',
          phoneNumber: data.phoneNumber || 'No phone',
          address: data.address || 'No address',
          customerTypeId: data.customerTypeId || 'Unknown'
        });
      } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const [orderRes, customerRes] = await Promise.all([
          fetch(`${API_URL}/discount-orders`),
          fetch(`${API_URL}/discount-customers`)
        ]);

        const orderData: DiscountOrder[] = await orderRes.json();
        const customerData: DiscountCustomer[] = await customerRes.json();

        setDiscountOrders(orderData);
        if (user) {
          const matched = customerData.find(
            (d) => d.customerTypeId === user.customerTypeId && d.status === 'Active'
          );
          if (matched) setCustomerDiscount(matched);
        }
      } catch (err) {
        console.error('Lỗi khi lấy mã giảm giá:', err);
      }
    };

    if (user) fetchDiscounts();
  }, [user]);

  useEffect(() => {
    if (userSelectedDiscountID) return;

    const applicableDiscounts = discountOrders
      .filter(
        (d) =>
          d.status === 'Active' &&
          totalPrice >= d.minOrderValue &&
          (typeof d.maxOrderValue !== 'number' || totalPrice <= d.maxOrderValue)
      )
      .sort((a, b) => b.value - a.value);

    setSelectedDiscount(applicableDiscounts[0] || null);
  }, [discountOrders, totalPrice, userSelectedDiscountID]);

  const orderDiscountAmount = selectedDiscount
    ? Math.min(totalPrice * selectedDiscount.value, selectedDiscount.maxDiscount)
    : 0;

  const customerDiscountAmount = customerDiscount
    ? Math.min(
      Math.max(totalPrice * customerDiscount.discountValue, customerDiscount.minDiscount),
      customerDiscount.maxDiscount
    )
    : 0;

  const finalTotal = totalPrice - orderDiscountAmount - customerDiscountAmount;

  const checkDiscountValid = (discount: DiscountOrder) => {
    return (
      discount.status === 'Active' &&
      totalPrice >= discount.minOrderValue &&
      (typeof discount.maxOrderValue !== 'number' || totalPrice <= discount.maxOrderValue)
    );
  };

  const handleSubmit = () => {
    if (paymentMethod === 'MOMO') {
      handleCashOrder();
      handleMomoPayment();
    } else {
      handleCashOrder();
    }
  };

  const handleMomoPayment = async () => {
    try {
      const res = await fetch(`${API_URL}/momo-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: finalTotal,
          orderInfo: 'Thanh toán đơn hàng tại Shopping'
        })
      });

      const data = await res.json();
      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        toast.error('Không tạo được liên kết thanh toán MoMo.');
      }
    } catch (error) {
      toast.error('Lỗi khi gọi API thanh toán.');
      console.error(error);
    }
  };

  const handleCashOrder = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast.error('Vui lòng đăng nhập để đặt hàng.');
      return;
    }

    let userId = '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.sub;
    } catch (err) {
      toast.error('Token không hợp lệ.');
      return;
    }

    try {
      const orderResponse = await fetch(`${API_URL}/export-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          totalPrice: finalTotal
        })
      });

      if (!orderResponse.ok) throw new Error('Không thể tạo đơn hàng');

      const orderData = await orderResponse.json();
      const exportOrderID = orderData.exportOrderID;

      await Promise.all(
        items.map((item: any) =>
          fetch(`${API_URL}/export-order-details`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              exportOrderID,
              productID: item.productID,
              productName: item.productName,
              imageUrl: item.imageUrl,
              exportPrice: item.exportPrice,
              totalItems: item.totalItems,
              priceUnit: item.exportPrice * item.totalItems
            })
          })
        )
      );

      toast.success('🛒 Đặt hàng thành công!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      });

      setTimeout(() => {
        navigate(path.order);
      }, 1500);
    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
      toast.error('Có lỗi xảy ra vui lòng thử lại sau', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  return (
    <div className='container py-10 space-y-8'>
      <h1 className='text-2xl font-semibold'>Checkout</h1>

      {/* Thông tin người dùng */}
      <div className="border rounded-lg p-6 shadow bg-gradient-to-r from-orange-50 to-orange-100">
        <h2 className="text-xl font-bold text-orange-700 mb-4">👤 Thông tin người dùng</h2>
        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm leading-6">
            <div><strong>Tên:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Số điện thoại:</strong> {user.phoneNumber}</div>
            <div><strong>Loại khách hàng:</strong> {user.customerTypeId}</div>
            <div className="sm:col-span-2"><strong>Địa chỉ:</strong> {user.address}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Đang tải...</div>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="border rounded-lg p-6 shadow bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-700">🛒 Danh sách sản phẩm</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2">Hình ảnh</th>
              <th scope="col" className="px-4 py-2">Tên sản phẩm</th>
              <th scope="col" className="px-4 py-2 text-center">Số lượng</th>
              <th scope="col" className="px-4 py-2 text-right">Giá gốc</th>
              <th scope="col" className="px-4 py-2 text-right">Giá khuyến mãi</th>
              <th scope="col" className="px-4 py-2 text-right">Tổng</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item: any) => (
              <tr key={item.productID} className="bg-white hover:shadow transition duration-150">
                <td className="px-4 py-2">
                  <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded"/>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900">{item.productName}</td>
                <td className="px-4 py-2 text-center">{item.totalItems}</td>
                <td className="px-4 py-2 text-right line-through text-gray-400">
                  ₫{formatCurrency(item.exportPrice)}
                </td>
                <td className="px-4 py-2 text-right text-orange font-semibold">
                  ₫{formatCurrency(item.exportPrice * (1 - item.sale))}
                </td>
                <td className="px-4 py-2 text-right font-bold text-orange">
                  ₫{formatCurrency(item.exportPrice * (1 - item.sale) * item.totalItems)}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Danh sách mã giảm giá theo đơn hàng */}
      <div className='border p-4 rounded shadow'>
        <h2 className='text-lg font-semibold mb-2'>Mã giảm giá theo đơn hàng</h2>
        <div className='space-y-2'>
          {discountOrders.map((discount) => {
            const isValid = checkDiscountValid(discount);
            const isSelected = selectedDiscount?.discountOrderID === discount.discountOrderID;
            return (
              <label
                key={discount.discountOrderID}
                className={`flex items-start gap-3 p-3 rounded border cursor-pointer ${
                  isSelected
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : isValid
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border-gray-200 text-gray-400 line-through cursor-not-allowed'
                }`}
              >
                <input
                  type='radio'
                  name='voucher'
                  className='mt-1'
                  disabled={!isValid}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedDiscount(discount);
                    setUserSelectedDiscountID(discount.discountOrderID);
                  }}
                />
                <div>
                  <div className='font-semibold'>{discount.name}</div>
                  <div className='text-sm'>
                    Giảm {Number((discount.value * 100).toFixed(0))}% tối đa
                    ₫{formatCurrency(discount.maxDiscount)}<br/>
                    Đơn từ ₫{formatCurrency(discount.minOrderValue)}
                    {discount.maxOrderValue && ` đến ₫${formatCurrency(discount.maxOrderValue)}`}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Thông tin giảm theo loại khách hàng */}
      {customerDiscount && (
        <div className='border p-4 rounded shadow bg-blue-50 text-blue-800'>
          <h2 className='text-lg font-semibold mb-2'>Ưu đãi khách hàng</h2>
          <div className='text-sm'>
            ✅ <strong>{customerDiscount.name}</strong><br/>
            Giảm {Number((customerDiscount.discountValue * 100).toFixed(0))}% (
            từ ₫{formatCurrency(customerDiscount.minDiscount)} đến ₫{formatCurrency(customerDiscount.maxDiscount)})
          </div>
        </div>
      )}

      {/* Tổng thanh toán */}
      <div className='border p-4 rounded shadow bg-white'>
        <div className='flex justify-between mb-2'>
          <span>Tạm tính:</span>
          <span>₫{formatCurrency(totalPrice)}</span>
        </div>
        <div className='flex justify-between mb-2 text-green-700'>
          <span>Giảm giá đơn hàng:</span>
          <span>-₫{formatCurrency(orderDiscountAmount)}</span>
        </div>
        {customerDiscount && (
          <div className='flex justify-between mb-2 text-blue-700'>
            <span>Giảm giá khách hàng:</span>
            <span>-₫{formatCurrency(customerDiscountAmount)}</span>
          </div>
        )}
        <div className='flex justify-between font-bold text-lg text-orange'>
          <span>Thành tiền:</span>
          <span>₫{formatCurrency(finalTotal)}</span>
        </div>
        {/* Phương thức thanh toán */}
        <div className='border p-4 rounded shadow bg-white'>
          <h2 className='text-lg font-semibold mb-2'>Phương thức thanh toán</h2>
          <label className='flex items-center gap-3 mb-2'>
            <input
              type='radio'
              name='paymentMethod'
              value='CASH'
              checked={paymentMethod === 'CASH'}
              onChange={() => setPaymentMethod('CASH')}
            />
            Thanh toán khi nhận hàng (Tiền mặt)
          </label>
          <label className='flex items-center gap-3'>
            <input
              type='radio'
              name='paymentMethod'
              value='MOMO'
              checked={paymentMethod === 'MOMO'}
              onChange={() => setPaymentMethod('MOMO')}
            />
            Thanh toán bằng MoMo
          </label>
        </div>

        {/* Nút đặt hàng */}
        <div className='mt-6'>
          <Button
            className='w-full bg-orange text-white hover:bg-orange/90'
            onClick={handleSubmit}
          >
            Xác nhận đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
