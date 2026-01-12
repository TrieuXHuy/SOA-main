import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductList from './pages/ProductList/ProductList';
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout';
import MainLayout from './layouts/MainLayout/MainLayout';
import Profile from './pages/Profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { path } from './constants/path';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order'
import CartLayout from './layouts/CartLayout/CartLayout';
import Checkout from "./pages/Checkout/Checkout";
import ChangePassword from './pages/ChangePassword/ChangePassword';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
};
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to={path.home} /> : <Outlet />;
};

const useRouteElements = () => {
  const routeElement = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.changePassword,
          element: (
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.checkout,
      element: (
        <MainLayout>
          <Checkout/>
        </MainLayout>
      )
    },
    {
      path: path.order,
      element: (
        <MainLayout>
          <Order />
        </MainLayout>
      )
    }
  ]);

  return routeElement;
};

export default useRouteElements;
