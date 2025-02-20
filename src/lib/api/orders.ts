import apiClient from '@/lib/apiClient';

interface CreateOrderParams {
  amount: string;
  currency: string;
  description: string;
}

interface Order {
  id: string;
  status: string;
  amount: number;
  currency: string;
  qrCodeUrl: string;
  paymentAddress: string;
  expirationTime: string;
}

export async function getOrderInfo(orderId: string): Promise<Order> {
  try {
    const response = await apiClient.get(`/orders/info/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo información del pedido:', error);
    throw error;
  }
}

export async function createOrder(params: CreateOrderParams): Promise<Order> {
  try {
    const response = await apiClient.post('/orders', params);
    return response.data;
  } catch (error) {
    console.error('Error creando el pedido:', error);
    throw error;
  }
}
