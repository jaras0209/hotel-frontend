<template>
    <tr>
        <td>{{ orderid }}</td>
        <td>{{ AddedTime }}</td>
        <td>{{ Orderstatus }}</td>
        <td>{{ total }}</td>
    </tr>
</template>

<script setup>
const props = defineProps(["total", "AddedTime", "Orderstatus", "orderid"]);
</script>

<style></style>