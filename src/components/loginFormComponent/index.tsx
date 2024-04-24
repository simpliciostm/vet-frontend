import React, { useState } from 'react';
import './style.css'
import { Button, TextField } from '@mui/material';
import img from '../../assets/images/logo.jpeg'

interface props {
    getEmail: (email: string) => void;
    getPassword: (password: string) => void;
    login: (e: any) => void;
}

export const LoginFormComponent = ({ login, getEmail, getPassword }: props) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className='modal'>
            <div className='box-img'>
                <img src={img} alt="logo" />
            </div>
            <form>
                <div className="box-input">
                    <TextField id="outlined-basic" label="Email" variant="outlined" size='small' onChange={(e) => getEmail(e.target.value)} />
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
    )
}