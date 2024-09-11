import { Server } from 'socket.io';

export const handleSocketEvents = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (message) => {
      console.log('Mensaje recibido del cliente:', message);
      socket.emit('message', 'Hola desde el servidor');
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};