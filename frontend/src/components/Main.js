import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Main() {
    return (
        <>
        <div className='container_principal'>
            <div className='container_cuenta'>
                <h1 className='titulo_principal'>¿Estás list@ para codear tu corazón?</h1>
            </div>
            <button className='btn-grad'>Crear cuenta de citas</button>

        </div>
        </>
    )
}

export default Main