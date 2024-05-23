<template>
  <div class="room-card">
    <div class="card-body">
      <h5 class="card-title">{{ room.number }}</h5>
      <hr>
      <div class="col text-start">
        <p class="card-text">房間狀態: {{ room.roomState.state }}</p>
        <p class="card-text">報修狀態: {{ room.repairStatus }}</p>
      </div>
      <div class="col text-end">
        <a href="#" class="card-link" @click="openRoomDetail(room.number)">詳細資訊</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(["room"]);
const emits = defineEmits(["roomDetail"]);
function openRoomDetail(id) {
  emits("roomDetail", id);
}
</script>

<style scoped>
.room-card {
  width: 18rem;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-body {
  padding: 20px;
}

.card-title {
  margin-bottom: 10px;
  color: #495057;
}

.card-text {
  margin-bottom: 10px;
  color: #6c757d;
}

.card-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.card-link:hover {
  text-decoration: underline;
}
</style>
