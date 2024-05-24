<template>
    <div id="app" class="container">
      <swiper :loop="true" :navigation="true" :modules="modules" :pagination="{ clickable: true }" :slides-per-view="1"
          :space-between="30" @slideChange="onSlideChange" class="mySwiper">
          <swiper-slide v-for="(room, index) in rooms" :key="index">
              <img :src="room.cover" alt="Room Image" />
          </swiper-slide>
      </swiper>
      
      <div class="row">
        <div class="col-sm-3 col-edit">
          <br>
          <h1>飯店資料</h1>
          <hr>
          <label for="discount">折扣數</label>
          <input id="discount" class="form-control" v-model="hotelDiscount">
          <label for="service-fee">額外服務費</label>
          <input id="service-fee" class="form-control" v-model="serviceFee">
          <br>
          
          <h1>房間編輯</h1>
          <hr>
          <select class="form-control" v-model="edit_id">
            <option v-for="(room, id) in rooms" :value="id" :key="id">{{ room.name }}</option>
          </select>
          <button class="btn btn-secondary room_edit" @click="addRoom">新增房間</button>
          <div v-if="editRoom" class="room_edit">
            <h4>{{ editRoom.name }}</h4>
              <label>房間名稱</label>
              <input class="form-control" v-model="editRoom.name">
              <label>價格</label>
              <input class="form-control" v-model="editRoom.price">
              <label>折價</label>
              <input class="form-control" v-model="editRoom.discount">
              <label>英文名稱</label>
              <input class="form-control" v-model="editRoom.eng">
              <label>圖片網址</label>
              <input class="form-control" v-model="editRoom.cover">
              <label>早餐</label>
              <input type="checkbox" v-model="editRoom.equipment.breakfast">
              <label>浴缸</label>
              <input type="checkbox" v-model="editRoom.equipment.bathtub">
              <label>wifi</label>
              <input type="checkbox" v-model="editRoom.equipment.wifi">
            <i class="fa fa-trash cursor_pointer" @click="deleteRoom(edit_id)"></i>
            </div>
        </div>
        <div class="col-sm-9">
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
  import { reactive, ref, computed } from 'vue';
  
  const rooms = reactive([...roomsData]);
  const hotelDiscount = ref(0.9);
  const serviceFee = ref(200);
  const edit_id = ref(0);
  
  const addRoom = () => {
    rooms.push({
      name: "新房間",
      eng: "new Room",
      price: 0,
      amount: 0,
      cover: "",
      discount: 0,
      equipment: {
        wifi: true,
        bathtub: true,
        breakfast: true
      }
    });
    edit_id.value = rooms.length - 1;
  };
  
  const deleteRoom = (id) => {
    rooms.splice(id, 1);
    if (edit_id.value >= rooms.length) {
      edit_id.value = rooms.length - 1;
    }
  };
  
  const editRoom = computed(() => rooms[edit_id.value]);
  
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
  