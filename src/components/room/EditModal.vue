<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>編輯數量</h2>
      <div>
        <label for="quantity">數量:</label>
        <input v-model="editQuantity" type="number" min="0" id="quantity" />
      </div>
      <div class="modal-actions">
        <button @click="save">確認</button>
        <button @click="$emit('close')">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['assign']);
const emits = defineEmits(['close', 'save']);

const editQuantity = ref(props.assign.quantity);

watch(() => props.assign, (newVal) => {
  editQuantity.value = newVal.quantity;
});

function save() {
  const mid = props.assign.additionalChargesId.minibarId;
  const hid = props.assign.additionalChargesId.housingManagementId;
  emits('save', mid, hid, editQuantity.value);
  emits('close');
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 100%;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
