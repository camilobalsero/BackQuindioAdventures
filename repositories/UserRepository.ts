import db from '../config/config-db';
import Auth from '../Dto/AuthDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ImagenesDto';
import Reserva from '../Dto/ReservesDto';
import ServiciosChalet from '../Dto/ServiciosDto';
import Tarifa from '../Dto/TarifasDto';
import UpdateUser from '../Dto/UpdateUserDto';
import User from '../Dto/UserDto';
import UserRegister from '../Dto/UserRegisterDto';

class UserRepository {

    static async add(user: UserRegister) {
        const sql = 'CALL insertarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            user.documento,
            user.email,
            user.password,
            user.nombres,
            user.apellidos,
            user.edad,
            user.telefono,
            user.direccion,
            user.rol
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

    static async loginAdmin(auth: Auth) {
        const sql = 'CALL authAdmin(?)';
        const values = [auth.email];
    
        try {
            const [rows]: any = await db.execute(sql, values);
            console.log('Resultado de la consulta:', rows);
            const passwordRows = rows[0];
        
            if (passwordRows && passwordRows.length > 0) {
                return passwordRows[0].password;
            } else {
                return { logged: false, status: "Incorrect username or password" };
            }
        } catch (error) {
            return { logged: false, status: "Incorrect username or password" };
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
        const sql = 'CALL actualizarUsuario(?, ?, ?, ?, ?, ?, ?)';
        const values = [
            user.email,
            user.nombres,
            user.apellidos,
            user.edad,
            user.telefono,
            user.direccion,
            user.image
        ];
    
    
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado actualizarUsuario:", error);
            throw error;
        }
    }
}


export default UserRepository;