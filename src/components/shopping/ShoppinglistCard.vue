<template>
    <div class="card"
        style="background: linear-gradient(to right, #3EF55C, #12F390, #12F3A8); color: black;width: 18em; margin: 15px;">
        <img :src="`http://localhost:8080/hotel/photos/${item.id}`" class="card-img-top" alt="...">
        <div class="card-body">
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
