import React, { useState } from 'react';
import './style.css'
import { LoginFormComponent } from '../../components/loginFormComponent';
import api from '../../api';
import { ShowAlert } from '../../components/ShowAlertComponent';
import { setStorage } from '../../services/localStorage';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [msg, setMsg] = useState('');

    const getEmail = (email: string) => {
        setEmail(email);
    }

    const getPassword = (password: string) => {
        setPassword(password);
    }

    const login = async (e: any) => {
        e.preventDefault();

        const response = await api.post('/login', {
            email, password
        });

        if (response.data.status === 0) {
            setAlert(true);
            setStatus('error');
            setMsg(response.data.msg);
            timer();
        } else if (response.data.status === 1) {
            setAlert(true);
            setStatus('success');
            setMsg(response.data.msg);
            timer();
            setStorage('token', response.data.token);
            setStorage('id', response.data.idUser);
            setStorage('auth', response.data.auth);
            setStorage('permission', response.data.permission);
            window.location.href = '/dashboard/home';
        }
    }

    const timer = () => {
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    return (
        <div className='background-login'>
            <LoginFormComponent login={(e: any) => login(e)} getPassword={(password: string) => getPassword(password)} getEmail={(email: string) => getEmail(email)} />
            {alert ? <ShowAlert status={status} msg={msg} /> : null}
        </div>
    )
}