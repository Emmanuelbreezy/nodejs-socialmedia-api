export interface LoginUserDto {
  usernameOrEmail: string;
  password: string;
}

export interface JWTUserPayloadDto {
  _id: string;
}

export interface JWTUserDto {
  _id: string;
  iat?: number;
  exp?: number;
}
