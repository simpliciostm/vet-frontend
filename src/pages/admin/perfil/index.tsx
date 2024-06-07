import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/headerComponent';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import './style.css'
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../../../api';
import { ShowAlert } from '../../../components/showAlertComponent';
import { getStorage } from '../../../services/localStorage';

export const Perfil = () => {
    const [idUser, setIdUser] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [statusPromise, setStatusPromise] = useState(false);
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    const [name_permission, setNamePermission] = useState('');

    useEffect(() => {

        const getUser = async () => {
            try {
                const idUser = getStorage('id');

                if (idUser) {
                    setIdUser(idUser);
                    const response = await api.get(`/user/${idUser}`);
                    if (response.data.data && response.data.status === 1) {
                        setName(response.data.data.name);
                        setEmail(response.data.data.email);
                        setNamePermission(response.data.data.permissions._id);
                    }
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
                } else if (response.data.status === 0) {
                    setStatusPromise(true);
                    setMsg(response.data.msg);
                    setStatusAlert('error');
                    timer();
                }
            } catch (err) {
                console.log(err);
            }
        }

        getUser();
        getPermissions();

    }, []);

    const changePermissionUser = async (e: any) => {
        try {
            setNamePermission(e);
        } catch (err) {
            console.log(err);
        }
    }

    const updateDataUser = async (e: any) => {
        try {
            e.preventDefault();
            const response = await api.put(`/userUpdate/${idUser}`, {
                name: name,
                email: email,
                password: password,
                permissions: name_permission
            });
            if (response.status === 200 && response.data && response.data.status === 1) {
                setStatusPromise(true);
                setMsg(response.data.msg);
                setStatusAlert('success');
                timer();
            } else if (response.status === 200 && response.data.status === 0) {
                setStatusPromise(true);
                setMsg(response.data.msg);
                setStatusAlert('error')
            }
        } catch (err) {
            console.log(err);
        }
    }

    const timer = () => {
        setTimeout(() => {
            setStatusPromise(false)
            window.location.reload();
        }, 1200)
    }

    return (
        <div>
            <Header />
            <div className='perfil-box'>
                <div className="box-link">
                    <Link className='link' to="/dashboard/admin"><Typography>Painel de Admin</Typography></Link>
                    <ArrowForwardIosIcon style={{ color: 'rgba(0,0,0,0.5)' }} fontSize='small' />
                    <Link className='link' to="/dashboard/admin/perfil"><Typography>Perfil</Typography></Link>
                </div>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registro de Perfil</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>editar</Typography> seu perfil</Typography>
                </div>
                <div className="container-perfil">
                    <form action="">
                        <div className="field-perfil">
                            <TextField onChange={(e) => setName(e.target.value)} value={name} type='text' variant='outlined' label='nome' ></TextField>
                        </div>
                        <div className="field-perfil">
                            <TextField onChange={(e) => setEmail(e.target.value)} value={email} type='email' variant='outlined' label='email' ></TextField>
                        </div>
                        <div id='field-password' className="field-perfil">
                            <TextField onChange={(e) => setPassword(e.target.value)} value={password} className='password-box' label="Password" variant="outlined" type={showPassword ? "password" : "text"} size='medium' />
                            {showPassword ? (
                                <i onClick={() => setShowPassword(false)} id='eye' className="bi bi-eye-fill"></i>
                            ) : (
                                <i onClick={() => setShowPassword(true)} id='eye' className="bi bi-eye-slash-fill"></i>
                            )}
                        </div>
                        <div className="field-perfil">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={name_permission}
                                    label="Permissão"
                                    onChange={(e) => { changePermissionUser(e.target.value) }}
                                    style={{ width: '160px', height: '55px' }}
                                >
                                    {permissions.length >= 1 ? permissions.map((per: any) => (
                                        <MenuItem key={per._id} value={per._id}>{per.name_permission}</MenuItem>
                                    )) : null
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="perfil-button">
                            <Button className='button' onClick={(e) => updateDataUser(e)} sx={{ width: '250px' }} variant="contained">Atualizar Dados</Button>
                        </div>
                    </form>
                </div>
            </div>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
}