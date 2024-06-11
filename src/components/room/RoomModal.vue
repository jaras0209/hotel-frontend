<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ room.number }}</h5>
        </div>
        <div class="modal-body">
          <p class="card-text">房間編號: {{ room.id }}</p>
          <div v-if="!editingState">
            <p class="card-text">房間狀態: {{ room.roomState.state }}</p>
            <p class="card-text">報修狀態: {{ room.repairStatus }}</p>
            <button type="button" class="btn btn-secondary" @click="toggleEdit">編輯</button>
          </div>
          <div v-else class="form-group">
            <label for="roomState">房間狀態:</label>
            <div class="form-group">
  <div class="row justify-content-center">
    <div class="col-sm-6">
      <select v-model="selectedRoomState" class="form-control">
        <option value="1">維護中</option>
        <option value="2">已入住</option>
        <option value="3">已退房(未清潔)</option>
        <option value="4">準備完成(已清潔)</option>
      </select>
    </div>
  </div>
</div>
<label for="repairStatus">報修狀態:</label>
<div class="form-group">
  <div class="row justify-content-center">
    <div class="col-sm-6">
      <input v-model="editedRepairStatus" type="text" class="form-control" id="repairStatus">
    </div>
  </div>
</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirmEdit">確定</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

const props = defineProps(["room"]);
const emits = defineEmits(["close", "updateSuccess"]);
const isVisible = ref(false);
const selectedRoomState = ref('');
const editedRepairStatus = ref('');
const editingState = ref(false);
let previousRoomState = '';
let previousRepairStatus = '';

function showModal() {
  isVisible.value = true;
}

function closeModal() {
  isVisible.value = false;
  emits("close");
}

function toggleEdit() {
  editingState.value = !editingState.value;
  if (!editingState.value) {
    selectedRoomState.value = previousRoomState;
    editedRepairStatus.value = previousRepairStatus;
  } else {
    previousRoomState = selectedRoomState.value;
    previousRepairStatus = editedRepairStatus.value;
  }
}

async function confirmEdit() {
  const payload = {
    id: props.room.id,
    roomState: selectedRoomState.value,
    repairStatus: editedRepairStatus.value
  };

  try {
    const response = await axiosapi.put(`/hotel/backend/roomManagement/${props.room.id}`, payload);
    if (response.data.success) {
      Swal.fire({
        text: '修改成功',
        icon: 'success',
        confirmButtonText: '確認'
      }).then(() => {
        closeModal();
        emits("updateSuccess");
      });
    } else {
      Swal.fire({
        text: '修改失敗: ' + response.data.message,
        icon: 'error',
        confirmButtonText: '確認'
      });
    }
  } catch (error) {
    Swal.fire({
      text: '修改失敗: ' + error.message,
      icon: 'error',
      confirmButtonText: '確認'
    });
  }
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
