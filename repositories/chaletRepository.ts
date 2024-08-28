import Chalet from '../Dto/ChaletDto';
import ChaletImages from '../Dto/ChaletImagenesDto';
import ServiciosChalet from '../Dto/ServiciosDto';
import Tarifa from '../Dto/ChaletTarifasDto';
import db from '../config/config-db';

class chaletRepository{
    static async addChalet(chalet: Chalet): Promise<number> {
        const sql = 'CALL insertarChalet(?, ?, ?, ?, ?, @chalet_id)';
        const values = [
            chalet.nombreChalet,
            chalet.municipioChalet,
            chalet.ubicacionChalet,
            chalet.caracteristicas,
            chalet.email
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

export default chaletRepository;