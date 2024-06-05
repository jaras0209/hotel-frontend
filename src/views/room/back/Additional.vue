<template>
  <BackendNavbar/>
  
  <div class="box">
    <h1 class="title">附加費用</h1>
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
</style>
