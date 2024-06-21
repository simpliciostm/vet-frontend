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
import { DeleteCadsConfirmComponent } from '../../deleteComponent/deleteCadsConfirmComponent';
import { RegisterFormComponent } from '../../registerModalsComponent/registerFormComponent';
import moment from 'moment';
import './style.css';

interface props {
    data: {
        _id: string,
        animal: {
            species: string,
            sexy: string,
            name: string,
            color: string,
            size: string,
            year: string,
            chip: string,
            intercorrencia: string,
            nis: string
        }
        createdAt: Date,
        updatedAt: Date,
        name_tutor: string,
        cep: string,
        cpf: string,
        phone: string,
        city: {
            name: string,
            code: string
        },
        address: string,
        district: string,
        number_residence: number,
    }[];
    columns: string[];
}

interface cads {
    _id: string,
    animal: {
        species: string,
        sexy: string,
        name: string,
        color: string,
        size: string,
        year: string,
        chip: string,
        intercorrencia: string,
        nis: string,
    },
    createdAt: Date,
    updatedAt: Date,
    name_tutor: string,
    cep: string,
    cpf: string,
    phone: string,
    city: {
        name: string,
        code: string
    },
    address: string,
    district: string,
    number_residence: number,
}

export const TableRegisterCadsComponent = ({ data, columns }: props) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [idCads, setIdCads] = useState('');
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [user, setUser] = useState(Object);

    const openDeleteConfirm = (e: any, id: string) => {
        e.preventDefault();
        setIdCads(id);
        !deleteConfirm ? setDeleteConfirm(true) : setDeleteConfirm(false);
    }

    const openUpdateCads = (e: any, data: cads, id: string) => {
        e.preventDefault();
        setUser(data)
        setIdCads(id)
        !openModalUpdate ? setOpenModalUpdate(true) : setOpenModalUpdate(false);
    }

    const openViewUser = (e: any, id: string) => {
        e.preventDefault();
        setIdCads(id);
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
        <div className='container-table-register'>
            <TableContainer className='table' sx={{ border: '1px solid #751b1b', padding: '10px' }} component={Paper} >
                <Table sx={{ padding: '7px', overflowX: 'auto' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col: string) => (
                                <TableCell style={{ color: '#751b1b', fontWeight: 'bold', textTransform: 'uppercase' }} key={col} align='center'>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: cads) => (
                            <TableRow
                                key={row._id}
                                sx={{ border: 0 }}
                                hover
                            >
                                <TableCell>
                                    <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                        <button style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openDeleteConfirm(e, row._id)}><DeleteIcon style={{ cursor: 'pointer', fontSize: 15 }} htmlColor='#ff6360' fontSize='small' /></button>
                                        <button style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openUpdateCads(e, row, row._id)}><EditIcon style={{ cursor: 'pointer', fontSize: 15 }} htmlColor='#6067ff' fontSize='small' /></button>
                                        <button style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openViewUser(e, row._id)} ><VisibilityIcon style={{ cursor: 'pointer', fontSize: 15 }} htmlColor='#ffae60' fontSize='small' /></button>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.animal.species}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{row.animal.sexy}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.animal.name}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.animal.color}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{row.animal.size + 'kg'}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{row.animal.year}</TableCell>
                                <TableCell sx={{ minWidth: "120px", textAlign: 'center' }} >{row.animal.chip}</TableCell>
                                <TableCell sx={{ minWidth: "180px", textAlign: 'center' }} >{row.animal.nis}</TableCell>
                                <TableCell sx={{ minWidth: "800px", textAlign: 'center' }} >{row.animal.intercorrencia}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{moment(row.updatedAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.name_tutor}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.cep}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.cpf}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.phone}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.city.name}</TableCell>
                                <TableCell sx={{ minWidth: "250px", textAlign: 'center' }} >{row.address}</TableCell>
                                <TableCell sx={{ minWidth: "200px", textAlign: 'center' }} >{row.number_residence}</TableCell>
                                <TableCell sx={{ minWidth: "250px", textAlign: 'center' }} >{row.district}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {deleteConfirm ? <DeleteCadsConfirmComponent msg='Tem certeza que deseja deletar esse registro ?' id={idCads} onClose={closeModalConfirmDelete} /> : null}
            {openModalUpdate ? <RegisterFormComponent operation='update'id={idCads} onClose={closeModalUpdate} /> : null}
            {openModalView ? <RegisterFormComponent operation='view' id={idCads} onClose={closeModalView} /> : null}
        </div>
    )
}