import React from 'react';
import './style.css';
import { Alert } from '@mui/material';

interface props {
    status: string;
    msg: string;
}

export const ShowAlert = ({ status, msg }: props) => {
    return (
        <div className='container-alert'>
            {status === 'success' ? (

                <Alert variant="filled" severity="success">
                    {msg}
                </Alert>
            ) : null}

            {status === 'error' ? (

                <Alert variant="filled" severity="error">
                    {msg}
                </Alert>
            ) : null}
        </div>
    )
}