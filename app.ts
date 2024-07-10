import express from "express"
import bodyParser from "body-parser"
import register from './routes/register'
import auth from "./routes/auth";
import reserva from "./routes/reserva";
import validateToken from "./middleware/validateToken";
import reestablecer from "./controllers/reestablecerPassword-controller";

const app = express().use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use('/register', register);
app.use('/auth', auth);
app.use('/reserva',validateToken, reserva)
app.use('/reestablecer', reestablecer)

const PORT = process.env.PORT || 10101;

app.listen(PORT, () =>{
    console.log("Servidor ejecutandose en el puerto: ", PORT)
}).on("error", (error) =>{
    throw new Error(error.message);
})