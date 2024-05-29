<template>
    <div class="room-item">
      <h2>{{ roomData.name }}</h2>
      <p>價格: {{ roomData.price }}</p>
      <p>折扣後價格: {{ discountedPrice }}</p>
      <p>服務費: {{ hotelFee }}</p>
      <button @click="deleteRoom(id)">刪除</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    roomData: Object,
    id: Number,
    hotelDiscount: Number,
    hotelFee: Number
  });
  
  const emit = defineEmits(['deleteRoom']);
  
  const discountedPrice = computed(() => props.roomData.price * props.hotelDiscount);
  
  const deleteRoom = (id) => {
    emit('deleteRoom', id);
  };
  </script>
  
  <style scoped>
  /* 样式代码保持不变 */
  </style>
  