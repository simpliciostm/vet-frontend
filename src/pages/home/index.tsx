import React from 'react';
import { Typography } from '@mui/material';
import { DashBoardComponent } from '../../components/dashboardComponent';
import './style.css';

export const Home = () => {

    return (
        <div>
            <DashBoardComponent />
            <div className="container-home">
                <div className="title-home">
                    <Typography component={'span'} fontSize={27}>Bem vindo,</Typography>
                    <Typography component='span' fontSize={20} >Sistema de Castrações</Typography>
                </div>
            </div>
        </div>
    )
}