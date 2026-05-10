import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import AdminLayout from '../../layouts/AdminLayout';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/auth/login';
import RegisterPage from '../../pages/auth/register';
import StorePage from '../../pages/store';
import ProductDetails from '../../pages/store/ProductDetails';
import Checkout from '../../pages/store/Checkout';

// Admin Pages
import AdminProductsList from '../../pages/admin/index';
import AdminProductCreate from '../../pages/admin/products/create';
import AdminProductEdit from '../../pages/admin/products/edit';
import AdminCategoriesList from '../../pages/admin/categories/index';
import AdminOrdersList from '../../pages/admin/orders/index';
import AdminIntegrations from '../../pages/admin/settings/Integrations';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: '/loja',
        element: (
            <MainLayout>
                <StorePage />
            </MainLayout>
        ),
    },
    {
        path: '/produto/:slug',
        element: (
            <MainLayout>
                <ProductDetails />
            </MainLayout>
        ),
    },
    {
        path: '/checkout',
        element: (
            <MainLayout>
                <Checkout />
            </MainLayout>
        ),
    },
    {
        path: '/laravel-admin',
        element: <LoginPage />,
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
                path: 'logistica',
                element: <AdminIntegrations />
            }
        ]
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
