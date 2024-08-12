import { Request, Response } from "express";
import UserService from '../services/Userservice';
import mailerService from '../services/mailerService';
import UserRegister from '../Dto/UserRegisterDto';

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

    // Registrar el usuario
    await UserService.register(userRegister);

    // Enviar el correo de bienvenida
    try {
      await mailerService.sendEmail(
        email,
        "Registro exitoso ✔",
        `Hola ${name}, bienvenido a nuestro servicio!`, // Asunto del correo
        `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #000;">
          <h2 style="color: #418E6D;">¡Bienvenido a QuindioAdventures, ${name}!</h2>
          <p>Estamos muy emocionados de que te unas a nuestra comunidad. A continuación, te damos la bienvenida y te contamos un poco más sobre lo que puedes esperar:</p>
          <p style="font-size: 16px;">Hola ${name},</p>
          <p>Bienvenido a nuestros servicios exclusivos de <strong>QuindioAdventures</strong>. Estamos aquí para asegurarnos de que tengas las mejores experiencias durante tu aventura con nosotros.</p>
          <p>Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
          <a href="https://www.quindioadventures.com" style="display: inline-block; background-color: #418E6D; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Explora más</a>
          <p style="font-size: 14px; color: #000; margin-top: 20px;">Saludos,<br>El equipo de QuindioAdventures</p>
        </div>
        `
      );
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }

    // Enviar respuesta de éxito
    return res.status(201).send({ status: 'register ok', password_hasheado: password });

  } catch (error: any) {
    // Manejar errores
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
    // Manejar otros errores
    return res.status(500).send({ errorInfo: "Error al registrar el usuario." });
  }
}

export default register;
