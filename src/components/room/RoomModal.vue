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
            <button type="button" class="btn btn-secondary" @click="toggleEdit">編輯</button>
          </div>
          <div v-else class="form-group">
            <label for="roomState">房間狀態:</label>
            <select v-model="selectedRoomState" class="form-control">
              <option value="1">待入住</option>
              <option value="2">已入住</option>
              <option value="3">已退房(未清潔)</option>
              <option value="4">準備完成(已清潔)</option>
            </select>
            <button type="button" class="btn btn-primary" @click="confirmEdit">確定</button>
          </div>
          <p class="card-text">報修狀態: {{ room.repairStatus }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["room"]);
const emits = defineEmits(["close"]);
const isVisible = ref(false);
const selectedRoomState = ref('');
const editingState = ref(false);
let previousRoomState = '';

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
  } else {
    previousRoomState = selectedRoomState.value;
  }
}

function confirmEdit() {
  // 向后端发送更新房间状态的请求，使用 selectedRoomState 的值
  console.log("更新房间状态为:", selectedRoomState.value);
  editingState.value = false; // 切换回显示状态
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
