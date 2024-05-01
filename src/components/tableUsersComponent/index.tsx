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
import { TablePagination } from '@mui/material';
import { DeleteConfirmComponent } from '../deleteConfirmComponent';
import { UserFormComponent } from '../userFormComponent';

interface props {
    data: {
        _id: number,
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
    const [page, setPage] = useState(5)
    const [row, setRowsPerPage] = useState(5)
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [user, setUser] = useState(Object);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openDeleteConfirm = (e: any, id: string) => {
        e.preventDefault();
        setIdUser(id);
        !deleteConfirm ? setDeleteConfirm(true) : setDeleteConfirm(false);
    }

    const openUpdateUser = (e: any, data: user, id: string) => {
        e.preventDefault();
        setUser(data)
        setIdUser(id)
        !openModalUpdate ? setOpenModalUpdate(true) : setOpenModalUpdate(false);
    }

    const openViewUser = (e: any, id: string) => {
        e.preventDefault();
        setIdUser(id);
        !openModalView ? setOpenModalView(true) : setOpenModalView(false);
    }

    return (
        <div style={{ width: '40%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col: string) => (
                                <TableCell key={col} align='left'>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                hover
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.permissions.name_permission}</TableCell>
                                <TableCell>
                                    <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                        <button onClick={(e) => openDeleteConfirm(e, row._id)}><DeleteIcon style={{ cursor: 'pointer' }} htmlColor='#ff6360' fontSize='small' /></button>
                                        <button onClick={(e) => openUpdateUser(e, row, row._id)}><EditIcon style={{ cursor: 'pointer' }} htmlColor='#6067ff' fontSize='small' /></button>
                                        <button onClick={(e) => openViewUser(e, row._id)} ><VisibilityIcon style={{ cursor: 'pointer' }} htmlColor='#ffae60' fontSize='small' /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={row}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {deleteConfirm ? <DeleteConfirmComponent msg='Tem certeza que deseja deleta esse usuário ?' id={idUser} /> : null}
            {openModalUpdate ? <UserFormComponent operation='update' id={idUser} name={user.name} email={user.email} password={user.password} permission={user.permissions} /> : null}
            {openModalView ? <UserFormComponent operation='view' id={idUser} /> : null}
        </div>
    )
}