<template>
  <div>
    <h1>房間搜尋</h1>
    <div>
      <label for="minPrice">預算價格</label>
      <input type="number" v-model="budgetPrice" id="budgetPrice" placeholder="請輸入預算價格">


      <button @click="searchRooms">搜尋</button>
    </div>

    <div v-if="filteredRooms.length">
      <h2>搜尋結果</h2>
      <div v-for="room in filteredRooms" :key="room.name" class="room">
        <img :src="room.cover" :alt="room.name" />
        <h3>{{ room.name }}</h3>
        <p>價格: {{ room.price }}</p>
        <p>折扣: {{ room.discount * 100 }}%</p>
        <p>設備: 
          <span v-if="room.equipment.wifi">WiFi</span>,
          <span v-if="room.equipment.bathtub">浴缸</span>,
          <span v-if="room.equipment.breakfast">早餐</span>
        </p>
      </div>
    </div>
    <div v-else>
      <p>沒有符合條件的房間</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { roomsData } from '@/assets/roomsdata.js';

const budgetPrice = ref(10000);
const filteredRooms = ref([]);

function searchRooms() {
  filteredRooms.value = roomsData.filter(room => 
    room.price >= budgetPrice.value-1500 && room.price <= budgetPrice.value+1500
  );
}
</script>

<style scoped>
.room {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
.room img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
