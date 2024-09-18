import Plan from '../Dto/PlanDto';
import PlanImages from '../Dto/PlanImagenesDto';
import PlanTarifa from '../Dto/PlanTarifasDto';
import db from '../config/config-db';

class planRepository{
    static async addPlan(plan: Plan): Promise<number> {
        const sql = 'CALL insertarPlanVacacional(?, ?, ?, ?, ?, ?, @planV_id)';
        const values = [
            plan.nombrePlan,
            plan.municipioPlan,
            plan.ubicacionPlan,
            plan.caracteristicas,
            plan.email,
            plan.fechaRegistro
        ];

        try {
            // Ejecutar el procedimiento almacenado
            await db.execute(sql, values);

            // Obtener el ID del chalet recién insertado
            const [rows]: any = await db.execute('SELECT @planV_id AS planV_id');
            const planVId = rows[0].planV_id;

            return planVId;
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }
    
    static async addTarifa(planId: number, tarifa: PlanTarifa): Promise<void> {
        const sql = 'CALL insertarTarifasPlan(?, ?, ?, ?, ?)';
        const values = [
            planId,
            tarifa.precio,
            tarifa.temporada,
            tarifa.hora_salida,
            tarifa.hora_llegada
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

    static async getPlan(){
        const sql = `CALL obtenerTodosLosPlanes()`;
        try {
            await db.execute(sql);
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async getAllPlans(): Promise<any[]> {
        const sql = `CALL obtenerTodosLosPlanesPorEstado()`;
        try {
            const [rows]: any = await db.execute(sql);
            return rows[0]; // Retorna los chalets desde la primera fila del resultado
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async getPlanById(planId: number) {
        const sql = 'CALL obtenerPlanPorId(?)';
        
        try {
            const [rows]: any = await db.execute(sql, [planId]);
            return rows[0]; // Regresamos el chalet encontrado
        } catch (error) {
            console.error("Error en obtenerPlanPorId:", error);
            throw error;
        }
    }


    static async eliminarPlan(id:number){
        const sql = 'CALL eliminarPlanVacacional(?)';
        const values = [id]

        return db.execute(sql, values);
    }

    static async getPlanesByEmail(email: string) {
        const sql = 'CALL obtenerPlanPorEmail(?)';
        
        try {
            const [rows]: any = await db.execute(sql, [email]);
            return rows[0];
        } catch (error) {
            console.error("Error en obtenerPlanesPorEmail:", error);
            throw error;
        }
    }

    static async getAllPlanesAdmin(): Promise<any[]> {
        const sql = `CALL obtenerTodosLosPlanes()`;
        try {
            const [rows]: any = await db.execute(sql);
            return rows[0]; // Retorna los chalets desde la primera fila del resultado
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async activarPlan(id:number){
        const sql = 'CALL activarPlan(?)';
        const values = [id]

        return db.execute(sql, values);
    }

    static async getOpinionPlan(planId: number) {
        const sql = 'CALL obtenerOpinionesPlan(?)';
        const values = [planId];
        
        try {
            // Ejecutar el procedimiento almacenado
            const [rows] : any= await db.execute(sql, values); 
            
            return rows[0];

        } catch (error) {
            console.error('Error al obtener las opiniones del chalet:', error);
            throw error;
        }
    }

    static async eliminarOpinion(id:number){
        const sql = 'CALL eliminarOpinionPlan(?)';
        const values = [id]

        return db.execute(sql, values);
    }

    static async getFechasOcupadas(chaletId: number) {
        const sql = 'SELECT fecha FROM reservaPlanVacacional WHERE id_planV_usuario = ? AND estado = 1';
        
        try {
            const [rows]: any = await db.execute(sql, [chaletId]);
            return rows; 
        } catch (error) {
            console.error("Error en getFechasOcupadas:", error); 
            throw error; 
        }
    }
}

export default planRepository;