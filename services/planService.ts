import PlanTarifa from '../Dto/PlanTarifasDto';
import Plan from '../Dto/PlanDto';
import chaletRepository from '../repositories/chaletRepository';
import PlanImages from '../Dto/PlanImagenesDto';
import planRepository from '../repositories/planRepository';

class planService{
    static async addPlan(plan: Plan) {
        return await planRepository.addPlan(plan);
    }

    static async addTarifa(tarifa: PlanTarifa) {
        return await planRepository.addTarifa(tarifa._id_plan_usuario, tarifa);
    }

    static async addPlanImage(imagenes: PlanImages) {
        return await planRepository.addPlanImage(imagenes._id_plan, imagenes);
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

export default planService;