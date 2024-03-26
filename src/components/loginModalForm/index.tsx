import React, { useState } from 'react';
import './style.css'

export const ModalFormLogin = ({ email, password, getLogin }: any) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className='modal'>
            <div className='title'>
                <span>Tela de Acesso</span>
            </div>
            <form onSubmit={getLogin}>
                <div className='fields'>
                    <input type="email" placeholder='email' onChange={email} />
                </div>
                <div className='fields'>
                    <input type={showPassword ? "password" : "text"} placeholder='********' onChange={password} />
                    {showPassword ? (
                        <i onClick={() => setShowPassword(false)} id='eye' className="bi bi-eye-fill"></i>
                    ) : (
                        <i onClick={() => setShowPassword(true)} id='eye' className="bi bi-eye-slash-fill"></i>
                    )}
                </div>
                <div className='button-fields'>
                    <button>Entrar</button>
                </div>
            </form>
        </div>
    )
}