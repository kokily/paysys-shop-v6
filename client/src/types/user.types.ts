import type { User } from './auth.types';

export interface ListUsersParams {
  username?: string;
  cursor?: string;
}

export interface SetAdminPayload {
  id: string;
  isAdmin: boolean;
}

export interface ChangePasswordPayload {
  password: string;
}

export interface UserType extends User {
  created_at: Date;
  updated_at: Date;
}
