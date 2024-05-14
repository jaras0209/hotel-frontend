<template>
    <ProductPhotoupload :productid="productid" @upload="picture" @submit-form="picture1"></ProductPhotoupload>
    <br><br><br><br><br><br>
    <h1 v-if="find !== null">可刪除的圖片</h1>
    <ProductPhotodelete v-for="find in find" :find="find" @decesion="decesion"></ProductPhotodelete>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter();
import ProductPhotoupload from '@/components/shopping/ProductPhotoupload.vue';
import ProductPhotodelete from '@/components/shopping/ProductPhotodelete.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from "vue";
import xxx from "@/plugins/axios.js"
import Swal from "sweetalert2"
const route = useRoute();
const productid = route.params.productid;
const photoFile = ref(null);
const productidpath = ref(productid)
const find = ref({});
//選擇檔案
function picture(event) {
    console.log(productid)
    console.log(event);
    photoFile.value = event.target.files[0];
    console.log(photoFile.value)
}
//上傳檔案觸發
function picture1() {
    const formData = new FormData();
    formData.append('productid', productid);
    formData.append('photoFile', photoFile.value);
    console.log("hahaah");
    xxx.post('/hotel/photos/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (response) {
        console.log(response);
        Swal.fire({
            text: '成功',
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(function () {
            router.go(0)
        })

    }).catch(function (error) {
        console.log(error);
    });
}
//顯示出已有照片
onMounted(function () {
    xxx.get(`/hotel/photosALL/${productidpath.value}`).then(function (response) {
        console.log("count", response);//個數
        find.value = response.data.list;//塞資料
        console.log(find.value);//個數
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
})
//刪除圖片功能
function decesion(id) {
    Swal.fire({
        text: "確定刪除？",
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: '確認',
        showCancelButton: true,
        cancelButtonText: '取消',
    }).then(function (result) {
        if (result.isConfirmed) {
            Swal.fire({
                text: "Loading......",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            xxx.delete(`/hotel/photos/${id}`).then(function (response) {
                if (response.data.success) {
                    Swal.fire({
                        text: response.data.message,
                        icon: 'success',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    }).then(function () {
                        console.log("delete success");
                        router.go(0)
                    });
                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: 'warning',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
                }
            }).catch(function (error) {
                console.log("callRemove error", error);
                Swal.fire({
                    text: '失敗：' + error.message,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });
            });
        }
    });
}
</script>

<style></style>