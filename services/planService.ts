import PlanTarifa from '../Dto/PlanTarifasDto';
import Plan from '../Dto/PlanDto';
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

    static async getAllPlans(): Promise<any[]> {
        try {
            const plans = await planRepository.getAllPlans();
            return plans;
        } catch (error) {
            console.error("Error en planService al obtener planes:", error);
            throw error;
        }
    }

    static async getPlanById(planId: number) {
        try {
            const plan = await planRepository.getPlanById(planId);
            return plan;
        } catch (error) {
            console.error("Error en planService al obtener plan por ID:", error);
            throw error;
        }
    }

    static async getPlanesByEmail(email: string) {
        try {
            const chalets = await planRepository.getPlanesByEmail(email);
            return chalets;
        } catch (error) {
            console.error("Error en chaletService al obtener chalet por ID:", error);
            throw error;
        }
    }
}

export default planService;