import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

export type resultType = {
  accessToken?: string
}

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface HttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void
  beforeResponseCallback?: (response: HttpResponse) => void
  isGlobalLoadingDisabled?: boolean // 是否禁用使用请求中的全局Loading
}

export default class Http {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig,
  ): Promise<T>
  post<T, P>(url: string, params?: P, config?: HttpRequestConfig): Promise<T>
  get<T, P>(url: string, params?: P, config?: HttpRequestConfig): Promise<T>
}

export interface IHttpRes<T> {
  code: number
  data: T
  message: string
}
