import { CommonResponse } from './common';

export type LoginParam = {
  clientId: 'pc';
  loginName: string;
  password: string;
  validateCode: string;
  validateToken: string;
}

export type LoginResponse = CommonResponse & {
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    userName: string;
  }
}

