import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Importa el paquete CORS
import register from './routes/register';

const app = express();

// Middleware para parsear JSON y datos de formulario
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de CORS
app.use(cors());

// Rutas de la aplicación
app.use('/register', register);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
