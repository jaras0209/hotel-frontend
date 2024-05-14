<template>
    <ShoppingCard v-for="product in find" :key="product.id" :product="product" :pic="pic" :pict="pict" :pictu="pictu"
        @cart="cart" :options="options" v-model="data">
    </ShoppingCard>
    <!-- <div>
        ：{{ data }}確實綁到
    </div> -->
</template>
<script setup>
const options = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const data = ref(1)
import { useRouter } from "vue-router"//路由
const router = useRouter();//路由
import ShoppingCard from '@/components/shopping/ShoppingCard.vue';
import { useRoute } from 'vue-router';
import Swal from "sweetalert2"
const route = useRoute();
import { ref, onMounted } from "vue";
const id = route.params.id;
import xxx from "@/plugins/axios.js"
const find = ref({});
const pic = ref(1)
const pict = ref(1)
const pictu = ref(1)
onMounted(function () {
    callFindid(id)
    callFindProduct(id)
})
function callFindid(id) {
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    xxx.get(`/hotel/products/${id}`).then(function (response) {
        if (response.data.list[0] != 0) {
            find.value = response.data.list;
            console.log(find.value)
        }
        setTimeout(function () {
            Swal.close();
        }, 500);
    }).catch(function (error) {
        console.log("callFindById error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
function callFindProduct(id) {
    xxx.get(`/hotel/photosALL/${id}`).then(function (response) {
        console.log("count", response.data.list.length);//個數
        console.log("list", response.data.list);//項目
        if (response.data.list[0]) {
            pic.value = response.data.list[0].id;
        }
        if (response.data.list[1]) {
            pict.value = response.data.list[1].id;
        }
        if (response.data.list[2]) {
            pictu.value = response.data.list[2].id;
        }
        console.log(pic.value)
        console.log(pict.value)
        console.log(pictu.value)
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
function cart(id) {
    console.log("產品id", id)
    console.log("數量", data.value)
    console.log("會員id暫無")
    //目前欠缺一個，之後要補足會員ID，透過token?////////////////////////////////////////////////////////////////////////////
    let send = {
        "memberId": 1,//目前寫死
        "productId": id,
        "quality": data.value,
    }
    xxx.post(`/hotel/carts/post`, send).then(function (response) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "新增成功",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000
        });
        console.log(response);
        // router.push({ path: '/shopping/shoppinglist' })
        setTimeout(function () {
            Swal.close();
            router.push({ path: '/shopping/shoppinglist' });
        }, 2000);
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