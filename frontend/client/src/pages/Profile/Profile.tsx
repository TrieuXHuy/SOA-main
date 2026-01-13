import React, { useEffect, useState } from 'react'
import { API_URL, path } from 'src/constants/path'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type UserProfile = {
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  address: string
  customerTypeId: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<Omit<UserProfile, 'email' | 'customerTypeId'>>({
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload?.sub

    fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data: UserProfile) => {
        setUser(data)
        setFormData({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth,
          address: data.address
        })
      })
      .catch((err) => {
        toast.error('Lỗi khi lấy thông tin người dùng')
        console.error(err)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token')
    if (!token || !user) return

    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload?.sub

    const fullData: UserProfile = {
      ...user,
      ...formData // Ghi đè phần đã chỉnh sửa
    }

    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(fullData)
      })

      if (!res.ok) throw new Error()

      const updatedUser = await res.json()
      setUser(updatedUser)
      toast.success('Cập nhật thông tin thành công!')
    } catch (err) {
      toast.error('Lỗi khi cập nhật thông tin')
      console.error(err)
    }
  }

  if (!user) return null

  return (
    <div className='bg-gray-100 py-10'>
      <div className='container'>
        <div className='bg-white p-6 rounded shadow max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold mb-6 text-center text-orange uppercase'>Hồ sơ cá nhân</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700'>
            {/* Họ và tên */}
            <div>
              <label htmlFor='fullName' className='font-semibold text-gray-500 mb-1 block'>
                Họ và tên
              </label>
              <input
                id='fullName'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Nhập họ và tên'
                className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 focus:border-orange outline-none'
              />
            </div>

            {/* Email (Read only) */}
            <div>
              <label htmlFor='email' className='font-semibold text-gray-500 mb-1 block'>
                Địa chỉ Email
              </label>
              <input
                id='email'
                value={user.email}
                readOnly
                className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 text-gray-400 cursor-not-allowed'
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label htmlFor='phoneNumber' className='font-semibold text-gray-500 mb-1 block'>
                Số điện thoại
              </label>
              <input
                id='phoneNumber'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder='Nhập số điện thoại'
                className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 focus:border-orange outline-none'
              />
            </div>

            {/* Ngày sinh */}
            <div>
              <label htmlFor='dateOfBirth' className='font-semibold text-gray-500 mb-1 block'>
                Ngày sinh
              </label>
              <input
                id='dateOfBirth'
                name='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleChange}
                type='date'
                className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 focus:border-orange outline-none'
              />
            </div>

            {/* Địa chỉ */}
            <div className='md:col-span-2'>
              <label htmlFor='address' className='font-semibold text-gray-500 mb-1 block'>
                Địa chỉ liên hệ
              </label>
              <input
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Nhập địa chỉ của bạn'
                className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 focus:border-orange outline-none'
              />
            </div>

            {/* Loại khách hàng (Read only) */}
            <div>
              <label htmlFor='type' className='font-semibold text-gray-500 mb-1 block'>
                Hạng khách hàng
              </label>
              <input
                id='type'
                value={user.customerTypeId}
                readOnly
                className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 text-gray-400 cursor-not-allowed'
              />
            </div>
          </div>

          <div className='mt-8 flex gap-4 justify-center'>
            <button
              onClick={handleSubmit}
              className='bg-orange hover:bg-orange/90 text-white font-semibold px-10 py-2 rounded shadow transition-all'
            >
              Lưu thay đổi
            </button>
            {/* <button
              onClick={() => navigate(path.changePassword)}
              className='bg-gray-600 hover:bg-gray-700 text-white font-semibold px-10 py-2 rounded shadow transition-all'
            >
              Đổi mật khẩu
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile