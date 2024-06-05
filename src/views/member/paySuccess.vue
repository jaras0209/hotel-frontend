<template>
    <NavigationBar></NavigationBar>
    <div class="row justify-content-between">
        <h3>Pay Success</h3>
        <div class="order-info col-4">
        <img :src="productImage" alt="商品圖片" class="product-image">
        </div>
        <div class="details col-4">
            <p><strong>入住時間：</strong>{{ checkInDate }}</p>
            <p><strong>退房時間：</strong>{{ checkOutdate }}</p>
            
        </div>
        <div class="details col-4">
            <p><strong>商品名稱：</strong>{{ productName }}</p>
            <p><strong>訂單號碼：</strong>{{ orderId }}</p>
            <p><strong>價格：</strong>{{ singlePrice }} 元</p>
            <p><strong>數量：</strong>{{ productQuality }} 間</p>
            <p><strong>天數：</strong>{{ days-1 }} 個夜晚</p>
            <p><strong>總計：</strong>{{ orderPrice }} 元</p>
        </div>
    </div>
    
</template>
    
<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import axiosapi from '@/plugins/axios.js';
    import { ref, onMounted } from 'vue';
    import Swal from 'sweetalert2';

    const productImage = sessionStorage.getItem("productPicture");
    const orderPrice = sessionStorage.getItem("orderTotalAmount");
    const orderId = "RnJlZVJlbHggSE9URUw_"+sessionStorage.getItem("orderId");
    const productName = sessionStorage.getItem("productName");
    const productQuality = sessionStorage.getItem("productQuality");
    const singlePrice = sessionStorage.getItem("singlePrice");
    const checkInDate = sessionStorage.getItem("arrival_date");
    const checkOutdate = sessionStorage.getItem("checkout_date");
    const days = sessionStorage.getItem('days');

    function confirmLine(){
        Swal.fire({
            text: "繳費成功",
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(function (result){
            if (result.isConfirmed){
                let data = {
                    "orderTotalAmount": sessionStorage.getItem("orderTotalAmount"),
                    "transactionId":sessionStorage.getItem("transactionId")
                }
                console.log(sessionStorage.getItem("orderTotalAmount"));
                axiosapi.post('hotel/orderRoom/transactions/confirm/line-pay',data).then(function (response){
                    console.log("response", response);
                    if (response.status == 200){
                        // 拿到Transaction Table
                        axiosapi.get(`hotel/orderRoom/transactions/orderId-${sessionStorage.getItem("orderId")}`).then(function (response){
                            console.log("response", response);
                            if (response.status==200){
                                let d = new Date();
                                let data = {
                                    "transactionId": response.data.transactionId,
                                    "lastFiveAccNum": sessionStorage.getItem("transactionId"), // 使用交易id當成是LastFiveAccNum
                                    "transferDate": `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                                    "transactionStatus": '完成付款',
                                    "paymentMethod": 'Line Pay',
                                }
                                // 呼叫更新Transaction Table
                                axiosapi.put(`hotel/orderRoom/transactions/${response.data.transactionId}`, data).then(function (response){
                                    console.log('response form transaction update', response);
                                }).catch(function (error){
                                    console.log('error form transaction update', error);
                                });
                                // 更新orderRoom的reservation_status
                                
                                let dataStatus = {
                                    "reservation_status":"Already paid",
                                    "reservation_status_date":`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                                }
                                axiosapi.put(`hotel/orderRoom/alert/${sessionStorage.getItem("orderId")}`, dataStatus).then(function (response){
                                    console.log('response form orderRoom update', response);
                                }).catch(function (error){
                                    console.log('error form orderRoom update', error);
                                })

                            }
                        }).catch(function (error){
                            console.log("error", error);
                        });
                    }

                    // 成功就接收後端的資料跳轉到成功畫面
                }).catch(function (error){
                    console.log("error", error);
                })
            }
        })
    }

    function callTransaction(){

    }

    onMounted(function (){
        confirmLine()
    })

</script >
    
<style scoped>

    .row{
        border:0.5rem inset rgb(218, 136, 98);
        background-color: rgb(233, 224, 224);
        width: 100%;
        min-width:260px;
        margin: 0%;
        margin-top: 20px;
    }
    .confirm-payment {
        text-align: center;
        margin: 20px;
    }

    .order-info {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .product-image {
        max-width: 250px;
        margin-right: 20px;
    }

    .details {
        text-align: left;
    }
</style>