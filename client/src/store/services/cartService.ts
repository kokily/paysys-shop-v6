import type { CartType } from '../../types/cart.types';
import api from './api';

export const viewCart = async (): Promise<CartType> => {
  const response = await api.get('/cart');
  return response.data;
};

export const removeOneCart = async (id: string): Promise<void> => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

export const removeCart = async (): Promise<void> => {
  const response = await api.delete('/cart');
  return response.data;
};
