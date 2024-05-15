<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">
                    <font-awesome-icon :icon="['fas', 'hand-pointer']" shake size="5x" @click="all"
                        style="cursor: pointer;color: blue;" />
                </th>
                <th scope="col">商品名稱</th>
                <th scope="col">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
                <th scope="col">庫存量</th>
                <th scope="col">移除</th>
            </tr>
            <Cartlist v-for="result in result" :memberid="result.memberid" :productid="result.productid"
                :name="result.productname" :quantity="result.quantity" :productprice="result.productprice"
                :checked="result.check" :options="options" @cliick="cliick" @cliick2="cliick2" @move="move"
                :stock="result.productStock" @method-result="handleMethodResult">
            </Cartlist>
        </thead>
    </table>
    <RouterLink :to="{ name: 'checkcart-link' }">
        <button type="button" :disabled="disabled">結帳</button>
    </RouterLink>
</template>
<script setup>
import Cartlist from '@/components/shopping/Cartlist.vue'
import { useRouter } from "vue-router"
const router = useRouter();
const options = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
import { ref, onMounted } from "vue";
import xxx from "@/plugins/axios.js"
const result = ref({})
const disabled = ref(false)
onMounted(function () {
    cart()
})
function handleMethodResult(result) {
    console.log("父元件收到方法的返回值：", result);
    disabled.value = result
}
//修改購物車數量要有memberid/////////////////////////////////////////////////////////////////////////////////////////
function cliick(quantity, productid) {
    let data =
    {
        "quality": quantity,
        "productId": productid,
        "memberId": 1
    }
    xxx.put("/hotel/carts/modify", data).then(function (response) {
        console.log(response);
        router.go(0)
    }).catch(function (error) {
        console.log(error);
    });
}
//查看購物車要有memberid///////////////////////////////////////////////////////////////////////////////////////
function cart() {
    //目前欠缺一個，之後要補足會員ID，透過token?///////////////////////////////////////////////////////////////////
    let send = {
        "memberId": 1,//目前寫死
    }
    xxx.post(`/hotel/carts/find`, send).then(function (response) {
        console.log(response.data.list);
        result.value = response.data.list
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
//修改購物車購買意願要有memberid
function cliick2(productid) {
    let data =
    {
        "productId": productid,
        "memberId": 1
    }
    xxx.put("/hotel/carts/checkoutchange", data).then(function (response) {
        console.log(response);
        cart();//但我覺得這個寫法不好////////////////////////////////////////////////////////////////////////////////////
        router.go(0)
    }).catch(function (error) {
        console.log(error);
    });
}
//刪除購物車的某樣要有memberid
function move(productid) {
    let data =
    {
        "productId": productid,
        "memberId": 1
    }
    xxx.put("/hotel/carts/delete", data).then(function (response) {
        console.log(response);
        cart();//但我覺得這個寫法不好////////////////////////////////////////////////////////////////////////////////////
    }).catch(function (error) {
        console.log(error);
    });
}
//全選購物車要有memberid
function all() {
    console.log("hahah")
    let send = {
        "memberId": 1,//目前寫死
    }
    xxx.post(`/hotel/carts/selectall`, send).then(function (response) {
        console.log(response);
        cart();//但我覺得這個寫法不好////////////////////////////////////////////////////////////////////////////////////
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
</script scope>
<style>
.relative {
    position: relative;
    left: 1150px;
    border: 3px solid #73AD21;
}
</style>