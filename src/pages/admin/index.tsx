import React from 'react';
import { Header } from '../../components/headerComponent';
import './style.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Admin = () => {
    return (
        <div>
            <Header />
            <div className="container-admin">
                <div className="title-admin">
                    <Typography component={'span'} fontSize={25} >Painel de Admin</Typography>
                </div>
                <div className="box-title-link">
                    <div className="box-title-menu">
                        <Typography component={'span'} fontSize={18} >Cadastros</Typography>
                    </div>
                    <ul>
                        <Link className='link' to='/dashboard/admin/users'><li>  <Typography component={'span'} fontSize={14}>Usuários</Typography></li></Link>
                    </ul>
                </div>
                <div className="box-title-link">
                    <div className="box-title-menu">
                        <Typography component={'span'} fontSize={18} >Configurações</Typography>
                    </div>
                    <ul>
                        <Link className='link' to='/dashboard/admin/perfil'><li>  <Typography component={'span'} fontSize={14}>Perfil</Typography></li></Link>
                        <Link className='link' to='/dashboard/admin/permission'><li> <Typography component={'span'} fontSize={14}>Permissões</Typography></li></Link>
                    </ul>
                </div>
            </div>
        </div >
    )
}