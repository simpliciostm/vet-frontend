import React, { useState } from 'react';
import './style.css';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';

export const RegisterFormCompnent = () => {
    const [closeModal, setCloseModal] = useState(true);

    const close = () => {
        setCloseModal(false)
    }

    return (
        closeModal ? <div className='register'>
            <div className="register-modal">
                <div className='title-register'>
                    <div className="title">
                        <Typography color={'#000000e6'} fontSize={26} component='span'>Formulário de Castração</Typography>
                        <Typography color={'#000000e6'} fontSize={16} component='span'>Preencha o formulario e clique em salvar para adicionar uma nova Castração</Typography>
                    </div>
                </div>
                <form>
                    <div className="field">
                        <TextField color='success' style={{ width: '400px' }} variant="outlined" size='small' label='Espécie' />
                    </div>
                    <div className="field">
                        <FormControl fullWidth>
                            <InputLabel color='success' id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={''}
                                label="Sexo"
                                onChange={() => { }}
                                style={{ width: '400px', height: '40px' }}
                                color='success'
                            >
                                <MenuItem value={10}>M</MenuItem>
                                <MenuItem value={20}>F</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} color='success' variant="outlined" size='small' label='Nome' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} color='success' variant="outlined" size='small' label='Cor' />
                    </div>
                    <div className="field">
                        <FormControl fullWidth>
                            <InputLabel color='success' id="demo-simple-select-label">Peso</InputLabel>
                            <OutlinedInput
                                sx={{ width: '400px' }}
                                color='success'
                                id="outlined-adornment-weight"
                                label='Peso'
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='small'
                            />
                        </FormControl>
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} color='success' variant="outlined" size='small' label='MicroChip' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} color='success' variant="outlined" size='small' label='Intercorrência' />
                    </div>
                    <div className="field">
                        <TextField
                            style={{ width: '400px' }}                            
                             size='small'
                            id="date"
                            label="Data"
                            type="date"
                            defaultValue=""
                            className={''}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} sx={{ width: '220px' }} color='success' variant="outlined" size='small' label='Nome Tutor' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} sx={{ width: '220px' }} color='success' variant="outlined" size='small' label='CPF' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} sx={{ width: '220px' }} color='success' variant="outlined" size='small' label='Telefone' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} sx={{ width: '220px' }} color='success' variant="outlined" size='small' label='Cidade' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} sx={{ width: '260px' }} color='success' variant="outlined" size='small' label='Endereço' />
                    </div>
                    <div className="field">
                        <TextField style={{ width: '400px' }} sx={{ width: '250px' }} color='success' variant="outlined" size='small' label='Bairro' />
                    </div>
                </form>
                <div className="button-field">
                    <Button className='button-cancel' onClick={() => close()} sx={{ width: '400px' }} variant="contained">Cancelar</Button>
                    <Button className='button-save' sx={{ width: '250px' }} variant="contained">Salvar</Button>
                </div>
            </div>
        </div> : null

    )
}