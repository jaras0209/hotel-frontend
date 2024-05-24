//引入SFC元件
import login from "./backendLogin.vue";
import backendHome from './backendHome.vue'
import orderRoom from './backendOrderRoom.vue'
import unauthorized from "./backendUnauthorized.vue";
import roomService from "./backendRoomService.vue";

//設定路由網址
export default [
    { name: "backend-login-link", path: "/backend/login", component: login },
    { name: "backend-home-link", path: "/backend/home", component: backendHome ,meta: { requiresAuth: true } },
    { name: "backend-orderRoom-link", path: "/backend/orderRoom", component: orderRoom ,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },
    { name: "backend-roomService-link", path: "/backend/roomService", component: orderRoom ,meta: { requiresAuth: true , roles:['RoomService', 'GeneralManger']} },
    { name: "backend-unauthorized-link", path: "/backend/unauthorized", component: unauthorized },

];