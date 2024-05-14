<template>
    <h1>結帳頁面</h1>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">商品名稱</th>
                <th scope="col">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
            </tr>
            <CheckCartComponents v-for="result in result" :memberid="result.memberid" :productid="result.productid"
                :name="result.productname" :quantity="result.quantity" :productprice="result.productprice"
                :checked="result.check">
            </CheckCartComponents>
        </thead>
    </table>
</template>
<script setup>
import CheckCartComponents from '@/components/shopping/CheckCartComponents.vue'
import { useRouter } from "vue-router"
const router = useRouter();
import { ref, onMounted } from "vue";
import xxx from "@/plugins/axios.js"
const result = ref({})
const disabled = ref(false)
onMounted(function () {
    cart()
    people()
})
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
function people() {

}
</script>
<style></style>