import axios from 'axios';
import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  const { precioTotal, tipoReserva } = req.body;

  // Verifica qué valor está llegando
  console.log('Valor de precioTotal recibido:', precioTotal);

  if (!precioTotal || isNaN(precioTotal) || precioTotal <= 0) {
    return res.status(400).json({
      error: 'El precio total debe ser un número válido mayor a 0',
    });
  }

  try {
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: [
          {
            title: tipoReserva === 'chalet' ? 'Reserva de Chalet' : 'Reserva de Plan',
            unit_price: parseFloat(precioTotal), // Asegurarse de que sea un número
            currency_id: 'COP',
            quantity: 1,
          },
        ],
        back_urls: {
          success: 'http://localhost:10101/success',
          failure: 'http://localhost:10101/failure',
          pending: 'http://localhost:10101/pending',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TEST-4765974219572950-082800-55653a3af2fe5b30c0deabd4ac17d8de-1605181587',
        },
      }
    );

    console.log('Order created successfully:', response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating order:', error.response?.data || error.message);
      return res.status(500).json({ error: error.response?.data || error.message });
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
};
