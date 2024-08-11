import { Request, Response } from "express";
import AdminService from '../services/adminService';
import Admin from '../Dto/adminDto';
import mailerService from "../services/mailerService";

let registerAdmin = async (req: Request, res: Response) => {
    try {
        const {
            documento,
            email,
            password,
            nombres,
            apellidos,
            edad,
            telefono,
            direccion
        } = req.body;

        let admin: Admin = new Admin(documento, email, password, nombres, apellidos, edad, telefono, direccion);
        await AdminService.register(admin);

        try {
            await mailerService.sendEmail(
              email,
              "Registro exitoso ✔",
              `Hola ${nombres}, bienvenido al panel de administración!`,
              `Hola ${nombres}, Bienvenido al panel de administración de QuindioAdventures`
            );
          } catch (error) {
            console.error("Error sending welcome email:", error);
          }
      

        return res.status(201).send({ status: 'Admin registered successfully' });
    } catch (error: any) {
        console.error("Error registering admin:", error);
        
        if (error && error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: 'Email already exists' });
        }
        
        return res.status(500).json({ error: 'Error in registration process' });
    }
}

export default registerAdmin;
