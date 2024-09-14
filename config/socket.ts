import { Server } from 'socket.io';
import http from 'http';

export const configureSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Permitir cualquier origen, ajusta según sea necesario
      methods: ["GET", "POST"]
    }
  });

  return io;
};