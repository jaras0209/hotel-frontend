<template>
  <div class="modal" v-if="item">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ item.item }}</h5>
        </div>
        <div class="modal-body">
          <p>商品編號: {{ item.id }}</p>
          <p>價格: NT$ {{ item.price }}</p>
          <p>保存期限: {{ item.make }}</p>
          <p>商品庫存: {{ item.expire }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <div class="col text-end">
            <a href="#" class="btn btn-primary" @click="confirmOrder(item)">點餐</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js';
import { useRouter } from 'vue-router';

const props = defineProps(["item"]);
const emits = defineEmits(["close"]);
const isVisible = ref(false);
const router = useRouter();

function showModal() {
  isVisible.value = true;
}

function closeModal() {
  isVisible.value = false;
  emits("close");
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
        }).then(() => {
          router.push('/room/front/minibar');
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

defineExpose({ showModal });
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 1050;
}

.modal-dialog {
  margin: 1.75rem auto;
  max-width: 500px;
}

.modal-content {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  margin: 0;
}

.modal-body {
  position: relative;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}
</style>