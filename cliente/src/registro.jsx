import { socket } from './socket';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mapache from './assets/mapache.png';
import oveja from './assets/oveja.png';
import usuario from './assets/usuario.png';

function Registro() {
    
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState('');
    const [tokenReceived, setTokenReceived] = useState(false);
    const [errorRegistro, setErrorRegistro] = useState("")
    const navigate = useNavigate();

    const usuario_cambio = (event) => {
        setUsername(event.target.value);
    };

    const estado_cambio = (event) => {
        setStatus(event.target.value);
    };

    const guardarDatos = () => {
        const nombreFoto = selectedPhoto.split('/').pop();
        // Aquí puedes hacer lo que necesites con los datos del formulario
        console.log('Nombre de usuario:', username);
        console.log('Estado:', status);
        console.log('Foto seleccionada:', nombreFoto);
        socket.emit('registro',{
            "name":username,
            "estado": status,
            "fotoDePerfil":nombreFoto
        });
    };
    socket.on('token',(msg)=>{
        console.log(msg);
        if (!tokenReceived) {
            if (typeof msg === 'object' && msg !== null) {
                setErrorRegistro(msg.mensaje)
            }else{
                localStorage.setItem('usuarioRegistrado', msg); // Guarda el token en el localStorage
                setTokenReceived(true); // Marca que el token ha sido recibido
                navigate('/registro');
            }
        }
    });

    return (
        <div className='registro'>
            <h2>Registro</h2>
            <p>{errorRegistro}</p>
            <div>
                <label>Nombre de usuario:</label>
                <input type="text" value={username} onChange={usuario_cambio} />
            </div>
            <div>
                <label>Estado:</label>
                <input type="text" value={status} onChange={estado_cambio} />
            </div>
            <div className='fotos'>
                <label>Selecciona una foto:</label>
                <div>
                    <button onClick={() => setSelectedPhoto(mapache)} className={selectedPhoto === mapache ? 'selected' : ''}>
                        <img src={mapache} alt="Mapache" />
                    </button>
                    <button onClick={() => setSelectedPhoto(oveja)} className={selectedPhoto === oveja ? 'selected' : ''}>
                        <img src={oveja} alt="Oveja" />
                    </button>
                    <button onClick={() => setSelectedPhoto(usuario)} className={selectedPhoto === usuario ? 'selected' : ''}>
                        <img src={usuario} alt="Usuario" />
                    </button>
                </div>
            </div>
            <button onClick={guardarDatos}>Guardar</button>
        </div>
    );
}

export default Registro;