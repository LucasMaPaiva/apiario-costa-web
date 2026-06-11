import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '../../modules/auth/components/LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background artistic pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 honeycomb-pattern pointer-events-none -mr-48 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 honeycomb-pattern pointer-events-none -ml-48 -mb-24 scale-x-[-1]"></div>

            <Link
                to="/"
                className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark/60 hover:text-brand-mel transition-colors"
            >
                <ArrowLeft size={16} /> Voltar ao site
            </Link>

            <div className="z-10 w-full flex justify-center">
                <LoginForm />
            </div>
        </div>
    );
}
