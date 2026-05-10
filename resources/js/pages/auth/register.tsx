import React from 'react';
import RegisterForm from '../../modules/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background artistic pattern (mesmo do login para consistência) */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 honeycomb-pattern pointer-events-none -mr-48 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 honeycomb-pattern pointer-events-none -ml-48 -mb-24 scale-x-[-1]"></div>
            
            <div className="z-10 w-full flex justify-center">
                <RegisterForm />
            </div>
        </div>
    );
}
