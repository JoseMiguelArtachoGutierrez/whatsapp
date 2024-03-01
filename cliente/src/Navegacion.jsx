import { useState, useEffect } from 'react';
import { socket } from './socket';
import { useNavigate } from 'react-router-dom';
import mapache from './assets/mapache.png';
import oveja from './assets/oveja.png';
import usuario from './assets/usuario.png';

function Navegacion() {
    const [usuariosActivos, setUsuariosActivos] = useState([]);
    const navigate = useNavigate();

    function cerrarSesion() {
        let token=localStorage.getItem('usuarioRegistrado')
        socket.emit("cerrarSesion",token);
        localStorage.removeItem('usuarioRegistrado');
        navigate('/registro');
    }
    socket.on('usuariosActivos', (usuarios) => {
        setUsuariosActivos(usuarios);
    });
    let perfil="";
    let lista= usuariosActivos.map((user, index) => {
        let imagen=""
        switch (user.fotoDePerfil) {
            case 'usuario.png':
            imagen = <img src={usuario} alt="Usuario" />;
            break;
            case 'oveja.png':
            imagen = <img src={oveja} alt="Oveja" />;
            break;
            case 'mapache.png':
            imagen = <img src={mapache} alt="Mapache" />;
            break;
            default:
            imagen = <img src="imagen_defecto.png" alt="Imagen por defecto" />;
        }
        if (user.token != localStorage.getItem('usuarioRegistrado')) {
            
            return(
            <div key={index} className='usuario' onClick={()=> {navigate('/chat/'+user.name)}}>
                <div className='container__img'>
                    {imagen}
                </div>
                <div className='container__texto'>
                    <h2>{user.name}</h2>
                    <p>{user.estado}</p>
                </div>
                </div>
            )
        }
        else{
            perfil=<div className="dropdown">
                    <button className="btn btn-success dropdown-toggle Perfil" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='container__img__perfil'>{imagen}</div>
                        <div className='container__texto'>
                            <h2>{user.name}</h2>
                            <p>{user.estado}</p>
                        </div>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick={cerrarSesion}><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
                    </ul>
                </div>
            
                
            
        }
    });


    return (
        <div className='navegacion'>
            {perfil}
            <div className='contenedor__UsuariosActivos'>
                <div onClick={()=>{navigate('/')}} className='text-center enlaceChatGlobal'>
                    <h2>Chat Global</h2>
                </div>
                {lista}
            </div>
            
        </div>
    )
}

export default Navegacion;