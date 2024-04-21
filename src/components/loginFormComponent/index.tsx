import React, { useState } from 'react';
import './style.css'
import { Button, TextField } from '@mui/material';
import { Typography } from '@mui/material';

interface props {
    getEmail: (email: string) =>  void;
    getPassword: (password: string) => void;
    login: (e: any) => void;
}

export const LoginFormComponent = ({ login, getEmail, getPassword }: props) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className='modal'>
            <div className='box-title'>
                <Typography style={{ color: '#2e7d32' }} className='title' component={'span'} fontSize={23} fontWeight={500} fontFamily={'sans-serif'}>Tela de Acesso</Typography>
            </div>
            <form>
                <TextField color='success' id="outlined-basic" label="Email" variant="outlined" size='small' onChange={(e) => getEmail(e.target.value)} />
                <div className='fields'>
                    <TextField onChange={(e) => getPassword(e.target.value)} color='success' id="outlined-basic" label="Password" variant="outlined" type={showPassword ? "password" : "text"}  size='small' />
                    {showPassword ? (
                        <i onClick={() => setShowPassword(false)} id='eye' className="bi bi-eye-fill"></i>
                    ) : (
                        <i onClick={() => setShowPassword(true)} id='eye' className="bi bi-eye-slash-fill"></i>
                    )}
                </div>
                <div className='button-fields'>
                    <Button onClick={(e) => login(e)} sx={{ width: '200px' }} color='success' variant='contained' >Entrar</Button>
                </div>
            </form>
        </div>
    )
}