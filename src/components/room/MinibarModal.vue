<template>
  <div class="modal" v-if="item">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ item.name }}</h5>
        </div>
        <div class="modal-body">
          <p>價格: NT$ {{ item.price }}</p>
          <p>保存期限: {{ item.make }}</p>
          <p>剩下: {{ item.expire }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue';

const props = defineProps(["item"]);
const emits = defineEmits(["close"]);
const isVisible = ref(false);

function closeModal() {
  isVisible.value = false;
  emits("close");
}

function showModal() {
  isVisible.value = true;
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
