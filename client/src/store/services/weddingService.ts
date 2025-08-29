import type { ConvertedAddWedding, ConvertedUpdateWedding, WeddingType } from '../../types/wedding.types';
import api from './api';

export const addWedding = async (payload: ConvertedAddWedding): Promise<WeddingType> => {
  const response = await api.post('/weddings', payload);
  return response.data;
};

export const listWeddings = async (params: { cursor?: string }): Promise<WeddingType[]> => {
  const queryParams = new URLSearchParams();

  if (params.cursor) queryParams.append('cursor', params.cursor);

  const response = await api.get(`/weddings?${queryParams.toString()}`);
  return response.data;
};

export const readWedding = async (id: string): Promise<WeddingType> => {
  const response = await api.get(`/weddings/${id}`);
  return response.data;
};

export const removeWedding = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/weddings/${id}`);
  return response.data;
};

export const updateWedding = async (payload: ConvertedUpdateWedding): Promise<{ message: string }> => {
  const { id, ...payloadWithoutId } = payload;
  const response = await api.patch(`/weddings/${id}`, payloadWithoutId);
  return response.data;
};
