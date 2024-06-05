<template>
    <backendNavbar></backendNavbar>
    <div class="box">
        <h2>所有訂房狀態</h2>
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
                <th>訂房人</th>
                <th>身分證字號</th>
                <th>電話</th>
                <th>大人人數</th>
                <th>小孩人數</th>
                <th>預計入住時間</th>
                <th>預計退房時間</th>
                <th>訂單狀態</th>
                <th>明細</th>
            </tr>
            <tr v-for="order in orders" :key="order.order_id">
                <td>{{ order.orderdate}}</td>
                <td>{{ order.order_person_name}}</td>
                <td>{{ order.national_id }}</td>
                <td>{{ order.phone_number }}</td>
                <td>{{ order.adult_pax }}</td>
                <td>{{ order.child_pax }}</td>
                <td>{{ order.arrival_date }}</td>
                <td>{{ order.checkout_date }}</td>
                <td>{{ order.reservation_status }}</td>
                <td><a class="btn btn-outline-info" @click="callShowDetail(order)">詳細資料</a></td>
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
    <OrderRoomModal 
        ref="orderomRef"
        :same-person="samePerson"
        :identity="identity"
        :living-email="livingEmail"
        :living-name="livingName"
        :living-nation-id="livingNationId"
        :living-phone="livingPhone"
        :room-name="roomName"
        :order-price="orderPrice"
    ></OrderRoomModal>
</template>
    
<script setup>
    import backendNavbar from '../backendNavbar.vue';
    import { ref, onMounted } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import Paginate from 'vuejs-paginate-next';
    import OrderRoomModal from '@/components/backend/orderRoomModal.vue'

    const orders = ref(null);
    // const memberId = sessionStorage.getItem("userId");
    const totalData = ref(0);
    const dataNUM = ref(3);
    const initialPage = ref(1);
    const pages = ref(1);

    const orderomRef = ref(null);

    //Modaly 資料
    const identity = ref('');
    const samePerson = ref('');
    const livingName = ref('');
    const livingNationId = ref('');
    const livingPhone = ref('');
    const livingEmail = ref('');
    const roomsData = ref('');
    const orderPrice = ref(null);
    const roomName = ref(null);
    const roomAmount = ref(null);

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
    
    function callShowDetail(order){
        orderomRef.value.showModal();
        if (order.member_id!='null'){
            identity.value = '會員';
        }else {
            identity.value = '一般顧客';
        }
        if (order.stay_person_Email){
            samePerson.value = '否';
            livingName.value = order.stay_person_name;
            livingEmail.value = order.stay_person_Email;
            livingNationId.value = order.stay_person_national_id;
            livingPhone.value = order.stay_person_phone;
        }else{
            samePerson.value = '是'
            livingName.value = null;
            livingEmail.value = null;
            livingNationId.value = null;
            livingPhone.value = null;
        }
        roomAmount.value = order.room_type_amount;
        axiosapi.get(`hotel/orderRoom/datas/${order.order_id}`).then(function (response){
            if (response.data.success){
                console.log(response.data.roomInfoData);
                roomsData.value = response.data.roomInfoData;
                roomsData.value = roomsData.value.split(',');
                orderPrice.value = roomsData.value[0].split('.')[0]; //sessionStorage.getItem("orderTotalAmount");

                roomName.value = roomsData.value[3];//sessionStorage.getItem("productName");
            }
        })
    }

    function callFind(page){
        console.log("目前頁面",page)
        console.log("dataNUM.value",dataNUM.value);
        if (page){
            initialPage.value = page;
            console.log(page)
            console.log("heheheh")
        }else{
            console.log("hahaha")
            initialPage.value = 1;
        }
        axiosapi.get(`hotel/orderRoom/page?p=${initialPage.value}&num=${dataNUM.value}`).then(function (response){
            console.log("data", response.data.length);
            console.log("response.data.data", response.data.data);
            totalData.value = response.data.totalNumber;
            orders.value = response.data.data;
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
        // callFindTotal();
        callFind();
        
    })

</script>
    
<style scoped>
    .box{
        margin-top: 100px;
        text-align: center;
    }
    table{
        border-collapse:collapse;
    }
    th{
        background-color:#859b05;
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