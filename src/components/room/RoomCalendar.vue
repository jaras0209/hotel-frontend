    <template>
        <div class="calendar-container">
        <h2>Room ID: {{ roomId }}</h2>
        <div class="calendar">
            <DateSelected :current-date="today" :selected-date="selectedDate" @dateSelected="updateDate" />
            <WeekDate />
            <div class="days-grid">
            <MonthDate v-for="day in days" :key="day.date" :day="day" :is-today="day.date === today" :room-id="roomId" />
            </div>
        </div>
        </div>
    </template>
    
    <script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import dayjs from 'dayjs';
    import weekday from 'dayjs/plugin/weekday';
    import axiosapi from '@/plugins/axios.js';
    
    import DateSelected from '@/components/room/DateSelected.vue';
    import WeekDate from '@/components/room/WeekDate.vue';
    import MonthDate from '@/components/room/MonthDate.vue';
    
    dayjs.extend(weekday);
    
    const props = defineProps({
        roomId: {
        type: Number,
        required: true,
        },
    });
    
    const selectedDate = ref(dayjs());
    const backendData = ref({});
    const today = computed(() => dayjs().format('YYYY-MM-DD'));
    
    const getWeekday = (date) => dayjs(date).weekday();
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
        try {
        const response = await axiosapi.get('/hotel/backend/roomAssignment');
        const roomData = response.data.reduce((acc, room) => {
            const date = dayjs(room.date).format('YYYY-MM-DD');
            if (!acc[date]) acc[date] = [];
            acc[date].push(room);
            return acc;
        }, {});
        backendData.value = roomData;
        } catch (error) {
        console.error('Failed to fetch room assignment data:', error);
        }
    };
    
    onMounted(() => {
        fetchData();
    });
    
    const updateDate = (newDate) => {
        selectedDate.value = newDate;
        fetchData();
    };
    </script>
    
    <style scoped>
    .calendar-container {
        margin-bottom: 2rem;
        border: 1px solid #cccdd8;
        padding: 1rem;
        background-color: #fff;
        border-radius: 5px;
    }
    
    h2 {
        color: #514644;
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
        background-color: #cccdd8;
    }
    
    .date-cell {
        padding: 10px;
        border: 1px solid #A5B7C1;
        background-color: #DBDBE5;
        position: relative;
    }
    
    .date-cell.current {
        background-color: #cccdd8;
    }
    
    .date-cell.today {
        background-color: #A5B7C1;
    }
    
    .data-content {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
    </style>
    