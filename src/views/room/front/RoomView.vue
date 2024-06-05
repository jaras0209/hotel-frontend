<template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <swiper
    :loop="true"
    :navigation="true"
    :modules="modules"
    :pagination="{ clickable: true }"
    :slides-per-view="1"
    :space-between="30"
    @slideChange="onSlideChange"
    class="mySwiper"
  >
    <swiper-slide v-for="(room, index) in allRoomsForSlider" :key="index">
      <img :src="room.cover" alt="Room Image" />
    </swiper-slide>
  </swiper>
  <br />
  <div id="app" class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="title">房間列表</h1>
        <hr />
        <div class="search-sorting-row">
          <div class="search">
            <label for="budgetPrice">預算價格</label>
            <input type="number" v-model="budgetPrice" id="budgetPrice" placeholder="請輸入預算價格" />
            <button @click="searchRooms">搜尋</button>
          </div>
          <div class="filter-buttons">
            <button :class="{ active: roomType === null }" @click="filterRoomsByType(null)">全部</button>
            <button :class="{ active: roomType === 1 }" @click="filterRoomsByType(1)">標準客房</button>
            <button :class="{ active: roomType === 2 }" @click="filterRoomsByType(2)">商務客房</button>
            <button :class="{ active: roomType === 3 }" @click="filterRoomsByType(3)">尊榮套房</button>
          </div>
        </div>
        <div class="row room-row">
          <div class="col-sm-4 col-room" v-for="(room, id) in filteredRoomsForList" :key="id">
            <RoomData :roomData="room" :id="id" :hotelDiscount="hotelDiscount" :hotelFee="serviceFee" :onDelete="deleteRoom" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FrontNavBar from '../../FrontNavBar.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import RoomData from '@/components/room/RoomData.vue';
import { roomsData } from '@/assets/roomsdata.js';
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const rooms = reactive([...roomsData]);
const hotelDiscount = ref(0.9);
const serviceFee = ref(200);

const budgetPrice = ref(null);  // 初始值為 null，使用者需輸入值才進行搜索
const roomType = ref(null);  // 初始設為 null 表示顯示所有類型
const filteredRoomsForList = ref([...rooms]);
const allRoomsForSlider = ref([...rooms]);  // 這裡始終包含所有房間

const searchRooms = () => {
  if (budgetPrice.value) {
    budgetPrice.value = Math.max(6000, Math.min(31000, budgetPrice.value));

    filteredRoomsForList.value = rooms.filter(room =>
      room.price >= budgetPrice.value - 2500 && room.price <= budgetPrice.value + 2500
    );
  }
  filterRoomsByType(roomType.value);
};

const onSlideChange = (swiper) => {
  console.log('slide change', swiper.activeIndex);
};

const filterRoomsByType = (type) => {
  roomType.value = type;

  if (type !== null) {
    filteredRoomsForList.value = rooms.filter(room => room.type === type && (!budgetPrice.value || (room.price >= budgetPrice.value - 2500 && room.price <= budgetPrice.value + 2500)));
  } else {
    filteredRoomsForList.value = rooms.filter(room => (!budgetPrice.value || (room.price >= budgetPrice.value - 2500 && room.price <= budgetPrice.value + 2500)));
  }
};

onMounted(() => {
  const type = route.query.type;
  if (type) {
    filterRoomsByType(Number(type));
  }
});

const modules = [Autoplay, Navigation, Pagination];
</script>

<style scoped lang="scss">
body {
  padding: 20px;
  background: #f5f5f5;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333;
  margin: 0;
}

h1 {
  font-size: 30px;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 15px;
}

.row {
  margin: 0 -15px;
}

.col-sm-12,
.col-sm-4 {
  padding: 0 15px;
}

.swiper-container {
  max-width: 600px !important;
  margin: 20px auto !important;
  height: 200px !important;
  overflow: hidden !important;
}

.swiper-slide img {
  width: 100% !important;
  height: auto !important;
  object-fit: cover !important;
  height: 100% !important;
}

#app {
  height: 100%;
  padding-bottom: 20px;
}

html,
body {
  position: relative;
  height: 100%;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dateCheck {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dateCheck-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.dateCheck-calendar {
  margin-bottom: 10px;
}

.dateCheck-reset {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

.col-room {
  margin-bottom: 30px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
}

hr {
  border-top: 1px solid #ccc;
}

.search-sorting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search {
  display: flex;
  gap: 10px;
}

.sorting-buttons {
  display: flex;
  gap: 10px;
}

.sorting-buttons button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #eee;
  color: #333;
}

.sorting-buttons button.active {
  background-color: #333;
  color: #fff;
}

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #eee;
  color: #333;
}

.filter-buttons button.active {
  background-color: #333;
  color: #fff;
}

.title {
  text-align: center;
}
</style>
