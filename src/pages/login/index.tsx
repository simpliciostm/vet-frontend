import React, { useState } from 'react';
import './style.css'
import { ModalFormLogin } from '../../components/loginModalForm';
import { api } from '../../api';
import { ShowAlert } from '../../components/ShowAlert';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [msgResult, setMsgResult] = useState('');
    const [status, setStatus] = useState('');

    const getEmail = (email: any) => { setEmail(email.target.value) };
    const getPassword = (password: any) => { setPassword(password.target.value) };

    const login = async (e: any) => {
        e.preventDefault()

        const response = await api.post('/login', { email, password });

        switch (response.data.status) {
            case 0:
                setStatus('error')
                timeShowBox(response.data.msg)
                break;
            case 1:
                setStatus('success')
                timeShowBox(response.data.msg, true);
                window.localStorage.setItem('UserEmail', response.data.userEmail)
        }

    }

    const timeShowBox = (msg: string, auth?: boolean) => {
        setMsgResult(msg);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            if (auth) window.location.href = '/login/validate'
        }, 1000);
    };

    return (
        <div className='background-login'>
            <ModalFormLogin email={getEmail} password={getPassword} getLogin={login} />
            {showAlert == true ? <ShowAlert status={status} msg={msgResult} /> : null}
        </div>
    )
}