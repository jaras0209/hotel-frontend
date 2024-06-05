<template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <div class="box">
    <div class="main-container">
      <RoomCalendar v-for="(room, index) in roomsData" :key="index" :room="room" />
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import FrontNavBar from '@/views/FrontNavBar.vue';
import RoomCalendar from '@/components/room/RoomCalendar.vue';
import Footer from '@/components/room/Footer.vue';
import { roomsData } from '@/assets/roomsdata.js';
</script>

<style scoped>
.main-container {
  padding: 2rem;
  background-color: #dbdbe5bb;
}
.box {
  text-align: center;
}
</style>