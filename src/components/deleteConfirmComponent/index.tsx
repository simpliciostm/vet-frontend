import React, { useState } from 'react';
import './style.css';
import { Button, Typography } from '@mui/material';
import api from '../../api';
import { ShowAlert } from '../ShowAlertComponent';

interface confirmComponentProps {
    msg: string;
    id: string;
    onClose: () => void;
}

export const DeleteConfirmComponent = (props: confirmComponentProps) => {
    const [closeModal, setCloseModal] = useState(false);
    const [statusPromise, setStatusPromise] = useState(true);
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');

    const deleteRegister = async () => {
        const { data } = await api.delete(`/userDelete/${props.id}`);

        if (data) {
            switch (data.status) {
                case 1:
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
            setStatusPromise(false);
            setCloseModal(true);
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
                    <Button onClick={() => deleteRegister()} size='medium' color='success' variant='outlined' >Sim</Button>
                </div>
            </div>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
}