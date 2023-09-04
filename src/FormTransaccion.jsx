import React, { useState } from 'react'
import { TransactionService } from './services/TransactionService';
const FormTransaccion = () => {
    const [id, setId] = useState('');
    const [costo, setCosto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [tipo, setTipo] = useState('');
    const clickGuardarTransaccion = () => {
        (new TransactionService('http://localhost:7007')).crearTransaccion(
            [{ id, costo, cantidad }], tipo
        )
    }
    return (<div>
        <h1>Formulario de Transaccion</h1>
        <input type="text" placeholder="Id" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder="Costo Unitario" value={costo} onChange={(e) => setCosto(e.target.value)} />
        <input type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        <select value={tipo} onChange={(e) => { 
            
            setTipo(e.target.value) }}>
            <option value="0">Ingreso</option>
            <option value="1">Egreso</option>
        </select>
        <button onClick={clickGuardarTransaccion}>Guardar</button>
    </div>);
}

export default FormTransaccion;