<template>
    <FrontNavBar></FrontNavBar>
  <div id="app" class="container">
    <div>
      <h1>房間搜尋</h1>

      <!-- 開啟進階篩選 Modal 的按鈕 -->
      <button @click="showModal = true">進階篩選</button>

      <!-- 新的篩選條件：入住日期 -->
      <label for="checkInDate">入住日期</label>
      <input type="date" v-model="checkInDate" id="checkInDate" />

      <!-- 搜尋按鈕 -->
      <button @click="searchRooms">搜尋</button>

      <!-- 排序按鈕 -->
      <div class="sorting-buttons">
        <button :class="{ active: sortType === 'recommend' }" @click="sortRooms('recommend')">最佳推薦</button>
        <button :class="{ active: sortType === 'lowToHigh' }" @click="sortRooms('lowToHigh')">金額由低到高</button>
        <button :class="{ active: sortType === 'highToLow' }" @click="sortRooms('highToLow')">金額由高到低</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">

        <hr />
        <div v-for="room in filteredRooms" :key="room.name" class="room">
          <div class="row align-items-center">
            <div class="col-sm-4">
              <img :src="room.cover" :alt="room.name" />
            </div>
            <div class="col-sm-4">
              <h3>{{ room.name }}</h3>
              <p>設備: 
                <span v-if="room.equipment.wifi">WiFi</span>,
                <span v-if="room.equipment.bathtub">浴缸</span>,
                <span v-if="room.equipment.breakfast">早餐</span>
              </p>
            </div>
            <div class="col-sm-4 text-right">
              <p>價格: {{ room.price }}</p>
              <p>折扣: {{ room.discount * 100 }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 進階篩選 Modal -->
    <div v-if="showModal" class="modal">
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
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import FrontNavBar from '../../FrontNavBar.vue';
import axiosapi from '@/plugins/axios.js';
import { roomsData } from '@/assets/roomsdata.js';
import { reactive, ref } from 'vue';
import Footer from '@/components/room/Footer.vue';

// 狀態和資料定義
const rooms = reactive([...roomsData]);
const sortType = ref('recommend');
const filteredRooms = ref([...rooms]);
const selectedRoomNames = ref([]);
const showModal = ref(false);
const tempSelectedRoomNames = ref([]);
const checkInDate = ref('');

// 套用篩選條件
const applyFilter = () => {
  selectedRoomNames.value = [...tempSelectedRoomNames.value];
  showModal.value = false;
};

// 清除所有篩選條件
const clearAll = () => {
  tempSelectedRoomNames.value = [];
};

// 搜尋房間
const searchRooms = async () => {
  let availableRooms = [];
  if (checkInDate.value) {
    try {
      const response = await axiosapi.get('/hotel/backend/roomAssignment', {
        params: { date: checkInDate.value }
      });

      availableRooms = rooms.filter(room => {
        const roomInfo = response.data.find(data => data.roomInformation.id === room.id);
        return roomInfo && roomInfo.left > 0;
      });
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  } else {
    availableRooms = [...rooms];
  }

  if (selectedRoomNames.value.length > 0) {
    filteredRooms.value = availableRooms.filter(room =>
      selectedRoomNames.value.includes(room.name)
    );
  } else {
    filteredRooms.value = availableRooms;
  }

  sortRooms();
};

// 排序房間
const sortRooms = (type = sortType.value) => {
  sortType.value = type;

  if (type === 'lowToHigh') {
    filteredRooms.value.sort((a, b) => a.price - b.price);
  } else if (type === 'highToLow') {
    filteredRooms.value.sort((a, b) => b.price - a.price);
  } else {
    filteredRooms.value.sort((a, b) => rooms.indexOf(a) - rooms.indexOf(b));
  }
};
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

#app {
  height: 100%;
  padding-bottom: 20px;
}

html,
body {
  position: relative;
  height: 100%;
}

.room {
  margin-bottom: 30px;
  border: 1px solid #ddd;
  padding: 10px;
}

hr {
  border-top: 1px solid #ccc;
}

.sorting-buttons {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

.sorting-buttons button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #eee;
  color: #333;
}

.sorting-buttons button.active {
  background-color: #333;
  color: #fff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content div {
  margin-bottom: 20px;
}

.modal-content button {
  margin-right: 10px;
}

.room img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.text-right {
  text-align: right;
}
Footer{
  position: fixed;
  bottom: 0;
}
</style>
