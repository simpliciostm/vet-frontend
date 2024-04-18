import React from 'react';
import './style.css';

export const ShowAlert = ({ status, msg }: any) => {
    return (
        <div className='container-alert'>
            {status === 'warning' ? (

                <div id='box' className='box-alert-warning'>
                    <div className='icon'>
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <div className='text'>
                        <span>{msg}</span>
                    </div>
                </div>
            ) : null}

            {status === 'success' ? (

                <div id='box' className='box-alert-success'>
                    <div className='icon'>
                        <i className="bi bi-exclamation-circle-fill"></i>
                    </div>
                    <div className='text'>
                        <span>{msg}</span>
                    </div>
                </div>
            ) : null}

            {status === 'error' ? (

                <div id='box' className='box-alert-error'>
                    <div className='icon'>
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <div className='text'>
                        <span>{msg}</span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}