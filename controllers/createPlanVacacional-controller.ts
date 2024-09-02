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
            ubicacion,
            municipio
        } = req.body;
        
        const fechaRegistro = new Date().toISOString().split('T')[0];

        const email = res.locals.user.email;

        let plan: Plan = new Plan(nombre, municipio, ubicacion, descripcion,email, fechaRegistro);

        try {
            const planId = await PlanService.addPlan(plan);

            for (const tarifa of tarifas) {
                let newTarifa: PlanTarifa = new PlanTarifa(planId, tarifa.precio, tarifa.temporada, tarifa.horaSalida, tarifa.horaLlegada);
                console.log(newTarifa,12345);
                
                await PlanService.addTarifa(newTarifa);
            }

            for (const imagen of imagenes) {
                let newImagen: PlanImages = new PlanImages(planId, imagen);
                await PlanService.addPlanImage(newImagen);
            }


            /*

            await mailerService.sendEmail(
=======
            /*await mailerService.sendEmail(
>>>>>>> 31d0f074cfc5b088b0f78567dc472405ae770929
                email,
                "Haz registrado tu chalet exitosamente ✔",
                `Hola, bienvenido a nuestro servicios`,
                `Hola, Bienvenido a nuestro servicio de QuindioAdventures`
<<<<<<< HEAD
            );
            
            */


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