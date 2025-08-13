export interface ListUsersParams {
  cursor?: string;
  username?: string;
}

export interface SetAdminRequest {
  id: string;
  isAdmin: boolean;
}

export interface ChangePasswordRequest {
  password: string;
}