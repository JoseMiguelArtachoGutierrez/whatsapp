import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { socket } from './socket';
import App from './App.jsx';
import Registro from './registro.jsx';
import Navegacion from './Navegacion.jsx';
import Chat from './Chat.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/registro",
    element: 
    <>
      <Registro></Registro>
    </>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  },
  {
    path: "/",
    element:
    <div className='inicio'>
      <Navegacion></Navegacion>
      <App></App>
    </div>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  },
  {
    path: "/chat/:id",
    element:
    <div className='inicio'>
      <Navegacion></Navegacion>
      <Chat></Chat>
    </div>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  }
]);

const AppWithLocalStorageCheck = () => {
  useEffect(() => {
    // Si ya está en "/registro", no se necesita verificar el localStorage
    if (window.location.pathname === '/registro') return;

    // Verificar si la variable usuarioRegistrado existe en el localStorage
    const usuarioRegistrado = localStorage.getItem('usuarioRegistrado');
    // Si usuarioRegistrado no existe, redirigir al usuario a "/registro"
    if (!usuarioRegistrado) {
      window.location.href = '/registro';
    }else{
      socket.emit("comprobarToken",usuarioRegistrado)
    }
  }, []); // Ejecutar solo una vez al cargar el componente

  return (
    <RouterProvider router={router}>
      <Routes>
        {/* Rutas protegidas */}
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<App />} />
        {/* Ruta por defecto: se redirige a esta ruta si usuarioRegistrado no existe en localStorage */}
        <Route path="*" element={<Navigate to="/registro" />} />
      </Routes>
    </RouterProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWithLocalStorageCheck />
);
