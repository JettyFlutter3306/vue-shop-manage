import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from "element-ui";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome')
      },
      {
        path: '/users',
        component: () => import('@/views/user/Users')
      },
      {
        path: '/rights',
        component: () => import("@/views/power/Rights")
      },
      {
        path: '/roles',
        component: () => import("@/views/power/Roles")
      },
      {
        path: '/roles/allot/:id',
        component: () => import("@/views/power/role/AllotRoles")
      },
      {
        path: '/categories',
        component: () => import("@/views/goods/Categories")
      },
      {
        path: '/params',
        component: () => import("@/views/goods/Params")
      },
      {
        path: '/goods',
        component: () => import("@/views/goods/Goods")
      },
      {
        path: '/addGoods',
        component: () => import("@/views/goods/AddGoods")
      },
      {
        path: '/orders',
        component: () => import("@/views/order/Order")
      },
      {
        path: '/reports',
        component: () => import("@/views/report/Report")
      },
    ]
  }

];

const router = new VueRouter({
  routes
});

/**挂载路由导航守卫
 * to: 将要访问的路径
 * from: 从哪个路径跳转
 * next: 是一个函数,表示放行 next('/login') 表示强制跳转
 */
router.beforeEach((to,from,next) => {

  if(to.path === '/login'){
    return next();
  }

  //获取token
  const tokenStr = window.localStorage.getItem('Authorization');

  if(!tokenStr){
    Message.error('请先登录再操作!')

    return next('/login');
  }

  next();
});

export default router
