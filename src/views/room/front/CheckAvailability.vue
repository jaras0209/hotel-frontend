<template>
  <FrontNavBar></FrontNavBar>
  <div class="main-container">
    <RoomCalendar v-for="roomId in roomIds" :key="roomId" :room-id="roomId" />
  </div>
  <Footer></Footer>
</template>

<script setup>
import FrontNavBar from '@/views/FrontNavBar.vue';
import RoomCalendar from '@/components/room/RoomCalendar.vue';
import Footer from '@/components/room/Footer.vue';


const roomIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<style scoped>
.main-container {
  padding: 2rem;
  background-color: #dbdbe5bb;
}
</style>
