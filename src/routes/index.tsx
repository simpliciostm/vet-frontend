import * as Router from 'react-router-dom';

import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register';
import { Admin } from '../pages/admin';
import { Usuarios } from '../pages/usuario';
import { Perfil } from '../pages/perfil';
import { OnlyAdminRoutes, PrivateRoutes } from '../routes/privateRoutes';
import { Permission } from '../pages/permission';
import { useEffect, useState } from 'react';
import api from '../api';
import { getStorage } from '../services/localStorage';

export const Routers = () => {
    const [permission, setPermission] = useState('');

    useEffect(() => {
        const getIdUser = async () => {
            const idUser = getStorage('id');
            if (idUser) {
                const response = await api.get(`/user/${idUser}`);
                if (response.data.status === 1) {
                    setPermission(response.data.data.permissions.name_permission);
                }
            }
        }

        getIdUser();
    })

    return (
        <Router.BrowserRouter>
            <Router.Routes>
                <Router.Route path='/login' Component={Login} />
                <Router.Route path='/dashboard/home' element={
                    <PrivateRoutes>
                        <Home />
                    </PrivateRoutes>
                } />
                <Router.Route path='/dashboard/register' element={
                    <PrivateRoutes>
                        <Register />
                    </PrivateRoutes>
                } />
                <Router.Route path='/dashboard/admin' element=
                    {
                        permission === 'Admin' ? <Admin /> : <OnlyAdminRoutes />
                    }
                />
                <Router.Route path='/dashboard/admin/users' element={

                    permission === 'Admin' ? <Usuarios /> : <OnlyAdminRoutes />

                } />
                <Router.Route path='/dashboard/admin/perfil' element={

                    permission === 'Admin' ? <Perfil /> : <OnlyAdminRoutes />

                } />
                <Router.Route path='/dashboard/admin/permission' element={
                    
                    permission === 'Admin' ? <Permission /> : <OnlyAdminRoutes />

                } />
                <Router.Route path='*' element={<Login />} />
            </Router.Routes>
        </Router.BrowserRouter>
    )
}