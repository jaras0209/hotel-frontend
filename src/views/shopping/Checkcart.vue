<template>
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
    <br><br>
    <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">收件人</label>
        <input type="text" class="form-control" id="formGroupExampleInput" v-model="name">
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInput2" class="form-label">收件地址</label>
        <input type="text" class="form-control" id="formGroupExampleInput2" v-model="address">
    </div>
    <div class="mb-3">
        <label for="formGroupExampleInput2" class="form-label">收件地址</label>
        <input type="text" class="form-control" id="formGroupExampleInput2" v-model="phone">
    </div>
    <button type="button" @click="dopay">結帳</button>
</template>
<script setup>
import CheckCartComponents from '@/components/shopping/CheckCartComponents.vue'
import { useRouter } from "vue-router"
const router = useRouter();
import { ref, onMounted } from "vue";
import xxx from "@/plugins/axios.js"
import Swal from "sweetalert2"
const result = ref({})
const message = ref({})
const name = ref(null)
const phone = ref(null)
const address = ref(null)
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
//結帳要有個資memberid///////////////////////////////////////////////////////////////////////////////////////
//暫時寫固定值
function people() {
    xxx.get(`/hotel/carts/mes/${1}`).then(function (response) {
        message.value = response.data.listt[0];
        console.log(message.value)
        name.value = response.data.listt[0].MemberName
        phone.value = response.data.listt[0].phoneNumber
        address.value = response.data.listt[0].contactAddress
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}

//真的確定付款
function dopay() {
    Swal.fire({
        text: "確定結帳",
        icon: 'question',
        allowOutsideClick: false,
        confirmButtonText: '確認',
        showCancelButton: true,
        cancelButtonText: '取消',
    }).then(function (result) {
        if (result.isConfirmed) {
            let data = {
                "memberId": 1,
                "name": name.value,
                "phone": phone.value,
                "address": address.value,
            }
            xxx.post(`/hotel/carts/order`, data).then(function (response) {
                console.log(response)
            })
        }
    })
}
</script>
<style></style>