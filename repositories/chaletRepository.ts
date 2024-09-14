import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ChaletImagenesDto';
import ServiciosChalet from '../Dto/ServiciosDto';
import Tarifa from '../Dto/ChaletTarifasDto';
import db from '../config/config-db';

class chaletRepository{
    static async addChalet(chalet: Chalet): Promise<number> {
        const sql = 'CALL insertarChalet(?, ?, ?, ?, ?, ?, @chalet_id)';
        const values = [
            chalet.nombreChalet,
            chalet.municipioChalet,
            chalet.ubicacionChalet,
            chalet.caracteristicas,
            chalet.email,
            chalet.fechaRegistro
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
    
    static async addTarifa(chaletId: number, tarifa: Tarifa): Promise<void> {
        const sql = 'CALL insertarTarifasChalet(?, ?, ?, ?)';
        const values = [
            chaletId,
            tarifa.precio,
            tarifa.tipo_habitacion,
            tarifa.temporada
        ];

        

        try {
            await db.execute(sql, values);
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async addChaletImage(chaletId: number ,imagenes: ChaletImages) {
        const sql = 'INSERT INTO chalet_images (id_chalet, image) VALUES (?, ?)';
        const values = [
            chaletId,
            imagenes.image
        ];
        return db.execute(sql, values);
    }

    static async addServicioChalet(chaletId: number , servicios: ServiciosChalet) {
        const sql = 'INSERT INTO chalet_servicios (chalet_id, servicio) VALUES (?, ?)';
        const values = [
            chaletId,
            servicios.servicio
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
        const sql = `CALL obtenerTodosLosChaletsPorEstado()`;
        try {
            const [rows]: any = await db.execute(sql);
            return rows[0]; // Retorna los chalets desde la primera fila del resultado
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }

    static async getAllChaletsAdmin(): Promise<any[]> {
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

    static async getChaletsByEmail(email: string) {
        const sql = 'CALL obtenerChaletPorEmail(?)';
        
        try {
            const [rows]: any = await db.execute(sql, [email]);
            return rows[0]; // Regresamos el chalet encontrado
        } catch (error) {
            console.error("Error en obtenerChaletPorId:", error);
            throw error;
        }
    }

    static async eliminarChalet(id:number){
        const sql = 'CALL eliminarChalet(?)';
        const values = [id]

        return db.execute(sql, values);
    }

    static async activarChalet(id:number){
        const sql = 'CALL activarChalet(?)';
        const values = [id]

        return db.execute(sql, values);
    }

    static async getPerfilCreadorChalet(chaletId: number) {
        const sql = 'CALL getEncargadoByChaletId(?)';
        
        try {
            const [rows]: any = await db.execute(sql, [chaletId]);
            return rows[0]; // Regresamos el chalet encontrado
        } catch (error) {
            console.error("Error en obtenerChaletPorId:", error);
            throw error;
        }
    }

    static async getOpinionChalet(chaletId: number) {
        const sql = 'CALL obtenerOpinionesChalet(?)';
        const values = [chaletId];
        
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
        const sql = 'CALL eliminarOpinionChalet(?)';
        const values = [id]

        return db.execute(sql, values);
    }

}

export default chaletRepository;