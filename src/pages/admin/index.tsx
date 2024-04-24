import React from 'react';
import { Header } from '../../components/headerComponent';
import './style.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

export const Admin = () => {
    return (
        <div>
            <Header />
            <div className="container-admin">
                <div className="title-admin">
                    <Typography component={'span'} fontSize={25} >Painel de Admin</Typography>
                </div>
                <div className="box-title-link">
                    <div className="title-admin" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <ChecklistRtlIcon fontSize='small' />
                        <Typography component={'span'} fontSize={18} > Cadastros</Typography>
                    </div>
                    <ul>
                        <li>  <Link to='/dashboard/admin/perfil'><Typography component={'span'} fontSize={14}>Meu Perfil</Typography></Link></li>
                        <li>  <Link to='/dashboard/admin/users'><Typography component={'span'} fontSize={14}>Usuários</Typography></Link></li>
                        <li>  <Link to='/dashboard/admin/permission'><Typography component={'span'} fontSize={14}>Permissões</Typography></Link></li>
                    </ul>
                </div>
            </div>
        </div >
    )
}