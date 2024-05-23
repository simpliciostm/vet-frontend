import React, { useEffect, useState } from 'react';
import { Header } from '../../components/headerComponent';
import { TableUsersComponent } from '../../components/tableUsersComponent'
import { Button, TextField, Typography } from '@mui/material';
import './style.css'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../../api';
import { UserFormComponent } from '../../components/userFormComponent';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
interface filterProps {
    name: string,
    email: string
}

export const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [operation, setOperation] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPagination] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [filterUser, setFilterUser] = useState<filterProps>({ name: '', email: '' });
    const [totalPageLastClick, setTotalPageLastClick] = useState(0);
    const [disableButtonNext, setDisableButtonNext] = useState(false);
    const [disableButtonBack, setDisableButtonBack] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getUsers(filterUser, currentPage);
        const pagesNumbers = Math.ceil(totalUsers / 5);
        if (pagesNumbers - 1 === totalPageLastClick) setDisableButtonNext(true);
        if (totalPageLastClick === 0) setDisableButtonBack(true);

    }, [users, filterUser, totalPageLastClick, totalUsers, currentPage]);

    const getUsers = async (filter: filterProps, currentPage: number) => {
        try {
            const { data } = await api.post(`/userList/${currentPage}/${5}`, {
                filter
            });

            switch (data.status) {
                case 1:
                    setUsers(data.data);
                    setTotalUsers(data.total);
                    setColumns(data.columns);
                    break;

                case 0:
                    setUsers([]);
                    setMsg(data.msg);
                    break;
            }

        } catch (err) {
            console.log(err);
        }
    }

    const openAdd = () => {
        !showAdd ? setShowAdd(true) : setShowAdd(false);
        setOperation('register');
    }

    const clearFilter = async (e: any) => {
        e.preventDefault();
        setFilterUser({
            name: '',
            email: ''
        });
        setNameFilter('');
        setEmailFilter('');
    }

    const applyFilter = async (e: any) => {
        e.preventDefault();
        setFilterUser({
            name: nameFilter,
            email: emailFilter
        });
    }
 
    const nextPagination = async () => {
        setTotalPageLastClick(totalPageLastClick + 1);
        setCurrentPagination(currentPage + 5);
        await getUsers(filterUser ,currentPage)
        setDisableButtonBack(false);
    }

    const backPagination = async () => {
        setTotalPageLastClick(totalPageLastClick - 1);
        setCurrentPagination(currentPage - 5);
        await getUsers(filterUser ,currentPage)
        setDisableButtonNext(false)
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
                <div className='box-data'>
                    <div className="box-filter-users">
                        <div className='fields-users'>
                            <div className="fields-filter">
                                <TextField focused={false} value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} color='primary' style={{ marginLeft: 20 }} id="outlined-basic" label="Nome" variant="outlined" size='small' />
                                <TextField focused={false} value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} color='primary' id="outlined-basic" label="Email" variant="outlined" size='small' />
                            </div>
                            <div className="search-button-users">
                                <Button size='small' onClick={(e) => applyFilter(e)} className='button-filter-users' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                                <Button size='small' onClick={(e) => clearFilter(e)} className='button-remove-filter-users' variant="contained" ><ClearIcon fontSize='small' /></Button>
                            </div>
                        </div>
                    </div>
                    {
                        users.length >= 1 ? (
                            <>
                                <TableUsersComponent data={users} columns={columns} />
                                <div className="table-users-pagination">
                                    <div className="table-users-quantity">
                                        <Typography component={'span'} fontFamily={'sans-serif'}>Qtd: {totalUsers}</Typography>
                                    </div>
                                    <div className="table-users-button">
                                        <button className={disableButtonBack ? 'button-pagination-user-disabled' : 'button-pagination-user'} disabled={disableButtonBack} onClick={() => backPagination()} ><KeyboardArrowLeftIcon /></button>
                                        <button className={disableButtonNext ? 'button-pagination-user-disabled' : 'button-pagination-user'} disabled={disableButtonNext} onClick={() => nextPagination()}><KeyboardArrowRightIcon /></button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <Typography>{msg}</Typography>
                            </div>
                        )
                    }
                </div>
                {showAdd ? <UserFormComponent operation={operation} /> : null}
            </div>
        </div>
    )
}