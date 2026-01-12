const usersFields = {
  id: { type: 'id', label: 'ID' },

  firstName: { type: 'string', label: 'Tên' },

  lastName: { type: 'string', label: 'Họ' },

  phoneNumber: { type: 'string', label: 'Số điện thoại' },

  email: { type: 'string', label: 'Email' },

  role: {
    type: 'enum',
    label: 'Vai trò',

    options: [
      { value: 'admin', label: 'Quản trị viên' },

      { value: 'user', label: 'Người dùng' },
    ],
  },

  disabled: { type: 'boolean', label: 'Vô hiệu hóa' },

  avatar: { type: 'images', label: 'Ảnh đại diện' },

  password: { type: 'string', label: 'Mật khẩu' },

  emailVerified: { type: 'boolean', label: 'Email đã xác thực' },

  emailVerificationToken: { type: 'string', label: 'Mã xác thực email' },

  emailVerificationTokenExpiresAt: {
    type: 'datetime',
    label: 'Mã xác thực email hết hạn lúc',
  },

  passwordResetToken: { type: 'string', label: 'Mã đặt lại mật khẩu' },

  passwordResetTokenExpiresAt: {
    type: 'datetime',
    label: 'Mã đặt lại mật khẩu hết hạn lúc',
  },

  provider: { type: 'string', label: 'Nhà cung cấp' },
};

export default usersFields;