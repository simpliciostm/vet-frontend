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
import img from '../../assets/images/logo-new.png';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const Header = () => {
    const [name, setName] = useState<string>('');
    const [permission, setPermission] = useState<string>('');
    const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [nameHeaderFirst, setNameHeaderFirst] = useState<string>('');
    const [nameHeaderSecond, setNameHeaderSecond] = useState<string>('');
    const [selectedMenu, setSelectedMenu] = useState<string>('');

    useEffect(() => {
        const loadUserInfo = async () => {
            const idUser = getStorage('id');
            if (idUser) {
                const response = await api.get(`/user/${idUser}`);
                if (response.data && response.data.status === 1) {
                    setName(response.data.data.name);
                    setPermission(response.data.data.permissions.name_permission)
                    const nameSplit = name.split(" ");
                    if (nameSplit[0] && nameSplit[0][0]) setNameHeaderFirst(nameSplit[0][0]);
                    if (nameSplit[1] && nameSplit[1][0]) setNameHeaderSecond(nameSplit[1][0]);
                }
            }
        }

        loadUserInfo();
    }, [name, nameHeaderFirst, nameHeaderSecond])


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
                                <Typography component={'span'} fontSize={16} fontWeight={'bold'} >
                                    {nameHeaderFirst}
                                    {nameHeaderSecond}
                                </Typography>
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
                        <Link onClick={() => setSelectedMenu('/dashboard/home')} to="/dashboard/home">
                            <li id={selectedMenu === '/dashboard/home' ? 'selected-menu' : ''} title='ínicio'>
                                <HomeRoundedIcon fontSize='small' />Início
                            </li>
                        </Link>
                        <Link onClick={() => setSelectedMenu('/dashboard/register')} to="/dashboard/register">
                            <li id={selectedMenu === '/dashboard/register' ? 'selected-menu' : ''} title='castrações'>
                                <FormatListBulletedIcon fontSize='small' />Castrações
                            </li>
                        </Link>
                        {
                            permission === 'Admin' ? <Link onClick={() => setSelectedMenu('/dashboard/admin')} to="/dashboard/admin">
                                <li id={selectedMenu === '/dashboard/admin' ? 'selected-menu' : ''} title='admin'>
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
                                    <li title='ínicio' >
                                        <HomeRoundedIcon fontSize='small' />
                                    </li>
                                </Link>
                                <Link to="/dashboard/register">
                                    <li title='castrações'>
                                        <FormatListBulletedIcon fontSize='small' />
                                    </li>
                                </Link>
                                {
                                    permission === 'Admin' ? <Link to="/dashboard/admin">
                                        <li title='admin'>
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