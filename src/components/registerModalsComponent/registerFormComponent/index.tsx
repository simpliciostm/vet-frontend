import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import api from '../../../api';
import { ShowAlert } from '../../showAlertComponent';
import CircularProgress from '@mui/material/CircularProgress';
import InputMask from 'react-input-mask';
import viaCepApi from '../../../apiViaCep';
import { Search } from '@mui/icons-material';

interface props {
    id?: string;
    species?: string;
    sexy?: string;
    name?: string;
    color?: string;
    size?: string;
    chip?: string;
    intercorrencia?: string;
    date?: Date;
    name_tutor?: string;
    cpf?: string;
    phone?: string;
    cep?: string;
    city?: {
        name: string,
        code: string,
    };
    address?: string;
    district?: string;
    nis?: string;
    onClose: () => void;
    operation: string;
}

interface city {
    name: string;
    code: string;
}

export const RegisterFormComponent = (props: props) => {
    const [name_tutor, setNameTutor] = useState('');
    const [species, setSpecies] = useState('');
    const [sexy, setSexy] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [chip, setChip] = useState('');
    const [intercorrencia, setIntercorrencia] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState<city>({ code: '', name: '' });
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [nis, setNis] = useState('');
    const [statusPromise, setStatusPromise] = useState(true);
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (props.name_tutor) setNameTutor(props.name_tutor);
        if (props.species) setSpecies(props.species);
        if (props.sexy) setSexy(props.sexy);
        if (props.name) setName(props.name);
        if (props.cpf) setCpf(props.cpf);
        if (props.phone) setPhone(props.phone);
        if (props.cep) setCep(props.cep);
        if (props.city) setCity(props.city)
        if (props.address) setAddress(props.address)
        if (props.district) setDistrict(props.district)
        if (props.color) setColor(props.color)
        if (props.size) setSize(props.size)
        if (props.chip) setChip(props.chip)
        if (props.intercorrencia) setIntercorrencia(props.intercorrencia)
        if (props.nis) setNis(props.nis);

        const getUser = async () => {
            try {
                if (props.operation === 'view' && props.id) {
                    const { data } = await api.get(`/cads/${props.id}`);
                    console.log(data.data.city._id)
                    setNameTutor(data.data.name_tutor);
                    setSpecies(data.data.species);
                    setSexy(data.data.sexy);
                    setName(data.data.name);
                    setCpf(data.data.cpf);
                    setPhone(data.data.phone);
                    setCep(data.data.cep);
                    setCity(data.data.city)
                    setAddress(data.data.address);
                    setDistrict(data.data.district);
                    setColor(data.data.color);
                    setSize(data.data.size);
                    setChip(data.data.chip);
                    setIntercorrencia(data.data.intercorrencia);
                    setNis(data.data.nis);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getUser();

    }, [
        props.name_tutor,
        props.species,
        props.sexy,
        props.name,
        props.cpf,
        props.phone,
        props.city,
        props.address,
        props.district,
        props.color,
        props.size,
        props.chip,
        props.intercorrencia,
        props.date,
        props.operation,
        props.id,
        props.nis
    ]);

    const registerOurUpdate = async (e: any, operation: string) => {
        try {
            e.preventDefault();
            let result: any;

            const data = {
                name_tutor: name_tutor,
                species: species,
                sexy: sexy,
                name: name,
                cpf: cpf,
                phone: phone,
                cep: cep,
                city: city,
                address: address,
                district: district,
                color: color,
                size: size,
                chip: chip,
                intercorrencia: intercorrencia,
                nis: nis
            }

            if (operation === 'register') {
                result = await api.post('/cadsInsert', data);
            }

            if (operation === 'update') {
                result = await api.put(`/cadsUpdate/${props.id}`, data);
            }

            if (result.data) {
                switch (result.data.status) {
                    case 1:
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(result.data.msg);
                        setStatusAlert('success');
                        timerSuccess();
                        break;
                    case 0:
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(result.data.msg);
                        setStatusAlert('error');
                        timer();
                        break;
                }

            }

        } catch (err) {
            console.log(err);
        }
    }

    const timer = () => {
        setTimeout(() => {
            setStatusPromise(false);
            setLoading(false);
        }, 1200)
    }

    const timerSuccess = () => {
        setTimeout(() => {
            setLoading(false);
            setStatusPromise(false);
            window.location.href = '/dashboard/register';
            props.onClose();
        }, 1400)
    }

    const searchCep = async () => {
        if (cep && cep.length >= 1) {
            const { data } = await viaCepApi.get(`/${cep}/json`)

            if (data) {
                setCity({ name: data.localidade, code: data.uf });
                setAddress(data.logradouro);
                setDistrict(data.bairro);
            }
        }
    }

    return (
        <div className='container-cads-form'>
            <form className='modal-cads-form' action="" onSubmit={(e: any) => registerOurUpdate(e, props.operation)}>
                <div className="title-cads-form">
                    <Typography component={'span'} fontSize={22} fontWeight={'bold'} color={'#5b1c30'} >
                        {props.operation === 'register' ? "Formulario de Registro" : null}
                        {props.operation === 'update' ? "Atualização de Registro" : null}
                        {props.operation === 'view' ? "Visualização de Registro" : null}
                    </Typography>
                    <Typography component={'span'} fontSize={16} >
                        {props.operation === 'register' ? "Preencha o formulário para adicionar um novo Registro" : null}
                        {props.operation === 'update' ? "Preencha o formulário para atualizar os dados do Registro" : null}
                        {props.operation === 'view' ? "Aqui você pode apenas vizualizar os dados do Registro" : null}
                    </Typography>
                </div>
                <div className="box-form-inputs-fields">
                    <div className="box-fields-table">
                        <div className="title-box-table">
                            <Typography fontSize={14} >Dados Base</Typography>
                        </div>
                        <div className="fields-box">
                            <TextField disabled={props.operation === 'view'} variant='standard' label='Espécie' size='small' sx={{ width: '200px' }} value={species} onChange={(e: any) => setSpecies(e.target.value)} />
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                <Select
                                    disabled={props.operation === 'view'}
                                    sx={{ width: "150px" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sexy}
                                    label="Sexo"
                                    onChange={(e: any) => setSexy(e.target.value)}
                                    size='small'
                                    variant='standard'

                                >
                                    <MenuItem value={"Macho"}>M</MenuItem>
                                    <MenuItem value={"Fêmea"}>F</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField disabled={props.operation === 'view'} variant='standard' label='Nome' size='small' sx={{ width: '150px' }} value={name} onChange={(e: any) => setName(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='standard' label='Cor' size='small' sx={{ width: '130px' }} value={color} onChange={(e: any) => setColor(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='standard' label='Peso' type='number' size='small' sx={{ width: '130px' }} value={size} onChange={(e: any) => setSize(e.target.value)} />
                            <TextField required inputProps={{ maxLength: 15 }} type='text' disabled={props.operation === 'view'} variant='standard' label='Microship' size='small' sx={{ width: '160px' }} value={chip} onChange={(e: any) => setChip(e.target.value)} />
                            <TextField required disabled={props.operation === 'view'} variant='standard' label='Nis' size='small' sx={{ width: '170px' }} value={nis} onChange={(e: any) => setNis(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='standard' label='Intercorrência' size='small' sx={{ width: '100%' }} value={intercorrencia} onChange={(e: any) => setIntercorrencia(e.target.value)} />
                        </div>
                    </div>
                    <div className="box-fields-table">
                        <div className="title-box-table">
                            <Typography fontSize={14} >Dados Tutor</Typography>
                        </div>
                        <div className="fields-box">
                            <TextField required disabled={props.operation === 'view'} variant='standard' label='Tutor' size='small' sx={{ width: '130px' }} value={name_tutor} onChange={(e: any) => setNameTutor(e.target.value)} />
                            {props.operation === 'view' ? <InputMask
                                disabled
                                mask="999.999.999-99"
                                maskChar=" "
                                value={cpf}
                                onChange={(e: any) => setCpf(e.target.value)}
                                placeholder='CPF'
                                style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', fontSize: '15px', color: "rgba(0,0,0,0.4)", marginTop: '25px' }} />
                                : <InputMask
                                    mask="999.999.999-99"
                                    maskChar=" "
                                    required
                                    value={cpf}
                                    onChange={(e: any) => setCpf(e.target.value)}
                                    placeholder='CPF'
                                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', fontSize: '15px', color: "rgba(0,0,0,0.9)", marginTop: '25px' }} />}
                            {props.operation === "view" ? <InputMask
                                disabled
                                mask="(99)99999-9999"
                                maskChar=" "
                                value={phone}
                                onChange={(e: any) => setPhone(e.target.value)}
                                placeholder='Telefone'
                                style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', fontSize: '15px', color: "rgba(0,0,0,0.4)", marginTop: '25px' }} />
                                : <InputMask
                                    mask="(99)99999-9999"
                                    maskChar=" "
                                    required={true}
                                    value={phone}
                                    onChange={(e: any) => setPhone(e.target.value)}
                                    placeholder='Telefone'
                                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', fontSize: '15px', color: "rgba(0,0,0,0.9)", marginTop: '25px' }} />}
                            <div className="search-cep">
                                <TextField required disabled={props.operation === 'view'} variant='standard' label='CEP' size='small' sx={{ width: '200px' }} value={cep} onChange={(e: any) => setCep(e.target.value)} />
                                <Button size='small' onClick={() => searchCep()} >{<Search fontSize='small' />}</Button>
                            </div>
                            <TextField disabled variant='standard' label='Cidade' size='small' sx={{ width: '200px' }} value={city.name} onChange={(e: any) => setCity(e.target.value)} />
                            <TextField disabled variant='standard' label='Endereço' size='small' sx={{ width: '200px' }} value={address} onChange={(e: any) => setAddress(e.target.value)} />
                            <TextField disabled variant='standard' label='Bairro' size='small' sx={{ width: '200px' }} value={district} onChange={(e: any) => setDistrict(e.target.value)} />
                        </div>
                    </div>
                </div>
                {props.operation === 'register' || props.operation === 'update' ? (
                    <div className="button-fields-cads">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                        <Button type='submit' className='button-save' sx={{ width: '100px' }} variant="contained">{loading ? <CircularProgress color='secondary' size={28} /> : 'Salvar'}</Button>
                    </div>
                ) : (
                    <div className="button-field-cads">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Fechar</Button>
                    </div>
                )}
            </form>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
}
