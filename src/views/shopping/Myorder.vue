<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">訂單編號</th>
                <th scope="col">訂單日期</th>
                <th scope="col">訂單狀態</th>
                <th scope="col">總價</th>
            </tr>
            <MyorderComponents v-for="result in result" :total="result.total" :AddedTime="result.AddedTime"
                :Orderstatus="result.Orderstatus" :orderid="result.orderid">
            </MyorderComponents>
        </thead>
    </table>
</template>

<script setup>
import MyorderComponents from '@/components/shopping/MyorderComponents.vue';
import { ref, onMounted } from "vue";
import xxx from "@/plugins/axios.js"
const result = ref({})
onMounted(function () {
    myorder()
})
//目前欠缺一個，之後要補足會員ID，透過token?///////////////////////////////////////////////////////////////////
function myorder() {
    xxx.get(`/hotel/orders/mes/${1}`).then(function (response) {
        console.log(response);
        result.value = response.data.list
        console.log(result.value)
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
</script>

<style></style>