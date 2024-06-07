import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/headerComponent';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import api from '../../../api';
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { PermissionFormComponent } from '../../../components/registerModalsComponent/permissionFormComponent';
import { DeletePermissionConfirmComponent } from '../../../components/deleteComponent/deletePermissionConfirmComponent';

export const Permission = () => {
    const [permissions, setPermissions] = useState([]);
    const [closeModal, setCloseModal] = useState(false);
    const [idPermission, setIdPermission] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            const response = await api.get('/permissionList');
            if (response && response.data && response.data.status === 1) {
                setPermissions(response.data.data)
            }
        }

        getPermissions();
    }, []);

    const onCloseClick = () => setCloseModal(false);

    const closeDeletePermision = () => setDeleteConfirm(false);

    const openDeleteConfirm = (id: string) => {
        setIdPermission(id);
        setDeleteConfirm(true);
    }

    return (
        <div>
            <Header />
            <div className='home-box'>
                <div className="box-link">
                    <Link className='link' to="/dashboard/admin"><Typography>Painel de Admin</Typography></Link>
                    <ArrowForwardIosIcon style={{ color: 'rgba(0,0,0,0.5)' }} fontSize='small' />
                    <Link className='link' to="/dashboard/admin/permission"><Typography>Permissões</Typography></Link>
                </div>
                <div className="box-title">
                    <Typography className='title' component='span' fontSize={25} >Registro de Permissões</Typography>
                    <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>adicionar</Typography> permissões de usuários</Typography>
                </div>
                {
                    permissions.map((permissions: any) => (
                        <form key={permissions._id}>
                            <div className="box-permissions">
                                <TextField label='Tipo de Permissão' size='small' aria-readonly value={permissions.name_permission} />
                                {
                                    permissions.permissions.map((roles: any) => (
                                        <TextField sx={{ width: '100px' }} key={roles._id} label='Regra' size='small' aria-readonly value={roles.name_role} />
                                    ))
                                }
                            </div>
                            <div className="buttons-permissions">
                                <Button size='small' onClick={() => openDeleteConfirm(permissions._id)} ><DeleteIcon fontSize='small' htmlColor='#ff6360' /></Button>
                            </div>
                        </form>
                    ))
                }
                <div className="button-add-permission">
                    <Button onClick={() => setCloseModal(true)} >Adicionar nova permissão</Button>
                </div>
            </div>
            {deleteConfirm ? <DeletePermissionConfirmComponent msg='Tem certeza que deseja deletar essa permissão ?' id={idPermission} onClose={closeDeletePermision} /> : null}
            {closeModal ? <PermissionFormComponent onClose={onCloseClick} /> : null}
        </div>
    )
}