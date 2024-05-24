import { Navigate } from 'react-router-dom';
import { getStorage } from '../services/localStorage';

export const PrivateRoutes = ({ children }: any) => {
    const token = getStorage('token');
    const auth = getStorage('auth');

    return token && auth ? children : <Navigate to='/login' />
}

export const OnlyAdminRoutes = ({ children }: any) => {
    return <Navigate to='/dashboard/home' />
}