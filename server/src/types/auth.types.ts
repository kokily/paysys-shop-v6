export interface AuthenticatedUser {
  user_id: string;
  username: string;
  admin: boolean;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}