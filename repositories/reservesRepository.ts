import db from '../config/config-db';
import Reserva from '../Dto/reservesDto';

class ReservesRepository {
    static async addReserva(reserva: Reserva): Promise<number> {
        const sql = 'CALL insertarReservaChalet(?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            reserva.email,
            reserva.idChalet,
            reserva.precio,
            reserva.cantPersonas,
            reserva.estancia,
            reserva.fechaInicio,
            reserva.fechaFin,
            reserva.nombre
        ];
        console.log(values);
        

        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado actualizarUsuario:", error);
            throw error;
        }
    }

    static async getTemporadaByFechaInicio(fechaInicio: Date): Promise<string> {
        const sql = 'CALL obtenerTemporadaPorFechaInicio(?)';
        const values = [fechaInicio];
        console.log(values);
        
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al llamar al procedimiento almacenado insertarUsuario:", error);
            throw error;
        }
    }
}

export default ReservesRepository;
