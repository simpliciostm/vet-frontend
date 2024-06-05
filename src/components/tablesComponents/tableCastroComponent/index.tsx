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

interface props {
    data: {
        _id: string,
        species: string,
        sexy: string,
        name: string,
        color: string,
        size: string,
        chip: string,
        intercorrencia: string,
        createdAt: Date,
        updatedAt: Date,
        name_tutor: string,
        cpf: string,
        phone: string,
        city: string,
        address: string,
        district: string,
        nis: string
    }[];
    columns: string[];
}

interface cads {
    _id: string,
    species: string,
    sexy: string,
    name: string,
    color: string,
    size: string,
    chip: string,
    intercorrencia: string,
    createdAt: Date,
    updatedAt: Date,
    name_tutor: string,
    cpf: string,
    phone: string,
    city: string,
    address: string,
    district: string,
    nis: string
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
        <div>
            <TableContainer sx={{ border: '1px solid #751b1b', padding: '10px' }} component={Paper} >
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
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.species}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{row.sexy}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.name}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.color}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{row.size + 'kg'}</TableCell>
                                <TableCell sx={{ minWidth: "120px", textAlign: 'center' }} >{row.chip}</TableCell>
                                <TableCell sx={{ minWidth: "180px", textAlign: 'center' }} >{row.nis}</TableCell>
                                <TableCell sx={{ minWidth: "800px", textAlign: 'center' }} >{row.intercorrencia}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{moment(row.updatedAt).format("DD/MM/YYYY")}</TableCell>
                                <TableCell sx={{ width: "550px", textAlign: 'center' }} >{row.name_tutor}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.cpf}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.phone}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.city}</TableCell>
                                <TableCell sx={{ minWidth: "180px", textAlign: 'center' }} >{row.address}</TableCell>
                                <TableCell sx={{ minWidth: "150px", textAlign: 'center' }} >{row.district}</TableCell>
                                <TableCell>
                                    <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                        <button style={{ background: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openDeleteConfirm(e, row._id)}><DeleteIcon style={{ cursor: 'pointer' }} htmlColor='#ff6360' fontSize='small' /></button>
                                        <button style={{ background: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openUpdateCads(e, row, row._id)}><EditIcon style={{ cursor: 'pointer' }} htmlColor='#6067ff' fontSize='small' /></button>
                                        <button style={{ background: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openViewUser(e, row._id)} ><VisibilityIcon style={{ cursor: 'pointer' }} htmlColor='#ffae60' fontSize='small' /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {deleteConfirm ? <DeleteCadsConfirmComponent msg='Tem certeza que deseja deletar esse registro ?' id={idCads} onClose={closeModalConfirmDelete} /> : null}
            {openModalUpdate ? <RegisterFormComponent
                operation='update'
                id={idCads}
                name={user.name}
                address={user.address}
                chip={user.chip}
                city={user.city}
                color={user.color}
                cpf={user.cpf}
                date={user.date}
                district={user.district}
                intercorrencia={user.intercorrencia}
                name_tutor={user.name_tutor}
                phone={user.phone}
                sexy={user.sexy}
                size={user.size}
                species={user.species}
                nis={user.nis}
                onClose={closeModalUpdate} /> : null}
            {openModalView ? <RegisterFormComponent operation='view' id={idCads} onClose={closeModalView} /> : null}
        </div>
    )
}