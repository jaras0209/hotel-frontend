<template>
    <BackendNavbar></BackendNavbar>
  <div class="box">
    <h1 class="title">客房管理</h1>
    <!-- <button @click="createAddition" class="btn btn-primary mb-3">新增</button> -->
    <AssignmentTable
      :assigns="assigns"
      :currentPage="currentPage"
      :rowsPerPage="rowsPerPage"
      @add1="add1"
      @minus1="minus1"/>
    
      <!-- :currentPage="currentPage"
:rowsPerPage="rowsPerPage" -->
    <!-- <div class="col-4" v-show="total != 0">
      <Paginate 
        :first-last-button="true" 
        first-button-text="&lt;&lt;" 
        last-button-text="&gt;&gt;"
        prev-text="&lt;" next-text="&gt;" 
        :page-count="pages" 
        :initial-page="currentPage" 
        v-model="currentPage" 
        :click-handler="fetchAdditions">
      </Paginate>
    </div> -->
  </div>
</template>

<script setup>
import BackendNavbar from '@/views/BackendNavbar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import AssignmentTable from '@/components/room/AssignmentTable.vue';


const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const total = ref(0);
const pages = ref(0);
const router = useRouter();


function callFind() {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.get('/hotel/backend/roomAssignment', {
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

function add1(assign) {
  console.log('+1', assign);
}

// function minus1(assign) {
  function minus1() {
  console.log('-1', assign);
//   Swal.fire({
//     text: "Loading......",
//     showConfirmButton: false,
//     allowOutsideClick: false,
//   });
//   let data = assigns.value;
//   axiosapi.put(`/backend/roomAssignment/${assigns.value.id}`, data)
//   .then(response => {
//       if (response.data.success) {
//         Swal.fire({
//           text: response.data.message,
//           icon: 'success',
//           allowOutsideClick: false,
//           confirmButtonText: '確認',
//         }).then(() => {
//           // minibarModalRef.value.hideModal();
//           // callFind(current.value);
//         });
//         } else {
//         Swal.fire({
//           text: response.data.message,
//           icon: 'warning',
//           allowOutsideClick: false,
//           confirmButtonText: '確認',
//         });
//       }
//     })
//     .catch(error => {
//       Swal.fire({
//         text: '失敗：' + error.message,
//         icon: 'error',
//         allowOutsideClick: false,
//         confirmButtonText: '確認',
//       });
//     });
}

onMounted(() => {
  callFind();
});
</script>

<style scoped>
  .box{
      margin-top: 100px;
      text-align: center;
  }

.button-container {
  text-align: left;
  margin-bottom: 20px;
}
</style>
