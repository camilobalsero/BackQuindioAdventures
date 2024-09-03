import UpdateUser from '../Dto/UpdateUserDto';
import { Request, Response } from "express";
import UserService from '../services/Userservice';
import sendEmail from "../services/mailerService";

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


        const emailData = {
            subject: 'Haz actualizado tu perfil exitosamente',
            to: email, 
            dataTemplate: { name: name },  
            templateName: 'actualizarPerfil.html',
          };
      
          // Enviar el correo usando el servicio de Azure
          await sendEmail(emailData);

        return res.status(200).send({ status: 'Perfil actualizado correctamente' });
    } catch (error: any) {
        console.error("Error al actualizar el perfil:", error);
        return res.status(500).send({ message: "Error al actualizar el perfil" });
    }
};

export default actualizarPerfil;