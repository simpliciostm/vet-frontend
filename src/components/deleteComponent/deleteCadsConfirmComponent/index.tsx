import React, { useState } from 'react';
import './style.css';
import { Button, CircularProgress, Typography } from '@mui/material';
import api from '../../../api';
import { ShowAlert } from '../../showAlertComponent';

interface confirmComponentProps {
    msg: string;
    id: string;
    onClose: () => void;
}

export const DeleteCadsConfirmComponent = (props: confirmComponentProps) => {
    const [statusPromise, setStatusPromise] = useState(true);
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    const [loading, setLoading] = useState(false);

    const deleteRegister = async () => {
        const { data } = await api.delete(`/cadsDelete/${props.id}`);

        if (data) {
            switch (data.status) {
                case 1:
                    setLoading(true);
                    setStatusPromise(true);
                    setMsg(data.msg);
                    setStatusAlert('success');
                    timer();
                    break;
                case 0:
                    setStatusPromise(true);
                    setMsg(data.msg);
                    setStatusAlert('error');
                    break;
            }
        }
    }

    const timer = () => {
        setTimeout(() => {
            setLoading(false);
            setStatusPromise(false);
            window.location.href = '/dashboard/register';
            props.onClose();
        }, 1200)
    }

    return (
        <div className='container-delete'>
            <div className="modal-delete">
                <div className="title-delete">
                    <Typography fontSize={24} fontWeight={'bold'}>Deletar registro</Typography>
                </div>
                <div className="msg-delete">
                    <Typography fontSize={18} >{props.msg}</Typography>
                </div>
                <div className="buttons-delete">
                    <Button onClick={props.onClose} size='medium' color='error' variant='outlined' >Cancelar</Button>
                    <Button onClick={() => deleteRegister()} size='medium' color='success' variant='outlined' >{loading ? <CircularProgress color='success' size={28} /> : 'Sim'}</Button>
                </div>
            </div>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
}