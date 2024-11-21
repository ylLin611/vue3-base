import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
} from 'axios'
import { stringify } from 'qs'
import type { HttpError, HttpRequestConfig, HttpResponse, RequestMethods } from './types'
import { useGlobalStore } from '../stores/globel.store'
import { ElMessage } from 'element-plus'

// 相关配置参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  timeout: 1000 * 60 * 10,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  /** 初始化配置对象 */
  private static initConfig: HttpRequestConfig = {}

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 请求白名单，放置不需要`token`的接口 */
  private whiteList = ['/login', '/captchaImage']

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async (config: HttpRequestConfig): Promise<any> => {
        const globalStore = useGlobalStore()
        !config.isGlobalLoadingDisabled && globalStore.setLoading(true)
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return config
        }
        if (Http.initConfig.beforeRequestCallback) {
          Http.initConfig.beforeRequestCallback(config)
          return config
        }
        return this.whiteList.some((url) => config.url?.endsWith(url))
          ? config
          : new Promise((resolve) => {
              // const userStore = useUserStore()
              // signParams(config)
              // if (userStore.token) {
              //   config.headers['token'] = userStore.token
              // }
              resolve(config)
            })
      },
      (error) => {
        const globalStore = useGlobalStore()
        globalStore.setLoading(false)
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        const globalStore = useGlobalStore()
        globalStore.setLoading(false)
        const $config = response.config
        switch (response.data?.code) {
          case 0:
          case 200:
            // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
            if (typeof $config.beforeResponseCallback === 'function') {
              $config.beforeResponseCallback(response)
              return response.data
            }
            if (Http.initConfig.beforeResponseCallback) {
              Http.initConfig.beforeResponseCallback(response)
              return response.data
            }
            break
          case 401:
            if (!this.whiteList.some((url) => $config.url?.endsWith(url))) {
              // TODO 401处理
            }
            break
          case undefined:
            break
          default:
            ElMessage.error(response.data?.msg || '请求出错，请稍后再试')
            break
        }

        return response.data
      },
      (error: HttpError) => {
        const globalStore = useGlobalStore()
        globalStore.setLoading(false)
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        return Promise.reject($error)
      },
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as HttpRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('post', url, params, config)
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('get', url, params, config)
  }
  /** 单独抽离的`delete`工具函数 */
  public delete<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('delete', url, params, config)
  }

  /** 单独抽离的`put`工具函数 */
  public put<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('put', url, params, config)
  }
}

export default new Http()
