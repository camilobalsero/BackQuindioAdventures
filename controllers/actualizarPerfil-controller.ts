import UpdateUser from '../Dto/UpdateUserDto';
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
            address,
            image
        } = req.body; 
        
        const email = res.locals.user.email;
        
        let updateUser: UpdateUser = new UpdateUser(email, name, lastName, age, phoneNumber, address, image );
        
        await UserService.updateUserProfile(updateUser); 



        /*try {

            await mailerService.sendEmail(
                email,
                "Actualización de perfil exitosa ✔",
                `Hola ${name}, tu perfil ha sido actualizado con éxito!`,
                `Hola ${name}, tu perfil en QuindioAdventures ha sido actualizado satisfactoriamente.`
            );
        } catch (error) {
            console.error("Error al enviar el correo de confirmación:", error);

        }
         */


        return res.status(200).send({ status: 'Perfil actualizado correctamente' });
    } catch (error: any) {
        console.error("Error al actualizar el perfil:", error);
        return res.status(500).send({ message: "Error al actualizar el perfil" });
    }
};

export default actualizarPerfil;