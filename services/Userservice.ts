import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
import Reserva from '../Dto/reservesDto';
const bcrypt = require("bcryptjs");

class UserService {
    static async registerDireccion(user : User) {
        return await UserRepository.addDirecciones(user)
    }
    static async registerTelefono(user:User) {
        return await UserRepository.addTelefono(user);
    }
    
    static async register(user: User) {
        user.password = await generateHash(user.password);
        return  await UserRepository.add(user);
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

}
export default UserService;