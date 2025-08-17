export interface JwtPayload {
  user_id: string;
  username: string;
  admin: boolean;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedUser {
  user_id: string;
  username: string;
  admin: boolean;
}

export interface AccessTokenPayload {
  user_id: string;
  username: string;
  admin: boolean;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  user_id: string;
  username: string;
  admin: boolean;
  token_id: string;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest {
  user: {
    user_id: string;
  };
}
