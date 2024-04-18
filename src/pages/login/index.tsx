import React from 'react';
import './style.css'
import { LoginFormComponent } from '../../components/loginFormComponent';

export const Login = () => {

    const login = async (e: any) => {
        e.preventDefault()
        window.location.href = '/dashboard/home';
    }

    return (
        <div className='background-login'>
            <LoginFormComponent getLogin={login} />
        </div>
    )
}