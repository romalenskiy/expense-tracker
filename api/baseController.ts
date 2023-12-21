import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export class BaseController {
  protected static self?: BaseController;

  public static get(): BaseController {
    if (!this.self) {
      this.self = new this({});
    }

    return this.self;
  }

  protected readonly request: AxiosInstance;

  constructor(axiosConfig: CreateAxiosDefaults) {
    this.request = axios.create(axiosConfig);

    this.request.interceptors.request.use(this.requestLogInterceptor);

    this.request.interceptors.response.use(
      this.responseLogInterceptor,
      this.responseErrorLogInterceptor,
    );
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

    console.log(
      `Request end: ${config.method?.toUpperCase()} "${config.url}" ${
        data ? JSON.stringify(data) : '{}'
      }\n-----------------------------------------------------`,
    );

    return response;
  }

  protected responseErrorLogInterceptor = (error: any) => {
    if (error instanceof AxiosError) {
      console.error(
        `Request error: ${error.config?.method?.toUpperCase()} "${error.config
          ?.url}" ${
          error.message
        }\n-----------------------------------------------------`,
      );
    } else {
      console.error('Internal response error', error);
    }

    return Promise.reject(error);
  };
}
