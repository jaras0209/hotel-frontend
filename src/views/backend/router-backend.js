//引入SFC元件
import login from "./backendLogin.vue";
import backendHome from './backendHome.vue'
import orderRoom from './backendOrderRoom.vue'
import unauthorized from "./backendUnauthorized.vue";
import backIndex from "../room/back/BackIndex.vue";
import backendMember from './backendMember.vue';
import backendShopping from './backendShopping.vue';
import employee from './employees.vue';

//設定路由網址
export default [
    { name: "backend-login-link", path: "/backend/login", component: login },
    { name: "backend-home-link", path: "/backend/home", component: backendHome ,meta: { requiresAuth: true } },
    { name: "backend-orderRoom-link", path: "/backend/orderRoom", component: orderRoom ,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },
    { name: "backend-backIndex-link", path: "/backend/backIndex", component: backIndex ,meta: { requiresAuth: true , roles:['RoomService', 'GeneralManger']} },
    { name: "backend-memberManage-link", path: "/backend/memberManage", component: backendMember ,meta: { requiresAuth: true , roles:['MemberManager', 'GeneralManger']} },
    { name: "backend-mallManage-link", path: "/backend/shoppingManage", component: backendShopping ,meta: { requiresAuth: true , roles:['Purchaser', 'GeneralManger']} },
    { name: "backend-employeeManage-link", path: "/backend/employeeManage", component: employee ,meta: { requiresAuth: true , roles:['GeneralManger']} },
    { name: "backend-unauthorized-link", path: "/backend/unauthorized", component: unauthorized },

];