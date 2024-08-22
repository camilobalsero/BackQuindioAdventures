import Tarifa from '../Dto/TarifasDto';
import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ImagenesDto';
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

    static async getChaletById(chaletId: number) {
        try {
            const chalet = await chaletRepository.getChaletById(chaletId);
            return chalet;
        } catch (error) {
            console.error("Error en chaletService al obtener chalet por ID:", error);
            throw error;
        }
    }
}

export default chaletService;