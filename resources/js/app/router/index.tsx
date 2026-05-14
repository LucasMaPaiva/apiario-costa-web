import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import AdminLayout from '../../layouts/AdminLayout';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/auth/login';
import StorePage from '../../pages/store';

// Admin Pages
import AdminProductsList from '../../pages/admin/index';
import AdminProductCreate from '../../pages/admin/products/create';
import AdminProductEdit from '../../pages/admin/products/edit';
import AdminCategoriesList from '../../pages/admin/categories/index';

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
        path: '/laravel-admin',
        element: <LoginPage />,
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
            }
        ]
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
