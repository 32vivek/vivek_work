import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    const location = useLocation();


    const isLoginRoute = () => {
        return location.pathname === '/';
    };

    // If user tries to access any route other than login without login, redirect to login
    if (!isLoginRoute() && !isAuthenticated) {
        // Store the current location to redirect back after login
        localStorage.setItem('redirectPath', location.pathname);
        return <Navigate to="/" />;
    }

    // If the user is authenticated and there's a stored redirect path, redirect to that path
    const redirectPath = localStorage.getItem('redirectPath');
    if (isAuthenticated && redirectPath) {
        // Clear the stored redirect path
        localStorage.removeItem('redirectPath');
        return <Navigate to={redirectPath} replace />;
    }


    return <Outlet />;
};

export default PrivateRoutes;
