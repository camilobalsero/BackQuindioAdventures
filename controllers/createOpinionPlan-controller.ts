import { Request, Response } from "express";
import UserService from '../services/Userservice';
import OpinionPlan from "../Dto/OpinionPlanDto";

const createOpinionPlan = async (req: Request, res: Response) => {
  try {
    const {
      id_plan,
      opinion,
      calificacion
    } = req.body;

    // Obtener fecha y hora por separado
    const now = new Date();
    const fecha = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(' ')[0]; // HH:MM:SS

    const email = res.locals.user.email;

    let comentario: OpinionPlan = new OpinionPlan(email, id_plan, opinion, fecha, hora, calificacion);

    await UserService.createOpinionPlan(comentario);

    return res.status(201).send({ status: 'Comentario Registrado' });

  } catch (error: any) {
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
    return res.status(500).send({ errorInfo: "Error al crear el comentario." });
  }
}

export default createOpinionPlan;
