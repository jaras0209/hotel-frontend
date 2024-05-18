<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="red">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">ooo HOTEL</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <form class="d-flex justify-content-center" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul class="navbar-nav  mb-2 mb-lg-0 ms-auto"> <!-- me-auto -->
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/room/roomInfo" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">客房介紹</a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class=" active dropdown-item" to="/room/roomInfo">Room Infomation</RouterLink>
                                <RouterLink class=" active dropdown-item" to="/room/deluxe">Deluxe</RouterLink>
                                <RouterLink class=" active dropdown-item" to="/room/executive">Executive</RouterLink>
                                <RouterLink class=" active dropdown-item" to="/room/standard">Standard</RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/room/minibar">Room Server</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            起始網頁
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class=" active dropdown-item" to="/supplier/allsupplier">合作夥伴(後端)
                                </RouterLink>
                                <RouterLink class=" active dropdown-item" to="/shopping/shoppinglist">
                                    <font-awesome-icon :icon="['fas', 'shop']" /> &nbsp;&nbsp;商城
                                </RouterLink>
                                <RouterLink class=" active dropdown-item" to="/shopping/cart">
                                    <font-awesome-icon :icon="['fas', 'cart-shopping']" />&nbsp;&nbsp;&nbsp;購物車
                                </RouterLink>
                                <RouterLink class=" active dropdown-item" to="/shopping/myorder">
                                    <font-awesome-icon :icon="['fas', 'truck-fast']" />&nbsp;&nbsp;&nbsp;訂單查詢
                                </RouterLink>
                            </li>
                            <li><a class="dropdown-item">link1</a></li>
                            <li><a class="dropdown-item">link2</a></li>
                            <li><a class="dropdown-item">link3</a></li>
                        </ul>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>

                    <li class="nav-item" v-if="user==null">
                        <RouterLink class="nav-link" to="/member/login">登入/註冊{{ user }}</RouterLink>
                    </li>

                    <li class="nav-item dropdown" v-if="user!=null">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            哈囉! {{ user }}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" @click="logout">登出</a></li>
                        </ul>
                    </li>
        
                </ul>

            </div>
        </div>
    </nav>
    <MemberModal ref="memberRef"></MemberModal>
</template>

<script setup>
    import axiosapi from '@/plugins/axios.js';
    // import MemberModal from '@/components/MemberModal';
    import { useRouter } from "vue-router"
    import { ref } from 'vue';
    const router = useRouter();
    const user = sessionStorage.getItem("user");
    const memberRef = ref(null);
    function logout(){
        sessionStorage.removeItem("user");
        axiosapi.defaults.headers.authorization='';
        router.go(0);
    }

    // function doclickShow(){

    // }
</script>

<style></style>