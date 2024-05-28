<template>
  <div class="date-selected">
    <span @click="selectedPre">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      上一個月
    </span>
    <span>{{ formattedDate }}</span>
    <span @click="selectedNext">
      下一個月
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  currentDate: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['dateSelected']);

const selectedPre = () => {
  const newDate = dayjs(props.selectedDate).subtract(1, 'month');
  if (newDate.isAfter(dayjs().subtract(1, 'month'))) {
    emit('dateSelected', newDate);
  }
};

const selectedNext = () => {
  const newDate = dayjs(props.selectedDate).add(1, 'month');
  if (newDate.isBefore(dayjs().add(3, 'month'))) {
    emit('dateSelected', newDate);
  }
};

const formattedDate = computed(() => {
  return dayjs(props.selectedDate).format('YYYY/MM');
});
</script>

<style scoped>
.date-selected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  color: #535D55;
}

.date-selected span {
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
  align-items: center;
}

.date-selected span:hover {
  text-decoration: underline;
}
</style>
