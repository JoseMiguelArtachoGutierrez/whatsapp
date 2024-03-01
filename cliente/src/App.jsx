import { useState,useEffect } from 'react';

import { socket } from './socket';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [listaMensajes, setListaMensajes] = useState([]);
    const [usuario, setUsuario]=useState("");


    
    const enviarMensaje = () => {
        socket.emit('mensajeGlobal', inputValue);
        setInputValue('');
    };

    const actualizarInput = (event) => {
      setInputValue(event.target.value);
        
    };
    const pulsarEnter = (event) => {
      if (event.key === 'Enter') {
          enviarMensaje();
      }
    };
    useEffect(() => {
      socket.emit('login',"")
    }, []); 
  


    socket.on('mensajeNuevo', (msg) => {
        setListaMensajes(msg)
    });
    socket.on('usuarioActual',(msg)=>{
      setUsuario(msg)
    })
    return (
        <div className='chatGlobal'>
            <h1>Chat Global</h1>
            <div className='chat'>
                <ul className='listaChat'>

                    {listaMensajes.map((mensaje, index) => {
                      let resultado=""
                      if (!mensaje.mensaje) {
                        resultado=<li className='conectado' key={index}>{mensaje.name}   se a unido a la sala</li>
                      }else{
                        if (mensaje.name==usuario.name) {
                          resultado=<li className='tuMensaje' key={index}><b>Yo</b>: {mensaje.mensaje}</li>
                        }else{
                          resultado=<li key={index}><b>{mensaje.name}</b>: {mensaje.mensaje}</li>
                        }
                      }
                      
                      return (resultado)
                    })}
                </ul>
                <div className='escribir'>
                    {/* Input para escribir el mensaje */}
                    <input
                        type='text'
                        value={inputValue}
                        onChange={actualizarInput}
                        onKeyDown={pulsarEnter}
                    />
                    {/* Botón para enviar el mensaje */}
                    <button className='btn btn-success' onClick={enviarMensaje}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
