<!-- src/components/Calendar.vue -->
<template>
    <v-date-picker v-model="selectedDate" :attributes="attributes"></v-date-picker>
  </template>
  
  <script>
  export default {
    name: 'Calendar',
    data() {
      return {
        selectedDate: null,
        attributes: [
          {
            key: 'today',
            highlight: true,
            dates: new Date(),
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* 這裡可以加入你的樣式 */
  </style>
  