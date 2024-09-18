import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { configureSocket } from './config/socket';
import { handleSocketEvents } from './controllers/chat-controller';

// Importación de todas tus rutas
import register from './routes/register';
import auth from './routes/auth';
import reserva from './routes/reserva';
import reservaPlan from './routes/reservaPlan';
import reestablecer from './routes/reestablecer';
import profile from './routes/profile';
import actualizarPerfil from './routes/actuallizarPerfil';
import imageRoutes from './routes/imageRoutes';
import createChalet from './routes/createChalet';
import solicitarCambio from './routes/solicitarCambio';
import authAdmin from './routes/authAdmin';
import obtenerChalets from './routes/getChalet';
import obtenerChaletsId from './routes/getChaletId';
import obtenerTemporada from './routes/temporadas';
import obtenerTemporadaPlan from './routes/temporadasPlan';
import chatbot from './routes/chatbot';
import paymentRoutes from './routes/payment';
import createPlan from './routes/crearPlan';
import chaletEmail from './routes/getChaletEmail';
import planEmail from './routes/getPlanEmail';
import obtenerPlanes from './routes/getPlan';
import obtenerPlanPorId from './routes/getPlanId';
import obtenerTodosLosUsuarios from './routes/getUsuarios';
import activarUsuario from './routes/activarUsuario';
import desactivarUsuario from './routes/desactivarUsuario';
import activarChalet from './routes/activarChalet';
import eliminarChalet from './routes/eliminarChalet';
import activarPlan from './routes/activarPlan';
import eliminarPlan from './routes/eliminarPlanVacacional';
import chaletsAdmin from './routes/chaletsAdmin';
import planesAdmin from './routes/planesAdmin';
import getReservasChalet from './routes/getReservasChalet';
import getReservasMiChalet from './routes/getReservasMiChalet';
import getReservasPlan from './routes/getReservasPlan';
import getReservasMiPlan from './routes/getReservasMiPlan';
import getPerfilCreadorChalet from './routes/getPerfilCreadorChalet';
import cancelarReserva from './routes/cancelarReserva';
import activarReserva from './routes/activarReserva';
import cancelarReservaPlan from './routes/cancelarReservaPlan';
import activarReservaPlan from './routes/activarReservaPlan';
import crearOpinionChalet from './routes/crearOpinionChalet';
import chat from './routes/chat';
import getFechasOcupadasChalet from './routes/getFechasOcupadasChalet';
import getFechasOcupadasPlan from './routes/getFechasOcupadasPlan';

const app = express();
const server = http.createServer(app);

// Configurar Socket.io
const io = configureSocket(server);

// Manejar eventos de Socket.io (conexión, mensajes, desconexión)
handleSocketEvents(io);

// Middleware para parsear JSON y formularios
import crearOpinionPlan from './routes/crearOpinionPlan';
import getOpinionChalet from './routes/getOpinionChalet';
import getOpinionPlan from './routes/getOpinionPlan';
import eliminarOpinionChalet from './routes/eliminarOpinionChalet';
import eliminarOpinionPlan from './routes/eliminarOpinionPlan';


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use('/register', register);
app.use('/auth', auth);
app.use('/authAdmin', authAdmin);
app.use('/reestablecer', reestablecer);
app.use('/envioCorreoCambioContrasena', solicitarCambio);
app.use('/user', profile);
app.use('/updateProfile', actualizarPerfil);
app.use('/api/images', imageRoutes);
app.use('/createChalet', createChalet);
app.use('/chalet', obtenerChalets);
app.use('/chaletId', obtenerChaletsId);
app.use('/chaletEmail', chaletEmail);
app.use('/chaletsAdmin', chaletsAdmin);
app.use('/api', obtenerChaletsId);
app.use('/temporadas', obtenerTemporada);
app.use('/temporadasPlan', obtenerTemporadaPlan);
app.use('/chatbot', chatbot);
app.use('/api', paymentRoutes);
app.use('/createPlan', createPlan);
app.use('/plan', obtenerPlanes);
app.use('/planId', obtenerPlanPorId);
app.use('/planEmail', planEmail);
app.use('/planesAdmin', planesAdmin);
app.use('/usuarios', obtenerTodosLosUsuarios);
app.use('/activarUsuario', activarUsuario);
app.use('/desactivarUsuario', desactivarUsuario);
app.use('/activarChalet', activarChalet);
app.use('/eliminarChalet', eliminarChalet);
app.use('/activarPlan', activarPlan);
app.use('/eliminarPlan', eliminarPlan);
app.use('/reserva', reserva);
app.use('/reservaPlan', reservaPlan);
app.use('/getReservasChalet', getReservasChalet);
app.use('/getReservasMiChalet', getReservasMiChalet);
app.use('/getReservasPlan', getReservasPlan);
app.use('/getReservasMiPlan', getReservasMiPlan);
app.use('/getPerfilCreadorChalet', getPerfilCreadorChalet);
app.use('/cancelarReserva', cancelarReserva);
app.use('/activarReserva', activarReserva);
app.use('/cancelarReservaPlan', cancelarReservaPlan);
app.use('/activarReservaPlan', activarReservaPlan);
app.use('/crearOpinionChalet', crearOpinionChalet);
app.use('/chat', chat)
app.use('/crearOpinionPlan', crearOpinionPlan);
app.use('/getOpinionChalet', getOpinionChalet);
app.use('/getOpinionPlan', getOpinionPlan);
app.use('/eliminarOpinionChalet', eliminarOpinionChalet);
app.use('/eliminarOpinionPlan', eliminarOpinionPlan);
app.use('/getFechasOcupadasChalet', getFechasOcupadasChalet);
app.use('/getFechasOcupadasPlan', getFechasOcupadasPlan);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 10101;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}).on("error", (error) => {
  console.error('Error al iniciar el servidor:', error.message);
});
