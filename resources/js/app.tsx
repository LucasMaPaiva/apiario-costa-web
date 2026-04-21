import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/home';

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <MainLayout>
                <HomePage />
            </MainLayout>
        </React.StrictMode>
    );
}
