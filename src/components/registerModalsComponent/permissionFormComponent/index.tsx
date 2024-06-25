import React, { useEffect, useState } from 'react';
import './style.css';
import { Autocomplete, TextField, Typography, Button, CircularProgress } from '@mui/material';
import api from '../../../api';
import { ShowAlert } from '../../showAlertComponent';

interface PermissionsProps {
    onClose: () => void
}

interface RolesProps {
    id: string;
    label: string;
}

export const PermissionFormComponent = (props: PermissionsProps) => {
    const [roles, setRoles] = useState<RolesProps[]>([]);
    const [valueOptions, setValueOptions] = useState<RolesProps[]>([]);
    const [namePermission, setNamePermission] = useState('');
    const [msg, setMsg] = useState('');
    const [statusAlert, setStatusAlert] = useState('');
    const [statusPromise, setStatusPromise] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const { data } = await api.get('/roleList');

                if (data.status === 1 && data.data.length >= 1) {
                    let rolesPush: any[] = [];

                    data.data.map((roles: any) => {
                        return rolesPush.push({
                            id: roles._id,
                            label: roles.name_role
                        })
                    });

                    setRoles(rolesPush)
                };
            } catch (err) {
                console.log(err);
            }
        }

        getRoles();
    }, [])

    const registerPermissions = async (e: any) => {
        e.preventDefault();

        try {

            let idsValueOptions: any[] = [];

            if (valueOptions.length >= 1) {
                valueOptions.forEach(x => {
                    idsValueOptions.push(x.id);
                });
            }

            const response = await api.post('/permissionInsert', {
                name_permission: namePermission,
                permissions: idsValueOptions
            });

            if (response && response.data) {
                switch (response.data.status) {
                    case 1:
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(response.data.msg);
                        setStatusAlert('success');
                        timer();
                        break;
                    case 0:
                        setLoading(true);
                        setStatusPromise(true);
                        setMsg(response.data.msg);
                        setStatusAlert('error');
                        timer();
                        break;
                }
            }

        } catch (err) {
            console.log(err);;
        }
    }

    const timer = () => {
        setTimeout(() => {
            setStatusPromise(false);
            window.location.href = '/dashboard/admin/permission';
            props.onClose();
        }, 1400);
    }

    return (
        <div className="container-permission-form">
            <form onSubmit={(e) => registerPermissions(e)} className='modal-permission-form'>
                <div className="title-permission-form">
                    <Typography component={'span'} fontSize={22} fontWeight={'bold'} color={'#5b1c30'}>Cadastrar nova permissão</Typography>
                </div>
                <div className="box-fields-permissions">
                    <div className="field-permission">
                        <TextField value={namePermission} onChange={(e) => setNamePermission(e.target.value)} sx={{ width: '200px' }} size='small' label='Nome da Permisão' />
                    </div>
                    <div className="field-permission">
                        <Autocomplete
                            sx={{ width: '390px' }}
                            size='small'
                            multiple
                            options={roles}
                            renderInput={(params) => <TextField {...params} label='Regras' />}
                            isOptionEqualToValue={(option: RolesProps, value: RolesProps) => option.id === value.id}
                            value={valueOptions}
                            onChange={(e: any, newValue: any | null) => setValueOptions(newValue)}
                        />
                    </div>
                </div>
                <div className="box-buttons-permissions">
                    <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                    <Button type='submit' className='button-save' sx={{ width: '100px' }} variant="contained">{loading ? <CircularProgress color='secondary' size={28} /> : 'Salvar'}</Button>
                </div>
            </form>
            {statusPromise ? <ShowAlert msg={msg} status={statusAlert} /> : null}
        </div>
    )
} 