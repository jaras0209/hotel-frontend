<template>
    <div class="col-lg-3 col-md-6">
        <div class="card">
            <img class="card-img-top">
            <div class="card-body">
                <img :src="`http://localhost:8080/hotel/photos/${product.id}`" class="card-img-top" alt="..."
                    style="width: 250px; height: 250px;">
                <h5 class="card-title">{{ product.productName }}</h5>
                <div class="card-text text-danger text-end">NT$ {{ product.productPrice }}</div>
                <div class="row">
                    <ul class="list-group list-group-flush">
                        <!-- <li class="list-group-item">{{ product.productDescription }}</li> -->
                        <li class="list-group-item  text-warning">庫存:{{ product.productStock }}</li>
                    </ul>
                    <div class="col text-start">
                        <a href="#" class="btn btn-primary" @click="doclick1(product.id)">修改資訊</a>
                    </div>
                    <div class="col text-end">
                        <a href="#" class="btn btn-primary" @click="doclick2(product.id)">刪除</a>
                    </div>
                    <RouterLink class=" card-link" :to="{
                        name: 'productphoto-link'
                        , params: { productid: product.id }
                    }">修改圖片
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["product"]);
const emits = defineEmits(["openUpdate", "delete"]);
function doclick1(id) {
    emits("openUpdate", "update", id);
}
function doclick2(id) {
    emits("delete", id);
}
</script>
<style></style>
