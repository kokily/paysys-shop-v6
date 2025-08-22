export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  user_id: string;
  username: string;
  admin: boolean;
  access_token: string;
}

export interface User {
  id: string;
  username: string;
  admin: boolean;
}

export interface CheckAuthResponse extends LoginResponse {}
