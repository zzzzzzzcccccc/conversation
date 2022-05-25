import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAccessToken } from './access.token';

class HttpClient {
  private _axiosInstance: AxiosInstance | null = null;

  initialize(baseURL: string) {
    if (!this._axiosInstance) {
      this._axiosInstance = axios.create({
        baseURL,
        timeout: 10000
      })
    }

    this._axiosInstance.interceptors.request.use(async (config) => {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: getAccessToken(),
        }
      }
    })

    this._axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  get instance() {
    if (!this._axiosInstance) {
      throw new Error('http.client not initialize')
    }
    return this._axiosInstance;
  }
}

const httpClient = new HttpClient()

export {
  httpClient
}

