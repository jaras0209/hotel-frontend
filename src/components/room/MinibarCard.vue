<template>
  <div class="minibar-card-container">
    <div class="card">
      <img class="card-img-top" :src="`data:image/jpeg;base64,${item.photo}`" :alt="item.item">
      <div class="card-body">
        <h5 class="card-title">{{ item.item }}</h5>
        <div class="card-text text-danger text-end">NT$ {{ item.price }}</div>
        <div class="row">
          <div class="col text-start">
            <a href="#" class="btn btn-primary" @click="openMinibarModal(item.id)">詳細資訊</a>
          </div>
          <div class="col text-end">
            <a href="#" class="btn btn-primary" @click="confirmOrder(item)">點餐</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js'; // 確保導入 axiosapi

const props = defineProps(["item"]);
const emits = defineEmits(["detail", "order"]);

function openMinibarModal(id) {
  emits("detail", id);
}

function confirmOrder(item) {
  Swal.fire({
    title: '確認訂單？',
    html: `
      <p>您確定要點 ${item.item} 嗎？</p>
      <p>請選擇數量:</p>
      <select id="quantity" class="swal2-input">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    preConfirm: () => {
      const quantity = Swal.getPopup().querySelector('#quantity').value;
      if (!quantity) {
        Swal.showValidationMessage(`請選擇數量`);
      }
      return { quantity: quantity };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const orderData = {
        quantity: parseInt(result.value.quantity, 10),
        amount: item.price * parseInt(result.value.quantity, 10),
        id: {
          minibarId: item.id,
          housingManagementId: 1
        }
      };
      axiosapi.post('/hotel/backend/additionalCharges', orderData).then(response => {
        Swal.fire({
          text: '訂單已成功提交',
          icon: 'success',
          confirmButtonText: '確認'
        });
      }).catch(error => {
        Swal.fire({
          text: '訂單提交失敗：' + error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: '確認',
        });
      });
    }
  });
}
</script>

<style scoped>
.minibar-card-container {
  max-width: 300px;
  margin: auto;
  margin-bottom: 20px;
}

.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
