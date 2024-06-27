import React, { ReactElement, useEffect, useState } from 'react';
import './style.css';
import { Typography } from '@mui/material';

interface PropsComponent {
    title: string;
    total: number;
    icon: ReactElement;
    textIcon?: string;
}

export const CardInfoComponent = (props: PropsComponent) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        timer();
    })

    const timer = () => {
        setTimeout(() => {
            setLoading(false);
        },1000);
    }

    return (
        <>
            {
                loading ? (
                    <div className='card-loading'></div>
                ) : (
                    <div className='card'>
                        <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }} component='span'>{props.icon} {props.textIcon}</Typography>
                        <Typography component='span'>{props.title}</Typography>
                        <Typography component='span' fontWeight={'bold'} fontSize={21} >{props.total}</Typography>
                    </div>
                )
            }
        </>
    )
}