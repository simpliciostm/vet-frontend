import React, { ReactElement } from 'react';
import './style.css';
import { Typography } from '@mui/material';

interface PropsComponent {
    title: string;
    total: number;
    icon: ReactElement;
}

export const CardInfoComponent = (props: PropsComponent) => {
    return (
        <div className='card'>

            <Typography component='span'>{props.icon}</Typography>
            <Typography component='span'>{props.title}</Typography>
            <Typography component='span' fontWeight={'bold'} fontSize={21} >{props.total}</Typography>
        </div>
    )
}