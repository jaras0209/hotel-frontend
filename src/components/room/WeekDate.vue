<template>
  <div>
    <ol class="week">
      <li v-for="weekday in weekDates" :key="weekday">{{ weekday }}</li>
    </ol>
  </div>
</template>

<script setup>
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const weekDates = week;
</script>

<style scoped>
.week {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.week li {
  flex: 1;
  text-align: center;
}
</style>
