import db from '../config/config-db';
import Auth from '../Dto/AuthDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ImagenesDto';
import Reserva from '../Dto/reservesDto';
import Tarifa from '../Dto/TarifasDto';
import UpdateUser from '../Dto/UpdateUserDto';
import User from '../Dto/UserDto';
import UserRegister from '../Dto/UserRegisterDto';

class UserRepository {

    static async add(user: UserRegister) {
        const sql = 'CALL insertarUsuario(?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            user.documento,
            user.email,
            user.password,
            user.nombres,
            user.apellidos,
            user.edad,
            user.telefono,
            user.direccion
        ];
    
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado insertarUsuario:", error);
            throw error;
        }
    }

    static async login(auth: Auth) {
        const sql = 'CALL authUsuario(?)';
        const values = [auth.email];
    
        try {
            const [rows]: any = await db.execute(sql, values);
            const passwordRows = rows[0];
    
            if (passwordRows.length > 0) {
                return passwordRows[0].password;
            } else {
                throw new Error('No se encontró el usuario con el email proporcionado.');
            }
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerPasswordPorEmail:", error);
            throw error;
        }
    }


    static async addReserva(reservesDto: Reserva) {
        const sql = 'INSERT INTO reserva (documento_usuario, cantidad_ninos, cantidad_adultos,fecha_inicio, fecha_fin,nombre) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [
            reservesDto.documento,
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
        const sql = 'CALL obtenerDatosUsuario(?)';
        const values = [email];
    
        try {
            const [rows]: any = await db.execute(sql, values);
            const userRows = rows[0] as User[];
    
            return userRows;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerDatosUsuario:", error);
            throw error;
        }
    }


    static async updateUser(user: UpdateUser) {
        const sql = 'CALL actualizarUsuario(?, ?, ?, ?, ?, ?)';
        const values = [
            user.email,          
            user.nombres,        
            user.apellidos,      
            user.edad,           
            user.telefono,       
            user.direccion       
        ];
    
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado actualizarUsuario:", error);
            throw error;
        }
    }

    static async addChalet(chalet: Chalet): Promise<number> {
        const sql = 'CALL insertarChalet(?, ?, ?, ?, @chalet_id)';
        const values = [
            chalet.nombreChalet,
            chalet.ubicacionChalet,
            chalet.capacidad,
            chalet.caracteristicas
        ];

        try {
            // Ejecutar el procedimiento almacenado
            await db.execute(sql, values);

            // Obtener el ID del chalet recién insertado
            const [rows]: any = await db.execute('SELECT @chalet_id AS chalet_id');
            const chaletId = rows[0].chalet_id;

            return chaletId;
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }
    
    static async addTarifa(chaletId: number, tarifa: Tarifa): Promise<void> {
        const sql = 'CALL insertarTarifa(?, ?, ?, ?)';
        const values = [
            chaletId,
            tarifa.precio,
            tarifa.tipo_habitacion,
            tarifa.temporada
        ];

        try {
            await db.execute(sql, values);
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
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