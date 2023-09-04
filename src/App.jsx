import { useState } from 'react'
import './App.css'
import { UsuarioService } from './services/UsuarioService';
import Buscador from './Buscador';

function App() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const crearUsuarioClick = () => {
    console.log('Crear item');
    (new UsuarioService('http://localhost:7084')).crearUsuario(usuario, password,email).then((id) => {
      alert('Usuario creado con id: ' + id);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <div><input type="text" placeholder="Usuario" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} />
        <input type="text" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <button onClick={crearUsuarioClick}>Crear Usuario</button>
      </div>
      <Buscador />
    </>
  )
}

export default App
