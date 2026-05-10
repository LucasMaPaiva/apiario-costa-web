import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import AdminLayout from '../../layouts/AdminLayout';
import ProtectedRoute from '../../common/components/ProtectedRoute';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/auth/login';
import RegisterPage from '../../pages/auth/register';
import StorePage from '../../pages/store';
import ProductDetails from '../../pages/store/ProductDetails';
import Checkout from '../../pages/store/Checkout';
import MyOrders from '../../pages/store/Orders';
import OrderDetails from '../../pages/store/OrderDetails';
import Profile from '../../pages/store/Profile';
import Addresses from '../../pages/store/Addresses';

// Admin Pages
import AdminProductsList from '../../pages/admin/index';
import AdminProductCreate from '../../pages/admin/products/create';
import AdminProductEdit from '../../pages/admin/products/edit';
import AdminCategoriesList from '../../pages/admin/categories/index';
import AdminOrdersList from '../../pages/admin/orders/index';
import AdminOrderDetails from '../../pages/admin/orders/details';
import AdminSettings from '../../pages/admin/settings/index';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'loja',
                element: <StorePage />
            },
            {
                path: 'produto/:slug',
                element: <ProductDetails />
            },
            {
                path: 'checkout',
                element: <Checkout />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'meus-pedidos',
                        element: <MyOrders />
                    },
                    {
                        path: 'meus-pedidos/:id',
                        element: <OrderDetails />
                    },
                    {
                        path: 'perfil',
                        element: <Profile />
                    },
                    {
                        path: 'enderecos',
                        element: <Addresses />
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/cadastro',
        element: <RegisterPage />,
    },
    {
        path: '/laravel-admin',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminProductsList />
            },
            {
                path: 'produtos/novo',
                element: <AdminProductCreate />
            },
            {
                path: 'produtos/:id/editar',
                element: <AdminProductEdit />
            },
            {
                path: 'categorias',
                element: <AdminCategoriesList />
            },
            {
                path: 'pedidos',
                element: <AdminOrdersList />
            },
            {
                path: 'pedidos/:id',
                element: <AdminOrderDetails />
            },
            {
                path: 'configuracoes',
                element: <AdminSettings />
            }
        ]
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
