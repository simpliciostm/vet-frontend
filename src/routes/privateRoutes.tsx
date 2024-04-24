import React from 'react';

import { Navigate } from 'react-router-dom';
import { clearStorage, getStorage } from '../services/localStorage';

export const PrivateRoutes = ({ children }: any) => {
    const token = getStorage('token');
    const auth = getStorage('auth');

    return token && auth ? children : <Navigate to='/login' />
}

export const OnlyAdminRoutes = ({ children }: any) => {
    const token = getStorage('token');
    const auth = getStorage('auth');
    const permission = getStorage('permission');

    return token && auth && permission === 'Admin' ? children : <Navigate to='/dashboard/home' /> 
}