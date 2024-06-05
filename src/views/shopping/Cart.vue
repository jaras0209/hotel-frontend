<template>
    <!-- 0529 -->
    <NavigationBar></NavigationBar>
    <table class="table">
        <thead>
            <tr v-if="havesomething">
                <th scope="col">
                    <font-awesome-icon :icon="['fas', 'hand-pointer']" shake size="5x" @click="all"
                        style="cursor: pointer;color: blue;" />
                </th>
                <th scope="col" style="font-size: 24px;">商品名稱</th>
                <th scope="col" style="font-size: 24px;">數量</th>
                <th scope="col" style="font-size: 24px;">單價</th>
                <th scope="col" style="font-size: 24px;">小計</th>
                <th scope="col" style="font-size: 24px;">庫存量</th>
                <th scope="col" style="font-size: 24px;">移除</th>
            </tr>
            <Cartlist v-for="result in result" :memberid="result.memberid" :productid="result.productid"
                :name="result.productname" :quantity="result.quantity" :productprice="result.productprice"
                :checked="result.check" :options="options" @cliick="cliick" @cliick2="cliick2" @move="move"
                :stock="result.productStock" @method-result="handleMethodResult" @method-resultt="handleMethodResultt">
            </Cartlist>
        </thead>
    </table>
    <h1 v-if="!havesomething" style="text-align: center;"> 購物車尚無商品</h1>
    <button v-if="!havesomething" style="font-size: 24px; border-radius: 15px; color: red;"><RouterLink class="dropdown-item" to="/shopping/shoppinglist">再去逛</RouterLink></button>
    <RouterLink :to="{ name: 'checkcart-link' }">
        <button type="button" :disabled="disabled || disabledd" v-if="havesomething">結帳</button>
    </RouterLink>
</template>
<script setup>
import NavigationBar from '../NavigationBar.vue';
import Cartlist from '@/components/shopping/Cartlist.vue'
import { useRouter } from "vue-router"
const router = useRouter();
const options = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
import { ref, onMounted } from "vue";
import axiosapi from "@/plugins/axios.js"
const result = ref({})
const disabled = ref(false) // red
const disabledd = ref(true) // green
const userId = ref(null)
const havesomething=ref(true)
onMounted(function () {
    userId.value = sessionStorage.getItem("userId")
    cart()
})
function handleMethodResult(result) {
    console.log("父元件收到方法的返回值：", result);
    disabled.value = result
}
function handleMethodResultt(result) {
    console.log("父元件收到方法的返回值：", result);
    disabledd.value = result
}
function cliick(quantity, productid) {
    let data =
    {
        "quality": quantity,
        "productId": productid,
        "memberId": userId.value
    }
    axiosapi.put("/hotel/carts/modify", data).then(function (response) {
        console.log(response);
        cart()
    }).catch(function (error) {
        console.log(error);
    });
}
function cart() {
    let send = {
        "memberId": userId.value,
    }
    axiosapi.post(`/hotel/carts/find`, send).then(function (response) {
        console.log(response.data.list);
        console.log(response.data.list.length)
        result.value = response.data.list
        if(response.data.list.length==0){
            console.log("ha")
            havesomething.value=false
        }
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
function cliick2(productid) {
    let data =
    {
        "productId": productid,
        "memberId": userId.value
    }
    axiosapi.put("/hotel/carts/checkoutchange", data).then(function (response) {
        console.log(response);
        cart();
        //6/1
        router.go(0)
    }).catch(function (error) {
        console.log(error);
    });
}
function move(productid) {
    let data =
    {
        "productId": productid,
        "memberId": userId.value
    }
    axiosapi.put("/hotel/carts/delete", data).then(function (response) {
        console.log(response);
        cart();
        //6/1
    }).catch(function (error) {
        console.log(error);
    });
}
function all() {
    console.log("hahah")
    let send = {
        "memberId": userId.value,
    }
    axiosapi.post(`/hotel/carts/selectall`, send).then(function (response) {
        console.log(response);
        cart();
        //6/1
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