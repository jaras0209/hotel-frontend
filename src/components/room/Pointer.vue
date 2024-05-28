<template>
    <div class="pointer">{{ selectedDate.format('YYYY-MM-DD') }}</div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    selectedDate: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .pointer {
    text-align: center;
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  </style>
  