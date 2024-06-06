<template>
  <div class="room-calendar">
    <h2>{{ room.name }}</h2>
    <img :src="room.cover" alt="Room Image" class="room-image" />
    <div class="calendar">
      <DateSelected :current-date="today" :selected-date="selectedDate" @dateSelected="selDate" />
      <WeekDate />
      <div class="days-grid">
        <MonthDate v-for="day in days" :key="day.date" :day="day" :is-today="day.date === today" :room-id="room.id" />
      </div>
      <div class="navigation">
        <button @click="selectedPre"><i class="fas fa-arrow-left"></i></button>
        <button @click="selectedNext"><i class="fas fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';

dayjs.extend(weekday);

import DateSelected from '@/components/room/DateSelected.vue';
import WeekDate from '@/components/room/WeekDate.vue';
import MonthDate from '@/components/room/MonthDate.vue';

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});

const selectedDate = ref(dayjs());
const backendData = ref({});

const getWeekday = (date) => dayjs(date).weekday();

const selDate = (newDate) => {
  selectedDate.value = newDate;
  fetchData();
};

const today = computed(() => dayjs().format('YYYY-MM-DD'));

const getMonth = computed(() => selectedDate.value.daysInMonth());

const year = computed(() => Number(selectedDate.value.format('YYYY')));
const month = computed(() => Number(selectedDate.value.format('M')));

const currentDays = computed(() => {
  return [...Array(getMonth.value)].map((_, index) => {
    const date = dayjs(`${year.value}-${month.value}-${index + 1}`).format('YYYY-MM-DD');
    return {
      date: date,
      isMonth: true,
      data: backendData.value[date] || [],
    };
  });
});

const nextmonthDay = computed(() => {
  const nextWeek = getWeekday(`${year.value}-${month.value}-${currentDays.value.length}`);
  const nextMonth = dayjs(`${year.value}-${month.value}`).add(1, 'month');
  const nextOfmonth = nextWeek ? 7 - nextWeek : nextWeek;
  return [...Array(nextOfmonth)].map((_, index) => {
    const date = dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format('YYYY-MM-DD');
    return {
      date: date,
      isMonth: false,
      data: backendData.value[date] || [],
    };
  });
});

const premonthDate = computed(() => {
  const firstWeek = getWeekday(currentDays.value[0].date);
  const prevMonth = dayjs(`${year.value}-${month.value}`).subtract(1, 'month');
  const lastMonth = firstWeek ? firstWeek - 1 : 6;
  const prefirstDay = dayjs(currentDays.value[0].date).subtract(lastMonth, 'day').date();
  return [...Array(lastMonth)].map((_, index) => {
    const date = dayjs(`${prevMonth.year()}-${prevMonth.month() + 1}-${prefirstDay + index}`).format('YYYY-MM-DD');
    return {
      date: date,
      isMonth: false,
      data: backendData.value[date] || [],
    };
  });
});

const days = computed(() => {
  return [
    ...premonthDate.value,
    ...currentDays.value,
    ...nextmonthDay.value,
  ];
});

const fetchData = async () => {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  try {
    let page = 1;
    let allData = [];

    while (true) {
      const response = await axiosapi.get('/hotel/backend/roomAssignment', {
        params: {
          p: page
        }
      });
      const data = response.data;
      if (data.length === 0) break;
      allData = [...allData, ...data];
      page++;
    }

    const roomData = allData.reduce((acc, room) => {
      const date = dayjs(room.date).format('YYYY-MM-DD');
      if (!acc[date]) acc[date] = [];
      acc[date].push(room);
      return acc;
    }, {});

    backendData.value = roomData;
  } catch (error) {
    console.error('Failed to fetch room assignment data:', error);
  } finally {
    Swal.close();
  }
};

onMounted(() => {
  fetchData();
});

const selectedPre = () => {
  const newDate = dayjs(selectedDate.value).subtract(1, 'month');
  if (newDate.isAfter(dayjs().subtract(1, 'month'))) {
    selectedDate.value = newDate;
    fetchData();
  }
};

const selectedNext = () => {
  const newDate = dayjs(selectedDate.value).add(1, 'month');
  if (newDate.isBefore(dayjs().add(3, 'month'))) {
    selectedDate.value = newDate;
    fetchData();
  }
};
</script>

<style scoped>
.room-calendar {
  margin-bottom: 2rem;
}

.room-image {
  width: 600px;
  height: 400px;
  object-fit: cover;
}

.calendar {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.navigation button {
  cursor: pointer;
  font-size: 1.5em;
  border: none;
  background: none;
  padding: 0;
}
</style>