<template>
  <div>
    <div class="dateCheck">
      <div class="dateCheck-title">空房狀態查詢</div>
      <div class="dateCheck-calendar">
        <v-date-picker
          :model-value="range"
          :min-date="new Date(new Date().getTime() + 24 * 60 * 60 * 1000)"
          :max-date="maxDay"
          :disabled-dates="disableDates"
          color="primary"
          @update:model-value="updateRange"
          is-expanded
          is-range
        ></v-date-picker>
      </div>
      <div type="button" class="btn btn-secondary"  @click="$emit('resetRange')">重新選取</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const props = defineProps(['range']);
const emit = defineEmits(['update:range']);

const maxDay = computed(() => {
  var dd = new Date();
  dd.setDate(dd.getDate() + 90);
  return dd.toISOString().split("T")[0];
});

const disableDates = computed(() => {
  // 這裡應該傳入禁用的日期數組
  return [];
});

const updateRange = (newRange) => {
  emit('update:range', newRange);
};
</script>

<style scoped>
.dateCheck {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.dateCheck-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.dateCheck-calendar {
  display: flex;
  justify-content: center;
}

.dateCheck-reset {
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
  text-align: center;
}
</style>
