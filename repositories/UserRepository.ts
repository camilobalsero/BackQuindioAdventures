import db from '../config/config-db';
import Auth from '../Dto/AuthDto';
import Reserva from '../Dto/reservesDto';
import UpdateUser from '../Dto/UpdateUserDto';
import User from '../Dto/UserDto';

class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO usuario (documento, email, password, nombres, apellidos, edad, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [user.documento, user.email, user.password, user.nombres, user.apellidos, user.edad,user.telefono, user.direccion];
        return db.execute(sql, values);
    }

    static async login(auth: Auth){
        const sql = 'SELECT password FROM usuario WHERE email=?'; 
        const values = [auth.email];
        return db.execute(sql,values)
    }

    static async addReserva(reservesDto: Reserva) {
        const sql = 'INSERT INTO reserva (documento_usuario, precio, cantidad_personas, estancia, fecha_inicio, fecha_fin, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [
            reservesDto.documento,
            reservesDto.precio,
            reservesDto.cantPersonas,
            reservesDto.estancia,
            reservesDto.fechaInicio,
            reservesDto.fechaFin,
            new Date()
        ];
        
        console.log("SQL Query: ", sql);
        console.log("Values: ", values);

        try {
            const [result] = await db.execute(sql, values);
            console.log("Resultado de la ejecución de la consulta:", result);
            return result;
        } catch (error) {
            console.error("Error en la ejecución de la consulta:", error);
            throw error;
        }
    }
    
    static async resetPassword(email: string, newPasswordHash: string) {
        const sql = 'UPDATE usuario SET password = ? WHERE email = ?';
        const values = [newPasswordHash, email];
        return db.execute(sql, values);
    }

    static async getUserByEmail(email: string): Promise<User[]> {
        const sql = 'SELECT documento, email, password, nombres, apellidos, edad, image, telefono, direccion FROM usuario WHERE email = ?';
        const values = [email];
        try {
            const [rows] = await db.execute(sql, values);

            return rows as User[];
        } catch (error) {
            console.error("Error en UserRepository.getUserByEmail:", error);
            throw error;
        }
    }


    static async updateUser(user: UpdateUser) {
        const sql = 'UPDATE usuario SET nombres = ?, apellidos = ?, edad = ?, telefono = ?, direccion = ? WHERE email = ?';
        const values = [user.nombres, user.apellidos, user.edad, user.telefono, user.direccion, user.email];
        console.log(db.execute(sql,values));
        return db.execute(sql, values);
    }    
}


export default UserRepository;