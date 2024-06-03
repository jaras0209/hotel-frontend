<template>
  <BackendNavbar></BackendNavbar>

  <div class="box">
    <h1 class="title">附加費用</h1>
    <AssignmentTable
      :assigns="assigns"
      :currentPage="currentPage"
      :rowsPerPage="rowsPerPage"
      @edit="openModal"
    />
    <EditModal
      v-if="isModalOpen"
      :assign="currentAssign"
      @close="closeModal"
      @save="callModify"
    />
  </div>
</template>

<script setup>
import BackendNavbar from '@/views/BackendNavbar.vue';
import AssignmentTable from '@/components/room/AdditionTable.vue';
import EditModal from '@/components/room/EditModal.vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const router = useRouter();
const isModalOpen = ref(false);
const currentAssign = ref(null);
const additionModalRef = ref(null);

function openModal(mid,hid) {
  axiosapi.get(`/hotel/backend/additionalCharges/${mid}/${hid}`, data).then(response => {
    currentAssign.value=response.data;
    console.log("allRooms",response.data)
    additionModalRef.value.showModal;
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

function callModify(mid, hid, quantity) {
  const data = { quantity };
  Swal.fire({
    text: "Loading...",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.put(`/additionalCharges/${mid}/${hid}`, data).then(response => {
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

function closeModal() {
  isModalOpen.value = false;
  currentAssign.value = null;
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
