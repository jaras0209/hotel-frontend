<template>
    <div class="row">
      <div class="col-sm-12">
        <br />
        <h1>房間列表</h1>
        <hr />
        <div class="row">
          <div class="col-sm-4 col-room" v-for="(room, id) in rooms" :key="id">
            <RoomItem :roomData="room" :id="id" :hotelDiscount="hotelDiscount" :hotelFee="hotelFee" @deleteRoom="onDeleteRoom(id)" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import RoomItem from '@/components/room/RoomItem.vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    rooms: Array,
    hotelDiscount: Number,
    hotelFee: Number
  });
  
  const emit = defineEmits(['deleteRoom']);
  
  const onDeleteRoom = (id) => {
    emit('deleteRoom', id);
  };
  </script>
  
  <style scoped>
  /* 样式代码保持不变 */
  </style>
  