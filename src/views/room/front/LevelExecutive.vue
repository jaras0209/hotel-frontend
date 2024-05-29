<template>
    <FrontNavBar></FrontNavBar>
    <swiper :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
    }" :speed="600" :parallax="true" :pagination="{
        clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">
      <div slot="container-start" class="parallax-bg" :style="{
          'background-image':
              'url(http://www.han-hsien.com.tw/images/urban/room/room_20180807_01290475.jpg)',
      }" data-swiper-parallax="-23%"></div>
      <swiper-slide>
        <div class="title" data-swiper-parallax="-300">商務樓層</div>
        <div class="subtitle" data-swiper-parallax="-200">介紹</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            備有商務貴賓軒為您直接辦理住宿服務，
            並提供多項商務服務，
            不僅能夠隨時掌握商機，
            更能得到充份完全的休憩品質。
          </p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="title" data-swiper-parallax="-300">商務樓層</div>
        <div class="subtitle" data-swiper-parallax="-200">設備</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            電腦自動門鎖
            全功能五段式空調設備
            50吋液晶電視
            客房專用保險箱
            精緻大理石建材之衛浴設備
          </p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="title" data-swiper-parallax="-300">商務樓層</div>
        <div class="subtitle" data-swiper-parallax="-200">服務</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            IDD雙線國際直撥電話及語音留言系統
            寬頻網際網路
            冰箱及MINI酒吧
            快速洗衣服務
            中文及國際性報紙、雜誌
          </p>
        </div>
      </swiper-slide>
    </swiper>
    <Footer></Footer>
  </template>
  
  <script setup>
  // Import Swiper Vue.js components
  import FrontNavBar from '../../FrontNavBar.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import Footer from '@/components/room/Footer.vue';
  
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  
  import './style.css';
  
  // Import required modules
  import { Parallax, Pagination, Navigation } from 'swiper/modules';
  
  const modules = [Parallax, Pagination, Navigation];
  </script>
