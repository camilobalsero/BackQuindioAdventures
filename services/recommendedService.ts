import recommendedRepository from "../repositories/recommendedRepository";

class recommendedService{
    static async recommended(): Promise<any[]> {
        try {
            const plans = await recommendedRepository.recommended();
            return plans;
        } catch (error) {
            console.error("Error en planService al obtener planes:", error);
            throw error;
        }
    }
}

export default recommendedService;