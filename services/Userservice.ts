import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
import Reserva from '../Dto/reservesDto';
import UpdateUser from '../Dto/UpdateUserDto';
import Tarifa from '../Dto/TarifasDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ImagenesDto';
const bcrypt = require("bcryptjs");

class UserService {
    
    static async register(user: User) {
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
    

    static async crearReserva(reserva: Reserva) {
        
        try {
            const result: any = await UserRepository.addReserva(reserva);
            console.log("Resultado de la consulta SQL:", result);
            
            if (result.affectedRows > 0) { // Usamos affectedRows para verificar inserción exitosa
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
            // Generar el hash de la nueva contraseña
            const newPasswordHash = await generateHash(newPassword);
            
            // Actualizar la contraseña en la base de datos
            await UserRepository.resetPassword(email, newPasswordHash);

            return { success: true, status: "Contraseña cambiada exitosamente" };
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            throw new Error("Error al cambiar la contraseña");
        }
    }

    static async getUserByEmail(email: string): Promise<User> {
        try {
            const result = await UserRepository.getUserByEmail(email); 
            if (result.length > 0) {
                return result[0];
            } else {
                throw new Error('Usuario no encontrado');
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

}
export default UserService;