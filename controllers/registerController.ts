import User from '../Dto/UserDto';
import { Request, Response } from "express";
import UserService from '../services/Userservice';


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
      password,
    } = req.body;

    let user: User = new User(document, email, password, name, lastName, age, phoneNumber, address);
    await UserService.register(user)
    await UserService.registerTelefono(user);
    await UserService.registerDireccion(user);
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