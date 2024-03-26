import * as Router from 'react-router-dom';

import { Login } from '../pages/login';
import { ValidateToken } from '../pages/validateLogin';
import { DashBoard } from '../pages/dashboard';

export const Routers = () => {
    return (
        <Router.BrowserRouter>
            <Router.Routes>
                <Router.Route path='/login' Component={Login} />
                <Router.Route path='/login/validate' Component={ValidateToken} />
                <Router.Route path='/dashboard' Component={DashBoard} />
                <Router.Route path='*'  Component={Login} />
            </Router.Routes>
        </Router.BrowserRouter>
    )
}