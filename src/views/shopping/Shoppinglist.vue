<template>
    <NavigationBar></NavigationBar>
    <!-- 0529 -->

    <body>
        <div class="main">
            <main>
                <h1 style="text-align: center;">商城首頁</h1>
                <div class="col-4">
                    <ProductRows :total="total" :choices="[5, 10]" @change="callFind" v-model="rows"></ProductRows>
                    <input type="text" v-model="findname" placeholder="請輸入關鍵字" @input="callFind(0)">
                </div>
                <div class="row">
                    <ShoppinglistCard v-for="one in all" :key="one.id" :item="one"></ShoppinglistCard>
                    <div v-show="total != 0">
                        <Paginate :first-last-button="true" first-button-text="&lt;&lt" last-button-text="&gt;&gt"
                            prev-text="&lt" next-text="&gt" :page-count="pages" :initial-page="current"
                            v-model="current" :click-handler="callFind">
                        </Paginate>
                    </div>
                </div>
            </main>

        </div>
    </body>
</template>

<script setup>
import NavigationBar from '../NavigationBar.vue';
import ShoppinglistCard from '@/components/shopping/ShoppinglistCard.vue';
import { ref, onMounted } from "vue";
import Swal from "sweetalert2"
import axiosapi from "@/plugins/axios.js"
import Paginate from 'vuejs-paginate-next';
import ProductRows from "@/components/shopping/ProductRows.vue";
import { ssrModuleExportsKey } from 'vite/runtime';
const all = ref({});
const pages = ref(100);
const current = ref(50);
const start = ref(0);
const rows = ref(5);
const total = ref(0);
const findname = ref("")
const userId = ref(null)
onMounted(function () {
    userId.value = sessionStorage.getItem("userId")
    callFind()
    callalert()
})
function callFind(page) {
    if (page) {   //第幾頁
        start.value = (page - 1) * rows.value; //塞數值
        current.value = page;
    } else {
        start.value = 0;
        current.value = 1;
    }
    if (findname.value === "") {
        findname.value = null
    }
    let data = {
        "start": start.value,
        "rows": rows.value,
        "productName": findname.value,
    }
    console.log(axiosapi.defaults.headers.authorization);
    axiosapi.post(`/hotel/products/find`, data).then(function (response) {
        console.log("count", response.data.count);
        console.log("response", response.data.list);
        all.value = response.data.list;
        //
        pages.value = Math.ceil(response.data.count / rows.value)
        //
        total.value = response.data.count
        setTimeout(function () {
            Swal.close();
        }, 500);
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(function (){
            if (error.response.status==403){
                router.push({name:"login-link"})
            }
        })


    });
}
function callalert() {
    let alert = {
        "memberid": userId.value
    }
    axiosapi.post("/hotel/alerts/find", alert).then(function (response) {
        console.log(response)
        for (let index = 0; index < response.data.list.length; index++) {
            console.log(response.data.list[index].alertmessage)
            setTimeout(() => {
                Swal.fire({
                    text: response.data.list[index].alertmessage,
                    icon: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                });
            }, 500);
        }
    }).catch(function (error) {
        console.log(error)
    })
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