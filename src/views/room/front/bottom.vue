<template>
        <FrontNavBar></FrontNavBar>
  <div>
    <button @click="openBookingDialog">預約房間</button>
    <BookingDialog
      v-if="isBookingDialogVisible"
      @closeBookingDialog="closeBookingDialog"
      @confirmBooking="confirmBooking"
      :datesHaveBeenBooked="bookedDates"
      :normalDayPrice="normalDayPrice"
      :holidayPrice="holidayPrice"
    />
  </div>
  <div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import FrontNavBar from '@/views/FrontNavBar.vue';
import { ref } from 'vue';
import BookingDialog from '@/components/room/BookingDialog.vue';
import Footer from '@/components/room/Footer.vue';

// 預約房間的數據
const isBookingDialogVisible = ref(false);
const bookedDates = ref({
  dates: [new Date('2024-05-21'), new Date('2024-05-22'), new Date('2024-06-01')]
});
const normalDayPrice = ref(2000); // 平日價格
const holidayPrice = ref(2500);  // 假日價格

const openBookingDialog = () => {
  isBookingDialogVisible.value = true;
};

const closeBookingDialog = () => {
  isBookingDialogVisible.value = false;
};

const confirmBooking = (bookingInfo) => {
  console.log('確認預約信息：', bookingInfo);
  // 這裡可以添加保存預約信息的邏輯，比如發送到後端
  closeBookingDialog();
};
</script>


<style scoped>
button {
  padding: 10px 20px;
  background-color: #f15112;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d84315;
}
</style>
