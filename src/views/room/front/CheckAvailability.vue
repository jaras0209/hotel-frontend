<template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <div class="box">
    <div class="button-wrapper">
      <button v-for="(room, index) in uniqueRooms" :key="room.name" class="button--secondary" @click="scrollToRoom(room.name)">
        <span class="text">{{ room.name }}</span>
      </button>
    </div>
    <div class="main-container">
      <div v-for="(room, index) in roomsData" :key="index" :ref="setRoomRef(room.name)">
        <RoomCalendar :room="room" />
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import FrontNavBar from '@/views/FrontNavBar.vue';
import RoomCalendar from '@/components/room/RoomCalendar.vue';
import Footer from '@/components/room/Footer.vue';
import { roomsData } from '@/assets/roomsdata.js';

const roomRefs = ref({});
const setRoomRef = (name) => (el) => {
  if (el) {
    roomRefs.value[name] = el;
  }
};

const uniqueRooms = computed(() => {
  const roomNames = roomsData.map(room => room.name);
  return roomsData.filter((room, index) => roomNames.indexOf(room.name) === index);
});

const scrollToRoom = (name) => {
  const roomElement = roomRefs.value[name];
  if (roomElement) {
    roomElement.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.main-container {
  padding: 2rem;
  background-color: #dbdbe5bb;
}
.box {
  text-align: center;
  background-color: #dbdbe5bb;
  padding: 20px;
}
.button-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.button-wrapper > button:nth-child(-n+5) {
  flex: 0 0 calc(20% - 10px); /* 5 buttons in the first row */
}
.button-wrapper > button:nth-child(n+6) {
  flex: 0 0 calc(25% - 10px); /* 4 buttons in the second row */
}
.button--secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #333;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.button--secondary .text {
  font-size: 16px;
}
.button--secondary:hover {
  background-color: #bbb;
  color: #000;
}
</style>