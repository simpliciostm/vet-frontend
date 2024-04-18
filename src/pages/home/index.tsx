import React from 'react';
import { Typography } from '@mui/material';
import { DashBoardComponent } from '../../components/dashboardComponent';
import './style.css';

export const Home = () => {

    const data = [
        {
            id: 1,
            total: 21,
            type: 'Animaís castrados'
        },
        {
            id: 3,
            total: 18,
            type: 'Animais não castrados'
        },
        {
            id: 2,
            total: 9,
            type: 'Em Análise'
        }
    ]

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