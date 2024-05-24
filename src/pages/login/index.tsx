import React, { useState } from 'react';
import './style.css'
import api from '../../api';
import { ShowAlert } from '../../components/showAlertComponent';
import { setStorage } from '../../services/localStorage';
import './style.css'
import { Button, CircularProgress, TextField } from '@mui/material';
import img from '../../assets/images/logo.jpeg'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [msg, setMsg] = useState('');
    const [inputErrorEmail, setInputErrorEmail] = useState(false);
    const [inputErrorPassword, setInputErrorPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const getPassword = (password: string) => {
        setPassword(password);
    }

    const getEmail = (email: string) => {
        setEmail(email);
    }

    const login = async (e: any) => {
        e.preventDefault();

        const isValidateErrors = validateErrors();

        if (isValidateErrors) {
            const response = await api.post('/login', {
                email, password
            });

            if (response.data.status === 0) {
                timerError();
                setAlert(true);
                setStatus('error');
                setMsg(response.data.msg);
            } else if (response.data.status === 1) {
                setLoading(true);
                setAlert(true);
                setStatus('success');
                setMsg(response.data.msg);
                timerSuccess();
                setStorage('token', response.data.token);
                setStorage('id', response.data.idUser);
                setStorage('auth', response.data.auth);
            }
        }
    }

    const timerSuccess = () => {
        setTimeout(() => {
            setLoading(false);
            setAlert(false);
            window.location.href = '/dashboard/home';
        }, 3000)
    }

    const timerError = () => {
        setTimeout(() => {
            setAlert(false);
        }, 3000)
    }

    const validateErrors = (): boolean => {
        email ? setInputErrorEmail(false) : setInputErrorEmail(true);
        password ? setInputErrorPassword(false) : setInputErrorPassword(true);

        if (inputErrorEmail || inputErrorPassword) return true
        else return false
    }

    return (
        <div className='background-login'>
            <div className='modal'>
                <div className='box-img'>
                    <img src={img} alt="logo" />
                </div>
                <form>
                    <div className="box-input">
                        <TextField error={inputErrorEmail} focused={inputErrorEmail} className='text-field' onChange={(e) => getEmail(e.target.value)} label="Email" variant="outlined" type='email' size='small' />
                        <TextField error={inputErrorPassword} focused={inputErrorPassword} className='text-field' onChange={(e) => getPassword(e.target.value)} label="Password" variant="outlined" size='small' />
                    </div>
                    <div className='button-fields'>
                        <Button className='button' onClick={(e) => login(e)} fullWidth variant='contained' >{loading ? <CircularProgress color='secondary' size={28} /> : 'Entrar'}</Button>
                    </div>
                </form>
            </div>
            {alert ? <ShowAlert status={status} msg={msg} /> : null}
        </div>
    )
}