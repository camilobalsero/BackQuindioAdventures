import axios from 'axios';

export const createOrder = async () => {
  try {
    const response = await axios.post('https://api.mercadopago.com/checkout/preferences', {
      items: [
        {
          title: 'Laptop',
          unit_price: 10000,
          currency_id: 'CO',
          quantity: 1
        }
      ],
      back_urls: {
        success: 'http://localhost:10101/success',
        failure: 'http://localhost:10101/failure',
        pending: 'http://localhost:10101/pending'
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TEST-4765974219572950-082800-55653a3af2fe5b30c0deabd4ac17d8de-1605181587'
      }
    });

    console.log('Order created successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating order:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

createOrder();
