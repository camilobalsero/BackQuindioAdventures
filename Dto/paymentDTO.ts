export interface PaymentDTO {
    transaction_amount: number;
    token: string;
    description: string;
    installments: number;
    payment_method_id: string;
    email: string;
  }
  