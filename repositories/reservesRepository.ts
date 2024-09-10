import db from '../config/config-db';
import Reserva from '../Dto/reservesDto';
import ReservaPlan from '../Dto/reservesPlanDto';

class ReservesRepository {
    static async addReserva(reserva: Reserva): Promise<number> {
        const sql = 'CALL RegistrarReservaChalet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
            reserva.fechaRegistro,
            JSON.stringify(reserva.tarifa) // Convertir el JSON a cadena para almacenar en la base de datos
        ];
        try {
            const [result]: any = await db.execute(sql, values);
            return result.insertId; // Asumiendo que se devuelve el ID de la reserva
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado insertarReservaChalet:", error);
            throw error;
        }
    }

    static async addReservaPlan(reserva: ReservaPlan): Promise<number> {
        const sql = 'CALL RegistrarReservaPlan(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
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
            reserva.fechaRegistro,
            JSON.stringify(reserva.tarifa) // Convertir el JSON a cadena para almacenar en la base de datos
        ];

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

    static async getReservasChaletByEmail(emailUsuario: string): Promise<any[]> {
        const sql = 'CALL obtenerReservasChaletPorEmail(?)';
        const values = [emailUsuario];
        
        try {
            // Ejecutar el procedimiento almacenado pasando el email como parámetro
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene la lista de reservas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerReservasPorEmail:", error);
            throw error;
        }
    }

    static async getReservasPlanByEmail(emailUsuario: string): Promise<any[]> {
        const sql = 'CALL obtenerReservasPlanVacacionalPorEmail(?)';
        const values = [emailUsuario];
        
        try {
            // Ejecutar el procedimiento almacenado pasando el email como parámetro
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene la lista de reservas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerReservasPorEmail:", error);
            throw error;
        }
    }

    static async getReservasChaletByEmailMine(emailUsuario: string): Promise<any[]> {
        const sql = 'CALL obtenerReservasChaletPorEmailyId(?)';
        const values = [emailUsuario];
        try {
            // Ejecutar el procedimiento almacenado pasando el email como parámetro
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene la lista de reservas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerReservasPorEmail:", error);
            throw error;
        }
    }

    static async getReservasPlanByEmailMine(emailUsuario: string): Promise<any[]> {
        const sql = 'CALL obtenerReservasPlanVacacionalPorEmailyId(?)';
        const values = [emailUsuario];
        try {
            // Ejecutar el procedimiento almacenado pasando el email como parámetro
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene la lista de reservas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerReservasPorEmail:", error);
            throw error;
        }
    }

    static async cancelarReserva(idReserva:string): Promise<any[]> {
        const sql = 'CALL deshabilitarReserva(?)';
        const values = [idReserva];
        try {
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene una lista de tarifas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerTarifasPorChaletYTemporada:", error);
            throw error;
        }
    }

    static async cancelarReservaPlan(idReserva:string): Promise<any[]> {
        const sql = 'CALL deshabilitarReservaPlan(?)';
        const values = [idReserva];
        try {
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene una lista de tarifas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerTarifasPorChaletYTemporada:", error);
            throw error;
        }
    }

    static async activarReserva(idReserva:string): Promise<any[]> {
        const sql = 'CALL habilitarReserva(?)';
        const values = [idReserva];
        try {
            const [result]: any = await db.execute(sql, values);
            // Asumir que result contiene una lista de tarifas
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado obtenerTarifasPorChaletYTemporada:", error);
            throw error;
        }
    }

    static async activarReservaPlan(idReserva:string): Promise<any[]> {
        const sql = 'CALL habilitarReservaPlan(?)';
        const values = [idReserva];
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
