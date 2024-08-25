import express from "express";
import bodyParser from "body-parser";
import register from './routes/register';
import auth from "./routes/auth";
import reserva from "./routes/reserva";
import reestablecer from "./routes/reestablecer";
import cors from "cors";
import profile from "./routes/profile";
import actualizarPerfil from "./routes/actuallizarPerfil";
import imageRoutes from "./routes/imageRoutes"
import createChalet from "./routes/createChalet";
import solicitarCambio from "./routes/solicitarCambio"
import authAdmin from "./routes/authAdmin";
import obtenerChalets from "./routes/getChalet"
import obtenerChaletsId from "./routes/getChaletId"
import obtenerTemporada from "./routes/temporadas"


const app = express().use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/register', register);
app.use('/auth', auth);
app.use('/reestablecer', reestablecer);
app.use('/envioCorreoCambioContrasena',solicitarCambio)
app.use('/user', profile); 
app.use('/updateProfile', actualizarPerfil); 
app.use('/api/images', imageRoutes)
app.use('/createChalet', createChalet );
app.use('/authAdmin', authAdmin);
app.use('/chalet',obtenerChalets)
app.use('/chaletId', obtenerChaletsId )
app.use('/reserva', reserva);
app.use('/temporadas', obtenerTemporada);


const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});