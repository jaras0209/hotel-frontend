<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ room.number }}</h5>
        </div>
        <div class="modal-body">
          <p class="card-text">房間狀態: {{ room.id }}</p>
          <p class="card-text">房間狀態: {{ room.roomState.state }}</p>
          <p class="card-text">報修狀態: {{ room.repairStatus }}</p>
          <!-- <p>房間型號: {{ room.roomInformation.id }}</p>
          <p>房間型號: {{ room.roomInformation.bedType }}</p>
          <p>房間型號: {{ room.roomInformation.maxOccupancy }}</p> -->
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

function showModal() {
  isVisible.value = true;
}

function closeModal() {
  isVisible.value = false;
  emits("close");
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
