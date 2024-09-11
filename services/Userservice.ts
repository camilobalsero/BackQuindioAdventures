import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
import UpdateUser from '../Dto/UpdateUserDto';
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import UserRegister from '../Dto/UserRegisterDto';
import OpinionChalet from '../Dto/OpinionChaletDto';
import OpinionPlan from '../Dto/OpinionPlanDto'

class UserService {
    
    static async register(user: UserRegister) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }

    static async auth(auth: Auth) {
        try {
            const result: any = await UserRepository.login(auth);
    
            if (result[0] && result[0].length > 0) {
                const hashedPassword = result;
                if (hashedPassword) {
                    const isPasswordValid = await bcrypt.compare(auth.password, hashedPassword);
                    if (isPasswordValid) {
                        return { logged: true, status: "Successful Authentication" };
                    } else {
                        return { logged: false, status: "Incorrect username or password" };
                    }
                } else {
                    return { logged: false, status: "No password found for the given email" };
                }
            } else {
                return { logged: false, status: "Incorrect username or password" };
            }
        } catch (error) {
            console.error("Error al autenticar:", error);
            throw new Error("Authentication failed");
        }
    }


    static async changePassword(email: string, newPassword: string) {
        try {
            const newPasswordHash = await generateHash(newPassword);
            await UserRepository.resetPassword(email, newPasswordHash);

            return { success: true, status: "Contraseña cambiada exitosamente" };
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            throw new Error("Error al cambiar la contraseña");
        }
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        try {
            const result = await UserRepository.getUserByEmail(email);
            if (result.length > 0) {
                const user = result[0];
                
                // Verificar que el email del usuario sea el mismo y que no sea solo la imagen por defecto
                if (user.email === email && user._profile_image_url !== "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg") {
                    return user;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error en UserService.getUserByEmail:", error);
            throw error;
        }
    }
    

    static async updateUserProfile(user: UpdateUser) {
        return await UserRepository.updateUser(user);
    }

    static async sendResetPasswordEmail(email: string, resetLink: string) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
            user: "camilobalsero16@gmail.com",
            pass: "cjhh ekrl emwt dvlc",
            },
        });

        let info = await transporter.sendMail({
            from:'"Cambio de Contraseña 👻" <camilobalsero16@gmail.com>',
            to: email,
            subject: "Restablecimiento de contraseña",
            text: `Por favor, utiliza el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #000;">
            <h2 style="color: #418E6D;">¡Cambio de Contraseña!</h2>
            <p>Bienvenido a nuestros servicios exclusivos de <strong>QuindioAdventures</strong>. Estamos aquí para asegurarnos de que tengas las mejores experiencias durante tu aventura con nosotros.</p>
            <p>Si necesitas cambiar tu contraseña da click aqui:</p> 
            <a href="${resetLink}" style="display: inline-block; background-color: #418E6D; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Cambia tu contraseña</a>
            <p style="font-size: 14px; color: #000; margin-top: 20px;">Saludos,<br>El equipo de QuindioAdventures</p>
            </div>
        `,
        });
    }

    static async obtenerTodosLosUsuarios():  Promise<any[]>{
        try{
            const users = await UserRepository.getAllUsers();
            return users;
        }catch(error){
            console.error("Error en el UserService al obtener usuarios:", error);
            throw error
        }
    }

    static async createOpinionChalet(OpinionChalet: OpinionChalet) {
        return await UserRepository.createOpinionChalet(OpinionChalet);
    }

    static async createOpinionPlan(OpinionPlan: OpinionPlan) {
        return await UserRepository.createOpinionPlan(OpinionPlan);
    }

}
export default UserService;
