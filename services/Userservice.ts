import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';


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
}

export default UserService;