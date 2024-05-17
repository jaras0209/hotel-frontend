<template>
    <swiper :loop="true" :navigation="true" :modules="modules" :pagination="{ clickable: true }" :slides-per-view="1"
        :space-between="30" @slideChange="onSlideChange" class="mySwiper">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import custom Styles
import "./room-style.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSlideChange = (swiper) => {
            console.log("slide change", swiper.activeIndex);
        };
        return {
            onSlideChange,
            modules: [Autoplay, Navigation, Pagination],
        };
    },
};
</script>
<style>
.swiper-container {
    max-width: 600px !important;
    /* 設定 container 的最大寬度 */
    margin-left: auto !important;
    margin-right: auto !important;
}

.swiper-slide {
    width: auto !important;
    /* 讓圖片保持原始大小 */
    margin: 0 auto !important;
    /* 讓圖片水平置中 */
}

.swiper-slide img {
    max-width: 100% !important;
    /* 圖片最大寬度為 container 的寬度 */
    height: auto !important;
    /* 保持圖片的原始高寬比 */
}
</style>