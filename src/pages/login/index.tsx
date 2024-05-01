import React, { useState } from 'react';
import './style.css'
import api from '../../api';
import { ShowAlert } from '../../components/ShowAlertComponent';
import { setStorage } from '../../services/localStorage';
import './style.css'
import { Button, TextField } from '@mui/material';
import img from '../../assets/images/logo.jpeg'
import { TextFieldInputComponent } from '../../components/inputComponent';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState('');
    const [msg, setMsg] = useState('');
    const [showPassword, setShowPassword] = useState(true);  

    const getChange = (email: string) => {
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
            <div className='modal'>
            <div className='box-img'>
                <img src={img} alt="logo" />
            </div>
            <form>
                <div className="box-input">
                    <TextFieldInputComponent label='Email' type='email' onChange={(value: string) => getChange(value)} />
                    <div className='fields'>
                        <TextField className='text-field' onChange={(e) => getPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" type={showPassword ? "password" : "text"} size='small' />
                        {showPassword ? (
                            <i onClick={() => setShowPassword(false)} id='eye' className="bi bi-eye-fill"></i>
                        ) : (
                            <i onClick={() => setShowPassword(true)} id='eye' className="bi bi-eye-slash-fill"></i>
                        )}
                    </div>
                </div>
                <div className='button-fields'>
                    <Button className='button' onClick={(e) => login(e)} sx={{ width: '200px' }} variant='contained' >Entrar</Button>
                </div>
            </form>
        </div>
            {alert ? <ShowAlert status={status} msg={msg} /> : null}
        </div>
    )
}