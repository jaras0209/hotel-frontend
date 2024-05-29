<template>
    <div class="form">
      <div class="form-box">
        <img :src="require('../assets/img/icons/close.png')" class="form-close" alt="" @click="$emit('closeForm')" />
        <h1>{{ currentRoom.name }}</h1>
        <p>價格： {{ totalPrice || todayPrice | currency }}</p>
        <form @submit.prevent="submitForm">
          <input v-model="name" type="text" placeholder="姓名" required />
          <input v-model="phone" type="tel" placeholder="電話號碼" required />
          <div class="dateCheck-calendar">
            <DatePicker
              :value="null"
              :columns="$screens({ default: 1, lg: 2 })"
              :min-date="new Date(new Date().getTime() + 24 * 60 * 60 * 1000)"
              :max-date="maxDay"
              :disabled-dates="disableDates"
              color="primary"
              v-model="range"
              is-expanded
              is-range
            ></DatePicker>
          </div>
          <button type="submit">確認送出</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import DatePicker from "v-calendar/lib/components/date-picker.umd";
  
  const props = defineProps(['currentRoom', 'maxDay', 'range', 'disableDates']);
  
  const name = ref("");
  const phone = ref("");
  
  const totalDays = computed(() => {
    var day1 = new Date(props.range.start);
    var day2 = new Date(props.range.end);
    var difference = Math.abs(day2 - day1);
    return parseInt(difference / (1000 * 3600 * 24) + 1);
  });
  
  const totalPrice = computed(() => {
    var day1 = new Date(props.range.start);
    var difference = totalDays.value - 1;
    var remainDay = difference % 7;
    var weeks = Math.floor(difference / 7);
    var weekends = 2 * weeks;
    var weekDay = day1.getDay();
    for (var i = 0; i < remainDay; i++) {
      if (weekDay + i == 5 || weekDay + i == 6 || weekDay + i == 0 || weekDay + i == 7) {
        weekends += 1;
      }
    }
    const normalD = difference - weekends;
    return normalD * props.currentRoom.normalDayPrice + (totalDays.value - normalD - 1) * props.currentRoom.holidayPrice;
  });
  
  const todayPrice = computed(() => {
    const week = new Date().getDay();
    return week == 0 || week >= 5 ? props.currentRoom.holidayPrice : props.currentRoom.normalDayPrice;
  });
  
  const submitForm = () => {
    const formData = {
      name: name.value,
      phone: phone.value,
      date: `${props.range.start} to ${props.range.end}`
    };
  
    fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${props.currentRoom.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        alert("預訂成功");
        name.value = "";
        phone.value = "";
        props.$emit("closeForm");
        props.$emit("reloadComponents");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  </script>
  