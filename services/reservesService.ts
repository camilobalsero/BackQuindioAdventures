import ReservesRepository from '../repositories/reservesRepository';
import Reserva from '../Dto/reservesDto';
import ReservaPlan from '../Dto/reservesPlanDto';

class ReservesService {
    public async createReserva(reserva: Reserva): Promise<number> {
        return await ReservesRepository.addReserva(reserva);
    }

    public async createReservaPlan(reserva: ReservaPlan): Promise<number> {
        return await ReservesRepository.addReservaPlan(reserva);
    }

    public async getTemporadaByFechaInicio(fechaInicio: Date): Promise<string> {
        return await ReservesRepository.getTemporadaByFechaInicio(fechaInicio);
    }

    public async getTarifasByChaletAndTemporada(idPlan: number, temporada: string): Promise<any[]> {
        return await ReservesRepository.getTarifasByChaletAndTemporada(idPlan, temporada);
    }

    public async getTarifasByPlanAndTemporada(idPlan: number, temporada: string): Promise<any[]> {
        return await ReservesRepository.getTarifasByPlanAndTemporada(idPlan, temporada);
    }

    public async getReservasChaletByEmail(emailUsuario: string): Promise<any[]> {
        return await ReservesRepository.getReservasChaletByEmail(emailUsuario);
    }

    public async getReservasPlanByEmail(emailUsuario: string): Promise<any[]> {
        return await ReservesRepository.getReservasPlanByEmail(emailUsuario);
    }

    public async getReservasChaletByEmailMine(emailUsuario: string): Promise<any[]> {
        return await ReservesRepository.getReservasChaletByEmailMine(emailUsuario);
    }

    public async getReservasPlanByEmailMine(emailUsuario: string): Promise<any[]> {
        return await ReservesRepository.getReservasPlanByEmailMine(emailUsuario);
    }
}

export default new ReservesService();
