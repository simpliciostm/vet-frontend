import * as Router from 'react-router-dom';

import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register';
import { Admin } from '../pages/admin';
import { Usuarios } from '../pages/usuario';
import { Perfil } from '../pages/perfil';
import { OnlyAdminRoutes, PrivateRoutes } from '../routes/privateRoutes';
import { Permission } from '../pages/permission';

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
                <Router.Route path='/dashboard/admin' element={
                    <OnlyAdminRoutes>
                        <Admin />
                    </OnlyAdminRoutes>
                } />
                <Router.Route path='/dashboard/admin/users' element={
                    <OnlyAdminRoutes>
                        <Usuarios />
                    </OnlyAdminRoutes>
                } />
                <Router.Route path='/dashboard/admin/perfil' element={
                    <OnlyAdminRoutes>
                        <Perfil />
                    </OnlyAdminRoutes>
                } />
                <Router.Route path='/dashboard/admin/permission' element={
                    <OnlyAdminRoutes>
                        <Permission />
                    </OnlyAdminRoutes>
                } />
                <Router.Route path='*' element={<Login />} />
            </Router.Routes>
        </Router.BrowserRouter>
    )
}