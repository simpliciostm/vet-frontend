import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, Typography } from '@mui/material';
import api from '../../api';
import { ShowAlert } from '../showAlertComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
interface props {
    id?: string,
    species?: string,
    sexy?: string,
    name?: string,
    color?: string,
    size?: string,
    chip?: string,
    intercorrencia?: string,
    date?: string,
    name_tutor?: string,
    cpf?: string,
    phone?: string,
    city?: string,
    address?: string,
    district?: string
    onClose: () => void;
    operation: string;
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
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
    const [date, setDate] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
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
        if (props.city) setCity(props.city)
        if (props.address) setAddress(props.address)
        if (props.district) setDistrict(props.district)
        if (props.color) setColor(props.color)
        if (props.size) setSize(props.size)
        if (props.chip) setChip(props.chip)
        if (props.intercorrencia) setIntercorrencia(props.intercorrencia)
        if (props.date) setDate(props.date)

        const getUser = async () => {
            try {
                if (props.operation === 'view' && props.id) {
                    const { data } = await api.get(`/cads/${props.id}`);
                    setNameTutor(data.data.name_tutor);
                    setSpecies(data.data.species);
                    setSexy(data.data.sexy);
                    setName(data.data.name);
                    setCpf(data.data.cpf);
                    setPhone(data.data.phone);
                    setCity(data.data.city)
                    setAddress(data.data.address)
                    setDistrict(data.data.district)
                    setColor(data.data.color)
                    setSize(data.data.size)
                    setChip(data.data.chip)
                    setIntercorrencia(data.data.intercorrencia)
                    setDate(data.data.date)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getUser()

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
        props.id
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
                city: city,
                address: address,
                district: district,
                color: color,
                size: size,
                chip: chip,
                intercorrencia: intercorrencia,
                date: date
            }

            if (operation === 'register') {
                result = await api.post('/cadsInsert', data);
            }

            if (operation === 'update') {
                result = await api.put(`/userUpdate/${props.id}`, data);
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

    const TextMaskCustomPhone = React.forwardRef<HTMLInputElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask="(00)00000-0000"
                    definitions={{
                        '#': /[1-9]/,
                    }}
                    inputRef={ref}
                    onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                    overwrite
                />
            );
        },
    );

    const TextMaskCustomCpf = React.forwardRef<HTMLInputElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask="000.000.000-00"
                    definitions={{
                        '#': /[1-9]/,
                    }}
                    inputRef={ref}
                    onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                    overwrite
                />
            );
        },
    );

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
                        {props.operation === 'view' ? "Aqui você pode ver os dados do Registro" : null}
                    </Typography>
                </div>
                <div className="box-form-inputs-fields">
                    <div className="box-fields-cads">
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Espécie' size='small' sx={{ width: '130px' }} value={species} onChange={(e: any) => setSpecies(e.target.value)} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Sexo' size='small' sx={{ width: '130px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Nome' size='small' sx={{ width: '130px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Cor' size='small' sx={{ width: '130px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Peso' size='small' sx={{ width: '130px' }} />
                    </div>
                    <div className="box-fields-cads">
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Microship' size='small' sx={{ width: '180px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Intercorrência' size='small' sx={{ width: '550px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' type='date' size='medium' sx={{ marginTop: '13px' }} />
                    </div>
                    <div className="box-fields-cads">
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Nome Tutor' size='small' sx={{ width: '130px' }} />
                        <FormControl variant='outlined' >
                            <InputLabel htmlFor="formatted-text-mask-input">CPF</InputLabel>
                            <Input
                                disabled={props.operation === 'view'}
                                size='small'
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustomCpf as any}
                            />
                        </FormControl>
                        <FormControl variant='outlined' >
                            <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                            <Input
                                disabled={props.operation === 'view'}
                                onChange={(e) => setPhone(e.target.value)}
                                size='small'
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustomPhone as any}
                            />
                        </FormControl>
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Cidade' size='small' sx={{ width: '130px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Endereço' size='small' sx={{ width: '130px' }} />
                        <TextField disabled={props.operation === 'view'} variant='standard' label='Bairro' size='small' sx={{ width: '130px' }} />
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