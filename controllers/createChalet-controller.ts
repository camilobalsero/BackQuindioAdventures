import { Request, Response } from 'express';
import mailerService from '../services/mailerService';
import Chalet from '../Dto/ChaletDto';
import validateToken from '../middleware/validateToken';
import UserService from '../services/Userservice';
import Tarifa from '../Dto/TarifasChaletDto';
import Imagenes from '../Dto/ImagenesChaletDto';

const crearChalet = async (req: Request, res: Response) => {
    try {
        const {
            nombre_chalet,
            ubicacion_chalet,
            capacidad,
            caracteristicas,
            tarifas,
            imagenes
        } = req.body;

        // Recupera el email del usuario autenticado
        const email = res.locals.user.email;

        // Crear el objeto del chalet
        let chalet: Chalet = new Chalet(nombre_chalet, ubicacion_chalet, capacidad, caracteristicas);

        try {
            // Insertar el chalet en la base de datos
            const chaletId = await UserService.addChalet(chalet);

            // Insertar las tarifas asociadas al chalet
            for (const tarifa of tarifas) {
                let newTarifa: Tarifa = new Tarifa(chaletId, tarifa.precio, tarifa.tipo_habitacion, tarifa.temporada);
                await UserService.addTarifa(newTarifa);
            }

            // Insertar las imágenes asociadas al chalet
            for (const imagen of imagenes) {
                let newImagen: Imagenes = new Imagenes(chaletId, imagen.image);
                await UserService.addChaletImage(newImagen);
            }

            // Enviar correo de confirmación
            await mailerService.sendEmail(
                email,
                "Haz registrado tu chalet exitosamente ✔",
                `Hola, bienvenido a nuestro servicio!`,
                `Hola, Bienvenido a nuestro servicio de QuindioAdventures`
            );

            return res.status(201).send({ status: 'Chalet registrado exitosamente' });
        } catch (error) {
            console.error("Error al registrar el chalet:", error);
            return res.status(500).send({ error: 'Error interno del servidor' });
        }

    } catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).send({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}

export default [validateToken, crearChalet];
