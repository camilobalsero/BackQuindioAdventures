import { Request, Response } from 'express';
import mailerService from '../services/mailerService';
import Chalet from '../Dto/ChaletDto';
import validateToken from '../middleware/validateToken';
import UserService from '../services/Userservice';

const crearReserva = async (req: Request, res: Response) => {
    try {
        const {
            nombre_chalet,
            ubicacion_chalet,
            capacidad,
            caracteristicas,
        } = req.body;

        // Recupera el email del usuario autenticado
        const email = res.locals.user.email;

        let chalet: Chalet = new Chalet(nombre_chalet, ubicacion_chalet, capacidad, caracteristicas);
        await UserService.addChalet(chalet)

        // Lógica para registrar el chalet o la reserva en la base de datos
        // await UserService.createChalet(chalet);

        try {
            await mailerService.sendEmail(
                email,
                "Haz registrado tu chalet exitosamente ✔",
                `Hola, bienvenido a nuestro servicio!`,
                `Hola, Bienvenido a nuestro servicio de QuindioAdventures`
            );
        } catch (error) {
            console.error("Error sending welcome email:", error);
        }

        return res.status(201).send(
            { status: 'Chalet registrado exitosamente' }
        );

    } catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).send({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}

export default [validateToken, crearReserva];
