<template>
    <backendNavbar></backendNavbar>
    <br><br><br><br>
        <h1 style="text-align: center;">編號{{ id }}訂單內容</h1>
        <table class="table-danger">
        <tr>
                <th style="font-size: 24px;">商品名稱</th>
                <th style="font-size: 24px;">商品數量</th>
        </tr>
        <tr v-for="orderDetail in orderDetailData">
                <td style="font-size: 18px;">{{ orderDetail.ProductName }}</td>
                <td style="font-size: 18px;">{{ orderDetail.Quantity }}</td>
        </tr>
        </table>
</template>
<script setup>
import backendNavbar from '../backendNavbar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
import axiosapi from "@/plugins/axios.js"
import { ref, onMounted } from "vue";
const newresult = ref(null)
const orderDetailData = ref(null);
function myclick(id) {
    axiosapi.get(`/hotel/orderdetails/mes/${id}`).then(function (response) {
        console.log(response)
        orderDetailData.value=response.data.ist
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
onMounted(function (){
    myclick(id)
})
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
        width:75vw;
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