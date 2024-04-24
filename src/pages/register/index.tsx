import React, { useState } from 'react';
import { Header } from '../../components/headerComponent';
import { TableComponent } from '../../components/tableCastroComponent'
import { Button, TextField, Typography } from '@mui/material';
import './style.css'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { RegisterFormCompnent } from '../../components/registerFormComponent';

export const Register = () => {
    const [showAdd, setShowAdd] = useState(false);

    const openAdd = () => {
        !showAdd ? setShowAdd(true) : setShowAdd(false);
    }

    const data = [
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

    const columns = [
        'Número',
        'Espécie',
        'Sexo',
        'Nome',
        'Cor',
        'Peso',
        'Microship',
        'Intercorrência',
        'Data',
        'Nome Tutor',
        'CPF',
        'Telefone',
        'Endereço',
        'Bairro',
        'Acões',
    ]

    return (
        <div className='container'>
            <Header />
            <div className='register-box'>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registros de Castrações</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>adicionar</Typography> registro de castrações</Typography>
                </div>
                <div className="box-add">
                    <Typography component='span' fontSize={21}>Adicionar novo registro</Typography>
                    <div onClick={() => openAdd()} className='circle-add'>
                        <AddIcon />
                    </div>
                </div>
                <div className="box-filter">
                    <div className='fields'>
                        <div className="fields-filter">
                            <TextField color='success' style={{ marginLeft: 20 }} id="standard-basic" label="Nome" variant="standard" size='small' />
                            <TextField color='success' id="standard-basic" label="Espécie" variant="standard" size='small' />
                            <TextField color='success' id="standard-basic" label="CPF" variant="standard" size='small' />
                            <TextField color='success' id="standard-basic" label="Microchip" variant="standard" size='small' />
                            <TextField color='success' id="standard-basic" label="Tutor" variant="standard" size='small' />
                        </div>
                        <div className="search-button">
                            <Button className='button' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                        </div>
                    </div>
                </div>
                <TableComponent data={data} columns={columns} />
            </div>
            {showAdd ? <RegisterFormCompnent /> : null}
        </div>
    )
}