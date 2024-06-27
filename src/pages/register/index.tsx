import React, { useEffect, useState } from 'react';
import { Header } from '../../components/headerComponent';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import './style.css'
import api from '../../api';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TableRegisterCadsComponent } from '../../components/tablesComponents/tableCastroComponent';
import { RegisterFormComponent } from '../../components/registerModalsComponent/registerFormComponent';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import { ExportRegisterComponent } from '../../components/exportReportComponent/exportRegisterComponent';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker';
import InputMask from 'react-input-mask';

interface filterCadsProps {
    idCastration: string,
    name_tutor: string,
    cpf: string,
    city: string
}

export const Register = () => {
    const [cads, setCads] = useState([]);
    const [columns, setColumns] = useState([]);
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [operation, setOperation] = useState<string>('');
    const [cpfRegisterFilter, setCpfRegisterFilter] = useState<string>('');
    const [tutorRegisterCadsFilter, setTutorRegisterCadFilter] = useState<string>('');
    const [cityRegisterFilter, setCityRegisterFilter] = useState<string>('');
    const [chipRegisterFilter, setChipRegisterFilter] = useState<string>('');
    const [idCastrationFilter, setIdCastrationFilter] = useState<string>('');
    const [dateStart, setDateStart] = useState<string | any>('');
    const [dateEnd, setDateEnd] = useState<string | any>('');
    const [currentPage, setCurrentPagination] = useState<number>(0);
    const [totalCads, setTotalCads] = useState<number>(0);
    const [filterCads, setFilterCads] = useState<filterCadsProps>(Object);
    const [totalPageLastClick, setTotalPageLastClick] = useState<number>(0);
    const [disableButtonNext, setDisableButtonNext] = useState<boolean>(false);
    const [disableButtonBack, setDisableButtonBack] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');
    const [closeExport, setCloseExport] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        timer()
        getCads(filterCads, currentPage);
        const pagesNumbers = Math.ceil(totalCads / 5);
        if (pagesNumbers - 1 === totalPageLastClick) setDisableButtonNext(true);
        if (totalPageLastClick === 0) setDisableButtonBack(true);
    }, [filterCads, currentPage, totalPageLastClick, totalCads]);

    const getCads = async (filter: filterCadsProps, currentPage: number) => {
        try {
            const { data } = await api.post(`/cadsList/${currentPage}/${5}`, {
                filter,
                dateStart,
                dateEnd
            });

            switch (data.status) {
                case 1:
                    timer()
                    setLoading(true);
                    setCads(data.data);
                    setTotalCads(data.total);
                    setColumns(data.columns);
                    break;

                case 0:
                    timer();
                    setLoading(true);
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
            idCastration: '',
            name_tutor: '',
            cpf: '',
            city: ''
        });
        setTutorRegisterCadFilter('');
        setCpfRegisterFilter('');
        setDateStart('');
        setDateEnd('');
        setCityRegisterFilter('');
        setIdCastrationFilter('');
    }

    const applyFilter = async (e: any) => {
        e.preventDefault();
        setFilterCads({
            idCastration: idCastrationFilter,
            name_tutor: tutorRegisterCadsFilter,
            cpf: cpfRegisterFilter,
            city: cityRegisterFilter
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

    const closeExportModal = () => {
        setCloseExport(false);
    }

    const timer = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
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
                            <div className="fields-filter">
                                <TextField value={idCastrationFilter} onChange={(e) => setIdCastrationFilter(e.target.value)} style={{ width: '120px', marginLeft: 20 }} label="ID" variant="outlined" size='small' />
                                <TextField value={tutorRegisterCadsFilter} onChange={(e) => setTutorRegisterCadFilter(e.target.value)} style={{ width: '120px', marginLeft: 20 }} label="Tutor" variant="outlined" size='small' />
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar=" "
                                    value={cpfRegisterFilter}
                                    onChange={(e: any) => setCpfRegisterFilter(e.target.value)}
                                    placeholder='CPF'
                                    className='input-mask-style'
                                    style={{ borderRadius: '5px', height: '39px', outline: 'none', fontSize: '17px', width: '150px', color: "rgba(0,0,0,0.9)", padding: '15px' }} />
                                <TextField sx={{ width: '85px' }} value={cityRegisterFilter} onChange={(e) => setCityRegisterFilter(e.target.value)} label="Cidade" variant="outlined" size='small' />
                                <TextField inputProps={{ maxLength: 15 }} type='text' variant='outlined' label='Microship' size='small' sx={{ width: '160px' }} value={chipRegisterFilter} onChange={(e: any) => setChipRegisterFilter(e.target.value)} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer sx={{ overflow: 'hidden', height: '55px', width: '200px' }} components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Data Ínicio"
                                            value={dateStart ? dateStart : null}
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(e) => setDateStart(e)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer sx={{ overflow: 'hidden', height: '55px', width: '200px' }} components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Data Final"
                                            value={dateEnd ? dateEnd : null}
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(e) => setDateEnd(e)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="search-button-cads">
                                <Button onClick={() => setCloseExport(true)} size='small' className='button-export-cads' variant='contained' endIcon={<BackupTableRoundedIcon />} >exportar</Button>
                                <Button type='submit' size='small' className='button-filter-cads' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                                <Button size='small' onClick={(e) => clearFilter(e)} className='button-remove-filter-cads' variant="contained" ><ClearIcon fontSize='small' /></Button>
                            </div>
                        </div>
                    </form>
                    {
                        cads.length >= 1 ? (
                            <>
                                {
                                    loading ? (
                                        <div className='container-loading-table'>
                                            <CircularProgress />
                                        </div>
                                    ) : (
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
                                    )
                                }
                            </>
                        ) : (
                            <div>
                                <Typography>{msg}</Typography>
                            </div>
                        )
                    }
                </div>
                {showAdd ? <RegisterFormComponent operation={operation} onClose={closeModal} /> : null}
                {closeExport ? (<ExportRegisterComponent onClose={closeExportModal} />) : null}
            </div>
        </div>
    )
}