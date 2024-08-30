import { Request, Response } from "express";
import UserService from '../services/Userservice';
import UserRegister from '../Dto/UserRegisterDto';
import sendEmail from "../services/mailerService";

const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastName,
      phoneNumber,
      age,
      document,
      address,
      email,
      password,
      rol = 'usuario'
    } = req.body;

    // Crear el objeto UserRegister
    const userRegister: UserRegister = new UserRegister(
      document,
      email,
      password,
      name,
      lastName,
      age,
      phoneNumber,
      address,
      rol
    );

    // Registrar el usuario en la base de datos
    await UserService.register(userRegister);

    // Preparar los datos para enviar el correo de bienvenida
    const emailData = {
      subject: 'Bienvenido a Quindío Adventures',
      to: email, 
      dataTemplate: { name: name },  
      templateName: 'registro.html',
    };

    // Enviar el correo usando el servicio de Azure
    await sendEmail(emailData);

    // Respuesta exitosa
    return res.status(201).send({ status: 'register ok', password_hasheado: password });

  } catch (error: any) {
    // Manejo de errores, incluyendo errores de duplicación de entradas
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
    return res.status(500).send({ errorInfo: "Error al registrar el usuario." });
  }
}

export default register;
