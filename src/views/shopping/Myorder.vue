<template>
    <NavigationBar></NavigationBar>
    <!-- 0529 -->

    <body>
        <div class="main">
            <aside class="left">
            </aside>
            <main>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">訂單編號</th>
                            <th scope="col">訂單日期</th>
                            <th scope="col">訂單狀態</th>
                            <th scope="col">抵達日期</th>
                            <th scope="col">總價</th>
                            <th scope="col">使用紅利</th>
                            <th scope="col">增加紅利</th>
                        </tr>
                        <MyorderComponents v-for="result in result" :total="result.total" :AddedTime="result.AddedTime"
                            :Orderstatus="result.Orderstatus" :orderid="result.orderid"
                            :arriveddTime="result.arriveddTime" :usebonus="result.usebonus" :addbonus="result.addbonus">
                        </MyorderComponents>
                    </thead>
                </table>
            </main>
            <aside class="right">
            </aside>
        </div>
    </body>
    <footer>
    </footer>
</template>

<script setup>
import NavigationBar from '../NavigationBar.vue';
import MyorderComponents from '@/components/shopping/MyorderComponents.vue';
import { ref, onMounted } from "vue";
import axiosapi from "@/plugins/axios.js"
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';

const result = ref({})
const userId = ref(null)
const token = sessionStorage.getItem("token");
const router = useRouter();

onMounted(function () {
    userId.value = sessionStorage.getItem("userId")
    myorder()
})
function myorder() {
    axiosapi.get(`/hotel/orders/mes/${userId.value}`,{ headers: {"Authorization" : `Bearer ${token}`} }).then(function (response) {
        console.log(response);
        result.value = response.data.list
        console.log(result.value)
    }).catch(function (error) {
        console.log("callFindById error", error);
        Swal.fire({
            text: '請登入',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(function (){
            if (error.response.status==403){
                sessionStorage.clear();
                router.push({name:"login-link"})
            }
        })
    });
}
</script>
<style scoped>
* {
    margin: 1px;
    box-sizing: border-box;
}

body {
    height: 95vh;
    background: #34e7e4;
    font-family: sans-serif;
    text-align: start;
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
    flex: 1 1 100px
}

main {
    background: white;
    padding: 3em 0 3em 0;
    flex: 10 10 150px
}

.main {
    display: flex;
    flex: 1
}

.right {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 1 1 100px
}

footer {
    background: burlywood;
}

@media all and (max-width: 550px) {
    .main {
        flex-direction: column;
    }

    main {
        padding: 5em 0 5em 0;
    }
}
</style>