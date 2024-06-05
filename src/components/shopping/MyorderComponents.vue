<template>
    <tr>
        <td>{{ orderid }}</td>
        <td>{{ AddedTime }}</td>
        <td>{{ Orderstatus }}</td>
        <td>{{ arriveddTime }}</td>
        <td>{{ total }}</td>
        <td>-{{ usebonus }}</td>
        <td>+{{ addbonus }}</td>
    </tr>
    <div>
        <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + orderid"
                aria-expanded="false" :aria-controls="orderid" @click="myclick(orderid)">
                看明細
            </button>
            <button class="btn btn-danger" type="button" v-if="Orderstatus==='訂單成立'" @click="dodelete(orderid)">取消</button>
        </p>
        <div class="collapse" :id="orderid">
            <div class="card card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">商品名稱</th>
                            <th scope="col">商品數量</th>
                            <th scope="col">商品總價</th>
                        </tr>
                        <tr v-for="newresult in newresult">
                            <td>{{ newresult.ProductName }}</td>
                            <td>{{ newresult.Quantity }}</td>
                            <td>{{ newresult.price }}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["total", "AddedTime", "Orderstatus", "orderid", "arriveddTime", "usebonus", "addbonus"]);
import axiosapi from "@/plugins/axios.js"
import { ref } from "vue";
import { useRouter } from "vue-router"
import Swal from "sweetalert2"
const router = useRouter();
const newresult = ref(null)
function myclick(id) {
    axiosapi.get(`/hotel/orderdetails/mes/${id}`).then(function (response) {
        newresult.value = response.data.ist
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
function dodelete(id) {
    Swal.fire({
        text: "確定取消嗎",
        icon: 'question',
        allowOutsideClick: false,
        confirmButtonText: '確認',
        showCancelButton: true,
        cancelButtonText: '取消',
    }).then(function (result) {
        if (result.isConfirmed) {
            axiosapi.delete(`/hotel/orders/one/${id}`).then(function (response) {
            router.go(0)
            console.log(response)
        }).catch(function (error) {
        console.log("callFindById error", error);
    });
        }
    })
    console.log(id)
 
}
</script>
<style></style>
