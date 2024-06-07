import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CityFormComponent } from '../../registerModalsComponent/cityFormComponent';
import moment from 'moment';
import { DeleteCityConfirmComponent } from '../../deleteComponent/deleteCityComponent';

interface props {
    data: {
        _id: number,
        name: string,
        code: string,
        createdAt: Date,
        updatedAt: Date,
    }[];
    columns: string[];
}

interface city {
    _id: string,
    name: string,
    code: string,
    createdAt: Date,
    updatedAt: Date,
}

export const TableCityComponent = ({ data, columns }: props) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [idCity, setIdCity] = useState('');
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [city, setCity] = useState(Object);

    const openDeleteConfirm = (e: any, id: string) => {
        e.preventDefault();
        setIdCity(id);
        !deleteConfirm ? setDeleteConfirm(true) : setDeleteConfirm(false);
    }

    const openUpdateCity = (e: any, data: city, id: string) => {
        e.preventDefault();
        setCity(data)
        setIdCity(id)
        !openModalUpdate ? setOpenModalUpdate(true) : setOpenModalUpdate(false);
    }

    const openViewCity = (e: any, id: string) => {
        e.preventDefault();
        setIdCity(id);
        !openModalView ? setOpenModalView(true) : setOpenModalView(false);
    }

    const closeModalView = () => {
        setOpenModalView(false);
    }

    const closeModalUpdate = () => {
        setOpenModalUpdate(false);
    }

    const closeModalConfirmDelete = () => {
        setDeleteConfirm(false);
    }

    return (
        <div style={{ width: '100%' }}>
            <TableContainer sx={{ border: '1px solid #751b1b', padding: '10px' }} component={Paper}>
                <Table sx={{ width: '100%', padding: '7px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col: string) => (
                                <TableCell style={{ color: '#751b1b', fontWeight: 'bold', textTransform: 'uppercase' }} key={col} align='left'>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => (
                            <TableRow
                                key={row._id}
                                sx={{ border: 0 }}
                                hover
                            >
                                <TableCell sx={{ width: '500px' }} >{row.name}</TableCell>
                                <TableCell sx={{ width: '500px' }}>{row.code}</TableCell>
                                <TableCell sx={{ width: '500px' }}>{moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell sx={{ width: '500px' }}>{moment(row.updatedAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>
                                    <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                        <button style={{ background: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openDeleteConfirm(e, row._id)}><DeleteIcon style={{ cursor: 'pointer' }} htmlColor='#ff6360' fontSize='small' /></button>
                                        <button style={{ background: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openUpdateCity(e, row, row._id)}><EditIcon style={{ cursor: 'pointer' }} htmlColor='#6067ff' fontSize='small' /></button>
                                        <button style={{ background: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openViewCity(e, row._id)} ><VisibilityIcon style={{ cursor: 'pointer' }} htmlColor='#ffae60' fontSize='small' /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {deleteConfirm ? <DeleteCityConfirmComponent msg='Tem certeza que deseja deletar essa cidade ?' id={idCity} onClose={closeModalConfirmDelete} /> : null}
            {openModalUpdate ? <CityFormComponent operation='update' id={idCity} name={city.name} code={city.code} onClose={closeModalUpdate} /> : null}
            {openModalView ? <CityFormComponent operation='view' id={idCity} onClose={closeModalView} /> : null}
        </div>
    )
}