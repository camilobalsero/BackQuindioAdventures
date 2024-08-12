import AdminRepository from '../repositories/adminRepository';
import Admin from '../Dto/adminDto';
import generateHash from '../helpers/generateHash';

class AdminService {
    static async register(admin: Admin) {
        admin.password = await generateHash(admin.password);
        console.log(admin);
        
        return await AdminRepository.add(admin);
    }
}

export default AdminService;
