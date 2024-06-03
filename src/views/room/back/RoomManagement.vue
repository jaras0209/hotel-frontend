<template>
  <BackendNavbar></BackendNavbar>
  <div class="box">
  <div class="container">
    <h1 class="title">客房管理</h1>
    <div class="pagination-controls">
      <label for="page-select">選擇樓層:</label>
      <select id="page-select" v-model="currentPage" @change="callFind">
        <option v-for="page in totalPages" :key="page" :value="page">{{ page + 1}}</option>
      </select>
    </div>
    <div class="row justify-content-center">
      <RoomCard v-for="room in rooms" 
                :key="room.id" 
                :room="room" 
                @roomDetail="openModal">
      </RoomCard>
    </div>

    <RoomModal 
      ref="roomModalRef" 
      :room="selectedRoom" 
      @close="closeModal">
    </RoomModal>
  </div>
</div>
</template>

<script setup>
import BackendNavbar from '@/views/BackendNavbar.vue';
import { ref, onMounted } from 'vue';
import RoomCard from '@/components/room/RoomCard.vue';
import RoomModal from '@/components/room/RoomModal.vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const rooms = ref([]);
const currentPage = ref(1);
const totalPages = ref([1, 2, 3, 4, 5]);
const selectedRoom = ref(null);
const roomModalRef = ref(null);
const router = useRouter();

onMounted(() => {
  callFind();
});

function openModal(roomId) {
  axiosapi.get(`/hotel/backend/roomManagement/number/${roomId}`).then(response => {
    // console.log("openModal", response);
    selectedRoom.value = response.data;
    console.log("allRooms",selectedRoom.value)
    roomModalRef.value.showModal();
  }).catch(error => {
    Swal.fire({
      text: '查詢失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(() => {
      if (error.response && error.response.status === 403) {
        router.push("/secure/login");
      }
    });
  });
}

function closeModal() {
  selectedRoom.value = null;
}

function callFind(){
  Swal.fire({
      text: "Loading......",
      showConfirmButton: false,
      allowOutsideClick: false,
  });

  axiosapi.get(`/hotel/backend/roomManagement`, {
      params: { p: currentPage.value }
  }).then(function(response){
      rooms.value = response.data;  // 根据后端返回的数据结构调整
      console.log("allRooms123",rooms.value)
      setTimeout(function () {
          Swal.close();
      }, 250);
  }).catch(function (error) {
      Swal.fire({
          text: '查詢失敗：' + error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: '確認',
      }).then(function () {
          if (error && error.response && error.response.status === 403) {
              router.push("/secure/login");
          }
      });
  });
}
</script>

<style scoped>
  .box{
      margin-top: 100px;
      text-align: center;
  }
.container {
  padding: 20px;
  background-color: #f8f9fa;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #343a40;
}

.pagination-controls {
  text-align: center;
  margin-bottom: 20px;
}

.pagination-controls label {
  margin-right: 10px;
  color: #495057;
}

.pagination-controls select {
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  background-color: #ffffff;
  color: #495057;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
</style>
