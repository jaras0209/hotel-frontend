<template>
    <tr>
        <td>{{ orderid }}</td>
        <td>{{ AddedTime }}</td>
        <td>{{ Orderstatus }}</td>
        <td>{{ total }}</td>
    </tr>
    <div>
        <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + orderid"
                aria-expanded="false" :aria-controls="orderid" @click="myclick(orderid)">
                看明細
            </button>
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
                            <td>{{ newresult.price }}</td>
                            <td>{{ newresult.Quantity }}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["total", "AddedTime", "Orderstatus", "orderid"]);
import xxx from "@/plugins/axios.js"
import { ref } from "vue";
const newresult = ref(null)
function myclick(id) {
    xxx.get(`/hotel/orderdetails/mes/${id}`).then(function (response) {
        console.log(response.data.ist);
        newresult.value = response.data.ist
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
</script>
<style></style>
