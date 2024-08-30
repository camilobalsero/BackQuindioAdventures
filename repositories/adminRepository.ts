import db from '../config/config-db';
import Admin from '../Dto/adminDto';
import Auth from '../Dto/AuthDto';

class AdminRepository {

    static async add(admin: Admin) {
        const sql = `CALL insertarAdmin(?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            admin.documento,
            admin.email,
            admin.password,
            admin.nombres,
            admin.apellidos,
            admin.edad,
            admin.telefono,
            admin.direccion,
        ];
        
        return db.execute(sql, values);
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

    static async activarUsuario(email:string){
        const sql = 'CALL habilitarUsuario(?)';
        const values = [email]

        return db.execute(sql, values);
    }

    static async desactivarUsuario(email:string){
        const sql = 'CALL deshabilitarUsuario(?)';
        const values = [email]

        return db.execute(sql, values);
    }
}

export default AdminRepository;
