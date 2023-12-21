import { BaseController } from '@api/baseController';
import { AxiosError } from 'axios';

type SignupParams = { email: string; password: string };
type SignupResponse = { foo: string };

type LoginParams = { email: string; password: string };
type LoginResponse = { foo: string };

export class AuthController extends BaseController {
  protected static self?: AuthController;
  public static get: () => AuthController;

  private readonly API_KEY = 'AIzaSyCxE1ywA0_yklLmzgF6dHXu7P7ZR6xjk6c';

  constructor() {
    super({ baseURL: 'https://identitytoolkit.googleapis.com/v1' });

    this.request.interceptors.request.use((config) => {
      config.url = `${config.url}?key=${this.API_KEY}`;
      return config;
    });
  }

  private parseError(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'There is no user with such email';
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
    path: '/accounts:signUp' | '/accounts:signInWithPassword',
    params: { email: string; password: string },
  ) {
    try {
      const { data } = await this.request.post(path, {
        ...params,
        returnSecureToken: true,
      });

      return { foo: 'asd' };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(this.parseError(error.response?.data?.error?.message));
      }
      throw new Error('Unknown error');
    }
  }

  public async signup(params: SignupParams): Promise<SignupResponse> {
    return this.performAuth('/accounts:signUp', params);
  }

  public async login(params: LoginParams): Promise<LoginResponse> {
    return this.performAuth('/accounts:signInWithPassword', params);
  }
}
