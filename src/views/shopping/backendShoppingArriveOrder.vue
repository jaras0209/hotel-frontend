<template>
    <backendNavbar></backendNavbar>
    <div class="box">
    <h1>已送達訂單</h1>
    <table class="table-danger">
    <tr>
            <th style="font-size: 24px;">訂單編號</th>
            <th style="font-size: 24px;">訂單聯絡人</th>
            <th style="font-size: 24px;">訂單電話</th>
            <th style="font-size: 24px;">訂單地址</th>
            <th style="font-size: 24px;">訂單時間</th>        
    </tr>
    <tr v-for="order in orderData">
        <td style="font-size: 18px; color: blue;"><RouterLink :to="{ name: 'backendShoppingOrderDetails', params: { id: order.orderid } }" class="list-group-item" style="font-size: 18px;">{{ order.orderid }}</RouterLink></td>
            <td style="font-size: 18px;">{{ order.MemberName }}</td>
            <td style="font-size: 18px;">{{ order.PhoneNumber }}</td>
            <td style="font-size: 18px;">{{ order.ContactAddress }}</td>
            <td style="font-size: 18px;">{{ order.AddedTime }}</td>
    </tr>
    </table>
    </div>
</template>
<script setup>
import backendNavbar from '../backendNavbar.vue';
import { ref, onMounted } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from "vue-router"
const router = useRouter();
const orderData = ref(null);
onMounted(function (){
    callFind();
})
function callarive(id){
Swal.fire({
    text: "確定抵達嗎",
    icon: 'warning',
    allowOutsideClick: false,
    confirmButtonText: '確認',
    showCancelButton: true,
    cancelButtonText: '取消',
}).then(function(result){
    if(result.isConfirmed){
        axiosapi.get(`/hotel/orders/order/${id}`).then(function (response) {
    Swal.fire({
        icon: "success",
        title: "成功抵達",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1300
    });
    setTimeout(function () {
        Swal.close();
        router.go(0);
    }, 1000);
}).catch(function (error) {
    console.log(error)
})
    }
})
}
function callFind(){
    axiosapi.get("/hotel/orders/orderAll/isarrival").then(function (response){
    console.log(response);
    orderData.value=response.data.list
    }).catch(function (error){
    console.log(error);
    })
}
</script>
<style scoped>
.box{
    margin-top: 100px;
    text-align: center;
}
table{
    border-collapse:collapse;
    border-radius: 5px;
}
th{
    background-color:#115d7d;
    color:#ffffff;
    width:30vw;
    height:75px;
    text-align:center;
}
td{
    background-color:#ffffff;
    width:30vw;
    height:50px;
    text-align:center;
}
</style>