<template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <div id="app" class="container">
    <div>
      <br>
      <div class="text-center">
        <h1>快速訂房</h1>
        <br>
        <table class="center-table">
          <tr>
            <td>
              <!-- 新的篩選條件：入住日期 -->
              <label for="checkInDate">入住日期</label>
              <input type="date" v-model="checkInDate" id="checkInDate" />
            </td>
            <td>
              <!-- 顯示已套用的篩選條件 -->
              <div v-if="selectedRoomNames.length || checkInDate">
                <p v-if="selectedRoomNames.length">篩選條件: {{ selectedRoomNames.join(', ') }}</p>
              </div>
            </td>
            <td>
              <!-- 開啟進階篩選 Modal 的按鈕 -->
              <button @click="showModal = true">進階篩選</button>
            </td>
            <td>
              <!-- 搜尋按鈕 -->
              <button @click="searchRooms">搜尋</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <br>
    <!-- 排序按鈕 -->
    <div class="sorting-buttons">
      <button :class="{ active: sortType === 'recommend' }" @click="sortRooms('recommend')">最佳推薦</button>
      <button :class="{ active: sortType === 'lowToHigh' }" @click="sortRooms('lowToHigh')">金額由低到高</button>
      <button :class="{ active: sortType === 'highToLow' }" @click="sortRooms('highToLow')">金額由高到低</button>
    </div>
    <hr />
    <div class="row">
      <div class="col-sm-12">
        <div v-for="room in filteredRooms" :key="room.name" class="room">
          <div class="row align-items-center">
            <div class="col-sm-4">
              <img :src="room.cover" :alt="room.name" />
            </div>
            <div class="col-sm-4">
              <h3>{{ room.name }}</h3>
              <div class="icons">
                <span v-if="room.equipment.breakfast"><font-awesome-icon :icon="['fas', 'mug-saucer']" /></span>
                <span v-if="room.equipment.bathtub"><font-awesome-icon :icon="['fas', 'bath']" /></span>
                <span v-if="room.equipment.wifi"><font-awesome-icon :icon="['fas', 'wifi']" /></span>
              </div>
              <a href="#" class="card-link" @click="showDetailModal(room)">詳細內容></a>
            </div>
            <div class="col-sm-4 text-right">
              <p>價格: {{ room.price }}</p>
              <!-- 顯示剩餘房間數量 -->
              <p v-if="roomInfo[room.id]">剩餘{{ roomInfo[room.id].left }}間房</p>
              <button class="btn btn-secondary" @click="showBookingModal(room)">立即下訂</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 詳細內容 Modal -->
    <div v-if="showDetail" class="modal">
      <div class="modal-content">
        <h2>客房詳細內容</h2>
        <div v-if="detailPage === 1">
          <p>客房設備:</p>
          <p>個人衛浴清潔用品, 梳子, 刮鬍刀, 網際網路, 淋浴間, 浴缸, 浴巾, 毛巾, 吹風機, 免治馬桶, 電視, 付費電視, 中英日電視節目, 冰箱, 電話, 電子保險箱, 鬧鐘, 熱水壺, 室內拖鞋, 免費礦泉水, 免費咖啡及茶包, 飯店介紹手冊, WIFI, 客房餐飲服務, 付費洗衣服務, 付費乾洗服務</p>
          <button @click="detailPage = 2">下一頁</button>
        </div>
        <div v-if="detailPage === 2">
          <p>◆注意事項：</p>
          <p>1. 本優惠不得與其他優惠專案合併使用</p>
          <p>2. 飯店保有調整專案內容之權利</p>
          <p>◆取消規定:</p>
          <p>1. 住宿日14日前取消訂房，退還已付費用100%。</p>
          <p>2. 住宿日10~13日前取消訂房，退還已付費用70%。</p>
          <p>3. 住宿日7~9日前取消訂房，退還已付費用50%。</p>
          <p>4. 住宿日4~6日前取消訂房，退還已付費用40%。</p>
          <p>5. 住宿日2~3日前取消訂房，退還已付費用30%。</p>
          <p>6. 住宿日1日前取消訂房，退還已付費用20%。</p>
          <p>7. 住宿當日取消或怠於通知者（No Show），無法退還已付費用。</p>
          <button @click="detailPage = 1">上一頁</button>
        </div>
        <button @click="showDetail = false">關閉</button>
      </div>
    </div>

    <!-- 立即下訂 Modal -->
    <div v-if="showBooking" class="modal">
      <div class="modal-content">
        <h2>{{ selectedRoom.name }}</h2>
        <p>入住日期: {{ checkInDate }}</p>
        <button class="btn btn-secondary" @click="goOrder">前往訂房</button>
        <button @click="showBooking = false">關閉</button>
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
</template>

