import AdminRepository from '../repositories/adminRepository';
import Admin from '../Dto/adminDto';
import generateHash from '../helpers/generateHash';
import bcrypt from "bcryptjs";
import Auth from '../Dto/AuthDto';

class AdminService {
    static async register(admin: Admin) {
        admin.password = await generateHash(admin.password);
        return await AdminRepository.add(admin);
    }

    static async authAdmin(auth: Auth) {
        try {
            const result: any = await AdminRepository.loginAdmin(auth);
    
            if (result[0] && result[0].length > 0) {
                const hashedPassword = result;
                if (hashedPassword) {
                    const isPasswordValid = await bcrypt.compare(auth.password, hashedPassword);
                    if (isPasswordValid) {
                        return { logged: true, status: "Successful Authentication" };
                    } else {
                        return { logged: false, status: "Incorrect username or password" };
                    }
                } else {
                    return { logged: false, status: "No password found for the given email" };
                }
            } else {
                return { logged: false, status: "Incorrect username or password" };
            }
        } catch (error) {
            console.error("Error al autenticar:", error);
            throw new Error("Authentication failed");
        }
    }

    static async activarUsuario(email: string) {
        return await AdminRepository.activarUsuario(email);
    }

    static async desactivarUsuario(email: string) {
        return await AdminRepository.desactivarUsuario(email);
    }
}

export default AdminService;
