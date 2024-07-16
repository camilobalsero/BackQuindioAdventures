import db from '../config/config-db';
import Auth from '../Dto/AuthDto';
import Chalet from '../Dto/ChaletDto';
import Reserva from '../Dto/reservesDto';
import User from '../Dto/UserDto';

class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO usuario (documento, email, password, nombres, apellidos, edad) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [user.documento, user.email, user.password, user.nombres, user.apellidos, user.edad,];
        return db.execute(sql, values);
    }

    static async addTelefono(user: User) {
        // Asegurarse de pasar null en lugar de undefined
        const telefono1 = user.telefono || null;
        if (telefono1) {
            const sql = 'INSERT INTO telefonoUsuario(documento_usuario, numero_telefono1) VALUES (?,?)';
            const values = [user.documento, telefono1];
            return db.execute(sql, values);
        }
    }

    static async addDirecciones(user: User) {
        // Asegurarse de pasar null en lugar de undefined
        const direccion1 = user.direccion || null;
        if (direccion1) {
            const sql = 'INSERT INTO direccionUsuario(documento_usuario, direccion_usuario1) VALUES (?,?)';
            const values = [user.documento, direccion1];
            return db.execute(sql, values);
        }
    }

    static async login(auth: Auth){
        const sql = 'SELECT password FROM usuario WHERE email=?'; 
        const values = [auth.email];
        return db.execute(sql,values)
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

    static async addImagenes(chaletId: number, chalet: Chalet) {
        const sql = 'INSERT INTO chalet_images (id_chalet, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?)';
        const values = [
            chaletId,
            chalet.imagen1,
            chalet.imagen2,
            chalet.imagen3,
            chalet.imagen4
        ];

        return db.execute(sql, values);
    }

    
    static async addReserva(reservesDto: Reserva) {
        console.log(3333333333);
        
        const sql = 'INSERT INTO reserva (documento_usuario, cantidad_ninos, cantidad_adultos,fecha_inicio, fecha_fin,nombre) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [
            reservesDto.documento,
            reservesDto.cantNinos,
            reservesDto.cantAdultos,
            reservesDto.fechaInicio,
            reservesDto.fechaFin,
            reservesDto.nombre,
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

    
}


export default UserRepository;
