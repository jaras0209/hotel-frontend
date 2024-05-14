<template>
    <h1>上傳圖片</h1>
    <label>產品ID:</label>
    <input name="productid" type="text" :value="productid" disabled="disabled">
    <label>檔案:</label>
    <input name="photoFile" @change="emits('upload', $event)" type="file">
    <button type="button" @click="emits('submitForm')">送出</button>
</template>

<script setup>
const props = defineProps(["productid"]);
const emits = defineEmits(["upload", "submitForm"]);
</script>
<style></style>