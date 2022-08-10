import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from "element-ui"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/view/Welcome')
      },
      {
        path: '/users',
        component: () => import('@/view/user/Users')
      },
      {
        path: '/rights',
        component: () => import("@/view/power/Rights")
      },
      {
        path: '/roles',
        component: () => import("@/view/power/Roles")
      },
      {
        path: '/roles/allot/:id',
        component: () => import("@/view/power/role/AllotRoles")
      },
      {
        path: '/categories',
        component: () => import("@/view/goods/Categories")
      },
      {
        path: '/params',
        component: () => import("@/view/goods/Params")
      },
      {
        path: '/goods',
        component: () => import("@/view/goods/Goods")
      },
      {
        path: '/addGoods',
        component: () => import("@/view/goods/AddGoods")
      },
      {
        path: '/orders',
        component: () => import("@/view/order/Order")
      },
      {
        path: '/reports',
        component: () => import("@/view/report/Report")
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

/**挂载路由导航守卫
 * to: 将要访问的路径
 * from: 从哪个路径跳转
 * next: 是一个函数,表示放行 next('/login') 表示强制跳转
 */
router.beforeEach((to,from,next) => {
  if (to.path === '/login') {
    return next()
  }

  //获取token
  const tokenStr = window.localStorage.getItem('Authorization')

  if (!tokenStr) {
    Message.error('请先登录再操作!')
    return next('/login')
  }

  next()
})

export default router
