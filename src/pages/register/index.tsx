import React, { useEffect, useState } from 'react';
import { Header } from '../../components/headerComponent';
import { Button, TextField, Typography } from '@mui/material';
import './style.css'
import api from '../../api';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TableRegisterCadsComponent } from '../../components/tablesComponents/tableCastroComponent';
import { RegisterFormComponent } from '../../components/registerModalsComponent/registerFormComponent';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
interface filterCadsProps {
    name_tutor: string,
    cpf: string
}

export const Register = () => {
    const [cads, setCads] = useState([]);
    const [columns, setColumns] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [operation, setOperation] = useState('');
    const [cpfRegisterFilter, setCpfRegisterFilter] = useState('');
    const [tutorRegisterCadsFilter, setTutorRegisterCadFilter] = useState('');
    const [cityRegisterFilter, setCityRegisterFilter] = useState('');
    const [chipRegisterFilter, setChipRegisterFilter] = useState('');
    const [nisRegisterFilter, setNisRegisterFilter] = useState('');
    const [currentPage, setCurrentPagination] = useState(0);
    const [totalCads, setTotalCads] = useState(0);
    const [filterCads, setFilterCads] = useState<filterCadsProps>(Object);
    const [totalPageLastClick, setTotalPageLastClick] = useState(0);
    const [disableButtonNext, setDisableButtonNext] = useState(false);
    const [disableButtonBack, setDisableButtonBack] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCads(filterCads, currentPage);
        const pagesNumbers = Math.ceil(totalCads / 5);
        if (pagesNumbers - 1 === totalPageLastClick) setDisableButtonNext(true);
        if (totalPageLastClick === 0) setDisableButtonBack(true);
    }, [filterCads, currentPage, totalPageLastClick, totalCads]);

    const getCads = async (filter: filterCadsProps, currentPage: number) => {
        try {
            const { data } = await api.post(`/cadsList/${currentPage}/${5}`, {
                filter
            });

            switch (data.status) {
                case 1:
                    setCads(data.data);
                    setTotalCads(data.total);
                    setColumns(data.columns);
                    break;

                case 0:
                    setCads([]);
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
        setFilterCads({
            name_tutor: '',
            cpf: ''
        });
        setTutorRegisterCadFilter('');
        setCpfRegisterFilter('');
    }

    const applyFilter = async (e: any) => {
        e.preventDefault();
        setFilterCads({
            name_tutor: tutorRegisterCadsFilter,
            cpf: cpfRegisterFilter
        });
    }

    const nextPagination = async () => {
        setTotalPageLastClick(totalPageLastClick + 1);
        setCurrentPagination(currentPage + 5);
        await getCads(filterCads, currentPage);
        setDisableButtonBack(false);
    }

    const backPagination = async () => {
        setTotalPageLastClick(totalPageLastClick - 1);
        setCurrentPagination(currentPage - 5);
        await getCads(filterCads, currentPage);
        setDisableButtonNext(false)
    }

    const closeModal = () => {
        setShowAdd(false);
    }

    return (
        <div>
            <Header />
            <div className='cads-box'>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registros de Consultas</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>adicionar</Typography> consultas</Typography>
                </div>
                <div className="box-add">
                    <Button onClick={() => openAdd()} >Adicionar nova consulta</Button>
                </div>
                <div className='box-data'>
                    <form action="" onSubmit={(e: any) => applyFilter(e)}>
                        <div className="box-filter-cads">
                            <div className='fields-cads'>
                                <div className="fields-filter">
                                    <TextField value={tutorRegisterCadsFilter} onChange={(e) => setTutorRegisterCadFilter(e.target.value)} style={{ marginLeft: 20 }} label="Tutor" variant="outlined" size='small' />
                                    <TextField value={cpfRegisterFilter} onChange={(e) => setCpfRegisterFilter(e.target.value)} label="CPF" variant="outlined" size='small' />
                                    <TextField value={cityRegisterFilter} onChange={(e) => setCityRegisterFilter(e.target.value)} label="Cidade" variant="outlined" size='small' />
                                    <TextField value={chipRegisterFilter} onChange={(e) => setChipRegisterFilter(e.target.value)} label="MicroChip" variant="outlined" size='small' />
                                    <TextField value={nisRegisterFilter} onChange={(e) => setNisRegisterFilter(e.target.value)} label="NIS" variant="outlined" size='small' />
                                </div>
                                <div className="search-button-cads">
                                    <Button size='small' className='button-export-cads' variant='contained' endIcon={<BackupTableRoundedIcon />} >exportar</Button>
                                    <Button type='submit' size='small' className='button-filter-cads' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                                    <Button size='small' onClick={(e) => clearFilter(e)} className='button-remove-filter-cads' variant="contained" ><ClearIcon fontSize='small' /></Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {
                        cads.length >= 1 ? (
                            <>
                                <TableRegisterCadsComponent data={cads} columns={columns} />
                                <div className="table-cads-pagination">
                                    <div className="table-cads-quantity">
                                        <Typography component={'span'} fontFamily={'sans-serif'}>Qtd: {totalCads}</Typography>
                                    </div>
                                    <div className="table-cads-button">
                                        <button className={disableButtonBack ? 'button-pagination-cads-disabled' : 'button-pagination-cads'} disabled={disableButtonBack} onClick={() => backPagination()} ><KeyboardArrowLeftIcon /></button>
                                        <button className={disableButtonNext ? 'button-pagination-cads-disabled' : 'button-pagination-cads'} disabled={disableButtonNext} onClick={() => nextPagination()}><KeyboardArrowRightIcon /></button>
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
                {showAdd ? <RegisterFormComponent operation={operation} onClose={closeModal} /> : null}
            </div>
        </div>
    )
}