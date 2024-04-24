import React from 'react';
import { Typography } from '@mui/material';
import { Header } from '../../components/headerComponent';
import './style.css';

export const Home = () => {

    return (
        <div>
            <Header />
            <div className="container-home">
                <div className="title-home">
                    <Typography component={'span'} fontSize={25}>Bem vindo,</Typography>
                    <Typography component='span' fontSize={20} >Sistema de Castrações</Typography>
                </div>
            </div>
        </div>
    )
}