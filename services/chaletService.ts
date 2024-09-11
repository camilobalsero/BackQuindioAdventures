import Tarifa from '../Dto/ChaletTarifasDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ChaletImagenesDto';
import ServiciosChalet from '../Dto/ServiciosDto';
import chaletRepository from '../repositories/chaletRepository';

class chaletService{
    static async addChalet(chalet: Chalet) {
        return await chaletRepository.addChalet(chalet);
    }

    static async addTarifa(tarifa: Tarifa) {
        return await chaletRepository.addTarifa(tarifa._id_chalet_usuario, tarifa);
    }

    static async addChaletImage(imagenes: ChaletImages) {
        return await chaletRepository.addChaletImage(imagenes._id_chalet, imagenes);
    }

    static async addServicioChalet(servicios: ServiciosChalet) {
        return await chaletRepository.addServicioChalet(servicios._id_chalet, servicios);
    }

    static async getChalet(): Promise<any> {
        try {
            const chalets = await chaletRepository.getChalet();
            console.log(chalets);
            
            return chalets;
        } catch (error) {
            console.error("Error en ChaletService:", error);
            throw error;
        }
    }

    static async getAllChalets(): Promise<any[]> {
        try {
            const chalets = await chaletRepository.getAllChalets();
            return chalets;
        } catch (error) {
            console.error("Error en chaletService al obtener chalets:", error);
            throw error;
        }
    }

    static async getAllChaletsAdmin(): Promise<any[]> {
        try {
            const chalets = await chaletRepository.getAllChaletsAdmin();
            return chalets;
        } catch (error) {
            console.error("Error en chaletService al obtener chalets:", error);
            throw error;
        }
    }

    static async getChaletById(chaletId: number) {
        try {
            const chalet = await chaletRepository.getChaletById(chaletId);
            return chalet;
        } catch (error) {
            console.error("Error en chaletService al obtener chalet por ID:", error);
            throw error;
        }
    }

    static async getChaletsByEmail(email: string) {
        try {
            const chalets = await chaletRepository.getChaletsByEmail(email);
            return chalets;
        } catch (error) {
            console.error("Error en chaletService al obtener chalet por ID:", error);
            throw error;
        }
    }

    static async eliminarChalet(id: number) {
        return await chaletRepository.eliminarChalet(id);
    }

    static async activarChalet(id: number) {
        return await chaletRepository.activarChalet(id);
    }

    static async getPerfilCreadorChalet(chaletId: number) {
        try {
            const chalet = await chaletRepository.getPerfilCreadorChalet(chaletId);
            return chalet;
        } catch (error) {
            console.error("Error en chaletService al obtener chalet por ID:", error);
            throw error;
        }
    }

    static async getOpinionChalet(chaletId:number){
        return await chaletRepository.getOpinionChalet(chaletId);
    }
}

export default chaletService;