<script setup>
import FrontNavBar from '../../FrontNavBar.vue';
import axiosapi from '@/plugins/axios.js';
import { roomsData } from '@/assets/roomsdata.js';
import { reactive, ref, onMounted } from 'vue';

// 取得當天日期並格式化為 YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 狀態和資料定義
const rooms = reactive([...roomsData]);
const sortType = ref('recommend');
const filteredRooms = ref([...rooms]);
const selectedRoomNames = ref([]);
const showModal = ref(false);
const tempSelectedRoomNames = ref([]);
const checkInDate = ref(getTodayDate()); // 初始化為當天日期
const showDetail = ref(false);
const detailPage = ref(1);
const showBooking = ref(false);
const selectedRoom = ref(null);
const roomInfo = ref({});

// 套用篩選條件
const applyFilter = () => {
  selectedRoomNames.value = [...tempSelectedRoomNames.value];
  showModal.value = false;
  filterRooms();
};

// 清除所有篩選條件
const clearAll = () => {
  tempSelectedRoomNames.value = [];
  selectedRoomNames.value = [];
  filterRooms();
};

// 搜尋房間
const searchRooms = async () => {
  let availableRooms = [];
  if (checkInDate.value) {
    try {
      const response = await axiosapi.get('/hotel/backend/roomAssignment', {
        params: { date: checkInDate.value }
      });

      // 收集每個房間的資訊
      roomInfo.value = response.data.reduce((acc, room) => {
        acc[room.roomInformation.id] = room;
        return acc;
      }, {});

      availableRooms = rooms.filter(room => {
        const info = roomInfo.value[room.id];
        return info && info.left > 0;
      });
    } catch (error) {
      console.error('Failed to fetch room assignment:', error);
    }
  } else {
    availableRooms = [...rooms];
  }

  filteredRooms.value = availableRooms.filter(
    room => selectedRoomNames.value.length === 0 || selectedRoomNames.value.includes(room.name)
  );

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

// 詳細內容 Modal
const showDetailModal = (room) => {
  selectedRoom.value = room;
  detailPage.value = 1;
  showDetail.value = true;
};

// 顯示訂房 Modal
const showBookingModal = (room) => {
  selectedRoom.value = room;
  showBooking.value = true;
};

// 包成JSON前端傳遞
const goOrder = () => {
  const payload = {
    checkInDate: checkInDate.value,
    price: selectedRoom.value.price,
    id: selectedRoom.value.id,
    typeName:selectedRoom.value.name,
    leftRoomNumer:roomInfo.value[selectedRoom.value.id].left,
    picture:selectedRoom.value.cover
  };
  const queryString = new URLSearchParams(payload).toString();
  window.location.href = `/member/orderHome?${queryString}`;    // `/room?${queryString}`;
};

onMounted(() => {
  searchRooms();
});
</script>

<style scoped lang="scss">
body {
  padding: 20px;
  background: #dbdbe5bb;
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
  border: 1px solid #A5B7C1;
  padding: 10px;
  background-color: #DBDBE5;
}

hr {
  border-top: 1px solid #A5B7C1;
}

.sorting-buttons {
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.sorting-buttons button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #eee;
  color: #333;
}

sortings-buttons button.active {
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
  background-color: #A5B7C1;
  color: #333;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.room img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 1px solid #A5B7C1;
}

.text-right {
  text-align: right;
}

.btn-secondary {
  background-color: #A5B7C1;
  color: #333;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.center-table {
  margin: auto;
  border: 1px solid #A5B7C1;
  background-color: #fff;
  padding: 20px;
}
</style>