import { log } from 'console';
import db from '../config/config-db';
import Reserva from '../Dto/reservesDto';
import ReservaPlan from '../Dto/reservesPlanDto';

class ReservesRepository {
    static async addReserva(reserva: Reserva): Promise<number> {
        const sql = 'CALL RegistrarReservaChalet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            reserva.email,
            reserva.idChalet,
            reserva.documento,
            reserva.cantPersonas,
            reserva.nombre,
            reserva.apellido,
            reserva.telefono,
            reserva.direccion,
            reserva.precioFinal,
            reserva.estancia,
            reserva.fechaInicio,
            reserva.fechaFin,
            JSON.stringify(reserva.tarifa) // Convertir el JSON a cadena para almacenar en la base de datos
        ];
        console.log(values);

        try {
            const [result]: any = await db.execute(sql, values);
            return result.insertId; // Asumiendo que se devuelve el ID de la reserva
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado insertarReservaChalet:", error);
            throw error;
        }
    }

    static async addReservaPlan(reserva: ReservaPlan): Promise<number> {
        const sql = 'CALL RegistrarReservaPlan(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            reserva.email,
            reserva.idPlan,
            reserva.documento,
            reserva.cantPersonas,
            reserva.nombre,
            reserva.apellido,
            reserva.telefono,
            reserva.direccion,
            reserva.precioFinal,
            reserva.fechaReserva,
            JSON.stringify(reserva.tarifa) // Convertir el JSON a cadena para almacenar en la base de datos
        ];
        console.log(values);

        try {
            const [result]: any = await db.execute(sql, values);
            return result.insertId; // Asumiendo que se devuelve el ID de la reserva
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado insertarReservaChalet:", error);
            throw error;
        }
    }

    static async getTemporadaByFechaInicio(fechaInicio: Date): Promise<string> {
        const sql = 'CALL obtenerTemporadaPorFechaInicio(?)';
        const values = [fechaInicio];

        try {
            const [rows]: any = await db.execute(sql, values);

        
            if (rows[0] && rows[0].length > 0) {
                return rows[0][0].estado_temporada;
            }
            throw new Error("No se encontró temporada para la fecha proporcionada.");
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerTemporadaPorFechaInicio:", error);
            throw error;
        }
    }

    static async getTarifasByChaletAndTemporada(idChalet: number, temporada: string): Promise<any[]> {
        const sql = 'CALL obtenerTarifasPorChaletYTemporada(?, ?)';
        const values = [idChalet, temporada];
        try {
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene una lista de tarifas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerTarifasPorChaletYTemporada:", error);
            throw error;
        }
    }

    static async getTarifasByPlanAndTemporada(idPlan: number, temporada: string): Promise<any[]> {
        const sql = 'CALL obtenerTarifasPorPlanYTemporada(?, ?)';
        const values = [idPlan, temporada];
        try {
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene una lista de tarifas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerTarifasPorChaletYTemporada:", error);
            throw error;
        }
    }
}

export default ReservesRepository;
