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
import { DeleteUserConfirmComponent } from '../../deleteComponent/deleteUserConfirmComponent';
import { UserFormComponent } from '../../registerModalsComponent/userFormComponent';

interface props {
    data: {
        _id: number,
        idUser: number,
        name: string,
        email: string,
        permissions: {
            _id: string,
            name_permission: string
        },
        createdAt: Date,
        updatedAt: Date,
        password: string
    }[];
    columns: string[];
}

interface user {
    _id: string,
    idUser: number,
    name: string,
    email: string,
    permissions: {
        _id: string,
        name_permission: string
    },
    createdAt: Date,
    updatedAt: Date,
    password: string
}

export const TableUsersComponent = ({ data, columns }: props) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);

    const openDeleteConfirm = (e: any, id: string) => {
        e.preventDefault();
        setIdUser(id);
        !deleteConfirm ? setDeleteConfirm(true) : setDeleteConfirm(false);
    }

    const openUpdateUser = (e: any, data: user, id: string) => {
        e.preventDefault();
        setIdUser(id)
        !openModalUpdate ? setOpenModalUpdate(true) : setOpenModalUpdate(false);
    }

    const openViewUser = (e: any, id: string) => {
        e.preventDefault();
        setIdUser(id);
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
            <TableContainer className='table' sx={{ border: '1px solid #751b1b', padding: '10px' }} component={Paper}>
                <Table sx={{ width: '100%', padding: '7px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col: string) => (
                                <TableCell style={{ color: '#751b1b', fontWeight: 'bold', textTransform: 'uppercase' }} key={col} align='center'>{col}</TableCell>
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
                                <TableCell>
                                    <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                        <button style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openDeleteConfirm(e, row._id)}><DeleteIcon style={{ cursor: 'pointer', fontSize: 15 }} htmlColor='#ff6360' fontSize='small' /></button>
                                        <button style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openUpdateUser(e, row, row._id)}><EditIcon style={{ cursor: 'pointer', fontSize: 15 }} htmlColor='#6067ff' fontSize='small' /></button>
                                        <button style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={(e) => openViewUser(e, row._id)} ><VisibilityIcon style={{ cursor: 'pointer', fontSize: 15 }} htmlColor='#ffae60' fontSize='small' /></button>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ width: '50px', textAlign: 'center' }} >{row.idUser}</TableCell>
                                <TableCell sx={{ width: '500px', textAlign: 'center'  }} >{row.name}</TableCell>
                                <TableCell sx={{ width: '500px', textAlign: 'center'  }}>{row.email}</TableCell>
                                <TableCell sx={{ width: '500px', textAlign: 'center'  }}>{row.permissions.name_permission}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {deleteConfirm ? <DeleteUserConfirmComponent msg='Tem certeza que deseja deletar esse usuário ?' id={idUser} onClose={closeModalConfirmDelete} /> : null}
            {openModalUpdate ? <UserFormComponent operation='update' id={idUser} onClose={closeModalUpdate} /> : null}
            {openModalView ? <UserFormComponent operation='view' id={idUser} onClose={closeModalView} /> : null}
        </div>
    )
}