import { BaseController } from '@api/baseController';
import { AxiosError, CreateAxiosDefaults } from 'axios';

type SignupParams = { email: string; password: string };
type SignupResponse = {
  idToken: string;
  refreshToken: string;
  // ms
  expiresIn: number;
  uid: string;
};

type LoginParams = { email: string; password: string };
type LoginResponse = {
  idToken: string;
  refreshToken: string;
  // ms
  expiresIn: number;
  uid: string;
};

export class AuthController extends BaseController {
  protected static self?: AuthController;
  public static get: () => AuthController;

  private static axiosConfig: CreateAxiosDefaults = {
    baseURL: 'https://identitytoolkit.googleapis.com',
  };

  constructor() {
    super({
      axiosConfig: AuthController.axiosConfig,
      withAuth: false,
    });

    this.request.interceptors.request.use((config) => {
      const urlObj = new URL(`${config.baseURL}${config.url}`);
      urlObj.searchParams.append('key', this.API_KEY);

      config.url = `${urlObj.pathname}${urlObj.search}`;
      return config;
    });
  }

  private parseError(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'There is no user with such email';
      case 'EMAIL_EXISTS':
        return 'The email is already in use';
      case 'INVALID_PASSWORD':
        return 'The password is invalid';
      case 'INVALID_EMAIL':
        return 'The email is invalid';
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'Invalid email or password';
      default:
        return 'Unknown error';
    }
  }

  private async performAuth(
    path: '/v1/accounts:signUp' | '/v1/accounts:signInWithPassword',
    params: { email: string; password: string },
  ) {
    try {
      const { data } = await this.request.post(path, {
        ...params,
        returnSecureToken: true,
      });

      return {
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: Number(data.expiresIn) * 1000,
        uid: data.localId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(this.parseError(error.response?.data?.error?.message));
      }
      throw new Error('Unknown error');
    }
  }

  public async signup(params: SignupParams): Promise<SignupResponse> {
    return this.performAuth('/v1/accounts:signUp', params);
  }

  public async login(params: LoginParams): Promise<LoginResponse> {
    return this.performAuth('/v1/accounts:signInWithPassword', params);
  }
}
