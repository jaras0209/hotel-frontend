<template>
    <div id="app" class="container">
      <swiper :loop="true" :navigation="true" :modules="modules" :pagination="{ clickable: true }" :slides-per-view="1"
          :space-between="30" @slideChange="onSlideChange" class="mySwiper">
          <swiper-slide v-for="(room, index) in rooms" :key="index">
              <img :src="room.cover" alt="Room Image" />
          </swiper-slide>
      </swiper>
      
      <div class="row">

        <div class="col-sm-12">
          <br> 
          <h1>房間列表</h1>
          <hr>
          <div class="row">
            <div class="col-sm-4 col-room" v-for="(room, id) in rooms" :key="id">
              <RoomData :roomData="room" :id="id" :hotelDiscount="hotelDiscount" :hotelFee="serviceFee" :onDelete="deleteRoom"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  
  // import required modules
  import { Autoplay, Navigation, Pagination } from "swiper/modules";
  import RoomData from '@/components/room/RoomData.vue';
  import { roomsData } from '@/assets/roomsdata.js';
  import { reactive, ref } from 'vue';
  
  const rooms = reactive([...roomsData]);
  const hotelDiscount = ref(0.9);
  const serviceFee = ref(200);
  
  
  const onSlideChange = (swiper) => {
    console.log("slide change", swiper.activeIndex);
  };
  
  const modules = [Autoplay, Navigation, Pagination];
  </script>
  
  <style scoped lang="scss">
  body {
    padding: 20px;
  }
  
  h1 {
    font-size: 30px;
  }
  
  .col-edit {
    height: 100vh;
    overflow-y: scroll;
  }
  
  .room_edit {
    margin-top: 30px;
  }
  
  .cursor_pointer {
    cursor: pointer;
  }
  
  .swiper-container {
    max-width: 600px !important; /* 設定 container 的最大寬度 */
    margin-left: auto !important;
    margin-right: auto !important;
    height: 200px !important;
    overflow: hidden !important;
  }
  
  .swiper-slide img {
    width: 100% !important; /* 圖片寬度填滿 container */
    height: auto !important; /* 保持圖片的原始高寬比 */
    object-fit: cover !important; /* 保持原始宽高比，并裁剪图片 */
    height: 100% !important; /* 确保图片高度填满容器 */
  }
  
  #app {
    height: 100%;
  }
  
  html, body {
    position: relative;
    height: 100%;
  }
  
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
  }
  
  .swiper {
    width: 100%;
    height: 30%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  