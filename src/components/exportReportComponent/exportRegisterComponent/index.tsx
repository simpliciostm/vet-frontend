import React, { useState } from 'react';
import "./style.css";
import { Button, TextField, Typography } from '@mui/material';
import api from '../../../api';
import fileDownload from 'js-file-download';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker';
import { ShowAlert } from '../../showAlertComponent';

interface exportProps {
    onClose: () => void;
}

export const ExportRegisterComponent = ({ onClose }: exportProps) => {
    const [city, setCity] = useState<string>('')
    const [name_tutor, setNameTutor] = useState<string>('')
    const [dateStart, setDateStart] = useState<string | any>('');
    const [dateEnd, setDateEnd] = useState<string | any>('');
    const [registers, setRegister] = useState([])
    const [columns, setColumns] = useState([])
    const [totalRegister, setTotalRegister] = useState<number>(Number)
    const [showExport, setShowExport] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')

    const submitReport = async (e: any) => {
        try {
            e.preventDefault()

            const filter = {
                city: city,
                name_tutor: name_tutor
            }

            const { data } = await api.post(`/cadsList/${0}/${0}`, {
                filter,
                dateStart,
                dateEnd
            })

            if (data && data.status === 1 && data.data.length >= 1) {
                setRegister(data.data)
                setTotalRegister(data.data.length)
                setColumns(data.columns)
                setShowExport(true)
            } else {
                setMsg(data.msg)
                setAlert(true)
                timerError()
            }

        } catch (err) {
            console.log(err)
        }
    }

    const closeShowExportModal = () => {
        showExport ? setShowExport(false) : setShowExport(true)
    }

    const exportCSV = async (e: any) => {
        try {
            e.preventDefault()

            await api.post('/report/register', {
                registers,
                columns,
                responseType: 'blob'
            }).then(res => {
                fileDownload(res.data, 'teste.csv')
            }).catch((err) => {
                console.log(err)
            })



        } catch (err) {
            console.log(err)
        }
    }

    const timerError = () => {
        setTimeout(() => {
            setAlert(false);
        }, 3000)
    }

    return (
        <div className="container-export-register">
            {
                !showExport ? (
                    <div className="modal-export-register">
                        <div className="title-modal-export">
                            <Typography component={'span'} color={'primary'} fontWeight={'bold'} fontSize={21} >Exportar Registros</Typography>
                            <Typography component={'span'} fontSize={15} >Você pode utilizar um filtro para exportação ou apenas exportar todo registro</Typography>
                        </div>
                        <form action="" onSubmit={(e) => submitReport(e)} >
                            <div className="title-form-export">
                                <Typography component={'span'} fontSize={19} color={'primary'} fontWeight={'bold'} >Filtros</Typography>
                            </div>
                            <div className="modal-fields-export">
                                <TextField variant='outlined' label='Cidade' size='small' sx={{ width: '200px' }} value={city} onChange={(e) => setCity(e.target.value)} />
                                <TextField variant='outlined' label='Tutor' size='small' sx={{ width: '200px' }} value={name_tutor} onChange={(e) => setNameTutor(e.target.value)} />
                            </div>
                            <div className="modal-fields-export">
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
                                    <DemoContainer sx={{ height: '55px', width: '200px' }} components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Data Final"
                                            value={dateEnd ? dateEnd : null}
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(e) => setDateEnd(e)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="button-close-modal-export">
                                <Button className='button-cancel' onClick={() => onClose()} sx={{ width: '150px' }}>Fechar</Button>
                                <Button className='button-save' type='submit' sx={{ width: '200px' }} variant="contained" >Ver Registros</Button>
                            </div>
                        </form>
                        {alert ? <ShowAlert status={'error'} msg={msg} /> : null}
                    </div>
                ) : (
                    <div className="modal-export-register">
                        <Typography component={'span'} fontSize={21} >Foi encontrado <Typography component={'span'} fontSize={20} color={'primary'} fontWeight={'bold'} >{totalRegister <= 1 ? `${totalRegister} registro` : null || totalRegister >= 2 ? `${totalRegister} registros` : null}</Typography> para exportação</Typography>
                        <div className="button-close-modal-export">
                            <Button className='button-cancel' onClick={() => closeShowExportModal()} sx={{ width: '150px' }}>Voltar</Button>
                            <Button onClick={(e) => exportCSV(e)} className='button-save' sx={{ width: '200px' }} variant="contained" >Exportar</Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

function setAlert(arg0: boolean) {
    throw new Error('Function not implemented.');
}

