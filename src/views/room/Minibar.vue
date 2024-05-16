<template>
        <h1>Minibar</h1>
</template>
    
<script setup>
    // import Swal from "sweetalert2"
    // import axiosapi from "@/plugins/axios.js";
    // import Paginate from "vuejs-paginate-next";
    // import MinibarCard from "@/components/MinibarCard.vue";
    // import MinibarModal from "@/components/MinibarModal.vue";
    // import MinibarRows from "@/components/MinibarRows.vue";
    // import {ref, onMounted} from "vue";
    // import { useRoute } from "vue-router";

    // const total = ref(0);
    // const current = ref(1);
    // const pages = ref(10);
    // const start = ref(0);
    // const rows = ref(8);
    // const lastPageRows = ref(0);

    // const products = ref(null);
    // const MinibarModalRef = ref(null);
    // const isShowButtonInsert = ref(true);
    // const product = ref({ });
    // const findName = ref("");
    // const router = useRouter();

    // onMounted(function(){
    //     callFind();
    // });

    // //宣告網頁
    // function openModal(action, data){
    //     if(action === "insert"){
    //         isShowButtonInsert.value = true;
    //         product.value = {}
    //     }else{
    //         isShowButtonInsert.value = false;
    //         callFindById(data);
    //     }
    //     MinibarModalRef.value.showModal();
    // }

    // function callFind(page){
    //     //等待訊息
    //     Swal.fire({
    //         text: "Loading......",
    //         showConfirmButton: false,
    //         allowOutsideClick: false,
    //     });
    //     //計算page
    //     if(page){
    //         start.value = (page - 1) * rows.value;
    //         current.value = page;
    //     }else{
    //         start.value = 0;
    //         current.value = 1;
    //     };
    //     //檢查使用者輸入資料
    //     if(findName.value === ""){
    //         findName.value = null;
    //     };
    //     let request = {
    //         "start": start.value,
    //         "rows": rows.value,
    //         "dir": false,
    //         "order": "id",
    //         "name": findName.value
    //     };
    //     //呼叫Service端
    //     axiosapi.post("/ajax/pages/products/find", data).then(function(response){
    //         products.value = response.data.list;
    //         total.value = response.data.count;
    //         pages.value = Math.ceil(response.data.count / rows.value);
    //         lastPageRows.value = total.value % rows.value;
            
    //         setTimeout(function(){
    //             Swal.close();
    //         },100);
    //     }).catch(function(error){
    //         Swal.fire({
    //             text: '查詢失敗：'+error.message,
    //             icon: 'error',
    //             allowOutsideClick: false,
    //             confirmButtonText: '確認',
    //         }).then(function() {
    //             if(error && error.response.status && error.response.status==403) {
    //                 router.push("/secure/login");
    //             }
    //         });
    //     });
    // }

    // function callCreate(){
    //     //等待訊息
    //     Swal.fire({
    //         text: "Loading......",
    //         showConfirmButton: false,
    //         allowOutsideClick: false,
    //     });
    //     //檢查資料
    //     if(product.value.id==="") {
    //         product.value.id = null;
    //     }
    //     if(product.value.name==="") {
    //         product.value.name = null;
    //     }
    //     if(product.value.price==="") {
    //         product.value.price = null;
    //     }
    //     if(product.value.make==="") {
    //         product.value.make = null;
    //     }
    //     if(product.value.expire==="") {
    //         product.value.expire = null;
    //     }
    //     let data = product.value;
    //     //呼叫Service端
    //     axiosapi.post("ajax/pages/products", data),than(function(response){
    //         //
    //     }).catch(function(error){
    //         Swal.fire({
    //             text: '失敗：'+error.message,
    //             icon: 'error',
    //             allowOutsideClick: false,
    //             confirmButtonText: '確認',
    //         });
    //     });

    // }


</script>
    
<style>
    
</style>