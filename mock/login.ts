export default [
  {
    url: '/api/captchaImage',
    method: 'get',
    response: () => {
      return {
        msg: '操作成功',
        img: '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',
        code: 200,
        captchaEnabled: true,
        uuid: 'c06900e783ec4c4f85be3ed6b162b7b3',
      }
    },
  },
  {
    url: '/api/login',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          token:
            'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQ2ZmIwMDRlLTQ2M2QtNDViNy1hM2E3LWIxNDI0ZDdlNjhiNyJ9.M10LMdT83VqTUqhkdRBe03HQcwCSddfMu49xYrABlVDD9qKVu7FJdG6Y98kzE_Lsw8mhW_431wRI53S6KxM52w',
        },
      }
    },
  },
  {
    url: '/api/getInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          permissions: ['*:*:*'],
          roles: ['admin'],
          user: {
            createBy: 'admin',
            createTime: '2024-06-30 11:27:11',
            updateBy: null,
            updateTime: null,
            remark: '管理员',
            userId: 1,
            deptId: 103,
            userName: 'admin',
            nickName: '若依',
            email: 'ry@163.com',
            phonenumber: '15888888888',
            sex: '1',
            avatar: '',
            password: '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2',
            status: '0',
            delFlag: '0',
            loginIp: '221.224.11.194',
            loginDate: '2024-11-21T17:01:20.000+08:00',
            dept: {
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              deptId: 103,
              parentId: 101,
              ancestors: '0,100,101',
              deptName: '研发部门',
              orderNum: 1,
              leader: '若依',
              phone: null,
              email: null,
              status: '0',
              delFlag: null,
              parentName: null,
              children: [],
            },
            roles: [
              {
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
                remark: null,
                roleId: 1,
                roleName: '超级管理员',
                roleKey: 'admin',
                roleSort: 1,
                dataScope: '1',
                menuCheckStrictly: false,
                deptCheckStrictly: false,
                status: '0',
                delFlag: null,
                flag: false,
                menuIds: null,
                deptIds: null,
                permissions: null,
                admin: true,
              },
            ],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: true,
          },
        },
      }
    },
  },
  {
    url: '/api/getRouters',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            name: 'System',
            path: '/system',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '系统管理',
              icon: 'system',
              noCache: false,
              link: null,
            },
            children: [
              {
                name: 'User',
                path: 'user',
                hidden: false,
                component: 'system/user/index',
                meta: {
                  title: '用户管理',
                  icon: 'user',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Role',
                path: 'role',
                hidden: false,
                component: 'system/role/index',
                meta: {
                  title: '角色管理',
                  icon: 'peoples',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Menu',
                path: 'menu',
                hidden: false,
                component: 'system/menu/index',
                meta: {
                  title: '菜单管理',
                  icon: 'tree-table',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Log',
                path: 'log',
                hidden: false,
                redirect: 'noRedirect',
                component: 'ParentView',
                alwaysShow: true,
                meta: {
                  title: '日志管理',
                  icon: 'log',
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: 'Operlog',
                    path: 'operlog',
                    hidden: false,
                    component: 'monitor/operlog/index',
                    meta: {
                      title: '操作日志',
                      icon: 'form',
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: 'Logininfor',
                    path: 'logininfor',
                    hidden: false,
                    component: 'monitor/logininfor/index',
                    meta: {
                      title: '登录日志',
                      icon: 'logininfor',
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
            ],
          },
          {
            name: 'Http://ruoyi.vip',
            path: 'http://ruoyi.vip',
            hidden: false,
            component: 'Layout',
            meta: {
              title: '若依官网',
              icon: 'guide',
              noCache: false,
              link: 'http://ruoyi.vip',
            },
          },
        ],
      }
    },
  },
]
