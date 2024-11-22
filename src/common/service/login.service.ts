import request from '@/common/axios/axios.config'
import type { IHttpRes } from '../axios/types'

export const loginApi = (params) =>
  request.get<
    IHttpRes<{
      token: string
    }>,
    {}
  >('/api/login', { params })
