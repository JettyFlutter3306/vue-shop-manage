import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/Home'),
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: () => import('@/components/Welcome')},
      {path: '/users', component: () => import('@/components/user/Users')},
      {path: '/rights', component: () => import("@/components/power/Rights")},
      {path: '/roles', component: () => import("@/components/power/Roles")},
      {path: '/categories', component: () => import("@/components/goods/Categories")},
      {path: '/params', component: () => import("@/components/goods/Params")},
      {path: '/goods', component: () => import("@/components/goods/Goods")},
      {path: '/goods/addGoods', component: () => import("@/components/goods/AddGoods")},
      {path: '/orders', component: () => import("@/components/order/Order")},
      {path: '/reports', component: () => import("@/components/report/Report")},
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
  const tokenStr = window.localStorage.getExpire('AUTH_TOKEN');

  if(!tokenStr){
    return next('/login');
  }

  next();
});

export default router
