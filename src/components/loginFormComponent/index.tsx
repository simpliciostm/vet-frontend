import React, { useState } from 'react';
import './style.css'
import { Button, TextField } from '@mui/material';
import { Typography } from '@mui/material';

export const LoginFormComponent = ({ getLogin }: any) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className='modal'>
            <div className='box-title'>
                <Typography style={{ color: '#2e7d32' }} className='title' component={'span'} fontSize={23} fontWeight={500} fontFamily={'sans-serif'}>Tela de Acesso</Typography>
            </div>
            <form onSubmit={getLogin}>
                <TextField color='success' id="outlined-basic" label="Email" variant="outlined" size='small' />
                <div className='fields'>
                    <TextField color='success' id="outlined-basic" label="Password" variant="outlined" type={showPassword ? "password" : "text"}  size='small' />
                    {showPassword ? (
                        <i onClick={() => setShowPassword(false)} id='eye' className="bi bi-eye-fill"></i>
                    ) : (
                        <i onClick={() => setShowPassword(true)} id='eye' className="bi bi-eye-slash-fill"></i>
                    )}
                </div>
                <div className='button-fields'>
                    <Button onClick={(e) => getLogin(e)} sx={{ width: '200px' }} color='success' variant='contained' >Entrar</Button>
                </div>
            </form>
        </div>
    )
}