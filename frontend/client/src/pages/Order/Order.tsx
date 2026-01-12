import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, path } from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

interface OrderDetail {
  exportOrderDetailID: string
  exportOrderID: string
  productID: string
  productName: string
  exportPrice: number
  totalItems: number
  priceUnit: number
  imageUrl?: string
}

interface Order {
  exportOrderID: string
  userID: string
  fullName: string
  email: string
  phoneNumber: string
  address: string
  totalPrice: number
  createdAt: string
  status: OrderStatus
  orderDetails: OrderDetail[]
}

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search && window.location.pathname === '/order') {
      navigate('/order', { replace: true });
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    const payload = JSON.parse(atob(token.split('.')[1]))
    const userID = payload.sub

    fetch(`${API_URL}/export-orders/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Lỗi khi tải đơn hàng:', err)
        toast.error('Lỗi tải đơn hàng')
        setLoading(false)
      })
  }, [])

  return (
    <div className='bg-neutral-100 py-10'>
      <div className='container'>
        <h2 className='mb-6 text-2xl font-semibold text-orange'>Lịch sử đơn hàng</h2>

        {loading ? (
          <div className='text-center text-gray-500'>Đang tải dữ liệu...</div>
        ) : orders.length === 0 ? (
          <div className='text-center text-gray-500'>Bạn chưa có đơn hàng nào.</div>
        ) : (
          <div className='space-y-10'>
            {orders.map((order) => (
              <div key={order.exportOrderID} className='rounded-md border border-gray-200 bg-white p-6 shadow'>
                <div className="mb-4 flex flex-wrap justify-between gap-2 border-b pb-4 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Mã đơn:</span> {order.exportOrderID}
                  </div>
                  <div>
                    <span className="font-semibold">Ngày đặt:</span> {order.createdAt}
                  </div>
                  <div>
                    <span className="font-semibold">Người nhận:</span> {order.fullName}
                  </div>
                  <div>
                    <span className="font-semibold">SĐT:</span> {order.phoneNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {order.email}
                  </div>
                  <div>
                    <span className="font-semibold">Địa chỉ:</span> {order.address}
                  </div>
                  <div>
                    <span className="font-semibold">Trạng thái:</span>{' '}
                    <span
                        className={
                          order.status === 'PENDING'
                            ? 'text-yellow-600'
                            : order.status === 'CONFIRMED'
                              ? 'text-green-600'
                              : order.status === 'CANCELLED'
                                ? 'text-red-600'
                                : 'text-gray-600'
                        }
                      >
                      {order.status === 'PENDING'
                        ? 'Chờ xác nhận'
                        : order.status === 'CONFIRMED'
                          ? 'Đã xác nhận'
                          : 'Đã hủy'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.orderDetails.map((item) => (
                    <div key={item.exportOrderDetailID} className="flex items-center justify-between border-b pb-4">
                      <div className="flex flex-1 items-center">
                        <Link
                          to={`${path.home}${generateNameId({ name: item.productName, id: item.productID })}`}
                          className='h-20 w-20 flex-shrink-0'
                        >
                          <img
                            src={item.imageUrl || 'https://via.placeholder.com/80'}
                            alt={item.productName}
                            className='h-full w-full object-cover rounded'
                          />
                        </Link>
                        <div className='ml-4'>
                          <Link
                            to={`${path.home}${generateNameId({ name: item.productName, id: item.productID })}`}
                            className='line-clamp-2 text-sm font-medium text-gray-800 hover:text-orange'
                          >
                            {item.productName}
                          </Link>
                          <div className='text-xs text-gray-500'>Mã SP: {item.productID}</div>
                        </div>
                      </div>

                      <div className='w-48 text-right text-sm text-gray-700'>
                        <div>
                          {item.totalItems} x ₫{formatCurrency(item.exportPrice)}
                        </div>
                        <div className='font-semibold text-orange'>₫{formatCurrency(item.priceUnit)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-4 flex justify-end text-base font-semibold text-red-600'>
                  Tổng cộng: ₫{formatCurrency(order.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
