import type { CartType } from '../../types/cart.types';
import type {
  AddMenuPayload,
  ListMenuParams,
  ListMenuResponse,
  ReadMenuResponse,
} from '../../types/item.types';
import api from './api';

export const listMenu = async (params: ListMenuParams): Promise<ListMenuResponse> => {
  const response = await api.get('/items', { params });
  return response.data;
};

export const readMenu = async (id: string): Promise<ReadMenuResponse> => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const addMenu = async (payload: AddMenuPayload): Promise<CartType> => {
  const response = await api.post('/cart', payload);
  return response.data;
};
