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
import { getStorage } from '../../services/localStorage';

interface props {
    data: {
        id: number,
        type: string,
        sexy: string,
        name: string,
        color: string,
        size: string,
        microChip: string,
        inter: string,
        dta: string,
        fieldTutor: string,
        cpf: string,
        phone: string,
        address: string,
        country: string,
    }[];
    columns: string[];
}

export const TableComponent = ({ data, columns }: props) => {
    const [page, setPage] = useState(5)
    const [row, setRowsPerPage] = useState(5)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                hover
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.sexy}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.color}</TableCell>
                                <TableCell>{row.size}</TableCell>
                                <TableCell>{row.microChip}</TableCell>
                                <TableCell>{row.inter}</TableCell>
                                <TableCell>{row.dta}</TableCell>
                                <TableCell>{row.fieldTutor}</TableCell>
                                <TableCell>{row.cpf}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.country}</TableCell>
                                {getStorage('permission') === 'Admin' ? (
                                    <TableCell>
                                        <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                            <DeleteIcon style={{ cursor: 'pointer' }} htmlColor='#ff6360' fontSize='small' />
                                            <EditIcon style={{ cursor: 'pointer' }} htmlColor='#6067ff' fontSize='small' />
                                            <VisibilityIcon style={{ cursor: 'pointer' }} htmlColor='#ffae60' fontSize='small' />
                                        </div>
                                    </TableCell>
                                ) : null}

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
        </div>
    )
}