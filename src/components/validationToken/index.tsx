import React, { useEffect, useState } from 'react';
import './style.css'
import ReactCodeInput from 'react-code-input';
import { api } from '../../api';

export const ValidationToken = ({ back, validate, getToken}: any) => {

    return (
        <div className='modal-confirmation'>
            <div className="text">
                <span>Validação de Token</span>
                <p>Confirma o token enviado para o seu numero de celular!</p>
            </div>
            <div className='input-field'>
                <ReactCodeInput type='text' fields={6} name={''} inputMode={'tel'} forceUppercase={true} onChange={e => getToken(e)} />
            </div>
            <div className="button">
                <button onClick={e => validate(e)}>Validar</button>
                <button onClick={(e) => back(e)}>Sair</button>
            </div>
        </div>
    )
}