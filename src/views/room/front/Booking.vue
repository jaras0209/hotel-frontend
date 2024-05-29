<template>
  <FrontNavBar></FrontNavBar>
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
      <swiper-slide v-for="(room, index) in rooms" :key="index">
        <img :src="room.cover" alt="Room Image" />
      </swiper-slide>
    </swiper>   
    <br />

    <ViewDisplay :range="dateRange" @update:range="updateDateRange" />
    <div id="app" class="container">
    <div>
      <h1>房間搜尋</h1>
      <div>
        <label for="budgetPrice">預算價格</label>
        <input type="number" v-model="budgetPrice" id="budgetPrice" placeholder="請輸入預算價格">
        <button @click="searchRooms">搜尋</button>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <br />
        <h1>房間列表</h1>
        <hr />
        <div class="row">
          <div class="col-sm-4 col-room" v-for="(room, id) in filteredRoomsForList" :key="id">
            <RoomData
              :roomData="room"
              :id="id"
              :hotelDiscount="hotelDiscount"
              :hotelFee="serviceFee"
              :onDelete="deleteRoom"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
  <div>1212</div>
</template>
<script setup>
import FrontNavBar from '../../FrontNavBar.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ViewDisplay from '@/components/room/ViewDisplay.vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import RoomData from '@/components/room/RoomData.vue';
import { roomsData } from '@/assets/roomsdata.js';
import { reactive, ref, computed } from 'vue';
import Footer from '@/components/room/Footer.vue';

const rooms = reactive([...roomsData]);
const hotelDiscount = ref(0.9);
const serviceFee = ref(200);
const dateRange = ref([]);

const budgetPrice = ref(8500);
const filteredRoomsForList = ref([...rooms]);

const searchRooms = () => {
   // 限制 budgetPrice 在 6000 - 31000 之间
  budgetPrice.value = Math.max(6000, Math.min(31000, budgetPrice.value));

  filteredRoomsForList.value = rooms.filter(room => 
    room.price >= budgetPrice.value - 2500 && room.price <= budgetPrice.value + 2500
  );
};

const onSlideChange = (swiper) => {
  console.log('slide change', swiper.activeIndex);
};

const updateDateRange = (newRange) => {
  dateRange.value = newRange;
};

const deleteRoom = (id) => {
  rooms.splice(id, 1);
  searchRooms();  // Update filteredRoomsForList after deletion
};

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
}

hr {
  border-top: 1px solid #ccc;
}
Footer{
  position: fixed;
  bottom: 0;
}
</style>
