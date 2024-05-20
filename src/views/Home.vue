<template>

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
                MAIN CONTENT
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
                RIGHT
            </aside>
        </div>
    </body>
    <footer>
        <div class="container">
                <div class="row">
                    <div class="col-lg-3  col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title">About Agency</h6>
                            <p>The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title">Navigation Links</h6>
                            <div class="row">
                                <div class="col-4">
                                    <ul class="list_style">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Feature</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Portfolio</a></li>
                                    </ul>
                                </div>
                                <div class="col-4">
                                    <ul class="list_style">
                                        <li><a href="#">Team</a></li>
                                        <li><a href="#">Pricing</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>										
                            </div>							
                        </div>
                    </div>							
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title">Newsletter</h6>
                            <p>For business professionals caught between high OEM price and mediocre print and graphic output, </p>		
                            <div id="mc_embed_signup">
                                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscribe_form relative">
                                    <div class="input-group d-flex flex-row">
                                        <input name="EMAIL" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address '" required="" type="email">
                                        <button class="btn sub-btn"><span class="lnr lnr-location"></span></button>		
                                    </div>									
                                    <div class="mt-10 info"></div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title">員工專區</h6>
                            <RouterLink class="nav-link" to="/">後台登入</RouterLink>
                            <p>For business professionals caught between high OEM price and mediocre print and graphic output, </p>		
                            <div id="mc_embed_signup">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    </footer>
</template>
<script setup>

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
    flex: 8 8 150px
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
</style>