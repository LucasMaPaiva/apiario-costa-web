import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/context/AuthContext';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    allowedRoles, 
    redirectPath = '/login' 
}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-main flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-mel border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
    }

    // Role check (if applicable)
    // if (allowedRoles && !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/unauthorized" replace />;
    // }

    return <Outlet />;
};

export default ProtectedRoute;
