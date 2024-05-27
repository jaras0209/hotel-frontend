<template>
  <FrontNavBar></FrontNavBar>
  <div class="container" v-if="currentRoom">
    <ViewDisplay 
      :currentRoom="currentRoom"
      :range="range"
      @update:range="updateRange"
    />
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';

import FrontNavBar from '../../FrontNavBar.vue';
import ViewDisplay from "@/components/room/ViewDisplay.vue";
import Footer from '@/components/room/Footer.vue';

const currentRoom = ref("");
const range = ref({ start: "", end: "" });

const route = useRoute();

const updateRange = (newRange) => {
  range.value = newRange;
};

onMounted(() => {
  $.get(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${route.params.roomId}`, (res) => {
    currentRoom.value = res.room[0];
    range.value = { start: "", end: "" };
  });
});
</script>
