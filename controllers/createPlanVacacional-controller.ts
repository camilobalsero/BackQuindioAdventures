import { Request, Response } from 'express';
import mailerService from '../services/mailerService';
import validateToken from '../middleware/validateToken';
import PlanTarifa from '../Dto/PlanTarifasDto';
import Plan from '../Dto/PlanDto';
import PlanImages from '../Dto/PlanImagenesDto';
import PlanService from '../services/planService';

const crearPlan = async (req: Request, res: Response) => {
    try {
        const {
            descripcion,
            imagenes,
            nombre,
            tarifas,
            ubicacion
        } = req.body;

        console.log(req.body);
        

        // Recupera el email del usuario autenticado
        const email = res.locals.user.email;

        // Crear el objeto del chalet
        let plan: Plan = new Plan(nombre, ubicacion, descripcion,email);
        console.log(plan,23456);
        
        try {
            // Insertar el chalet en la base de datos
            const planId = await PlanService.addPlan(plan);

            // Insertar las tarifas asociadas al chalet
            for (const tarifa of tarifas) {
                let newTarifa: PlanTarifa = new PlanTarifa(planId, tarifa.precio, tarifa.temporada);
                await PlanService.addTarifa(newTarifa);
            }

            // Insertar las imágenes asociadas al chalet
            for (const imagen of imagenes) {
                let newImagen: PlanImages = new PlanImages(planId, imagen);
                await PlanService.addPlanImage(newImagen);
            }

            // Enviar correo de confirmación
            await mailerService.sendEmail(
                email,
                "Haz registrado tu chalet exitosamente ✔",
                `Hola, bienvenido a nuestro servicios`,
                `Hola, Bienvenido a nuestro servicio de QuindioAdventures`
            );

            return res.status(201).send({ status: 'Plan Vacacional registrado exitosamente' });
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

export default [validateToken, crearPlan];