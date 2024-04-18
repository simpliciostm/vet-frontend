import * as Router from 'react-router-dom';

import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register';

export const Routers = () => {
    return (
        <Router.BrowserRouter>
            <Router.Routes>
                <Router.Route path='/login' Component={Login} />
                <Router.Route path='/dashboard/home' Component={Home} />
                <Router.Route path='/dashboard/register' Component={Register} />
                <Router.Route path='*'  Component={Login} />
            </Router.Routes>
        </Router.BrowserRouter>
    )
}