<template>
  <div>
    <h1>Room Page</h1>
    <p>Check-in Date: {{ checkInDate }}</p>
    <p>Price: {{ price }}</p>
    <p>Room ID: {{ id }}</p>
    <p>name :{{ typeName }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const checkInDate = ref('');
const price = ref('');
const id = ref('');
const typeName = ref('');

onMounted(() => {
  const queryString = route.query;
  console.log("queryString", queryString);

  checkInDate.value = queryString.checkInDate || '';
  price.value = queryString.price || '';
  id.value = queryString.id || '';
  typeName.value = queryString.typeName || '';
});
</script>

<style scoped>
/* Your CSS here */
</style>
