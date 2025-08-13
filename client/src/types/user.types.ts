export interface SetAdminRequest {
  id: string;
  isAdmin: boolean;
}

export interface ChangePasswordRequest {
  password: string;
}

export interface UserType {
  id: string;
  username: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
}