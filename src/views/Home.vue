<template>
<NavigationBar></NavigationBar>
    <body>
        <!-- 不用了 -->
        <!-- <header>
            HEADER
        </header> -->
        <div class="main">
            <!-- <aside class="left">
                LEFT
            </aside> -->
            <main>
                <span id="titleIndex">歡迎來到FreeRelx HOTEL，我們期待為您提供卓越的服務，讓您在此度過每一個美好時刻</span>
                <div class="row g-0 position-relative" >
                <div id="carouselExample" class="carousel slide " data-bs-ride="carousel" data-bs-wrap="true" data-bs-interval="1800">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="1000">
                        <img src="@/assets/images/home1.jpg" class="d-block w-100" alt="...">
                        </div>
                        <!-- <div class="carousel-item " data-bs-interval="200">
                        <img src="@/assets/images/home2.jpg" class="d-block w-100" alt="..." >
                        </div>
                        <div class="carousel-item">
                        <img src="@/assets/images/home3.jpg" class="d-block w-100" alt="...">
                        </div> -->
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="false"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            </main>
            <aside class="right">
                <p id="introduction">&nbsp;&nbsp;&nbsp;&nbsp;FreeRelx HOTEL，顧名思義，是一個讓您逃離生活和工作壓力的理想之地。
                    在這裡，您可以徹底放鬆、重新充電，為新的挑戰做好準備。
                    我們致力於為每位客人提供舒適與便捷的服務，
                    讓您在這片寧靜的綠洲中找到內心的平衡。</p>
                <p id="introduction">
                    &nbsp;&nbsp;&nbsp;&nbsp;我們的飯店提供多樣化的服務，涵蓋舒適的客房預訂、精緻的飯店商品購物如年菜，以及一流的場地，
                    我們的會議室和宴會廳是舉辦商務會議、活動和婚宴的完美選擇
                    ，無論是工作需求還是個人慶祝，都能在此得到滿足。
                </p>
            </aside>
        </div>
    </body>
    <footer>
        <div class="container">
                <div class="row">
                    <div class="col-lg-3  col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title"></h6>
                            <img src="/logo.png" alt="Logo" style="width:75%; border-radius: 40px;">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title"><font-awesome-icon :icon="['fas', 'house']" />&nbsp;房型 Links</h6>
                            <div class="row">
                                <div class="col-4">
                                    <ul class="list_style">
                                        <li><a href="#"><font-awesome-icon :icon="['fas', 'bed']" />&nbsp;標準</a></li>
                                        <li><a href="#"><font-awesome-icon :icon="['fas', 'business-time']"/>&nbsp;商務</a></li>
                                        
                                    </ul>
                                </div>
                                <div class="col-4">
                                    <ul class="list_style">
                                        <li><a href="#"><font-awesome-icon :icon="['fas', 'bed']" />&nbsp;尊榮</a></li>
                                    </ul>
                                </div>	<font-awesome-icon :icon="['fas', 'landmark']"/>									
                            </div>							
                        </div>
                    </div>							
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title"><font-awesome-icon :icon="['fas', 'location-dot']" />&nbsp;交通資訊</h6>
                            <p>100 台北市大安區</p>		
                            <div id="mc_embed_signup">
                                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscribe_form relative">
                                    <div class="input-group d-flex flex-row">
                                        <!-- <input name="EMAIL" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address '" required="" type="email"> -->
                                        <!-- <button class="btn sub-btn"><span class="lnr lnr-location"></span></button>		 -->
                                    </div>									
                                    <div class="mt-10 info"></div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title"><font-awesome-icon :icon="['fas', 'user']" />&nbsp;員工專區</h6>
                            <ul class="list_style">
                                <li><RouterLink class="nav-link" to="/backend/login">員工登入</RouterLink></li>
                            </ul>	
                            <div id="mc_embed_signup">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    </footer>
</template>
<script setup>
import NavigationBar from './NavigationBar.vue';
import axiosapi from '@/plugins/axios.js';
console.log("axiosapi.defaults.headers.authorization",axiosapi.defaults.headers.authorization)

</script>
<style scoped>

@import '../assets/style/all.scss';
* {
    margin: 1px;
    box-sizing: border-box;
}

body {
    height: 95vh;
    background: #34e7e4;
    font-family: sans-serif;
    text-align: center;
    color: black;
    font-size: 16px;
    display: flex;
    flex-direction: column;
}

header {
    background: yellow;
    padding: 2em 0 2em 0;
}

.left {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 2 2 100px
}

main {
    background-image:linear-gradient(#8b8b8b, #a69c91);
    padding: 3em 0 3em 0;
    flex: 8 8 150px;
    text-align:center;
}

.main {
    display: flex;
    flex: 1;
    
}

.right {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 2 2 100px
}

footer {
    background: rgb(7, 4, 0);
}

@media all and (max-width: 550px) {
    .main {
        flex-direction: column;
    }

    main {
        padding: 5em 0 5em 0;
    }
}
.carousel-item {
  /* display: flex; */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.carousel-item img {
  width: 100%;
  height: 500px; /* 根據需求調整高度 */
  object-fit: cover; /* 保持圖片比例 */
}
.carousel-item-start{
    display: inline;
}
p{
    color: azure;
}
#titleIndex{
    color: rgb(230, 232, 198);
    font-style: italic;
    font-size: 1.5em;
    text-shadow: 5px 5px 5px rgb(167, 147, 59);
    margin-bottom: 30px;
}
#introduction{
    line-height: 1.9;
    font-size: 16px;
    text-align: justify;
    font-family: 微軟正黑體;
    padding-left: 15px;
    padding-right: 15px;
    color: rgb(239, 87, 87);
}
</style>