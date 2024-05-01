import React, { useEffect, useState } from 'react'
import './style.css'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge, IconButton, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from '../../api';
import { getStorage } from '../../services/localStorage';
import img from '../../assets/images/logo.jpeg';

export const Header = () => {
    const [name, setName] = useState('');
    const [permission, setPermission] = useState('');

    useEffect(() => {
        const loadUserInfo = async () => {

            const idUser = getStorage('id');
            if (idUser) {
                const response = await api.get(`/user/${idUser}`);
                if (response.data && response.data.status === 1) {
                    setName(response.data.data.name);
                    setPermission(response.data.data.permissions.name_permission)
                }
            }
        }
        loadUserInfo();
    })


    const logout = () => {
        window.location.href = '/'
        window.localStorage.clear()
    }

    return (
        <Box>
            <AppBar className='app-bar' position="static" color='inherit'>
                <Toolbar className='nav-bar'>
                    <div className='logo'>
                        <img src={img} alt="logo" />
                        a
                    </div>
                    <div className="user">
                        <Typography component={'span'} fontWeight={'bold'} >{name}</Typography>
                        <div className="circle-user">
                            <Typography component={'span'} fontSize={18} fontWeight={'bold'} >{name[0]}</Typography>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="submenu">
                <nav>
                    <ul>
                        <Link to="/dashboard/home">
                            <li>
                                <HomeRoundedIcon fontSize='small' />Início
                            </li>
                        </Link>
                        <Link to="/dashboard/register">
                            <li>
                                <FormatListBulletedIcon fontSize='small' />Castrações
                            </li>
                        </Link>
                        {
                            permission === 'Admin' ? <Link to="/dashboard/admin">
                                <li>
                                    <PersonIcon fontSize='small' />Admin
                                </li>
                            </Link> : null
                        }
                        <li onClick={() => logout()} className="logout" style={{ cursor: 'pointer' }} >
                            <LogoutIcon fontSize={'small'} /><Typography fontFamily={'sans-serif'} fontSize={14} fontWeight={700}>Sair</Typography>
                        </li>
                    </ul>
                </nav>
            </div>
        </Box >
    )
}