import { Request, Response } from 'express';
import mailerService from '../services/mailerService';
import Chalet from '../Dto/ChaletDto';
import validateToken from '../middleware/validateToken';
import ChaletTarifa from '../Dto/ChaletTarifasDto';
import ChaletImages from '../Dto/ChaletImagenesDto';
import ServiciosChalet from '../Dto/ServiciosDto';
import ChaletService from '../services/chaletService';

const crearChalet = async (req: Request, res: Response) => {
    try {
        const {
            descripcion,
            imagenes,
            nombre,
            servicios,
            tarifas,
            ubicacion,
            municipio
        } = req.body;

        const fechaRegistro = new Date().toISOString().split('T')[0];

        console.log(req.body);
        

        // Recupera el email del usuario autenticado
        const email = res.locals.user.email;

        // Crear el objeto del chalet
        let chalet: Chalet = new Chalet(nombre, municipio, ubicacion, descripcion, email, fechaRegistro);

        try {
            // Insertar el chalet en la base de datos
            const chaletId = await ChaletService.addChalet(chalet);

            // Insertar las tarifas asociadas al chalet
            for (const tarifa of tarifas) {
                let newTarifa: ChaletTarifa = new ChaletTarifa(chaletId, tarifa.precio, tarifa.tipohabitacion, tarifa.temporada);
                await ChaletService.addTarifa(newTarifa);
            }

            // Insertar las imágenes asociadas al chalet
            for (const imagen of imagenes) {
                let newImagen: ChaletImages = new ChaletImages(chaletId, imagen);
                await ChaletService.addChaletImage(newImagen);
            }

            for (const servicio of servicios){
                let newServicio: ServiciosChalet = new ServiciosChalet(chaletId, servicio);
                await ChaletService.addServicioChalet(newServicio);
            }

            // Enviar correo de confirmación
            /*await mailerService.sendEmail(
                email,
                "Haz registrado tu chalet exitosamente ✔",
                `Hola, bienvenido a nuestro servicios`,
                `Hola, Bienvenido a nuestro servicio de QuindioAdventures`
            );*/

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