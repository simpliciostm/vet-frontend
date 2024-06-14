import * as Router from 'react-router-dom';

import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register';
import { Admin } from '../pages/admin';
import { Usuarios } from '../pages/admin/usuario';
import { Perfil } from '../pages/admin/perfil';
import { PrivateRoutes } from '../routes/privateRoutes';
import { Permission } from '../pages/admin/permission';

export const Routers = () => {
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
                <Router.Route path='/dashboard/admin' element={<Admin />} />
                <Router.Route path='/dashboard/admin/users' element={<Usuarios />} />
                <Router.Route path='/dashboard/admin/perfil' element={<Perfil />} />
                <Router.Route path='/dashboard/admin/permission' element={<Permission />} />
                <Router.Route path='*' element={<Login />} />
            </Router.Routes>
        </Router.BrowserRouter>
    )
}