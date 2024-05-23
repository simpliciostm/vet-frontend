import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import api from '../../api';
import { ShowAlert } from '../ShowAlertComponent';

interface props {
    operation: string;
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    permission?: {
        _id: string;
        name_permission: string;
    };
}

export const UserFormComponent = (props: props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [name_permission, setNamePermission] = useState('');
    const [closeModal, setCloseModal] = useState(false);
    const [statusPromise, setStatusPromise] = useState(true);
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    const [validateNameField, setValidateNameField] = useState(false);
    const [validateEmailField, setValidateEmailField] = useState(false);
    const [validatePasswordField, setValidatePasswordField] = useState(false);
    const [validatePermissionField, setValidatePermissiondField] = useState(false);

    useEffect(() => {

        if (props.name) setName(props.name);
        if (props.email) setEmail(props.email);
        if (props.password) setPassword(props.password);
        if (props.permission) setNamePermission(props.permission._id)

        const getUser = async () => {
            try {
                if (props.operation === 'view' && props.id) {
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

    }, [props.name, props.email, props.id, props.operation, props.password, props.permission]);

    const changePermissionUser = async (e: any) => {
        try {
            setNamePermission(e);
        } catch (err) {
            console.log(err);
        }
    }

    const close = (e: any) => {
        !closeModal ? setCloseModal(true) : setCloseModal(false);
    }

    const registerOurUpdate = async (e: any, operation: string) => {
        try {
            e.preventDefault();
            const isValidateErrors = validateErrors();
            let result: any;

            if (isValidateErrors) {
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
                            setStatusPromise(true);
                            setMsg(result.data.msg);
                            setStatusAlert('success');
                            timerUpdate();
                            break;
                        case 0:
                            setStatusPromise(true);
                            setMsg(result.data.msg);
                            setStatusAlert('error');
                            timer();
                            break;
                    }
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    const validateErrors = (): boolean => {
        name ? setValidateNameField(false) : setValidateNameField(true);
        email ? setValidateEmailField(false) : setValidateEmailField(true);
        password ? setValidatePasswordField(false) : setValidatePasswordField(true);
        name_permission ? setValidatePermissiondField(false) : setValidatePermissiondField(true);

        if (name || email || password || name_permission) return true
        else return false
    }

    const timer = () => {
        setTimeout(() => {
            setStatusPromise(false);
        }, 1200)
    }

    const timerUpdate = () => {
        setTimeout(() => {
            setStatusPromise(false);
            setCloseModal(true);
        }, 1200)
    }


    return (
        !closeModal ? (
            <div className='container-user-form'>
                <form className='modal-user-form' action="">
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
                        <TextField error={validateNameField} focused={false} onChange={(e) => setName(e.target.value)} label='Nome' type='text' size='small' value={name} disabled={props.operation === 'view' ? true : false} />
                    </div>
                    <div className="field-input">
                        <TextField error={validateEmailField} focused={false} onChange={(e) => setEmail(e.target.value)} label='Email' type='email' required size='small' value={email} disabled={props.operation === 'view' ? true : false} />
                    </div>
                    <div id='field-input-password' className="field-input">
                        <TextField error={validatePasswordField} focused={false} value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" type="password" size='small' required disabled={props.operation === 'view' ? true : false} />
                    </div>
                    <div className="field-input">
                        <FormControl>
                            <InputLabel error={validatePermissionField} focused={false} required color='primary' id="demo-simple-select-label">Permissão</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={name_permission}
                                label="Permissão"
                                onChange={(e) => { changePermissionUser(e.target.value) }}
                                style={{ width: '250px' }}
                                size='small'
                                defaultValue=''
                                required
                                disabled={props.operation === 'view' ? true : false}
                                error={validatePermissionField}
                            >
                                {permissions.length >= 1 ? permissions.map((per: any) => (
                                    <MenuItem key={per._id} value={per._id}>{per.name_permission}</MenuItem>
                                )) : null
                                }
                            </Select>
                        </FormControl>
                    </div>
                    {props.operation === 'register' || props.operation === 'update' ? (
                        <div className="button-field">
                            <Button onClick={(e) => close(e)} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                            <Button onClick={(e) => registerOurUpdate(e, props.operation)} className='button-save' sx={{ width: '100px' }} variant="contained">Salvar</Button>
                        </div>
                    ) : (
                        <div className="button-field">
                            <Button onClick={(e) => close(e)} className='button-cancel' sx={{ width: '150px' }} variant="contained">Fechar</Button>
                        </div>
                    )}
                </form>
                {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
            </div>
        ) : null
    )
}