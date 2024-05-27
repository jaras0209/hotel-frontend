//引入vue-router函式庫
import { createRouter, createWebHistory } from 'vue-router'
import routerShopping from '@/views/shopping/router-shopping';
import routerMember from '@/views/member/router-member';
import routerRoom from '@/views/room/router-room';
import routerBackend from '@/views/backend/router-backend.js';
import store from '@/store/index.js';

//引入SFC元件

import NotFound from '@/views/NotFound.vue';
import Home from '@/views/Home.vue';



//設定路由網址
const routes = [

    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },

    ...routerShopping,
    ...routerMember,
    ...routerRoom,
    ...routerBackend,
];

//產生router物件
const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from) => {
    // 而不是去检查每条路由记录
    // to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = store.state.isAuthenticated;
    const userRole = store.state.userRole;
    if (to.meta.requiresAuth && !isAuthenticated) {
      // 此路由需要授权，请检查是否已登录
      // 如果没有，则重定向到登录页面
        store.dispatch('logout')

      return {
        path: '/backend/login',
        // 保存我们所在的位置，以便以后再来
        query: { redirect: to.fullPath },
      }
    }else if(to.meta.roles && !to.meta.roles.includes(userRole)){
        return {
            path: '/backend/unauthorized',
        }
    }
  })

//   // 在 routerRoom 中添加 beforeEnter 守衛
// routerRoom.forEach(route => {
//   if (route.path === '/room') {
//       route.beforeEnter = (to, from, next) => {
//           const roomId = sessionStorage.getItem('roomId');
//           if (!roomId) {
//               next({ name: 'home-link' });
//           } else {
//               next();
//           }
//       };
//   }
// });

export default router;
