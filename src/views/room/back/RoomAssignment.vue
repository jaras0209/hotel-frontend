<template>
  <BackendNavbar></BackendNavbar>
  <div class="box">
    <h1 class="title">房間分配</h1>
    <div class="button-wrapper">
            <div class="context"><RouterLink class="button--secondary" to="/room/back/housingManagement"><span class="text">住房管理</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomManagement"><span class="text">房間管理</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomAssignment"><span class="text">房間分配</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/additionalCharges"><span class="text">附加費用</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/checkOut"><span class="text">退房檢查</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomInfo"><span class="text">編輯房間資料</span></RouterLink></div>
        </div>
    <div>
      <table class="assign">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">房間型號</th>
            <th scope="col">總共間數</th>
            <th scope="col">剩餘間數</th>
            <th scope="col">日期</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
            <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
            <td>{{ assign.roomInformation.id }}</td>
            <td>{{ assign.roomInformation.total }}</td>
            <td>
              <div class="d-flex align-items-center">
                <input type="number" v-model="assign.left" min="0" max="5" required class="form-control mr-2">
              </div>
            </td>
            <td>{{ assign.date }}</td>
            <td>
              <a href="#" @click.prevent="updateAssign(assign)" class="btn btn-primary btn-sm">更新</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一頁</button>
      <span>第 {{ currentPage }} 頁，共 {{ totalPages }} 頁</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一頁</button>
    </div>
  </div>
</template>

<script setup>
import BackendNavbar from '@/views/backendNavbar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(15);  // 每頁顯示15條數據
const totalPages = ref(54);   // 總共54頁
const router = useRouter();

const paginatedAssigns = computed(() => {
  return assigns.value;
});

function callFind(page = 1) {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.get('/hotel/backend/roomAssignment', {
    params: { p: page }
  })
  .then(response => {
    assigns.value = response.data;
    currentPage.value = page;  // 更新当前页码
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

function updateAssign(assign) {
  Swal.fire({
    text: "Updating...",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const data = {
    left: assign.left
  };

  axiosapi.put(`/hotel/backend/roomAssignment/${assign.id}`, data)
  .then(response => {
    if (response.data.success) {
      Swal.fire({
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(() => {
        callFind(currentPage.value);
      });
    } else {
      Swal.fire({
        text: response.data.message,
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      });
    }
  })
  .catch(error => {
    Swal.fire({
      text: '更新失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    });
  });
}

function prevPage() {
  if (currentPage.value > 1) {
    callFind(currentPage.value - 1);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    callFind(currentPage.value + 1);
  }
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

.assign {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

.assign th,
.assign td {
  border: 1px solid #dddddd;
  padding: 8px;
}

.assign th {
  background-color: #f2f2f2;
}

.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
}

.pagination span {
  margin: 0 10px;
}
.button-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}
.button-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.context {
    margin: 0;
}

.button--secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ddd;
    color: #333;
    width: 150px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.button--secondary .text {
    font-size: 16px;
}

.button--secondary:hover {
    background-color: #bbb;
    color: #000;
}
</style>
