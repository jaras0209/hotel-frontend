<template>
  <div id="app" class="container">
    <div>
      <h1>房間搜尋</h1>

      <!-- 開啟進階篩選 Modal 的按鈕 -->
      <button @click="showModal = true">進階篩選</button>

      <!-- 預算價格輸入框和搜尋按鈕 -->
      <div>
        <label for="budgetPrice">預算價格</label>
        <input type="number" v-model="budgetPrice" id="budgetPrice" placeholder="請輸入預算價格">
        <button @click="searchRooms">搜尋</button>
      </div>

      <!-- 排序按鈕 -->
      <div class="sorting-buttons">
        <button 
          :class="{ active: sortType === 'recommend' }"
          @click="sortRooms('recommend')"
        >
          最佳推薦
        </button>
        <button 
          :class="{ active: sortType === 'lowToHigh' }"
          @click="sortRooms('lowToHigh')"
        >
          金額由低到高
        </button>
        <button 
          :class="{ active: sortType === 'highToLow' }"
          @click="sortRooms('highToLow')"
        >
          金額由高到低
        </button>
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

    <!-- 進階篩選 Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>進階篩選</h2>
        <div>
          <label v-for="room in rooms" :key="room.id">
            <input type="checkbox" :value="room.name" v-model="tempSelectedRoomNames">
            {{ room.name }}
          </label>
        </div>
        <button @click="applyFilter">套用</button>
        <button @click="showModal = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RoomData from '@/components/room/RoomData.vue';
import { roomsData } from '@/assets/roomsdata.js';
import { reactive, ref, watch } from 'vue';

// 狀態和資料定義
const rooms = reactive([...roomsData]);
const hotelDiscount = ref(0.9);
const serviceFee = ref(200);
const budgetPrice = ref(8500);
const sortType = ref('recommend');
const filteredRoomsForList = ref([...rooms]);
const selectedRoomNames = ref([]);
const showModal = ref(false);
const tempSelectedRoomNames = ref([]);

// 監聽 selectedRoomNames 變化，更新 budgetPrice
watch(selectedRoomNames, () => {
  if (selectedRoomNames.value.length > 0) {
    const selectedRooms = rooms.filter(room => selectedRoomNames.value.includes(room.name));
    const minPrice = Math.min(...selectedRooms.map(room => room.price));
    budgetPrice.value = minPrice;
  } else {
    budgetPrice.value = 8500;
  }
});

const searchRooms = () => {
  // 限制 budgetPrice 在 6000 - 31000 之間
  budgetPrice.value = Math.max(6000, Math.min(31000, budgetPrice.value));

  const filteredRooms = rooms.filter(room => 
    room.price >= budgetPrice.value - 2500 && room.price <= budgetPrice.value + 2500
  );

  if (selectedRoomNames.value.length > 0) {
    filteredRoomsForList.value = filteredRooms.filter(room =>
      selectedRoomNames.value.includes(room.name)
    );
  } else {
    filteredRoomsForList.value = filteredRooms;
  }

  sortRooms();
};

const sortRooms = (type = sortType.value) => {
  sortType.value = type;

  if (type === 'lowToHigh') {
    filteredRoomsForList.value.sort((a, b) => a.price - b.price);
  } else if (type === 'highToLow') {
    filteredRoomsForList.value.sort((a, b) => b.price - a.price);
  } else {
    filteredRoomsForList.value.sort((a, b) => rooms.indexOf(a) - rooms.indexOf(b));
  }
};

const applyFilter = () => {
  selectedRoomNames.value = [...tempSelectedRoomNames.value];
  showModal.value = false;
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
</style>
