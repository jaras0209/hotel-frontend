<template>
    <div class="modal">
      <div class="modal-content">
        <h2>進階篩選</h2>
        <div>
          <label v-for="room in rooms" :key="room.id">
            <input type="checkbox" :value="room.name" v-model="tempSelectedRoomNames" />
            {{ room.name }}
          </label>
        </div>
        <button @click="applyFilter">套用</button>
        <button @click="clearAll">清除全部</button>
        <button @click="closeModal">關閉</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    rooms: Array
  });
  
  const emit = defineEmits(['applyFilter', 'clearAll', 'closeModal']);
  
  const tempSelectedRoomNames = ref([]);
  
  const applyFilter = () => {
    emit('applyFilter', tempSelectedRoomNames.value);
  };
  
  const clearAll = () => {
    tempSelectedRoomNames.value = [];
    emit('clearAll');
  };
  </script>
  
  <style scoped>
  /* 样式代码保持不变 */
  </style>
  