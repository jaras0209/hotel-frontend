<template>
    <span style="font-size: 18px;">
        <span v-if="total <= 0" style="font-size: 24px;">查無資料</span>
        <span v-else style="font-size: 24px;">共{{ total }}筆資料</span>
        ，每頁顯示
        <select :value="modelValue" @change="dochange" style="font-size: 18px;">
            <option v-for="row in choices" :key="row" :value="row" style="font-size: 18px;">{{ row }}</option>
        </select>
        筆</span>
</template>

<script setup>
const props = defineProps(["modelValue", "choices", "total"]);
const emits = defineEmits(["update:modelValue", "change"]);
function dochange(event) {
    emits('update:modelValue', event.target.value);
    emits("change");
}
</script>

<style></style>