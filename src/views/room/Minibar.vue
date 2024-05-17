<template>
    <div class="row">
        <div class="col-4">
            <button type="button" class="btn btn-primary" @click="openModal('insert')">新增商品</button>
        </div>

        <div class="col-4">
            <input type="text" v-model="findName" placeholder="請輸入產品名稱" @input="callFind(0)">
        </div>

        <div class="col-4">
            <MinibarRows :total="total" :choices="[2, 5, 8, 12]"
                        v-model="rows" @change="callFind"></MinibarRows>
        </div>

        <div class="col-4" v-show="total!=0">
            <Paginate :first-last-button="true" first-button-text="&lt;&lt;"
                    last-button-text="&gt;&gt;" prev-text="&lt;" next-text="&gt;"
                    :page-count="pages" :initial-page="current" v-model="current"
                    :click-handler="callFind">
            </Paginate>
        </div>
    </div>
    <div class="row">
        <MinibarCard v-for="product in products" :key="product.id" :item="product"
        @open-update="openModal" @delete="callRemove"></MinibarCard>
    </div>

    <MinibarModal 
        ref="minibarModalRef":is-show-button-insert="isShowButtonInsert"
            v-model:id="product.id"
            v-model:name="product.name"
            v-model:price="product.price"
            v-model:make="product.make"
            v-model:expire="product.expire"
            @insert="callCreate" @update="callModify">
    </MinibarModal>
</template>
    
<script setup>
    import Swal from "sweetalert2"
    import axiosapi from "@/plugins/axios.js";
    import Paginate from "vuejs-paginate-next";
    import MinibarCard from "@/components/room/MinibarCard.vue";
    import MinibarModal from "@/components/room/MinibarModal.vue";
    import MinibarRows from "@/components/room/MinibarRows.vue";
    import {ref, onMounted} from "vue";
    // import { useRoute } from "vue-router";

    const total = ref(0);
    const current = ref(1);
    const pages = ref(10);
    const start = ref(0);
    const rows = ref(8);
    const lastPageRows = ref(0);

    const products = ref(null);
    const minibarModalRef = ref(null);
    const isShowButtonInsert = ref(true);
    const product = ref({ });
    const findName = ref("");
    const router = useRouter();

    onMounted(function(){
        callFind();
    });

    //宣告網頁
    function openModal(action, data){
        if(action === "insert"){
            isShowButtonInsert.value = true;
            product.value = {}
        }else{
            isShowButtonInsert.value = false;
            callFindById(data);
        }
        minibarModalRef.value.showModal();
    }

    function callFind(page){
        //等待訊息
        Swal.fire({
            text: "Loading......",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        //計算page
        if(page){
            start.value = (page - 1) * rows.value;
            current.value = page;
        }else{
            start.value = 0;
            current.value = 1;
        };
        //檢查使用者輸入資料
        if(findName.value === ""){
            findName.value = null;
        };
        let request = {
            "start": start.value,
            "rows": rows.value,
            "dir": false,
            "order": "id",
            "name": findName.value
        };
        //呼叫Service端
        axiosapi.post("/hotel/minibar/item/", data).then(function(response){
            products.value = response.data.list;
            total.value = response.data.count;
            pages.value = Math.ceil(response.data.count / rows.value);
            lastPageRows.value = total.value % rows.value;
            
            setTimeout(function(){
                Swal.close();
            },500);
        }).catch(function(error){
            Swal.fire({
                text: '查詢失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            })//檢查登入
            // .then(function() {
            //     if(error && error.response.status && error.response.status==403) {
            //         router.push("/secure/login");
            //     }
            // });
        });
    }

    function callCreate(){
        //等待訊息
        Swal.fire({
            text: "Loading......",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        //檢查資料
        if(product.value.id==="") {
            product.value.id = null;
        }
        if(product.value.name==="") {
            product.value.name = null;
        }
        if(product.value.price==="") {
            product.value.price = null;
        }
        if(product.value.make==="") {
            product.value.make = null;
        }
        if(product.value.expire==="") {
            product.value.expire = null;
        }
        let data = product.value;
        //呼叫Service端
        axiosapi.post("/hotel/minibar", data),than(function(response){
            //
        if(response.data.success){
            Swal.fire({
                    text: response.data.message,
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                }).then(function() {
                    minibarModalRef.value.hideModal();
                    callFind(current.value);
                });
        }else{
            Swal.fire({
                    text: response.data.message,
                    icon: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });
        }
        }).catch(function(error){
            Swal.fire({
                text: '失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        });
    }

    function callRemove(id) {
        Swal.fire({
            text: "確定刪除？",
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認',
            showCancelButton: true,
            cancelButtonText: '取消',
        }).then(function(result){
            if(result.isConfirmed){
                Swal.fire({
                    text: "Loading......",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                axiosapi.delete(`/hotel/minibar/${id}`).then(function (response) {
                    if(response.data.success){
                        Swal.fire({
                            text: response.data.message,
                            icon: 'success',
                            allowOutsideClick: false,
                            confirmButtonText: '確認',
                        }).then(function(){
                            if(lastTageRows.value===1 && current.value>1){
                                current.value = current.value - 1;
                            }callFind(current.value);
                        });
                    }else{
                        Swal.fire({
                            text: response.data.message,
                            icon: 'warning',
                            allowOutsideClick: false,
                            confirmButtonText: '確認',
                        });
                    }          
        }).catch(function(error){
            Swal.fire({
                        text: '失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
                });
            }
        });
    }

    function callFindById(id){
        Swal.fire({
            text: "Loading......",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        axiosapi.get(`/hotel/minibar/${id}`).then(function(response){
            if(response.data.list.length!=0){
                product.value = response.data.list[0];
            }setTimeout(function() {
            Swal.close();
            }, 500);
        }).catch(function(error){
            Swal.fire({
                text: '失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        });
    }

    function callModify(){
        Swal.fire({
            text: "Loading......",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        if(product.value.id==="") {
            product.value.id = null;
        }
        if(product.value.name==="") {
            product.value.name = null;
        }
        if(product.value.price==="") {
            product.value.price = null;
        }
        if(product.value.make==="") {
            product.value.make = null;
        }
        if(product.value.expire==="") {
            product.value.expire = null;
        }
        let data = product.value;

        axiosapi.put(`hotel/minibar/${minibar.value.id}`, data).than(function(response){
            if(response.data.success){
                Swal.fire({
                    text: response.data.message,
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                }).then(function() {
                    minibarModalRef.value.hideModal();
                    callFind(current.value);
                });
            }else{
                Swal.fire({
                    text: response.data.message,
                    icon: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });
            }
        }).catch(function(error){
            Swal.fire({
                text: '失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        });
    }

</script>
    
<style>
    
</style>