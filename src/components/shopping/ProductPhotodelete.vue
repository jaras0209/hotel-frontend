<template>
    <div>
        <div>
            <span>已新增的照片清單id{{ find.id }}</span>
            <button type="button" @click="doclick(find.id)">刪除照片</button>
        </div>
        <div style="text-align: center;">
            <img :src="`${PATHP}/hotel/photo/${find.id}`" class="card-img-top" alt="未新增"
                style="width: 30%;">
        </div>
    </div>
</template>
<script setup>
const PATHP = import.meta.env.VITE_BACKEND_URL;
const props = defineProps(["find"]);
const emits = defineEmits(["decesion"]);
function doclick(id) {
    emits("decesion", id)
}
</script>
<style></style>