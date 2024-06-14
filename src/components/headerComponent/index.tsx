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
import PersonIcon from '@mui/icons-material/Person';
import api from '../../api';
import { getStorage } from '../../services/localStorage';
import img from '../../assets/images/logo.jpeg';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const Header = () => {
    const [name, setName] = useState('');
    const [permission, setPermission] = useState('');
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

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

    const toggleShowMenu = () => {
        showMenuMobile ? setShowMenuMobile(false) : setShowMenuMobile(true);
    }

    const toggleShowDropDown = () => {
        showDropDown ? setShowDropDown(false) : setShowDropDown(true);
    }

    return (
        <Box>
            <AppBar className='app-bar' position="static" color='inherit'>
                <Toolbar className='nav-bar'>
                    <div className='box-logo'>
                        <img src={img} alt="logo" />
                    </div>
                    <div className="user">
                        <div className="user-drop" onClick={() => toggleShowDropDown()}>
                            <Typography component={'span'} fontWeight={'bold'} fontSize={14} >{name}</Typography>
                            {showDropDown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            <div className="circle-user">
                                <Typography component={'span'} fontSize={16} fontWeight={'bold'} >{name[0]}</Typography>
                            </div>
                        </div>
                        {
                            showDropDown ? (
                                <div className="user-dropdown">
                                    <ul onClick={() => setShowDropDown(false)} >
                                        <li onClick={() => logout()}>
                                            <LogoutIcon style={{ fontSize: 15 }} />
                                            <Typography fontSize={14}>Sair</Typography>
                                        </li>
                                    </ul>
                                </div>
                            ) : null
                        }
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
                    </ul>
                    <div className="version">
                        <div className="background-version" style={{ backgroundColor: 'green' }} >
                            <Typography fontSize={11} fontFamily={'sans-serif'} fontWeight={'bold'} component={'span'} >Dev</Typography>
                        </div>
                        <div className="number-version">
                            <Typography fontSize={11} fontFamily={'sans-serif'} fontWeight={'bold'} component={'span'} >Versão 1.0 - </Typography>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="button-open-submenu-mobile" onClick={() => toggleShowMenu()}>
                <MenuIcon fontSize='small' />
            </div>
            {
                showMenuMobile ? (
                    <div className="submenu-mobile">
                        <nav>
                            <ul>
                                <Link to="/dashboard/home">
                                    <li>
                                        <HomeRoundedIcon fontSize='small' />
                                    </li>
                                </Link>
                                <Link to="/dashboard/register">
                                    <li>
                                        <FormatListBulletedIcon fontSize='small' />
                                    </li>
                                </Link>
                                {
                                    permission === 'Admin' ? <Link to="/dashboard/admin">
                                        <li>
                                            <PersonIcon fontSize='small' />
                                        </li>
                                    </Link> : null
                                }
                            </ul>
                            <div className="version">
                                <div className="background-version" style={{ backgroundColor: '#54eb61' }} >
                                    <Typography fontSize={12} fontFamily={'sans-serif'} fontWeight={'bold'} component={'span'} >Dev</Typography>
                                </div>
                                <div className="number-version">
                                    <Typography fontSize={12} fontFamily={'sans-serif'} fontWeight={'bold'} component={'span'} >1.0</Typography>
                                </div>
                            </div>
                        </nav>
                    </div>
                ) : null
            }

        </Box>
    )
}