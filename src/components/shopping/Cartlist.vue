<template>
    <tr>
        <th scope="row"><input type="checkbox" :checked="checked" @change="emits('cliick2', productid)"></th>
        <td>{{ name }}</td>
        <td> <select size="1" :value=quantity @change="emits('cliick', $event.target.value, productid)">
                <option v-for="item in options" :key="item" :value="item">
                    {{ item }}
                </option>
            </select></td>
        <td>{{ productprice }}</td>
        <td>{{ quantity * productprice }}</td>
        <td v-if="stock >= quantity" style="color: green;">足夠</td>
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
//這個方法成立是不能按
function abc() {
    console.log("abc 方法被執行了");
    const result = true;
    emits("method-result", result); // 發射自定義事件，將方法返回的值傳遞給父元件
}
//這個方法成立才能下單
function def() {
    console.log("def 方法被執行了");
    const result = false;
    emits("method-resultt", result); // 發射自定義事件，將方法返回的值傳遞給父元件
}
</script>
<style></style>