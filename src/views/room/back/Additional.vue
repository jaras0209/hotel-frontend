<template>
  <BackendNavbar/>
  
  <div class="box">
    <h1 class="title">附加費用</h1>
    <div class="button-wrapper">
            <div class="context"><RouterLink class="button--secondary" to="/room/back/housingManagement"><span class="text">住房管理</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomManagement"><span class="text">房間管理</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomAssignment"><span class="text">房間分配</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/additionalCharges"><span class="text">附加費用</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/checkOut"><span class="text">退房檢查</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomInfo"><span class="text">編輯房間資料</span></RouterLink></div>
        </div>

    <AssignmentTable
      :assigns="assigns"
      :currentPage="currentPage"
      :rowsPerPage="rowsPerPage"
      @edit="openModal"
    />
  </div>
</template>

<script setup>
import BackendNavbar from '@/views/backendNavbar.vue';
import AssignmentTable from '@/components/room/AdditionTable.vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const router = useRouter();

function openModal(assign) {
  Swal.fire({
    title: '編輯數量',
    html: `
      <div class="d-flex align-items-center">
        <input type="number" id="quantity" value="${assign.quantity}" min="0" max="5" required class="form-control mr-2">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    preConfirm: () => {
      const quantity = Swal.getPopup().querySelector('#quantity').value;
      if (!quantity) {
        Swal.showValidationMessage('請輸入數量');
      }
      return { quantity: parseInt(quantity, 10) };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const quantity = result.value.quantity;
      const mid = assign.additionalChargesId.minibarId;
      const hid = assign.additionalChargesId.housingManagementId;
      const amount = (assign.amount / assign.quantity) * quantity;
      const data = {
        quantity,
        amount,
        id: {
          minibarId: mid,
          housingManagementId: hid
        }
      };
      callModify(mid, hid, data);
    }
  });
}

function callFind() {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.get('/hotel/backend/additionalCharges', {
    params: { p: currentPage.value }
  })
  .then(response => {
    assigns.value = response.data;
    setTimeout(function () {
      Swal.close();
    }, 250);
  }).catch(error => {
    Swal.fire({
      text: '查詢失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(() => {
      if (error && error.response && error.response.status === 403) {
        router.push("/secure/login");
      }
    });
  });
}

function callModify(mid, hid, data) {
  Swal.fire({
    text: "Loading...",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.put(`/hotel/backend/additionalCharges/${mid}/${hid}`, data).then(response => {
    if (response.status == 200) {
      Swal.fire({
        text: "更新成功",
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(() => {
        callFind();
      });
    }
  }).catch(error => {
    Swal.fire({
      text: '失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    });
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
