import io from 'socket.io-client';

const socket = io('http://localhost:10101'); // URL del servidor Socket.IO

socket.on('connect', () => {
  console.log('Conectado al servidor Socket.IO');

  // Enviar un mensaje al servidor
  socket.emit('message', 'Hola desde el cliente');

  // Recibir mensajes del servidor
  socket.on('message', (message: any) => {
    console.log('Mensaje recibido del servidor:', message);
  });
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor Socket.IO');
});