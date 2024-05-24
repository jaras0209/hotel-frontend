<template>
    <NavigationBar></NavigationBar>
    <h1>商城首頁</h1>
    <div class="row">
        <div class="col-4">
            <ProductRows :total="total" :choices="[5, 10]" @change="callFind" v-model="rows"></ProductRows>
            <input type="text" v-model="findname" placeholder="請輸入產品名稱" @input="callFind(0)">
        </div>
        <div v-show="total != 0">
            <Paginate :first-last-button="true" first-button-text="&lt;&lt" last-button-text="&gt;&gt" prev-text="&lt"
                next-text="&gt" :page-count="pages" :initial-page="current" v-model="current" :click-handler="callFind">
            </Paginate>
        </div>
        <ShoppinglistCard v-for="one in all" :key="one.id" :item="one"></ShoppinglistCard>
    </div>
</template>

<script setup>
import NavigationBar from '../NavigationBar.vue';
import ShoppinglistCard from '@/components/shopping/ShoppinglistCard.vue';
import { ref, onMounted } from "vue";
import Swal from "sweetalert2"
import axiosapi from "@/plugins/axios.js"
import Paginate from 'vuejs-paginate-next';
import ProductRows from "@/components/shopping/ProductRows.vue";
const all = ref({});
const pages = ref(100);
const current = ref(50);
const start = ref(0);
const rows = ref(5);
const total = ref(0);
const findname = ref("")
onMounted(function () {
    callFind()
})
function callFind(page) {
    if (page) {   //第幾頁
        start.value = (page - 1) * rows.value; //塞數值
        current.value = page;
    } else {
        start.value = 0;
        current.value = 1;
    }
    if (findname.value === "") {
        findname.value = null
    }
    let data = {
        "start": start.value,
        "rows": rows.value,
        "productName": findname.value,
    }
    console.log(axiosapi.defaults.headers.authorization);
    axiosapi.post(`/hotel/products/find`, data).then(function (response) {
        console.log("count", response.data.count);
        console.log("response", response.data.list);
        all.value = response.data.list;
        //
        pages.value = Math.ceil(response.data.count / rows.value)
        //
        total.value = response.data.count
        setTimeout(function () {
            Swal.close();
        }, 500);
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

</script>

<style></style>