<template>
  <div class="date-cell" :class="{ 'current': !day.isMonth, 'today': isToday }">
    <span>{{ dayTag }}</span>
    <div class="data-content">
      <div v-for="(room, id) in day.data" :key="id" class="room-info">
        <p v-if="room.roomInformation && room.roomInformation.id === roomId && room.left > 0">
          剩餘{{ room.left }}間
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
  roomId: {
    type: Number,
    required: true,
  },
});

const dayTag = computed(() => dayjs(props.day.date).format('D'));
</script>

<style scoped>
.date-cell {
  padding: 10px;
  border: 1px solid #A5B7C1;
  background-color: #DBDBE5;
  flex: 1;
  min-height: 100px;
  position: relative;
}

.current {
  background-color: #cccdd8;
}

.today {
  background-color: #A5B7C1;
}

.data-content {
  margin-top: 10px;
}

.room-info {
  margin-top: 5px;
}
</style>