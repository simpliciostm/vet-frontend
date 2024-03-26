import React, { useEffect, useState } from 'react';
import './style.css'
import { ValidationToken } from '../../components/validationToken';
import { api } from '../../api';
import { ShowAlert } from '../../components/ShowAlert';

export const ValidateToken = () => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [msgResult, setMsgResult] = useState('');

    useEffect(() => {
        const userEmail = window.localStorage.getItem('UserEmail');
        if (userEmail) setEmail(userEmail);
    }, [email])

    const backLogin = () => {
        window.location.href = '/login';
        localStorage.clear();
    }

    const validateLogin = async (e: any) => {
        e.preventDefault()

        const response = await api.post('/login/validate', { email, token });

        switch (response.data.status) {
            case 0:
                setStatus('error');
                setShowAlert(true);
                timeShowBox(response.data.msg);
                break;
            case 1:
                setStatus('success');
                setShowAlert(true);
                timeShowBox(response.data.msg, response.data.data.userAuth);
                localStorage.setItem('User', response.data.data);
                break;
        }
    }

    const timeShowBox = (msg: string, auth?: boolean) => {
        setMsgResult(msg);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            if (auth) window.location.href = '/dashboard'
        }, 1000);
    };

    const getToken = (tokenValue: string) => { setToken(tokenValue) };

    return (
        <div className='background-login'>
            <ValidationToken back={backLogin} validate={validateLogin} getToken={getToken} />
            {showAlert == true ? <ShowAlert status={status} msg={msgResult} /> : null}
        </div>
    )
}