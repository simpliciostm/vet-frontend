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
import './style.css';
import { TablePagination } from '@mui/material';

export const TableComponent = () => {
    const [page, setPage] = useState(5)
    const [row, setRowsPerPage] = useState(5)

    let dataList = [
        {
            id: 1,
            type: 'Félina',
            sexy: 'M',
            name: 'THÉO',
            color: 'caramelo',
            size: '4.9 KG',
            microChip: '5455454554545',
            inter: '',
            dta: '12/04/2023',
            fieldTutor: 'Thiago Teste',
            cpf: '454.956.475-54',
            phone: '(14)99653-5254',
            address: 'Rua tal',
            country: 'Bairro tal',
        },
        {
            id: 2,
            type: 'Félina',
            sexy: 'M',
            name: 'THÉO',
            color: 'caramelo',
            size: '4.9 KG',
            microChip: '5455454554545',
            inter: '',
            dta: '12/04/2023',
            fieldTutor: 'Thiago Teste',
            cpf: '454.956.475-54',
            phone: '(14)99653-5254',
            address: 'Rua tal',
            country: 'Bairro tal',
        },
        {
            id: 3,
            type: 'Félina',
            sexy: 'M',
            name: 'THÉO',
            color: 'caramelo',
            size: '4.9 KG',
            microChip: '5455454554545',
            inter: '',
            dta: '12/04/2023',
            fieldTutor: 'Thiago Teste',
            cpf: '454.956.475-54',
            phone: '(14)99653-5254',
            address: 'Rua tal',
            country: 'Bairro tal',
        },
        {
            id: 4,
            type: 'Félina',
            sexy: 'M',
            name: 'THÉO',
            color: 'caramelo',
            size: '4.9 KG',
            microChip: '5455454554545',
            inter: '',
            dta: '12/04/2023',
            fieldTutor: 'Thiago Teste',
            cpf: '454.956.475-54',
            phone: '(14)99653-5254',
            address: 'Rua tal',
            country: 'Bairro tal',
        },
        {
            id: 5,
            type: 'Félina',
            sexy: 'M',
            name: 'THÉO',
            color: 'caramelo',
            size: '4.9 KG',
            microChip: '5455454554545',
            inter: '',
            dta: '12/04/2023',
            fieldTutor: 'Thiago Teste',
            cpf: '454.956.475-54',
            phone: '(14)99653-5254',
            address: 'Rua tal',
            country: 'Bairro tal',
        },
    ]

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
                            <TableCell align="left">Número</TableCell>
                            <TableCell align="left">Espécie</TableCell>
                            <TableCell align="left">Sexo</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Cor</TableCell>
                            <TableCell align="left">Peso</TableCell>
                            <TableCell align="left">Microship</TableCell>
                            <TableCell align="left">Intercorrência</TableCell>
                            <TableCell align="left">Data</TableCell>
                            <TableCell align="left">Nome Tutor</TableCell>
                            <TableCell align="left">CPF</TableCell>
                            <TableCell align="left">Telefone</TableCell>
                            <TableCell align="left">Endereço</TableCell>
                            <TableCell align="left">Bairro</TableCell>
                            <TableCell align="left">Acões</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList.map((row: any) => (
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
                                <TableCell>
                                    <div id='buttons' style={{ display: 'flex', gap: '7px' }}>
                                        <DeleteIcon style={{ cursor: 'pointer' }} htmlColor='#ff6360' fontSize='small' />
                                        <EditIcon style={{ cursor: 'pointer' }} htmlColor='#6067ff' fontSize='small' />
                                        <VisibilityIcon style={{ cursor: 'pointer' }} htmlColor='#ffae60' fontSize='small' />
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
                count={dataList.length}
                rowsPerPage={row}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}