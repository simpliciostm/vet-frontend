import React from 'react'
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

export const Header = () => {

    const logout = () => {
        window.location.href = '/'
        window.localStorage.clear()
    }

    return (
        <div className='header-box' style={{ position: 'fixed' }}>
            <Box>
                <AppBar position="static" color='inherit'>
                    <Toolbar className='nav-bar'>
                        <div className='logo'>
                            <Typography style={{ color: '#2e7d32' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                LOGO | NOME
                            </Typography>
                        </div>
                        <div className="user">
                            <MenuItem>
                                <IconButton
                                    size="small"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={3} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </MenuItem>
                            <Typography color={'inherit'}>Thiago Simplicio</Typography>
                            <MenuItem onClick={() => {}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircleIcon fontSize='large' />
                                </IconButton>
                            </MenuItem>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="submenu">
                    <nav>
                        <ul>
                            <li>
                                <HomeRoundedIcon fontSize='small' /><Link to="/dashboard/home">Início</Link>
                            </li>
                            <li>
                                <FormatListBulletedIcon fontSize='small' /><Link to="/dashboard/register">Castrações</Link>
                            </li>
                            <li>
                                <PersonIcon fontSize='small' /><Link to="/dashboard/usuarios">Admin</Link>
                            </li>
                            <li onClick={() => logout()} className="logout" style={{ cursor: 'pointer' }} >
                                <LogoutIcon fontSize={'small'} /><Typography fontFamily={'sans-serif'} fontSize={14} fontWeight={700}>Sair</Typography>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Box >
        </div >
    )
}