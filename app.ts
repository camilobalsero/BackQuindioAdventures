import express from "express";
import bodyParser from "body-parser";
import register from './routes/register';
import auth from "./routes/auth";
import reserva from "./routes/reserva";
import reestablecer from "./routes/reestablecer";
import cors from "cors";
import profile from "./routes/profile";

const app = express().use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/register', register);
app.use('/auth', auth);
app.use('/reserva', reserva);
app.use('/reestablecer', reestablecer);
app.use('/user', profile); 

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
