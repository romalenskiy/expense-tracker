import { SessionStorage } from '@store/sessionStorage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

type ConstructorParams = {
  axiosConfig?: CreateAxiosDefaults;
  withAuth?: boolean;
};

type RefreshTokenResponse = {
  idToken: string;
  refreshToken: string;
  // ms
  expiresIn: number;
  uid: string;
};

export class BaseController {
  protected static self?: BaseController;

  public static get(): BaseController {
    if (!this.self) {
      this.self = new this({});
    }

    return this.self;
  }

  protected readonly API_KEY = 'AIzaSyCxE1ywA0_yklLmzgF6dHXu7P7ZR6xjk6c';

  protected readonly request: AxiosInstance;

  constructor({ axiosConfig, withAuth = true }: ConstructorParams) {
    this.request = axios.create(axiosConfig);

    // !!! Interceptors invokes in reverse order (axios bug or feature)

    /** Request interceptors */
    if (withAuth) {
      this.request.interceptors.request.use(this.addAuthQueryParam.bind(this));
      this.request.interceptors.request.use(this.checkRefreshToken.bind(this));
    }

    this.request.interceptors.request.use(
      this.requestLogInterceptor.bind(this),
    );

    /**  Response interceptors */
    this.request.interceptors.response.use(
      this.responseLogInterceptor.bind(this),
      this.responseErrorLogInterceptor.bind(this),
    );
  }

  protected async exchangeRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenResponse> {
    // Use URLSearchParams for valid request Content-Type: application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const { data } = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${this.API_KEY}`,
      params,
    );

    return {
      idToken: data.id_token,
      refreshToken: data.refresh_token,
      expiresIn: Number(data.expires_in) * 1000,
      uid: data.user_id,
    };
  }

  protected async checkRefreshToken(config: InternalAxiosRequestConfig) {
    const session = await SessionStorage.get().getSession();
    if (!session) {
      return config;
    }

    const needToRefresh = Date.now() >= session.loginTs + session.expiresIn;
    if (!needToRefresh) {
      return config;
    }

    const refreshedSession = await this.exchangeRefreshToken(
      session.refreshToken,
    );

    await SessionStorage.get().setSession({
      ...refreshedSession,
      loginTs: Date.now(),
    });

    return config;
  }

  protected async addAuthQueryParam(config: InternalAxiosRequestConfig) {
    const session = await SessionStorage.get().getSession();
    if (!session) {
      return config;
    }

    const urlObj = new URL(`${config.baseURL}${config.url}`);
    urlObj.searchParams.append('auth', session.idToken);

    config.url = `${urlObj.pathname}${urlObj.search}`;
    return config;
  }

  protected requestLogInterceptor(config: InternalAxiosRequestConfig) {
    console.log(
      `Request start: ${config.method?.toUpperCase()} "${config.url}" ${
        config.data ? JSON.stringify(config.data) : '{}'
      }\n-----------------------------------------------------`,
    );

    return config;
  }

  protected responseLogInterceptor(response: AxiosResponse) {
    const { config, data } = response;

    const urlWithoutAuth = config.url?.replace(/(\?|&)auth=[^&#]+/, '');

    console.log(
      `Request end: ${config.method?.toUpperCase()} "${urlWithoutAuth}" ${
        data ? JSON.stringify(data) : '{}'
      }\n-----------------------------------------------------`,
    );

    return response;
  }

  protected responseErrorLogInterceptor = (error: any) => {
    if (error instanceof AxiosError) {
      const urlWithoutAuth = error.config?.url?.replace(
        /(\?|&)auth=[^&#]+/,
        '',
      );

      console.error(
        `Request error: ${error.config?.method?.toUpperCase()} "${urlWithoutAuth}" ${
          error.message
        }\n-----------------------------------------------------`,
      );
    } else {
      console.error('Internal response error', error);
    }

    return Promise.reject(error);
  };
}
