//引入SFC元件
import Cart from "./Cart.vue"
import Checkcart from "./Checkcart.vue"
import Products from "./Products.vue"
import Productphoto from "./Productphoto.vue"
import Shopping from "./Shopping.vue"
import Shoppinglist from "./Shoppinglist.vue"
import suppliers from './suppliers.vue'


//設定路由網址

export default [
    { name: "cart-link", path: "/shopping/cart", component: Cart },
    { name: "checkcart-link", path: "/shopping/checkcart", component: Checkcart },
    { name: "products-link", path: "/pages/products:demo:name", component: Products },
    { name: "productphoto-link", path: "/path/productphoto:productid", component: Productphoto },
    { name: "shopping-link", path: "/shopping/mall:id", component: Shopping },
    { name: "shoppinglist-link", path: "/shopping/shoppinglist", component: Shoppinglist },
    { name: "suppliers-link", path: "/supplier/allsupplier", component: suppliers }

];