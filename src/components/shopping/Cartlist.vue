<template>
    <tr>
        <th scope="row"><input type="checkbox" :checked="checked" @change="emits('cliick2', productid)" style="font-size: 18px;"></th>
        <td style="font-size: 18px;">{{ name }}</td>
        <td> <select size="1" :value=quantity @change="emits('cliick', $event.target.value, productid)" style="font-size: 18px;">
                <option v-for="item in options" :key="item" :value="item" style="font-size: 18px;">
                    {{ item }}
                </option>
            </select></td>
        <td style="font-size: 18px;">{{ productprice }}</td>
        <td style="font-size: 18px;">{{ quantity * productprice }}</td>
        <td v-if="stock >= quantity" style="color: green; font-size: 18px;" >足夠</td>
        <td v-if="stock < quantity" style="color: red;">剩餘{{ stock }}</td>
        <td><font-awesome-icon :icon="['fas', 'trash']" @click="cliick3(productid)" size="2x"
                style="cursor: pointer; color: red;" />
        </td>
    </tr>
    <td v-if="stock < quantity && checked === true">{{ abc() }}</td>
    <td v-if="stock >= quantity && checked === true">{{ def() }}</td>
</template>
<script setup>
const props = defineProps(["name", "quantity", "productprice", "options", "productid", "memberid", "checked", "stock"]);
const emits = defineEmits(["cliick", "cliick2", "move", "method-result", "method-resultt"]);
function cliick3(productid) {
    emits("move", productid)
}
function abc() {
    const result = true;
    emits("method-result", result);
}
function def() {
    const result = false;
    emits("method-resultt", result);
}
</script>
<style></style>