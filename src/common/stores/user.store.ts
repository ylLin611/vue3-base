import { getUserInfoApi, loginApi, logoutApi } from '../service/login.service'
import { removeToken, setToken } from '../utils/auth'

const useUserStore = defineStore('user', () => {
  const token = ref()
  const userInfo = ref()

  /**
   * 用户基础信息
   */
  const permissions = computed(() => {
    return userInfo.value?.permissions ?? []
  })
  const roles = computed(() => {
    return userInfo.value?.roles ?? []
  })
  const user = computed(() => {
    return userInfo.value?.user
  })

  const login = (userInfo) => {
    return new Promise(async (resolve, reject) => {
      const res = await loginApi({
        ...userInfo,
      })
      if (res?.code === 200) {
        setToken(res.data.token)
        token.value = res.data.token
        resolve('')
      } else {
        reject(res.message)
      }
    })
  }

  const getUserInfo = async () => {
    return new Promise(async (resolve, reject) => {
      const res = await getUserInfoApi()
      if (res?.code === 200) {
        userInfo.value = res.data
        resolve('')
      } else {
        reject(res.message)
      }
    })
  }

  const logOut = () => {
    return new Promise(async (resolve, reject) => {
      const res = await logoutApi()
      if (res?.code === 200) {
        token.value = ''
        userInfo.value = {}
        removeToken()
        resolve('')
      } else {
        reject(res.message)
      }
    })
  }

  return {
    token,
    login,
    logOut,
    permissions,
    roles,
    user,
    getUserInfo,
  }
})

export default useUserStore
