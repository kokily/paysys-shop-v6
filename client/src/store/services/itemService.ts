import type { AddItemPayload, ItemType, ListItemsParams, UpdateItemPayload } from '../../types/item.types';
import api from './api';

export const listItems = async (params: ListItemsParams): Promise<ItemType[]> => {
  const queryParams = new URLSearchParams();

  if (params.divide) queryParams.append('divide', params.divide);
  if (params.native) queryParams.append('native', params.native);
  if (params.name) queryParams.append('name', params.name);
  if (params.cursor) queryParams.append('cursor', params.cursor);

  const response = await api.get(`/items?${queryParams.toString()}`);
  return response.data;
};

export const readItem = async (id: string): Promise<ItemType> => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const addItem = async (payload: AddItemPayload): Promise<ItemType> => {
  const response = await api.post('/items', payload);
  return response.data;
};

export const removeItem = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};

export const updateItem = async (payload: UpdateItemPayload): Promise<{ message: string }> => {
  const { id, name, divide, native, unit, price } = payload;
  const response = await api.patch(`/items/${id}`, {
    name,
    divide,
    native,
    unit,
    price,
  });
  return response.data;
};
