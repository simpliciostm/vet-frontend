import React, { InputHTMLAttributes } from 'react';
import './style.css';
import { Typography } from '@mui/material';

interface PropsComponent {
    title: string
}

export const CardInfoComponent: React.FC<PropsComponent> = (props) => {
    return (
        <div className='box'>
            <div className='total'><Typography component={'span'} fontSize={11}>{props.title}</Typography></div>
        </div>

    )
}