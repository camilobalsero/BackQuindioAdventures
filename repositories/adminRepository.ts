import db from '../config/config-db';
import Admin from '../Dto/adminDto';

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
        console.log(values);
        
        return db.execute(sql, values);
    }

}

export default AdminRepository;
