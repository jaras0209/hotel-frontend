<template>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6 class="footer_title"></h6>
              <RouterLink class="navbar-brand hotel" to="/">
                <img src="/Logo.png" alt="Logo" class="brand-logo">
                <div class="hotel-text">&nbsp;&nbsp;FreeRelx HOTEL</div>
              </RouterLink>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6 class="footer_title">
                <font-awesome-icon :icon="['fas', 'house']" />&nbsp;房型 Links
              </h6>
              <div class="row">
                <div class="col-12">
                  <ul class="list_style">
                    <li>
                      <RouterLink class="nav-link" to="/room/front/standard">
                        <font-awesome-icon :icon="['fas', 'bed']" /> 標準
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink class="nav-link" to="/room/front/executive">
                        <font-awesome-icon :icon="['fas', 'business-time']" /> 商務
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink class="nav-link" to="/room/front/deluxe">
                        <font-awesome-icon :icon="['fas', 'bed']" /> 尊榮
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6 class="footer_title">
                <font-awesome-icon :icon="['fas', 'location-dot']" />&nbsp;交通資訊
              </h6>
              <p>100 台北市大安區</p>
              <div id="mc_embed_signup">
                <!-- <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscribe_form relative">
                  <div class="input-group d-flex flex-row">
                    <input name="EMAIL" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address'" required="" type="email">
                    <button class="btn sub-btn"><span class="lnr lnr-location"></span></button>
                  </div>
                  <div class="mt-10 info"></div>
                </form> -->
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <h6 class="footer_title">
                <font-awesome-icon :icon="['fas', 'user']" />&nbsp;員工專區
              </h6>
              <ul class="list_style">
                <li><RouterLink class="nav-link" to="/backend/login">員工登入</RouterLink></li>
              </ul>
              <div id="mc_embed_signup"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faHouse, faBed, faBusinessTime, faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { RouterLink } from 'vue-router';
  
  library.add(faHouse, faBed, faBusinessTime, faLocationDot, faUser);
  </script>
  
  <style scoped lang="scss">
  footer {
    background-color: #333;
    padding: 20px 0;
    color: #fff;
  
    .footer_title {
      color: #fff;
      font-size: 16px;
      margin-bottom: 15px;
    }
  
    .brand-logo {
      width: 30%;
      border-radius: 20px;
    }
  
    .hotel-text {
      font-family: "Dancing Script", cursive;
      font-optical-sizing: auto;
      font-weight: 700;
      font-style: normal;
      color: #fff;
      display: block;
    }
  
    .single-footer-widget {
      margin-bottom: 20px;
    }
  
    .list_style {
      list-style: none;
      padding: 0;
      margin: 0;
  
      li {
        margin-bottom: 10px;
  
        .nav-link {
          color: #fff;
          text-decoration: none;
  
          &:hover {
            color: #ccc;
          }
        }
      }
    }
  
    .subscribe_form {
      .input-group {
        display: flex;
        flex-wrap: nowrap;
      }
  
      input[type="email"] {
        border: 1px solid #ccc;
        border-radius: 5px 0 0 5px;
        padding: 10px;
        flex: 1;
      }
  
      .btn {
        background-color: #555;
        border: none;
        border-radius: 0 5px 5px 0;
        padding: 10px 20px;
        cursor: pointer;
  
        &:hover {
          background-color: #777;
        }
      }
    }
  
    .mt-10 {
      margin-top: 10px;
    }
  }
  </style>
  