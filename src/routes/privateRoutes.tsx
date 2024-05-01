import React from 'react';

import { Navigate } from 'react-router-dom';
import { clearStorage, getStorage } from '../services/localStorage';
import api from '../api';

export const PrivateRoutes = ({ children }: any) => {
    const token = getStorage('token');
    const auth = getStorage('auth');

    return token && auth ? children : <Navigate to='/login' />
}

export const OnlyAdminRoutes = ( { children }: any) => {
    return <Navigate to='/dashboard/home' /> 
}