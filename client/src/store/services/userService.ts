import type {
  ChangePasswordPayload,
  ListUsersParams,
  SetAdminPayload,
  UserType,
} from '../../types/user.types';
import api from './api';

export const listUsers = async (params: ListUsersParams): Promise<UserType[]> => {
  const queryParams = new URLSearchParams();

  if (params.username) queryParams.append('username', params.username);
  if (params.cursor) queryParams.append('cursor', params.cursor);

  const response = await api.get(`/users?${queryParams.toString()}`);
  return response.data;
};

export const readUser = async (id: string): Promise<UserType> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const removeUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const setAdmin = async (payload: SetAdminPayload): Promise<{ message: string }> => {
  const response = await api.post('/users/admin', payload);
  return response.data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
  const response = await api.patch('/users/password', payload);
  return response.data;
};
