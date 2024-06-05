<template>
    <backendNavbar></backendNavbar>
    <!-- 0529 -->
    <br><br><br><br>
    <h1>{{ $route.params.name }}</h1>
    <div class="col-4">
        <button type="button" class="btn btn-primary" @click="openModal('insert')">
            新增商品，後台
        </button>
    </div>
    <ProductModal ref="practice2" :is-show-button-insert="isShowButtonInsert" v-model:id="oneproduct.id"
        v-model:productSupplierId="oneproduct.productSupplierId" v-model:productName="oneproduct.productName"
        v-model:productPrice="oneproduct.productPrice" v-model:productStock="oneproduct.productStock"
        v-model:productDescription="oneproduct.productDescription"
        v-model:productArrivalDay="oneproduct.productArrivalDay" @insert="callCreate" @update="callModify">
    </ProductModal>
    <div class="row">
        <ProductCard v-for="oneofproductss in productss" :key="oneofproductss.id" :product="oneofproductss"
            @open-update="openModal" @delete="callRemove"></ProductCard>
    </div>
</template>
<script setup>
import backendNavbar from '../backendNavbar.vue';
import { useRoute } from 'vue-router';
import Swal from "sweetalert2"
import axiosapi from "@/plugins/axios.js"
import ProductCard from '@/components/shopping/ProductCard.vue';
import { ref, onMounted } from "vue";
import ProductModal from '@/components/shopping/ProductModal.vue';
const route = useRoute();
const demoValue = route.params.demo;
const productss = ref({});
const practice2 = ref(null)
const oneproduct = ref({})
const isShowButtonInsert = ref(true);
const oldprice = ref(null)
const newprice = ref(null)
onMounted(function () {
    callFind()
})
function openModal(action, id) {
    oneproduct.value = {}
    if (action === 'insert') {
        isShowButtonInsert.value = true;
    } else {
        isShowButtonInsert.value = false;
        callFindById(id);
    }
    practice2.value.showModal();
}
function callFind() {
    console.log(demoValue)
    console.log("callFind");
    console.log();
    axiosapi.get(`/hotel/products/owner/${demoValue}`).then(function (response) {
        console.log("count", response.data.count);
        console.log("response", response.data.list);
        productss.value = response.data.list;
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
function callFindById(id) {
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    axiosapi.get(`/hotel/products/${id}`).then(function (response) {
        console.log("response", response.data.list[0]);
        oldprice.value = response.data.list[0].productPrice;
        console.log(oldprice.value)
        if (response.data.list[0] != 0) {
            oneproduct.value = response.data.list[0];
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
function callCreate() {
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    let data = oneproduct.value;
    console.log(data);
    axiosapi.post("/hotel/products", data).then(function (response) {
        if (response.data.success) {
            Swal.fire({
                text: response.data.message,
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            }).then(function () {
                console.log("create success");
                practice2.value.hideModal();
                callFind();
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
        console.log("callCreate error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
function callRemove(id) {
    console.log("callRemove", id, new Date());
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
            axiosapi.delete(`/hotel/products/${id}`).then(function (response) {
                if (response.data.success) {
                    Swal.fire({
                        text: response.data.message,
                        icon: 'success',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    }).then(function () {
                        console.log("delete success");
                        callFind();
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
function callModify(id) {
    console.log(id)
    console.log("callModify");
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    let data = oneproduct.value;
    console.log(oneproduct.value.productPrice)
    //異動訊息
    if (oneproduct.value.productPrice !== oldprice.value) {
        let alert = {
            "productId": id,
            "newPrice":oneproduct.value.productPrice
        }
        axiosapi.post("/hotel/alerts/post", alert).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }
    //異動訊息
    axiosapi.put("/hotel/products/modify", data).then(function (response) {
        if (response.data.success) {
            Swal.fire({
                text: response.data.message,
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            }).then(function () {
                console.log("update success");
                practice2.value.hideModal();
                callFind();
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
        console.log("callModify error", error);
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