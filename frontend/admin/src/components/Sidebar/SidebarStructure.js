import React from 'react';
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Inventory2 as InventoryIcon,
  ListAlt as ListAltIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

const structure = [
  {
    id: 0,
    label: 'Bảng điều khiển',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 1,
    label: 'Thương mại điện tử',
    badge: 'Phân tích',
    badgeColor: 'success',
    link: '/app/ecommerce',
    icon: <ShoppingCartIcon />,
    children: [
      {
        label: 'Quản lý sản phẩm',
        link: '/app/ecommerce/management',
      },
      {
        label: 'Quản lý đơn hàng',
        link: '/app/ecommerce/orders',
      },
      {
        label: 'Quản lý giảm giá',
        link: '/app/ecommerce/discounts',
      },
      {
        label: 'Quản lý danh mục',
        link: '/app/product-type',
      },
    ],
  },
  {
    id: 3,
    label: 'Kho hàng',
    link: '/app/inventory',
    icon: <InventoryIcon />,
    children: [
      {
        label: 'Danh sách kho',
        link: '/app/inventory/list',
        icon: <ListAltIcon />,
      },
    ],
  },
  {
    id: 2,
    label: 'Người dùng',
    link: '/app/user',
    badge: 'Mới',
    badgeColor: 'secondary',
    icon: <PersonIcon />,
    children: [
      {
        label: 'Danh sách người dùng',
        link: '/app/users',
      },
      {
        label: 'Thêm người dùng',
        link: '/app/user/new',
      },
      {
        label: 'Sửa người dùng',
        link: '/app/user/edit',
      },
    ],
  },
];

export default structure;