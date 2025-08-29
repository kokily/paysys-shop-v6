import type { AddSignPayload, RemoveSignPayload } from '../../types/sign.types';
import api from './api';

export const addSign = async (payload: AddSignPayload): Promise<{ message: string }> => {
  const response = await api.post('/sign', payload);
  return response.data;
};

export const removeSign = async (payload: RemoveSignPayload): Promise<{ message: string }> => {
  const { weddingId, sex } = payload;
  const response = await api.delete(`/sign/${weddingId}/${sex}`);
  return response.data;
};
