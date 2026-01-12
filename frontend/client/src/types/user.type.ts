export type Role = 'user' | 'admin';

export interface User {
  userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  role?: Role;
  dateOfBirth?: string;
  customerTypeId?: string;
}
