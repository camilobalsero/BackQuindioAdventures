import db from '../config/config-db';
import Auth from '../Dto/AuthDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ImagenesDto';
import Reserva from '../Dto/reservesDto';
import Tarifa from '../Dto/TarifasDto';
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

    static async addChalet(chalet: Chalet) {
        const sql = 'INSERT INTO chalet (nombre_chalet, ubicacion_chalet, capacidad, caracteristicas) VALUES (?, ?, ?, ?)';
        const values = [
            chalet.nombreChalet,
            chalet.ubicacionChalet,
            chalet.capacidad,
            chalet.caracteristicas
        ];

        try {
            const [result]: any = await db.execute(sql, values);
            const chaletId = result.insertId;  // Obtener el ID del chalet insertado
            return chaletId;
        } catch (error) {
            console.error("Error en la ejecución de la consulta:", error);
            throw error;
        }
    }
    
    static async addTarifa(chaletId: number, tarifa: Tarifa ) {
        const sql = 'INSERT INTO TarifasChalet (id_chalet_usuario, precio, tipo_habitacion, temporada) VALUES (?, ?, ?, ?)'
        const values = [
            chaletId,
            tarifa.precio,
            tarifa.tipo_habitacion,
            tarifa.temporada
        ];

        return db.execute(sql,values);
    }

    static async addChaletImage(chaletId: number ,imagenes: ChaletImages) {
        const sql = 'INSERT INTO chalet_images (id_chalet, image) VALUES (?, ?)';
        const values = [
            chaletId,
            imagenes.image
        ];

        return db.execute(sql, values);
    }
}


export default UserRepository;