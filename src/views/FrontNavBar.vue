<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <RouterLink class="navbar-brand hotel" to="/room/front/frontIndex">
        <img src="/logo.png" alt="Logo" class="brand-logo">&nbsp;&nbsp;FreeRelx HOTEL
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/room/roomInfo" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">客房介紹</a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/room/front/standard">標準客房</RouterLink>
                <RouterLink class="dropdown-item" to="/room/front/executive">商務客房</RouterLink>
                <RouterLink class="dropdown-item" to="/room/front/deluxe">尊榮套房</RouterLink>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/front/roomView">roomView</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/front/minibar">RoomService</RouterLink>
          </li>
          
          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/front/checkAvailability">空房查詢</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/front/reviews">住客評語</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/front/booking">線上訂房</RouterLink>
          </li>
          
          <li class="nav-item" v-if="!user">
            <RouterLink class="nav-link" to="/member/login">登入/註冊</RouterLink>
          </li>

          <li class="nav-item dropdown" v-if="user">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              哈囉! {{ user }}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click="doclickShow">資料修改</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="logout">登出</a></li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
    <MemberModal ref="memberRef"></MemberModal>
  </nav>
</template>

<script setup>
import axiosapi from '@/plugins/axios.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import MemberModal from '@/components/member/MemberModal.vue';

const router = useRouter();
const user = ref(sessionStorage.getItem('user'));
const memberRef = ref(null);

function logout() {
  sessionStorage.removeItem('user');
  axiosapi.defaults.headers.authorization = '';
  router.go(0);
}

function doclickShow() {
  memberRef.value.showModal();
}
</script>

<style scoped>
@import '../assets/style/all.scss';

.custom-navbar {
  background-color: #cccdd8;
}

.hotel {
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  color: #514644;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(83, 93, 85, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.navbar-dark .navbar-nav .nav-link {
  color: #514644;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: #A5B7C1;
}

.navbar-dark .navbar-nav .dropdown-menu {
  background-color: #A5B7C1;
  color: #514644;
}

.navbar-dark .navbar-nav .dropdown-menu .dropdown-item {
  color: #514644;
}

.navbar-dark .navbar-nav .dropdown-menu .dropdown-item:hover {
  background-color: #DBDBE5;
}

.navbar-dark .navbar-nav .dropdown-menu .dropdown-divider {
  border-color: #535D55;
}

.brand-logo {
  width: 40px;
  border-radius: 40px;
}

.btn-primary {
  background-color: #514644;
  border-color: #514644;
}

.btn-primary:hover {
  background-color: #535D55;
  border-color: #535D55;
}
</style>
