<template>
  <div id="app" class="container">
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
        <button class="btn btn-secondary room_edit" @click="addRoom">+ 新增房間</button>
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
</style>
