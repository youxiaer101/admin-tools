import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { get } from "lodash";
import { ElLoading, ElNotification } from "element-plus";

type HttpRequestConfig = {
  disableLoading?: boolean | false;
  disableErrorMsg?: boolean | false;
  ignoreHttpError?: boolean | false;
} & AxiosRequestConfig;

class HttpClient {
  private _httpClient: AxiosInstance;

  constructor() {
   // axios.defaults.headers.common['Cookie'] = 'wisbok.sid=81 B'; 
    this._httpClient = axios.create({
      withCredentials: true,
    });
    this._httpClient.defaults.baseURL = "/api";
    this._httpClient.defaults.timeout = 10000;
  }

  private loadingTimer: any;

  private _doRequest = async <T>(
    url: string,
    config: HttpRequestConfig,
    rawResponse = false
  ) => {
    let loadingInstance:any = null;
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
    try {
      if (!config.disableLoading) {
        loadingInstance = ElLoading.service({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }
      if (config.ignoreHttpError === true) {
        config.validateStatus = () => {
          return true;
        };
      }
      const res = await this._httpClient(url, config).catch((err) => {
        if (err?.response?.status === 401) {
          //router.push('/me');
          return;
        }
        return Promise.reject(err);
      });

      return rawResponse ? res : (res?.data as T);
    } catch (err: any) {
      ElNotification({
        title: "Error",
        message:
          get(err, "response.data.error.message.0.msg") ||
          get(err, "response.data.error.message") ||
          "An unknown error has occurred",
        type: "error",
      });

      const reason =
        err && err.response
          ? rawResponse
            ? err.response
            : (err.response?.data as T)
          : null;
      return Promise.reject(reason);
    } finally {
      if (!config.disableLoading) {
        this.loadingTimer = setTimeout(() => {
            loadingInstance.close();
        }, 300);
      }
    }
  };

  get = async <T>(url: string, config?: HttpRequestConfig) => {
    const options = Object.assign({}, config, {
      method: "GET",
    } as HttpRequestConfig);
    return (await this._doRequest<T>(url, options)) as T;
  };

  getRaw = async <T>(url: string, config?: HttpRequestConfig) => {
    const options = Object.assign({}, config, {
      method: "GET",
    } as HttpRequestConfig);
    return (await this._doRequest<T>(url, options, true)) as AxiosResponse<T>;
  };

  post = async <T>(url: string, data?: any, config?: HttpRequestConfig) => {
    const options = Object.assign({}, config, {
      method: "POST",
      data,
    } as HttpRequestConfig);
    return (await this._doRequest<T>(url, options)) as T;
  };

  put = async <T>(url: string, data?: any, config?: HttpRequestConfig) => {
    const options = Object.assign({}, config, {
      method: "PUT",
      data,
    } as HttpRequestConfig);
    return (await this._doRequest<T>(url, options)) as T;
  };
}

export default new HttpClient();
