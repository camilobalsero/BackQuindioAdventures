import ReservesRepository from '../repositories/reservesRepository';
import Reserva from '../Dto/reservesDto';

class ReservesService {
    public async createReserva(reserva: Reserva): Promise<number> {
        return await ReservesRepository.addReserva(reserva);
    }

    public async getTemporadaByFechaInicio(fechaInicio: Date): Promise<string> {
        return await ReservesRepository.getTemporadaByFechaInicio(fechaInicio);
    }
    
}

export default new ReservesService();
