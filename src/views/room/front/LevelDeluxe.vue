    <template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
    <swiper :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
    }" :speed="600" :parallax="true" :pagination="{
        clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">
        <div slot="container-start" class="parallax-bg" :style="{
            'background-image':
                'url(https://www.sheratongrandtaipei.com/files/pages_15973110501159uwd27_l.jpg)',
        }" data-swiper-parallax="-23%"></div>
        <swiper-slide>
            <div class="title" data-swiper-parallax="-300">尊榮套房</div>
            <div class="subtitle" data-swiper-parallax="-200">介紹</div>
            <div class="text" data-swiper-parallax="-100">
                <p>
                    對偏好高格調與豪華空間的您，
                    漢來備有各式套房，
                    雙套衛生設備與獨立寬敞的客廳，
                    讓您更方便接待您的訪客。
                </p>
            </div>
        </swiper-slide><swiper-slide>
            <div class="title" data-swiper-parallax="-300">尊榮套房</div>
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
        </swiper-slide><swiper-slide>
            <div class="title" data-swiper-parallax="-300">尊榮套房</div>
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