import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import api from '../../../api';
import { ShowAlert } from '../../showAlertComponent';
import CircularProgress from '@mui/material/CircularProgress';
interface props {
    operation: string;
    id?: string;
    onClose: () => void;
}

export const UserFormComponent = (props: props) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [permissions, setPermissions] = useState<[]>([]);
    const [name_permission, setNamePermission] = useState<string>('');
    const [statusPromise, setStatusPromise] = useState<boolean>(true);
    const [msg, setMsg] = useState<string>('');
    const [statusAlert, setStatusAlert] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        const getUser = async () => {
            try {
                if (props.operation === 'view' || props.operation === 'update' && props.id) {
                    const { data } = await api.get(`/user/${props.id}`);
                    setName(data.data.name);
                    setEmail(data.data.email);
                    setNamePermission(data.data.permissions._id)
                }
            } catch (err) {
                console.log(err);
            }
        }


        const getPermissions = async () => {
            try {
                const response = await api.get('/permissionList');
                if (response.data.status === 1) {
                    for (let i = 0; i < response.data.data.length; i++) {
                        setPermissions(response.data.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getPermissions();
        getUser()

    }, [props.id, props.operation]);

    const changePermissionUser = async (e: any) => {
        try {
            setNamePermission(e);
        } catch (err) {
            console.log(err);
        }
    }

    const registerOurUpdate = async (e: any, operation: string) => {
        try {
            e.preventDefault();
            let result: any;

            if (operation === 'register') {
                result = await api.post('/userInsert', {
                    name: name,
                    email: email,
                    password: password,
                    permissions: name_permission
                });
            }

            if (operation === 'update') {
                result = await api.put(`/userUpdate/${props.id}`, {
                    name: name,
                    email: email,
                    password: password,
                    permissions: name_permission
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
            window.location.href = '/dashboard/admin/users';
            props.onClose();
        }, 1400)
    }

    return (
        <div className='container-user-form'>
            <form className='modal-user-form' action="" onSubmit={(e) => registerOurUpdate(e, props.operation)}>
                <div className="title-user-form">
                    <Typography component={'span'} fontSize={22} fontWeight={'bold'} color={'#5b1c30'} >
                        {props.operation === 'register' ? "Formulario de Usuário" : null}
                        {props.operation === 'update' ? "Atualização de Usuário" : null}
                        {props.operation === 'view' ? "Visualização de Usuário" : null}
                    </Typography>
                    <Typography component={'span'} fontSize={16} >
                        {props.operation === 'register' ? "Preencha o formulário para adicionar um novo usuário" : null}
                        {props.operation === 'update' ? "Preencha o formulário para atualizar os dados do usuário" : null}
                        {props.operation === 'view' ? "Aqui você pode ver os dados do usuário" : null}
                    </Typography>
                </div>
                <div className="field-input">
                    <TextField onChange={(e) => setName(e.target.value)} label='Nome' type='text' size='small' value={name} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
                    <TextField onChange={(e) => setEmail(e.target.value)} label='Email' type='email' required={true} size='small' value={email} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" type="password" size='small' required={props.operation === 'update' ? false : true} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
                    <FormControl>
                        <InputLabel required >Permissão</InputLabel>
                        <Select
                            value={name_permission}
                            label="Permissão"
                            onChange={(e) => { changePermissionUser(e.target.value) }}
                            style={{ width: '250px' }}
                            size='small'
                            defaultValue=''
                            required
                            disabled={props.operation === 'view' ? true : false}
                        >
                            {permissions.length >= 1 ? permissions.map((per: any) => (
                                <MenuItem key={per._id} value={per._id}>{per.name_permission}</MenuItem>
                            )) : null
                            }
                        </Select>
                    </FormControl>
                </div>
                {props.operation === 'register' || props.operation === 'update' ? (
                    <div className="button-fields-user">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                        <Button type='submit' className='button-save' sx={{ width: '100px' }} variant="contained">{loading ? <CircularProgress color='secondary' size={28} /> : 'Salvar'}</Button>
                    </div>
                ) : (
                    <div className="button-fields-user">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Fechar</Button>
                    </div>
                )}
            </form>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
}