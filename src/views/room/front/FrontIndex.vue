<template>
    <FrontNavBar class="sticky-top"></FrontNavBar>
          <div  class="row">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
          <div class="carousel-inner">
              <div class="carousel-item active">
              <img src="@/assets/front/01.jpg" class="d-block w-100" alt="First slide">
              </div>
              <div class="carousel-item">
              <img src="@/assets/front/02.jpg" class="d-block w-100" alt="Second slide">
              </div>
              <div class="carousel-item">
              <img src="@/assets/front/03.jpg" class="d-block w-100" alt="Third slide">
              </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
          </button>
          </div>
      
          <div class="intro-section">
              <div class="row">
              <div class="col-sm-4">
          <h2>讓您的每一次重要時刻都完美無瑕</h2>
      </div>
          <div class="col-sm-8">
              <br>
          <p>在FreeRelx HOTEL，我們深知生活和工作的壓力可能會讓您感到疲憊不堪。因此，我們致力於為您打造一個遠離繁忙日常、徹底放鬆身心的理想天堂。在這裡，您可以重新充電，迎接新的挑戰。</p>
      </div>    
      </div>
  </div>
      </div>
      
          <div class="promo-section">
          <h2>找尋專屬於您的優惠方案</h2>
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
              <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
              <div class="carousel-item active">
                  <img src="@/assets/front/04.jpg" class="d-block w-100" alt="...">
                  <div class="carousel-caption">
                  <h5>新用卡優惠</h5>
                  <p>全卡友9折 *Visa信用卡於每月15日開放預訂，名額有限，若優惠名額已滿時，仍享有全卡友7%折扣。</p>
                  </div>
              </div>
              <div class="carousel-item">
                  <img src="@/assets/front/05.jpg" class="d-block w-100" alt="...">
                  <div class="carousel-caption">
                  <h5>KKBOX – 申辦指定專案享前3個月免費優惠</h5>
                  <p>音樂與 Podcast 華語、西洋、日語、韓語各語系音樂隨點即播；獨家 Podcast 節目與多元策展，讓你聽到停不下來。</p>
                  </div>
              </div>
              <div class="carousel-item">
                  <img src="@/assets/front/06.jpg" class="d-block w-100" alt="...">
                  <div class="carousel-caption">
                  <h5>公股銀行辦理青年安心成家購屋優惠貸款</h5>
                  <p>貸款年限及償還方式：貸款年限最長40年，含寬限期5年，本息分期平均攤還或本金分期平均攤還。</p>
                  </div>
              </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
              </button>
          </div>
      </div>
      <Footer></Footer>
      </template>
      
      <script setup>
      import FrontNavBar from '../../FrontNavBar.vue';
      import Footer from '@/components/room/Footer.vue';
  
      </script>
      
      <style scoped>
      
      body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #fff;
          color: #333;
      }
      
      .container {
          max-width: 1200px;
          margin: 0 auto;
      }
      
      /* Carousel Styles */
      .carousel-item img {
          height: 500px;
          object-fit: cover;
      }
      
      .carousel-control-prev-icon,
      .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.5);
      }
      
      .carousel-indicators button {
          background-color: rgba(0, 0, 0, 0.5);
          border-color: #fff;
      }
      
      .carousel-caption {
          background-color: rgba(0, 0, 0, 0.5);
      }
      
      .carousel-caption h5,
      .carousel-caption p {
          color: #fff;
      }
      
      /* Text Styles */
      h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          font-weight: 600;
      }
      
      p {
          font-size: 1rem;
          line-height: 1.5;
      }
      
      /* Section Styles */
      .intro-section, .promo-section {
          margin: 20px 0;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 5px;
      }
      
      .promo-section h2 {
          margin-bottom: 10px;
      }
      </style>
      