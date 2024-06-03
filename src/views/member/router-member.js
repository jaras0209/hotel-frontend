//引入SFC元件
import login from './login.vue';
import register from './register.vue';
import orderHistory from './orderHistory.vue';
import orderHome from './orderHome.vue';
import paySuccess from './paySuccess.vue';
import payFalse from './payFalse.vue';
import checkOrderLogin from './checkOrderLogin.vue';
import checkOrder from './checkOrder.vue';


//設定路由網址
export default [
    { name: "login-link", path: "/member/login", component: login },
    { name: "register-link", path: "/member/register", component: register },
    { name: "orderHistory-link", path: "/member/orderHistory", component: orderHistory },
    { name: "orderHome-link", path: "/member/orderHome", component: orderHome },
    { name: "paySuccess-link", path: "/member/paySuccess", component: paySuccess },
    { name: "payFalse-link", path: "/member/payFalse", component: payFalse },
    { name: "checkOrderLogin-link", path: "/orderRoom/login", component: checkOrderLogin },
    { name: "checkOrder-link", path: "/orderRoom/checkorder", component: checkOrder },

];