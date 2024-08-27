import Plan from '../Dto/PlanDto';
import PlanImages from '../Dto/PlanImagenesDto';
import PlanTarifa from '../Dto/PlanTarifasDto';
import db from '../config/config-db';

class planRepository{
    static async addPlan(plan: Plan): Promise<number> {
        const sql = 'CALL insertarPlanVacacional(?, ?, ?, ?, @chalet_id)';
        const values = [
            plan.nombrePlan,
            plan.ubicacionPlan,
            plan.caracteristicas,
            plan.email
        ];
        

        try {
            // Ejecutar el procedimiento almacenado
            await db.execute(sql, values);

            // Obtener el ID del chalet recién insertado
            const [rows]: any = await db.execute('SELECT @chalet_id AS chalet_id');
            const chaletId = rows[0].chalet_id;

            return chaletId;
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }
    
    static async addTarifa(planId: number, tarifa: PlanTarifa): Promise<void> {
        const sql = '';
        const values = [
            planId,
            tarifa.precio,
            tarifa.temporada
        ];

        

        try {
            await db.execute(sql, values);
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async addPlanImage(planId: number ,imagenes: PlanImages) {
        const sql = 'INSERT INTO planVacacional_images (id_planV_usuario, image) VALUES (?, ?)';
        const values = [
            planId,
            imagenes.image
        ];
        return db.execute(sql, values);
    }

    static async getChalet(){
        const sql = `CALL obtenerTodosLosChalets()`;
        try {
            await db.execute(sql);
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async getAllChalets(): Promise<any[]> {
        const sql = `CALL obtenerTodosLosChalets()`;
        try {
            const [rows]: any = await db.execute(sql);
            return rows[0]; // Retorna los chalets desde la primera fila del resultado
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async getChaletById(chaletId: number) {
        const sql = 'CALL obtenerChaletPorId(?)';
        
        try {
            const [rows]: any = await db.execute(sql, [chaletId]);
            return rows[0]; // Regresamos el chalet encontrado
        } catch (error) {
            console.error("Error en obtenerChaletPorId:", error);
            throw error;
        }
    }

}

export default planRepository;