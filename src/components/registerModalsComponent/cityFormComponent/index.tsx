import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import { Button,Typography } from '@mui/material';
import api from '../../../api';
import { ShowAlert } from '../../showAlertComponent';
import CircularProgress from '@mui/material/CircularProgress';

interface props {
    operation: string;
    id?: string;
    name?: string;
    code?: string;
    onClose: () => void;
}

export const CityFormComponent = (props: props) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [statusPromise, setStatusPromise] = useState(true);
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (props.name) setName(props.name);
        if (props.code) setCode(props.code);

        const getUser = async () => {
            try {
                if (props.operation === 'view' && props.id) {
                    const { data } = await api.get(`/city/${props.id}`);
                    setName(data.data.name);
                    setCode(data.data.code);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getUser()

    }, [props.name, props.code, props.id, props.operation]);

    const registerOurUpdate = async (e: any, operation: string) => {
        try {
            e.preventDefault();
            let result: any;

            if (operation === 'register') {
                result = await api.post('/cityInsert', {
                    name: name,
                    code: code,
                });
            }

            if (operation === 'update') {
                result = await api.put(`/cityUpdate/${props.id}`, {
                    name: name,
                    code: code,
                });
            }

            if (result.data) {
                switch (result.data.status) {
                    case 1:
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(result.data.msg);
                        setStatusAlert('success');
                        timerUpdate();
                        break;
                    case 0:
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(result.data.msg);
                        setStatusAlert('error');
                        timer();
                        break;
                }

            }

        } catch (err) {
            console.log(err);
        }
    }

    const timer = () => {
        setTimeout(() => {
            setStatusPromise(false);
        }, 1200)
    }

    const timerUpdate = () => {
        setTimeout(() => {
            setLoading(false);
            setStatusPromise(false);
            window.location.href = '/dashboard/admin/city';
            props.onClose();
        }, 1400)
    }

    return (
        <div className='container-city-form'>
            <form className='modal-city-form' action="" onSubmit={(e) => registerOurUpdate(e, props.operation)}>
                <div className="title-city-form">
                    <Typography component={'span'} fontSize={22} fontWeight={'bold'} color={'#5b1c30'} >
                        {props.operation === 'register' ? "Formulario de Cidade" : null}
                        {props.operation === 'update' ? "Atualização de Cidade" : null}
                        {props.operation === 'view' ? "Visualização de Cidade" : null}
                    </Typography>
                    <Typography component={'span'} fontSize={16} >
                        {props.operation === 'register' ? "Preencha o formulário para adicionar uma nova cidade" : null}
                        {props.operation === 'update' ? "Preencha o formulário para atualizar os dados da cidade" : null}
                        {props.operation === 'view' ? "Aqui você pode ver os dados da cidade" : null}
                    </Typography>
                </div>
                <div className="field-input">
                    <TextField required onChange={(e) => setName(e.target.value)} label='Nome' type='text' size='small' value={name} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
                    <TextField inputProps={{ maxLength: 2 }} onChange={(e) => setCode(e.target.value)} label='Estado' type='text' required={true} size='small' value={code} disabled={props.operation === 'view' ? true : false} />
                </div>
                {props.operation === 'register' || props.operation === 'update' ? (
                    <div className="button-fields-city">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                        <Button type='submit' className='button-save' sx={{ width: '100px' }} variant="contained">{loading ? <CircularProgress color='secondary' size={28} /> : 'Salvar'}</Button>
                    </div>
                ) : (
                    <div className="button-fields-city">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Fechar</Button>
                    </div>
                )}
            </form>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
}