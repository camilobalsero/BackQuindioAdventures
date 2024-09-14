import { Request, Response } from 'express';
import ReservesService from '../services/reservesService';
import Reserva from '../Dto/reservesDto';
import sendEmail from '../services/mailerService';

const crearReserva = async (req: Request, res: Response) => {
    try {
        const {
            documento,
            cantidadPersonas,
            nombre,
            apellido,
            telefono,
            direccion,
            checkin,
            checkout,
            precioTotal,
            tarifaSeleccionada
        } = req.body;

        // Obtener el email del usuario desde el token
        const email = res.locals.user.email;

        // Convertir las fechas a objetos Date
        const fechaInicio = new Date(checkin);
        const fechaFin = new Date(checkout);
        const fechaRegistro = new Date().toISOString().split('T')[0];

        // Calcular el total de días entre las fechas
        const timeDiff = fechaFin.getTime() - fechaInicio.getTime();
        const totalDias = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;


        const finalFechaInicio = new Date(checkin).toISOString().split('T')[0];
        const finalFechaFin = new Date(checkout).toISOString().split('T')[0];

        // Crear el objeto Reserva con los datos recibidos
        const reserva = new Reserva(
            email, // Email obtenido del token
            tarifaSeleccionada.id_chalet_usuario, // ID del chalet
            documento,
            cantidadPersonas,
            nombre,
            apellido,
            telefono,
            direccion,
            precioTotal, // Convertir precio a número
            totalDias, // Estancia (opcional si deseas unir check-in y check-out)
            finalFechaInicio, // Fecha de inicio
            finalFechaFin, // Fecha de fin
            fechaRegistro,
            tarifaSeleccionada, // Tarifa seleccionada
        );
        // Insertar la reserva usando el servicio
        const reservaId = await ReservesService.createReserva(reserva);

        const emailData = {
            subject: 'Bienvenido a Quindío Adventures',
            to: email, 
            dataTemplate: { name:nombre },  
            templateName: 'crearReservaChalet.html',
          };
      
          // Enviar el correo usando el servicio de Azure
          await sendEmail(emailData);


        return res.status(201).json({ status: 'Reserva creada exitosamente', reservaId });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export default crearReserva;
