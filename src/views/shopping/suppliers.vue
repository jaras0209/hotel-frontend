<template>
    <h1>supplier</h1>
    <button type="button" @click="callFind">click</button>
    <div class="row">
        <SupplierCard v-for="oneofsuppliers in suppliers" :key="oneofsuppliers.id" :itemone="oneofsuppliers"
            @open-update="openModal" @delete="callRemove">
        </SupplierCard>
    </div>
    <br>
    <div class="col-4"><!-- 新增廠商 -->
        <button type="button" class="btn btn-primary" @click="openModal('insert')">
            新增廠商
        </button>
    </div>
    <SupplierModal ref="SupplierModalRef" :is-show-button-insert="isShowButtonInsert" v-model:cname="supplier.cname"
        v-model:name="supplier.name" v-model:phone="supplier.phone" v-model:address="supplier.address"
        v-model:email="supplier.email" @insert="callCreate">
    </SupplierModal><!-- 背 -->
</template>

<script setup>
import { useRouter } from "vue-router"//路由
const router = useRouter();//路由
import SupplierCard from "@/components/shopping/SupplierCard.vue";
import Swal from "sweetalert2"
import xxx from "@/plugins/axios.js"
import { ref, onMounted } from "vue";//onMounted就執行某某
import SupplierModal from "@/components/shopping/SupplierModal.vue";
const SupplierModalRef = ref(null)//==背
const suppliers = ref({});        //一開始當然空的
const supplier = ref({});
const isShowButtonInsert = ref(true);
onMounted(function () {
    callFind()
})
function callFind() {
    console.log("callFind");
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    xxx.post("/hotel/suppliers/findall").then(function (response) {
        console.log("response", response); //執行結果藏在這裡
        console.log("response", response.data.list);//抓到要的資料
        suppliers.value = response.data.list;//塞資料
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
function openModal(action, id) {
    supplier.value = {};//清空
    if (action === 'insert') {
        isShowButtonInsert.value = true;
    } else {
        isShowButtonInsert.value = false;
        callFindById(id);
    }
    SupplierModalRef.value.showModal();
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
            xxx.delete(`/hotel/suppliers/${id}`).then(function (response) {
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
function callFindById(id) {
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    xxx.get(`/hotel/suppliers/${id}`).then(function (response) {
        console.log("response", response.data.list[0]);
        if (response.data.list[0] != 0) {
            supplier.value = response.data.list[0];
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
    console.log("callCreate");
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    let data = supplier.value
    console.log(data);
    xxx.post("/hotel/suppliers", data).then(function (response) {
        console.log(data);
        if (response.data.success) {
            Swal.fire({
                text: response.data.message,
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            }).then(function () {
                console.log("create success");
                SupplierModalRef.value.hideModal();
                router.go(0);
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
</script>

<style></style>