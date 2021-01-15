import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      }
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
// router.beforeEach((to,from,next) => {
//
//   if(to.path === '/login'){
//     return next();
//   }
//
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token');
//
//   if(!tokenStr){
//     return next('/login');
//   }
//
//   next();
// });

export default router
