import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import api from '../../../api';
import { ShowAlert } from '../../showAlertComponent';
import InputMask from 'react-input-mask';
import viaCepApi from '../../../apiViaCep';
import { Search } from '@mui/icons-material';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

interface props {
    id?: string;
    onClose: () => void;
    operation: string;
}

interface registerData {
    species?: string;
    sexy?: string;
    name?: string;
    color?: string;
    size?: string;
    year?: string;
    chip?: string;
    intercorrencia?: string;
    nis?: string;
}

interface city {
    name: string;
    code: string;
}

export const RegisterFormComponent = (props: props) => {
    const [name_tutor, setNameTutor] = useState<string>('');
    const [species, setSpecies] = useState<string>('');
    const [sexy, setSexy] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [chip, setChip] = useState<string>('');
    const [intercorrencia, setIntercorrencia] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [city, setCity] = useState<city>({ code: '', name: '' });
    const [address, setAddress] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const [nis, setNis] = useState<string>('');
    const [statusPromise, setStatusPromise] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');
    const [statusAlert, setStatusAlert] = useState<string>('');
    const [number_residence, setNumberResidence] = useState<string>('');
    const [cepInvalid, setCepInvalid] = useState<boolean>(false);
    const [register, setRegister] = useState<registerData[]>([]);
    const [openVerifyRegister, setOpenVerfyegister] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [disableRequest, setDisableRequest] = useState<boolean>(false);

    useEffect(() => {

        const getUser = async () => {
            try {
                if ((props.operation === 'view' || props.operation === 'update') && props.id) {
                    const { data } = await api.get(`/cads/${props.id}`);
                    setNameTutor(data.data.name_tutor);
                    setSpecies(data.data.animal.species);
                    setSexy(data.data.animal.sexy);
                    setName(data.data.animal.name);
                    setCpf(data.data.cpf);
                    setPhone(data.data.phone);
                    setCep(data.data.cep);
                    setCity(data.data.city)
                    setAddress(data.data.address);
                    setDistrict(data.data.district);
                    setColor(data.data.animal.color);
                    setSize(data.data.animal.size);
                    setChip(data.data.animal.chip);
                    setIntercorrencia(data.data.animal.intercorrencia);
                    setNis(data.data.animal.nis);
                    setYear(data.data.animal.year);
                    setNumberResidence(data.data.number_residence);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getUser();

    }, [props.operation, props.id]);

    const saveData = async (e: any, operation: string, registerCurrent: registerData[]) => {
        try {
            e.preventDefault();
            let result: any;

            const resultDataFormat = prepareDate(registerCurrent);

            const data = {
                animal: resultDataFormat,
                name_tutor: name_tutor,
                cpf: cpf,
                phone: phone,
                cep: cep,
                city: city,
                address: address,
                number_residence: number_residence,
                district: district
            }

            if (operation === 'register') result = await api.post('/cadsInsert', data);
            if (operation === 'update') result = await api.put(`/cadsUpdate/${props.id}`, data);

            if (result.data) {
                switch (result.data.status) {
                    case 1:
                        setDisableRequest(true)
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(result.data.msg);
                        setStatusAlert('success');
                        timerSuccess();
                        break;
                    case 0:
                        setDisableRequest(true)
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

    const prepareDate = (registerCurrent: registerData[]) => {
        let formatData: any[] = [];

        if (registerCurrent && registerCurrent.length >= 1) {
            for (const item of registerCurrent) formatData.push(item);
        }

        const dataCurrent = {
            species: species,
            sexy: sexy,
            name: name,
            color: color,
            size: size,
            year: year,
            chip: chip,
            intercorrencia: intercorrencia,
            nis: nis,
        }

        formatData.push(dataCurrent)

        return formatData
    }

    const searchCep = async () => {
        try {
            if (cep && cep.length >= 1) {
                const { data } = await viaCepApi.get(`/${cep}/json`)

                if (data && !data.erro) {
                    setCity({ name: data.localidade, code: data.uf });
                    setAddress(data.logradouro);
                    setDistrict(data.bairro);
                    setCepInvalid(false);
                } else {
                    setCity({ name: '', code: '' });
                    setAddress('');
                    setDistrict('');
                    setCepInvalid(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const increment = (registerExist: registerData[]) => {

        let data = {
            species: species,
            sexy: sexy,
            name: name,
            color: color,
            size: size,
            year: year,
            chip: chip,
            intercorrencia: intercorrencia,
            nis: nis
        }

        if (data.name.length >= 1 || data.species.length >= 1 || data.chip.length >= 1) {
            registerExist.push(data);
            setRegister(registerExist);
            clearFields();
        }

    }

    const clearFields = () => {
        setSpecies('');
        setSexy('');
        setName('');
        setColor('');
        setSize('');
        setChip('');
        setIntercorrencia('');
        setNis('');
        setYear('');
    }

    const openRegisterVeirfy = () => {
        openVerifyRegister ? setOpenVerfyegister(false) : setOpenVerfyegister(true);
    }

    const deleteItemRegister = (e: any, ref: string | any) => {
        e.preventDefault();
        const newData = register.filter(x => x.name !== ref);

        setRegister(newData);
    }

    const timer = () => {
        setTimeout(() => {
            setStatusPromise(false);
            setLoading(false);
            setDisableRequest(true)
        }, 1200)
    }

    const timerSuccess = () => {
        setTimeout(() => {
            setLoading(false);
            setStatusPromise(false);
            window.location.href = '/dashboard/register';
            props.onClose();
        }, 3000)
    }

    return (
        <div className='container-cads-form'>
            <form className='modal-cads-form' action="" onSubmit={(e: any) => saveData(e, props.operation, register)}>
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
                            <div className="button-increment-register">
                                {props.operation === 'register' ? (
                                    <div style={{ opacity: name.length >= 1 || species.length >= 1 || chip.length >= 1 ? 1 : 0.3 }} onClick={() => increment(register)} className="title-increment">
                                        <Typography fontSize={13} fontWeight={'bold'} >adicionar outro</Typography>
                                    </div>
                                ) : null}
                                {register.length >= 1 ? (
                                    <div onClick={() => openRegisterVeirfy()} className="icon-increment">
                                        <FormatListNumberedRtlOutlinedIcon htmlColor='#5b1c30' />
                                        <Typography className='total' fontWeight={'bold'} fontSize={11} >{register.length}</Typography>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="fields-box">
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='Espécie' size='small' sx={{ width: '200px' }} value={species} onChange={(e: any) => setSpecies(e.target.value)} />
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
                                    variant='outlined'

                                >
                                    <MenuItem value={"Macho"}>M</MenuItem>
                                    <MenuItem value={"Fêmea"}>F</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='Nome' size='small' sx={{ width: '150px' }} value={name} onChange={(e: any) => setName(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='Cor' size='small' sx={{ width: '130px' }} value={color} onChange={(e: any) => setColor(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='Peso (kg)' size='small' sx={{ width: '80px' }} value={size} onChange={(e: any) => setSize(e.target.value)} />
                            <TextField inputProps={{ maxLength: 2 }} disabled={props.operation === 'view'} variant='outlined' label='Idade' size='small' sx={{ width: '100px' }} value={year} onChange={(e: any) => setYear(e.target.value)} />
                            <TextField required inputProps={{ maxLength: 15 }} type='text' disabled={props.operation === 'view'} variant='outlined' label='Microship' size='small' sx={{ width: '160px' }} value={chip} onChange={(e: any) => setChip(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='Nis' size='small' sx={{ width: '170px' }} value={nis} onChange={(e: any) => setNis(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='Intercorrência' size='small' sx={{ width: '100%' }} value={intercorrencia} onChange={(e: any) => setIntercorrencia(e.target.value)} />
                        </div>
                    </div>
                    <div className="box-fields-table">
                        <div className="title-box-table">
                            <Typography fontSize={14} >Dados Tutor</Typography>
                        </div>
                        <div className="fields-box">
                            <TextField required disabled={props.operation === 'view'} variant='outlined' label='Tutor' size='small' sx={{ width: '130px' }} value={name_tutor} onChange={(e: any) => setNameTutor(e.target.value)} />
                            {props.operation === 'view' ? <InputMask
                                disabled
                                mask="999.999.999-99"
                                maskChar=" "
                                value={cpf}
                                onChange={(e: any) => setCpf(e.target.value)}
                                placeholder='CPF'
                                className='input-mask-style-disabled' style={{ borderRadius: '5px', height: '39px', outline: 'none', fontSize: '17px', width: '170px', color: "rgba(0,0,0,0.4)", padding: '15px' }} />
                                : <InputMask
                                    mask="999.999.999-99"
                                    maskChar=" "
                                    required
                                    value={cpf}
                                    onChange={(e: any) => setCpf(e.target.value)}
                                    placeholder='CPF'
                                    className='input-mask-style'
                                    style={{ borderRadius: '5px', height: '39px', outline: 'none', fontSize: '17px', width: '170px', color: "rgba(0,0,0,0.9)", padding: '15px' }} />}
                            {props.operation === "view" ? <InputMask
                                disabled
                                mask="(99)99999-9999"
                                maskChar=" "
                                value={phone}
                                onChange={(e: any) => setPhone(e.target.value)}
                                placeholder='Telefone'
                                className='input-mask-style-disabled' style={{ borderRadius: '5px', height: '39px', outline: 'none', fontSize: '17px', width: '170px', color: "rgba(0,0,0,0.4)", padding: '15px' }} />
                                : <InputMask
                                    mask="(99)99999-9999"
                                    maskChar=" "
                                    required={true}
                                    value={phone}
                                    onChange={(e: any) => setPhone(e.target.value)}
                                    placeholder='Telefone'
                                    className='input-mask-style'
                                    style={{ borderRadius: '5px', height: '39px', outline: 'none', fontSize: '17px', width: '170px', color: "rgba(0,0,0,0.9)", padding: '15px' }} />}
                            <div className="search-cep">
                                <TextField error={cepInvalid ? true : false} helperText={cepInvalid ? 'Cep invalido' : null} inputProps={{ maxLength: 8, minLength: 8 }} required disabled={props.operation === 'view'} variant='outlined' label='CEP' size='small' sx={{ width: '200px' }} value={cep} onChange={(e: any) => setCep(e.target.value)} />
                                <Button disabled={(props.operation !== 'view' && cep.length === 8) ? false : true} size='small' onClick={() => searchCep()} >{<Search fontSize='small' />}</Button>
                            </div>
                            <TextField disabled variant='outlined' label='Cidade' size='small' sx={{ width: '200px' }} value={city.name} onChange={(e: any) => setCity(e.target.value)} />
                            <TextField disabled variant='outlined' label='Endereço' size='small' sx={{ width: '200px' }} value={address} onChange={(e: any) => setAddress(e.target.value)} />
                            <TextField disabled={props.operation === 'view'} variant='outlined' label='N Residencial' size='small' sx={{ width: '90px' }} type='number' value={number_residence} onChange={(e: any) => setNumberResidence(e.target.value)} />
                            <TextField disabled variant='outlined' label='Bairro' size='small' sx={{ width: '200px' }} value={district} onChange={(e: any) => setDistrict(e.target.value)} />
                        </div>
                    </div>
                </div>
                {props.operation === 'register' || props.operation === 'update' ? (
                    <div className="button-fields-cads">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                        <Button disabled={disableRequest ? true : false} type='submit' className='button-save' sx={{ width: '100px' }} variant="contained">{loading ? <CircularProgress size={28} /> : null || props.operation === 'register' ? 'Salvar' : '' || props.operation === 'update' ? 'Atualizar' : ''}</Button>
                    </div>
                ) : (
                    <div className="button-field-cads">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Fechar</Button>
                    </div>
                )}
            </form>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
            {openVerifyRegister ? (
                <div className="container-verify-modal">
                    <div className="container-list-register">
                        <div className="title-container-verify">
                            <ChevronLeftOutlinedIcon onClick={() => setOpenVerfyegister(false)} style={{ cursor: 'pointer' }} fontSize='large' htmlColor='#5b1c30' />
                            <Typography component={'span'} fontSize={22} fontWeight={'bold'} color={'#5b1c30'} >Animais Adicionados</Typography>
                        </div>
                        <ul>
                            {register.length >= 1 ? (
                                <>
                                    {register.map(x => (
                                        <div key={x.name} className="box-register">
                                            <div className="infos-register">
                                                <TextField disabled variant='outlined' label='Espécie' size='small' sx={{ width: '200px' }} value={x.species} />
                                                <FormControl>
                                                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                                    <Select
                                                        disabled
                                                        sx={{ width: "150px" }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={x.sexy}
                                                        label="Sexo"
                                                        size='small'
                                                        variant='outlined'

                                                    >
                                                        <MenuItem value={"Macho"}>M</MenuItem>
                                                        <MenuItem value={"Fêmea"}>F</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField disabled variant='outlined' label='Nome' size='small' sx={{ width: '150px' }} value={x.name} />
                                                <TextField disabled variant='outlined' label='Cor' size='small' sx={{ width: '130px' }} value={x.color} />
                                                <TextField disabled variant='outlined' label='Peso (kg)' type='number' size='small' sx={{ width: '130px' }} value={x.size} />
                                                <TextField disabled variant='outlined' label='Idade' type='number' size='small' sx={{ width: '80px' }} value={x.year} />
                                                <TextField required type='text' disabled variant='outlined' label='Microship' size='small' sx={{ width: '160px' }} value={x.chip} />
                                                <TextField disabled variant='outlined' label='Nis' size='small' sx={{ width: '170px' }} value={x.nis} />
                                                <TextField disabled variant='outlined' label='Intercorrência' size='small' sx={{ width: '100%' }} value={x.intercorrencia} />
                                            </div>
                                            <div className="button-register">
                                                <Button onClick={(e) => deleteItemRegister(e, x.name)} >Excluir</Button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) :
                                <div><Typography>Nenhum animal registrado</Typography></div>
                            }
                        </ul>
                    </div>
                </div>
            ) : null}
        </div >
    )
}
