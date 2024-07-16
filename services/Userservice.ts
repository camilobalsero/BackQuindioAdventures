import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
import Reserva from '../Dto/reservesDto';
import Chalet from '../Dto/ChaletDto';
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

    static async addChalet(chalet: Chalet) {
        try {
            // Insertar el chalet en la tabla chalet
            const chaletId = await UserRepository.addChalet(chalet);

            // Asegurarse de que el chalet se insertó correctamente
            if (chaletId) {
                // Insertar las imágenes en la tabla chalet_images usando el id_chalet
                await UserRepository.addImagenes(chaletId, chalet);
                return { logged: true, status: "Chalet registrado con imágenes" };
            } else {
                return { logged: false, status: "Fallo al registrar el chalet" };
            }
        } catch (error) {
            console.error("Error en UserService.addChalet:", error);
            throw error;
        }
    }
    

    static async crearReserva(reserva: Reserva) {
        console.log(2222222);
        
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