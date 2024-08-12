import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
import Reserva from '../Dto/reservesDto';
import UpdateUser from '../Dto/UpdateUserDto';
import Tarifa from '../Dto/TarifasDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ImagenesDto';
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import UserRegister from '../Dto/UserRegisterDto';

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

    static async authAdmin(auth: Auth) {
        try {
            const result: any = await UserRepository.loginAdmin(auth);
    
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

    static async crearReserva(reserva: Reserva) {
        try {
            const result: any = await UserRepository.addReserva(reserva);
            if (result.affectedRows > 0) {
                return { logged: true, status: "Reserva registrada" };
            }
            return { logged: false, status: "Fallo al realizar la reserva" };
        } catch (error) {
            console.error("Error en UserService.crearReserva:", error);
            throw error;
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

    static async addChalet(chalet: Chalet) {
        return await UserRepository.addChalet(chalet);
    }

    static async addTarifa(tarifa: Tarifa) {
        return await UserRepository.addTarifa(tarifa._id_chalet_usuario, tarifa);
    }

    static async addChaletImage(imagenes: ChaletImages) {
        return await UserRepository.addChaletImage(imagenes._id_chalet, imagenes);
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
            html: `<b>Por favor, utiliza el siguiente enlace para restablecer tu contraseña:</b> <a href="${resetLink}">Restablecer contraseña</a>`,
        });
    }
}
export default UserService;
