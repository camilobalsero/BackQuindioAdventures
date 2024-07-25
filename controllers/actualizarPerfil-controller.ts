import User from '../Dto/UserDto';
import { Request, Response } from "express";
import UserService from '../services/Userservice';
import mailerService from '../services/mailerService';

let actualizarPerfil = async (req: Request, res: Response) => {
    try {
        const {
            name,
            lastName,
            phoneNumber,
            age,
            document,
            address,
            password } = req.body;
        const email = res.locals.user.email; 

        let user: User = new User(document, email, password, name, lastName, age, phoneNumber, address);
        
        await UserService.updateUserProfile(user); 
        await UserService.updateTelefono(user);
        await UserService.updateDireccion(user);

        try {
            await mailerService.sendEmail(
                email,
                "Actualización de perfil exitosa ✔",
                `Hola ${name}, tu perfil ha sido actualizado con éxito!`,
                `Hola ${name}, tu perfil en QuindioAdventures ha sido actualizado satisfactoriamente.`
            );
        } catch (error) {
            console.error("Error al enviar el correo de confirmación:", error);
        }

        return res.status(200).send({ status: 'Perfil actualizado correctamente' });
    } catch (error: any) {
        console.error("Error al actualizar el perfil:", error);
        return res.status(500).send({ message: "Error al actualizar el perfil" });
    }
};

export default actualizarPerfil;
