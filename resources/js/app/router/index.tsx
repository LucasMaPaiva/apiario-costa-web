import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/auth/login';

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
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
