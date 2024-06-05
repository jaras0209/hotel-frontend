<template>
  <backendNavbar></backendNavbar>
  <div class="box">
    <h1 class="title">住房管理</h1>
    <div>
      <table class="assign">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">住房編號</th>
            <th scope="col">房號</th>
            <th scope="col">房間編號</th>
            <th scope="col">訂單資料</th>
            <th scope="col">報到時間</th>
            <th scope="col">退房時間</th>
            <th scope="col">附加費用</th>
            <th scope="col">退房檢查</th>
            <th scope="col">備註</th>
            <th scope="col">換房</th>
            <th scope="col">退房</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
            <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
            <td>{{ assign.id }}</td>
            <td>{{ assign.roomManagement.number }}</td>
            <td>{{ assign.roomManagement.id }}</td>
            <td>{{ assign.orderRoom ? assign.orderRoom.orderId : 'N/A' }}</td>
            <td>{{ assign.checkInTime }}</td>
            <td>{{ assign.checkOutTime }}</td>
            <td>{{ assign.totalAdditional }}</td>
            <td>{{ assign.totalCompensation }}</td>
            <td>{{ assign.remarks }}</td>
            <td><a href="#" @click.prevent="changeRoom(assign)" class="btn btn-success">換房</a></td>
            <td>
              <a 
                href="#" 
                @click.prevent="checkOut(assign.id)" 
                class="btn btn-danger" 
                :class="{ 'disabled': assign.checkOutTime }" 
                :style="{ pointerEvents: assign.checkOutTime ? 'none' : 'auto' }"
              >退房</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import backendNavbar from '@/views/backendNavbar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(10);
// const total = ref(0);
// const pages = ref(0);
const router = useRouter();
const availableRooms = ref([]);
const isLoadingRooms = ref(false);
const formData = ref({ roomType: null });

const roomTypes = ref([
    { id: 1, name: '標準客房' },
    { id: 2, name: '精緻客房' },
    { id: 3, name: '豪華客房' },
    { id: 4, name: '豪華家庭房' },
    { id: 5, name: '標準商務房' },
    { id: 6, name: '尊榮商務房' },
    { id: 7, name: '大使套房' },
    { id: 8, name: '皇家套房' },
    { id: 9, name: '總統套房' }
]);

const paginatedAssigns = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return assigns.value.slice(start, start + rowsPerPage.value);
});

function callFind() {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.get('/hotel/backend/housingManagement', {
    params: { p: currentPage.value }
  })
  .then(response => {
    assigns.value = response.data;
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

async function fetchAvailableRooms() {
  if (!formData.value.roomType) return;
  isLoadingRooms.value = true;
  try {
    const response = await axiosapi.get('/hotel/backend/list/roomManagement', {
      params: { roomType: formData.value.roomType }
    });
    const rooms = Array.isArray(response.data) ? response.data : [];
    availableRooms.value = rooms.filter(room => 
      room.roomInformation.id === parseInt(formData.value.roomType) && 
      room.roomState.id === 4
    );
  } catch (error) {
    console.error('Error fetching available rooms:', error);
  } finally {
    isLoadingRooms.value = false;
  }
}

async function changeRoom(assign) {
  const { value: roomType } = await Swal.fire({
    title: '選擇房間類型',
    input: 'select',
    inputOptions: roomTypes.value.reduce((options, type) => {
      options[type.id] = type.name;
      return options;
    }, {}),
    inputPlaceholder: '選擇房間類型',
    showCancelButton: true,
    confirmButtonText: '下一步',
    cancelButtonText: '取消'
  });

  if (roomType) {
    formData.value.roomType = roomType;
    await fetchAvailableRooms();

    if (availableRooms.value.length === 0) {
      Swal.fire({
        text: '沒有符合條件的空房',
        icon: 'error',
        confirmButtonText: '確認',
      });
      return;
    }

    const { value: selectedRoom } = await Swal.fire({
      title: '選擇新的房間',
      input: 'select',
      inputOptions: availableRooms.value.reduce((options, room) => {
        options[room.id] = room.number;
        return options;
      }, {}),
      inputPlaceholder: '選擇房間',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    });

    if (selectedRoom) {
      axiosapi.put(`/hotel/backend/housingManagement/changeRoom/${assign.id}`, {
        newRoomId: selectedRoom
      })
      .then(response => {
        Swal.fire({
          text: '換房成功',
          icon: 'success',
          confirmButtonText: '確認',
        });
        callFind(); // Refresh the data
      })
      .catch(error => {
        Swal.fire({
          text: '換房失敗：' + error.message,
          icon: 'error',
          confirmButtonText: '確認',
        });
      });
    }
  }
}

function checkOut(id) {
  Swal.fire({
    title: '確認退房？',
    text: `您確定要為編號 ${id} 的住房辦理退房嗎？`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      const checkoutTime = new Date().toISOString(); // Get current time in ISO format

      axiosapi.put(`/hotel/backend/housingManagement/${id}`, {
        checkOutTime: checkoutTime
      })
      .then(response => {
        Swal.fire({
          text: '退房成功',
          icon: 'success',
          confirmButtonText: '確認',
        });
        callFind(); // Refresh the data
      })
      .catch(error => {
        Swal.fire({
          text: '退房失敗：' + error.message,
          icon: 'error',
          confirmButtonText: '確認',
        });
      });
    }
  });
}

onMounted(() => {
  callFind();
});
</script>

<style scoped>
.box {
  margin-top: 100px;
  text-align: center;
}
.button-container {
  text-align: left;
  margin-bottom: 20px;
}
.assign {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}
.assign th, .assign td {
  border: 1px solid #dddddd;
  padding: 8px;
}
.assign th {
  background-color: #f2f2f2;
}
.disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
