import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/headerComponent';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, TextField, Typography } from '@mui/material';
import api from '../../../api';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TableCityComponent } from '../../../components/tablesComponents/tableCityComponent';
import { CityFormComponent } from '../../../components/registerModalsComponent/cityFormComponent';
import './style.css';

interface filterProps {
    name: string,
    email: string
}

export const City = () => {
    const [city, setCity] = useState([]);
    const [columns, setColumns] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [operation, setOperation] = useState('');
    const [codeFilter, setCodeFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPagination] = useState(0);
    const [totalCity, setCityTotal] = useState(0);
    const [filterUser, setFilterUser] = useState(Object);
    const [totalPageLastClick, setTotalPageLastClick] = useState(0);
    const [disableButtonNext, setDisableButtonNext] = useState(false);
    const [disableButtonBack, setDisableButtonBack] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getUsers(filterUser, currentPage);
        const pagesNumbers = Math.ceil(totalCity / 5);
        if (pagesNumbers - 1 === totalPageLastClick) setDisableButtonNext(true);
        if (totalPageLastClick === 0) setDisableButtonBack(true);
    }, [filterUser, currentPage, totalPageLastClick, totalCity]);

    const getUsers = async (filter: filterProps, currentPage: number) => {
        try {
            const { data } = await api.post(`/cityList/${currentPage}/${5}`, {
                filter
            });

            switch (data.status) {
                case 1:
                    setCity(data.data);
                    setCityTotal(data.total);
                    setColumns(data.columns);
                    break;

                case 0:
                    setCity([]);
                    setMsg(data.msg);
                    break;
            }

        } catch (err) {
            console.log(err);
        }
    }

    const openAdd = () => {
        setShowAdd(true);
        setOperation('register');
    }

    const clearFilter = async (e: any) => {
        e.preventDefault();
        setFilterUser({
            name: '',
            code: ''
        });
        setNameFilter('');
        setCodeFilter('');
    }

    const applyFilter = async (e: any) => {
        e.preventDefault();
        setFilterUser({
            name: nameFilter,
            code: codeFilter
        });
    }

    const nextPagination = async () => {
        setTotalPageLastClick(totalPageLastClick + 1);
        setCurrentPagination(currentPage + 5);
        await getUsers(filterUser, currentPage);
        setDisableButtonBack(false);
    }

    const backPagination = async () => {
        setTotalPageLastClick(totalPageLastClick - 1);
        setCurrentPagination(currentPage - 5);
        await getUsers(filterUser, currentPage);
        setDisableButtonNext(false)
    }

    const closeModal = () => {
        setShowAdd(false);
    }


    return (
        <div>
            <Header />
            <div className='city-box'>
                <div className="box-link">
                    <Link className='link' to="/dashboard/admin"><Typography>Painel de Admin</Typography></Link>
                    <ArrowForwardIosIcon style={{ color: 'rgba(0,0,0,0.5)' }} fontSize='small' />
                    <Link className='link' to="/dashboard/admin/city"><Typography>Cadastro de Cidades</Typography></Link>
                </div>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registros de Cidades</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>adicionar</Typography> cidades</Typography>
                </div>
                <div className="box-add">
                    <Button onClick={() => openAdd()} >Adicionar novo registro</Button>
                </div>
                <div className='box-data'>
                    <div className="box-filter-city">
                        <div className='fields-city'>
                            <div className="fields-filter">
                                <TextField value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} style={{ marginLeft: 20 }} label="Cidade" variant="outlined" size='small' />
                                <TextField value={codeFilter} onChange={(e) => setCodeFilter(e.target.value)} label="Estado" variant="outlined" size='small' />
                            </div>
                            <div className="search-button-city">
                                <Button size='small' onClick={(e) => applyFilter(e)} className='button-filter-city' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                                <Button size='small' onClick={(e) => clearFilter(e)} className='button-remove-filter-city' variant="contained" ><ClearIcon fontSize='small' /></Button>
                            </div>
                        </div>
                    </div>
                    {
                        city.length >= 1 ? (
                            <>
                                <TableCityComponent data={city} columns={columns} />
                                <div className="table-city-pagination">
                                    <div className="table-city-quantity">
                                        <Typography component={'span'} fontFamily={'sans-serif'}>Qtd: {totalCity}</Typography>
                                    </div>
                                    <div className="table-city-button">
                                        <button className={disableButtonBack ? 'button-pagination-city-disabled' : 'button-pagination-city'} disabled={disableButtonBack} onClick={() => backPagination()} ><KeyboardArrowLeftIcon /></button>
                                        <button className={disableButtonNext ? 'button-pagination-city-disabled' : 'button-pagination-city'} disabled={disableButtonNext} onClick={() => nextPagination()}><KeyboardArrowRightIcon /></button>
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
                {showAdd ? <CityFormComponent operation={operation} onClose={closeModal} /> : null}
            </div>
        </div>
    )
}