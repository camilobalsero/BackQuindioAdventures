import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
import Reserva from '../Dto/reservesDto';
import UpdateUser from '../Dto/UpdateUserDto';
const bcrypt = require("bcryptjs");

class UserService {
    
    static async register(user: User) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }

    static async auth(auth: Auth){
        const result: any = await UserRepository.login(auth);
        
        if (result[0].length > 0){
            
            const isPasswordValid = await bcrypt.compare(auth.password, result[0][0].password);
            if(isPasswordValid){
                return {logged: true, status: "Succesful Authentication"}
                }
                return{logged: false, status: "Incorrect username or password"}
            }   
            return{logged: false, status: "Incorrect username or password"}
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

}
export default UserService;