//引入vue-router函式庫
import { createRouter, createWebHistory } from 'vue-router'
import routerShopping from '@/views/shopping/router-shopping';

//引入SFC元件

import NotFound from '@/views/NotFound.vue';
import Home from '@/views/Home.vue';



//設定路由網址
const routes = [

    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },

    ...routerShopping

];

//產生router物件
const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
