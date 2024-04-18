import React, { useState } from 'react';
import { DashBoardComponent } from '../../components/dashboardComponent';
import { TableComponent } from '../../components/tableComponent'
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

    return (
        <div>
            <DashBoardComponent />
            <div className='home-box'>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registros de Castrações</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='green'>consultar</Typography> e <Typography component='span' color='green'>adicionar</Typography> registro de castrações</Typography>
                </div>
                <div className="box-add">
                    <Typography component='span' fontSize={21}>Adicionar novo registro</Typography>
                    <div  onClick={() => openAdd()} className='circle-add'>
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
                            <Button color='success' variant="contained" endIcon={<SearchIcon />} >Filtrar</Button>
                        </div>
                    </div>
                </div>
                <TableComponent />
            </div>
            {showAdd ? <RegisterFormCompnent /> : null}
        </div>
    )
}