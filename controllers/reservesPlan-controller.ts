import { Request, Response } from 'express';
import ReservesService from '../services/reservesService';
import Reserva from '../Dto/reservesPlanDto';

const crearReservaPlan = async (req: Request, res: Response) => {
    try {
        const {
            documento,
            cantidadPersonas,
            nombre,
            apellido,
            telefono,
            direccion,
            fecha_inicio,
            precioTotal,
            tarifaSeleccionada
        } = req.body;

        console.log(req.body,2345345678765);
        

        // Obtener el email del usuario desde el token
        const email = res.locals.user.email;

        // Convertir las fechas a objetos Date
        const fecha = new Date(fecha_inicio).toISOString().split('T')[0];
        const fechaRegistro = new Date().toISOString().split('T')[0];


        // Crear el objeto Reserva con los datos recibidos
        const reserva = new Reserva(
            email, // Email obtenido del token
            tarifaSeleccionada.id_planV_usuario, // ID del chalet
            documento,
            cantidadPersonas,
            nombre,
            apellido,
            telefono,
            direccion,
            precioTotal, // Convertir precio a número
            fecha, // Fecha de inicio
            fechaRegistro,
            tarifaSeleccionada, // Tarifa seleccionada
        );

        console.log(reserva,234567);
        
        // Insertar la reserva usando el servicio
        const reservaId = await ReservesService.createReservaPlan(reserva);

        return res.status(201).json({ status: 'Reserva creada exitosamente', reservaId });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export default crearReservaPlan;
