import User from '../Dto/UserDto';
import { Request, Response } from "express";
import UserService from '../services/Userservice';
import mailerService from '../services/mailerService';


let register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastName,
      phoneNumber,
      age,
      document,
      address,
      email,
      password
    } = req.body;

    let user: User = new User(document, email, password, name, lastName, age, phoneNumber, address);
    await UserService.register(user)
    await UserService.registerTelefono(user);
    await UserService.registerDireccion(user);

    

    try {
      await mailerService.sendEmail(
        email,
        "Registro exitoso ✔",
        `Hola ${name}, bienvenido a nuestro servicio!`,
        `Hola ${name}, Bienvenido a nuestro serviciosssssssssssssssssss de QuindioAdventures`
      );
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }

  return res.status(201).send(
      {status: 'register ok', password_hasheado: password}
  );

    return res.status(201).send(
      { status: 'register ok'}
    );
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage }
      );
    }
  }
}


export default register;