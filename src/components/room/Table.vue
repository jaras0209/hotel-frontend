<template>
    <div>
      <h1>附加費用列表</h1>
      <table class="addition">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Housing</th>
            <th scope="col">Minibar</th>
            <th scope="col">數量</th>
            <th scope="col">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(addition, index) in additions" :key="addition.additionalChargesId">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ addition.additionalChargesId.housingManagementId }}</td>
            <td>{{ addition.additionalChargesId.minibarId }}</td>
            <td>{{ addition.quantity }}</td>
            <td>{{ addition.amount }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一頁</button>
        <span>第 {{ currentPage }} 页</span>
        <button @click="nextPage" :disabled="additions.length < rowsPerPage">下一頁</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const additions = ref([]);
  const currentPage = ref(1);
  const rowsPerPage = ref(10);
  
  function fetchAdditions() {
    Swal.fire({
      text: "Loading......",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  
    axios.get('/hotel/backend/additionalCharges', {
      params: { p: currentPage.value }
    })
    .then(response => {
      additions.value = response.data;
      Swal.close();
    })
    .catch(error => {
      Swal.fire({
        text: '查詢失敗：' + error.message,
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(() => {
        if (error.response && error.response.status === 403) {
          this.$router.push("/secure/login");
        }
      });
    });
  }
  
  function nextPage() {
    currentPage.value++;
    fetchAdditions();
  }
  
  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchAdditions();
    }
  }
  
  onMounted(() => {
    fetchAdditions();
  });
  </script>
  
  <style scoped>
  .addition {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
  }
  .addition th, .addition td {
    border: 1px solid #dddddd;
    padding: 8px;
  }
  .addition th {
    background-color: #f2f2f2;
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .pagination button {
    padding: 5px 10px;
    margin: 0 10px;
    font-size: 16px;
  }
  </style>
  