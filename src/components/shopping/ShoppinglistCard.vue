<template>
    <div class="card"
        style="background: linear-gradient(to right, #3EF55C, #12F390, #12F3A8); color: black;width: 18em; margin: 15px;">
        <img :src="`${PATHP}/hotel/photos/${item.id}`" class="card-img-top" alt="..."
            style="height: 15em;">
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
const PATHP = import.meta.env.VITE_BACKEND_URL;
const props = defineProps(["item"]);
</script>
<style></style>
