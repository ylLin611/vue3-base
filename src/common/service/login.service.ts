import request from '@/common/axios/axios.config'
import type { IHttpRes } from '../axios/types'

export const loginApi = (params) =>
  request.get<
    IHttpRes<{
      token: string
    }>,
    {}
  >('/api/login', { params })

// 退出登录
export const logoutApi = () => request.post<IHttpRes<string>, {}>('/api/logout')

// 获取用户信息
export const getUserInfoApi = () => request.get<IHttpRes<any>, {}>('/api/getInfo')

// 获取路由信息
export const getRoutesApi = () => request.get<IHttpRes<any>, {}>('/api/getRouters')
