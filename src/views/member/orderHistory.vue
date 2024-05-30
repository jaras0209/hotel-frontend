<template>
    <NavigationBar></NavigationBar>
    <div class="box">
        <h2>訂房紀錄</h2>
        <div class="row justify-content-end">
            <div class="col-4">
                <span v-if="totalData<=0">查無資料</span>
                <span v-else>查到 {{totalData}} 筆資料</span>
            </div>
            <div class="col-4">
                <span>一次查詢 </span>
                <select name="" id="" v-model="dataNUM" @change="callFind(1)">
                    <option v-for="num in 15" :key="num">{{ num }}</option>
                </select>
                <span> 筆資料</span>
            </div>
        </div>
        
        <table>
            <tr>
                <th>訂房時間</th>
                <th>大人人數</th>
                <th>小孩人數</th>
                <th>房間數</th>
                <th>金額</th>
                <th>入住時間</th>
                <th>預定狀態</th>
                <th>狀態時間</th>
            </tr>
            <tr v-for="order in orders" :key="order.orderDate">
                <td>{{ order.orderDate }}</td>
                <td>{{ order.adultPax }}</td>
                <td>{{ order.childPax }}</td>
                <td>{{ order.roomAmount }}</td>
                <td>NT$ {{ order.basePrice }}</td>
                <td>{{ order.arrivateDate }}</td>
                <td>{{ order.reservationStatus }}</td>
                <td>{{ order.reservationSaDate }}</td>
            </tr>
        </table>
        <Paginate
            :first-last-button="true" 
            first-button-text="&lt;&lt;" 
            last-button-text="&gt;&gt;"
            prev-text="&lt;" next-text="&gt;"
            :initial-page="initialPage"
            :page-count="pages"   
            :click-handler="callFind"
        ></Paginate>
    </div>
    
</template>
    
<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import { ref, onMounted } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import Paginate from 'vuejs-paginate-next';

    const orders = ref(null);
    const memberId = sessionStorage.getItem("userId");
    const totalData = ref(0);
    const dataNUM = ref(3);
    const initialPage = ref(1);
    const pages = ref(1);

        //--------------------------------------------------
    // 使用 Proxy 處理數據
    // const handler = {
    //     set(target, property, value) {
    //         console.log(`Setting ${property} to ${value}`);
    //         target[property] = value;
    //         return true;
    //     },
    //     get(target, property) {
    //         console.log(`Getting ${property}`);
    //         return target[property];
    //     }
    // };

    // const proxyData = new Proxy(orders.value, handler);

//-----------------------------

    function callFind(page){
        console.log("目前葉面",page)
        console.log("dataNUM.value",dataNUM.value);
        if (page){
            initialPage.value = page;
            console.log(page)
            console.log("heheheh")
        }else{
            console.log("hahaha")
            initialPage.value = 1;
        }
        axiosapi.get(`hotel/members/OrderRooms/${memberId}?p=${initialPage.value}&num=${dataNUM.value}`).then(function (response){
            console.log("data", response.data.length);
            orders.value = response.data;
            pages.value = Math.ceil(totalData.value/dataNUM.value);
            console.log("pages.value",pages.value);
            console.log("dataNUM.value",dataNUM.value);
            console.log("initialPage.value", initialPage.value)
        }).catch(function (error){
            console.log(error);
        })
    }
    function callFindTotal(){
        axiosapi.get(`hotel/members/OrderRooms/totals/${memberId}`).then(function (response){
            console.log("data_total", response.data.total);
            totalData.value = response.data.total;

        }).catch(function (error){
            console.log(error);
        })
    }

    onMounted(function (){
        callFindTotal();
        callFind();
        
    })

</script>
    
<style scoped>
    .box{
        margin-top: 20px;
        text-align: center;
    }
    table{
        border-collapse:collapse;
    }
    th{
        background-color:#059b28;
        color:#ffffff;
        width:25vw;
        height:75px;
    }
    td{
        background-color:#ffffff;
        width:25vw;
        height:50px;
        text-align:center;
    }
    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>