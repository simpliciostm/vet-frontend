import React, { useState } from 'react';
import './style.css'
import { LoginFormComponent } from '../../components/loginFormComponent';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getEmail = (email: any) => { setEmail(email.target.value) };
    const getPassword = (password: any) => { setPassword(password.target.value) };

    const login = async (e: any) => {
        e.preventDefault()
        window.location.href = '/dashboard/home';
    }

    return (
        <div className='background-login'>
            <LoginFormComponent email={getEmail} password={getPassword} getLogin={login} />
        </div>
    )
}