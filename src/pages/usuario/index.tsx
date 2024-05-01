import React, { useEffect, useState } from 'react';
import { Header } from '../../components/headerComponent';
import { TableUsersComponent } from '../../components/tableUsersComponent'
import { Button, TextField, Typography } from '@mui/material';
import './style.css'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../../api';
import { UserFormComponent } from '../../components/userFormComponent';

export const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [operation, setOperation] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await api.get(`/userList`);

                if (data && data.status === 1) {
                    setUsers(data.data)
                    setColumns(data.columns)
                }
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();
    }, [users]);

    const openAdd = () => {
        !showAdd ? setShowAdd(true) : setShowAdd(false);
        setOperation('register')
    }

    return (
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
                    <div onClick={() => openAdd()} className='circle-add'>
                        <AddIcon />
                    </div>
                </div>
                <div className="data-null">
                    {users.length >= 1 ? (
                        <div className='box-data'>
                            <div className="box-filter">
                                <div className='fields'>
                                    <div className="fields-filter">
                                        <TextField color='success' style={{ marginLeft: 20 }} id="standard-basic" label="Nome" variant="standard" size='small' />
                                        <TextField color='success' id="standard-basic" label="Email" variant="standard" size='small' />
                                    </div>
                                    <div className="search-button">
                                        <Button className='button' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                                    </div>
                                </div>
                            </div>
                            <TableUsersComponent data={users} columns={columns} />
                        </div>
                    ) : (
                        <Typography component={'span'}>Não existe usuários cadastrados</Typography>
                    )}
                </div>
                {showAdd ? <UserFormComponent operation={operation} /> : null}
            </div>
        </div>
    )
}