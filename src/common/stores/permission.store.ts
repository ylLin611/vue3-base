import router, { constantRoutes, dynamicRoutes } from '../router'
import { getRoutesApi } from '../service/login.service'
import { clonedeep } from 'lodash-es'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore('permission', () => {
  const routes = ref([])
  const addRoutes = ref([])
  const defaultRoutes = ref([])
  const topbarRouters = ref([])
  const sidebarRouters = ref([])
  const setRoutes = (routes) => {
    addRoutes.value = routes
    routes.value = constantRoutes.concat(routes)
  }
  const setDefaultRoutes = (routes) => {
    defaultRoutes.value = constantRoutes.concat(routes)
  }

  const setTopbarRoutes = (routes) => {
    topbarRouters.value = routes
  }

  const setSidebarRouters = (routes) => {
    sidebarRouters.value = routes
  }

  const generateRoutes = (roles) => {
    return new Promise(async (resolve, reject) => {
      const res = await getRoutesApi()
      if (res?.code === 200) {
        const sdata = clonedeep(res.data)
        const rdata = clonedeep(res.data)
        const defaultData = clonedeep(res.data)
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        const defaultRoutes = filterAsyncRouter(defaultData)
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
        asyncRoutes.forEach((route) => {
          router.addRoute(route)
        })
        setRoutes(rewriteRoutes)
        setSidebarRouters(constantRoutes.concat(sidebarRoutes))
        setDefaultRoutes(sidebarRoutes)
        setTopbarRoutes(defaultRoutes)
        resolve(rewriteRoutes)
      } else {
        reject(res)
      }
    })
  }

  return {
    routes,
    addRoutes,
    defaultRoutes,
    topbarRouters,
    sidebarRouters,
    setRoutes,
    setDefaultRoutes,
    setTopbarRoutes,
    setSidebarRouters,
    generateRoutes,
  }
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  let children: any[] = []
  childrenMap.forEach((el) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default usePermissionStore
