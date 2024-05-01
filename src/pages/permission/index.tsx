import React, { useEffect, useState } from 'react';
import { Header } from '../../components/headerComponent';
import { Link } from 'react-router-dom';
import { Autocomplete, TextField, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../../api';
import './style.css';

export const Permission = () => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const getPermissions = async () => {
            const response = await api.get('/permissionList');
            if (response && response.data && response.data.status === 1) {
                setPermissions(response.data.data)
            }
        }
        getPermissions();
    })

    const top100Films = [
        { type: 'Editar', code: 1 },
        { type: 'Inserir', code: 2 },
        { type: 'Deletar', code: 3 },
        { type: 'Vizualizar', code: 4 }
      ];

    const getPer = (e: any) => {
        // console.log(e)
    }

    return (
        <div>
            <Header />
            <div className='home-box'>
                <div className="box-link">
                    <Link className='link' to="/dashboard/admin"><Typography>Painel de Admin</Typography></Link>
                    <ArrowForwardIosIcon style={{ color: 'rgba(0,0,0,0.5)' }} fontSize='small' />
                    <Link className='link' to="/dashboard/admin/perfil"><Typography>Permissões</Typography></Link>
                </div>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registro de Permissões</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='green'>consultar</Typography> e <Typography component='span' color='green'>editar</Typography> as permissões do sistema</Typography>
                </div>
                {permissions.map((row: any) => (
                    <div className='field-permissions'>
                        <TextField label='Tipo de usuário' color='success' size='small' value={row.name_permission} />
                        <Autocomplete
                            size='small'
                            multiple
                            id="tags-standard"
                            options={top100Films}
                            getOptionLabel={(option) => option.type}
                            defaultValue={[top100Films[0]]}
                            onChange={(e) => getPer(e.target)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Tipos de Regras"
                                    color='success'
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}