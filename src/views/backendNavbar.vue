<template>
    <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand hotel" href="#"><img src="/logo.png" alt="Logo" style="width:40px; border-radius: 40px;">FreeRelx HOTEL Backend</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">FreeRelx HOTEL</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/home">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/orderRoom">OrderRoom</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/roomService">Room Service</RouterLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" v-if="employee!=null">
                    歡迎 {{employee}}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" @click="logout">登出</a></li>
                    </ul>
                </li>
                </ul>
                <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </div>
    </nav>
</template>
    
<script setup>
    import { useRouter } from 'vue-router';
    import store from '@/store/index.js';
    import { onMounted } from 'vue';
    import axiosapi from '@/plugins/axios.js';

    const router = useRouter();
    const employee = sessionStorage.getItem('employee');
    const employeeId = sessionStorage.getItem('employeeId');

    function logout() {

        sessionStorage.removeItem('employee');
        sessionStorage.removeItem('position');
        // router.push({name:"backend-login-link"})
        // 使用 window.location.href 是為了確保網頁狀態全部重置
        store.dispatch('logout'); //store.commit('setAuthentication', false);
        window.location.href = '/backend/login';
    }

    function callFind(){
        axiosapi.get(`hotel/member/${userId}`).then(function (response){
            // console.log("response",response);
            // userData.value = response.data;
            Object.assign(proxyData, response.data);
            // console.log("userData.value",response.data.birth);
            console.log("userData.value",userData.value)
            console.log("userData.value", typeof(userData.value.contactAddress))
        }).catch(function (){
            
        })
    }

    onMounted(function(){

    })
</script>
    
<style scoped>
    @import '../assets/style/all.scss';
    .hotel{
        font-family: "Dancing Script", cursive;
        font-optical-sizing: auto;
        font-weight:weight;
        font-style:normal;
    }
</style>