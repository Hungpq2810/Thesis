import { IBaseResponse } from '../typeDefs/baseReponse.type';
import { AxiosResponse } from 'axios';
import { httpsNoToken } from '@/config/https.config';

export interface IAuthen {
  token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token?: any;
  'not-before-policy': number;
  session_state: string;
  scope: string;
  error?: any;
  error_description?: any;
  error_uri?: any;
}

class AuthService {
  register(body: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    gender: number;
    birthday: Date;
    address: string;
    avatar: string;
  }): Promise<AxiosResponse<IBaseResponse<IAuthen>>> {
    return httpsNoToken.post('/register', body);
  }
  authenticated(body: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<IBaseResponse<IAuthen>>> {
    return httpsNoToken.post('/login', body);
  }
}

export const authService = new AuthService();
