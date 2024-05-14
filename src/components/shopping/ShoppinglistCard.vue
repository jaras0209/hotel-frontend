<template>
    <div class="card " style="width: 15rem;" :style="{ backgroundColor: '#c3f9fc', margin: '10px' }">
        <img :src="`http://localhost:8080/hotel/photos/${item.id}`" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">商品介紹</h5>
            <p class="card-text">{{ item.productDescription }}</p>
        </div>
        <ul class="list-group list-group-flush">
            <RouterLink :to="{ name: 'shopping-link', params: { id: item.id } }" class="list-group-item">{{
                item.productName }}</RouterLink>
            <RouterLink :to="{ name: 'shopping-link', params: { id: item.id } }" class="list-group-item">{{
                item.productPrice }}</RouterLink>
        </ul>
    </div>
</template>
<script setup>
const props = defineProps(["item"]);
</script>
<style></style>
