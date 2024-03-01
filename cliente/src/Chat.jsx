import { useState,useEffect } from 'react';
import { socket } from './socket';
import { useParams } from "react-router-dom";

function Chat() {
    const [inputValue, setInputValue] = useState('');
    const [listaMensajes, setListaMensajes] = useState([]);
    const [usuario, setUsuario]=useState("");
    const {id} = useParams();

    const enviarMensaje = () => {
        socket.emit('mensajePrivado', {
            "ID":id,
            "mensaje":inputValue,
        });
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
    socket.on('recibirMensaje', (msg) => {
        if (!listaMensajes.find(mensaje => mensaje.id === msg.id)) {
            setListaMensajes([...listaMensajes,msg])
            socket.emit('mandarChat',{
                ID:id,
                chat:[...listaMensajes,msg]
            })
        }
    });
    socket.on('recibirChat',(msg)=>{
        if (!msg) {
            console.log("potfafa")
            socket.emit('mandarChat',{
                ID:id,
                chat:listaMensajes
            })
        }else{
            console.log("recibido",msg)
            setListaMensajes(msg)
        }
        
    });
    useEffect(() => {
        socket.emit('login',id)
        
    }, []); 

    socket.on('usuarioActual',(msg)=>{
        setUsuario(msg)
        console.log("usuari:",msg)
        
      })
    
    
    let arrayPrueba=[]
    listaMensajes.forEach(element => {
        if (!listaMensajes.find(mensaje => mensaje.id === element.id)) {
            arrayPrueba.push(element)
        }
    });
    let lista = listaMensajes.map((mensaje, index) => {
        let resultado=""
        if (mensaje.de!=id) {
          resultado=<li className='tuMensaje' key={index}><b>Yo</b>: {mensaje.mensaje}</li>
        }else{
          resultado=<li key={index}><b>{mensaje.de}</b>: {mensaje.mensaje}</li>
        }
        return (resultado)
    })

    return (
        <div className='chatGlobal'>
            <h1>{id}</h1>
            
            <div className='chat'>
                <ul className='listaChat'>

                {lista}
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
    )
}
export default Chat;