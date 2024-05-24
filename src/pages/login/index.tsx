import React, { useState } from 'react';
import './style.css'
import api from '../../api';
import { ShowAlert } from '../../components/ShowAlertComponent';
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
    const [showPassword, setShowPassword] = useState(true);
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

        if (!isValidateErrors) {
            const response = await api.post('/login', {
                email, password
            });

            if (response.data.status === 0) {
                timerError();
                setLoading(true);
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
            setLoading(false);
            setAlert(false);
        }, 900)
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
                        <TextField error={inputErrorEmail} focused={inputErrorEmail} className='text-field' onChange={(e) => getEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" type='email' size='small' />
                        <div className='fields'>
                            <TextField error={inputErrorPassword} focused={inputErrorPassword} className='text-field' onChange={(e) => getPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" type={showPassword ? "password" : "text"} size='small' />
                            {showPassword ? (
                                <i onClick={() => setShowPassword(false)} id='eye' className="bi bi-eye-fill"></i>
                            ) : (
                                <i onClick={() => setShowPassword(true)} id='eye' className="bi bi-eye-slash-fill"></i>
                            )}
                        </div>
                    </div>
                    <div className='button-fields'>
                        <Button className='button' onClick={(e) => login(e)} sx={{ width: '200px' }} variant='contained' >{loading ? <CircularProgress color='secondary' size={28} /> : 'Entrar'}</Button>
                    </div>
                </form>
            </div>
            {alert ? <ShowAlert status={status} msg={msg} /> : null}
        </div>
    )
}