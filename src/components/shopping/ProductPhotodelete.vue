<template>
    <div>
        <span>已新增的照片清單id{{ find.id }}</span>
        <button type="button" @click="doclick(find.id)">刪除照片</button>
        <img :src="`http://localhost:8080/hotel/photo/${find.id}`" class="card-img-top" alt="..."
            style="width: 40px; height: 40px;">
    </div>
</template>
<script setup>
const props = defineProps(["find"]);
const emits = defineEmits(["decesion"]);
function doclick(id) {
    emits("decesion", id)
}
</script>
<style></style>