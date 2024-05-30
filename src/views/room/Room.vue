<template>
  <div>
    <h1>Room Page</h1>
    <p>Check-in Date: {{ checkInDate }}</p>
    <p>Price: {{ price }}</p>
    <p>Room ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const checkInDate = ref('');
const price = ref('');
const id = ref('');

onMounted(() => {
  const queryString = route.query;
  console.log("queryString", queryString);

  checkInDate.value = queryString.checkInDate || '';
  price.value = queryString.price || '';
  id.value = queryString.id || '';
});
</script>

<style scoped>
/* Your CSS here */
</style>
