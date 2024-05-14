<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ quantity }}</td>
        <td>{{ productprice }}</td>
        <td>{{ quantity * productprice }}</td>
    </tr>
</template>
<script setup>
const props = defineProps(["name", "quantity", "productprice"]);
</script>
<style></style>