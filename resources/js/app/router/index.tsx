import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/auth/login';
import AdminPage from '../../pages/admin';

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
        path: '/laravel-admin',
        element: <LoginPage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
