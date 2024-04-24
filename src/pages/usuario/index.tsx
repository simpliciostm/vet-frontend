import React from 'react';
import { Header } from '../../components/headerComponent';
import { TableUsersComponent } from '../../components/tableUsersComponent'
import { Button, TextField, Typography } from '@mui/material';
import './style.css'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Usuarios = () => {

    const data = [
        {
            id: 1,
            name: 'Félina',
            email: 'M'
        },
        {
            id: 2,
            name: 'Félina',
            email: 'M'
        },
        {
            id: 3,
            name: 'Félina',
            email: 'M'
        },
        {
            id: 4,
            name: 'Félina',
            email: 'M'
        },
        {
            id: 5,
            name: 'Félina',
            email: 'M'
        },
    ]

    const columns = [
        'Número',
        'Nome',
        'Email',
    ]

    return(
        <div>
            <Header />
            <div className='user-box'>
                <div className="box-link">
                    <Link className='link' to="/dashboard/admin"><Typography>Painel de Admin</Typography></Link>
                    <ArrowForwardIosIcon style={{ color: 'rgba(0,0,0,0.5)' }} fontSize='small' />
                    <Link className='link' to="/dashboard/admin/users"><Typography>Usuários</Typography></Link>
                </div>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registros de Usuários</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>adicionar</Typography> registro de usuários</Typography>
                </div>
                <div className="box-add">
                    <Typography component='span' fontSize={21}>Adicionar novo registro</Typography>
                    <div className='circle-add'>
                        <AddIcon />
                    </div>
                </div>
                <div className="box-filter">
                    <div className='fields'>
                        <div className="fields-filter">
                            <TextField color='success' style={{ marginLeft: 20 }} id="standard-basic" label="Nome" variant="standard" size='small' />
                            <TextField color='success' id="standard-basic" label="Email" variant="standard" size='small' />
                        </div>
                        <div className="search-button">
                            <Button color='success' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                        </div>
                    </div>
                </div>
                <TableUsersComponent data={data} columns={columns} />
            </div>
        </div>
    )
}