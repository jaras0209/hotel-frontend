<template>
    <NavigationBar></NavigationBar>
    <div class="text-center box">
        <h2>查看訂單</h2>
        <div class="row justify-content-around">
            <div class="order-info col-4">
                <img :src="productImage" alt="商品圖片" class="product-image">
            </div>
            <div class="details  col-2">
                <p><strong>入住時間：</strong>{{ checkinDate }}</p>
                <p><strong>退房時間：</strong>{{ checkoutDate }}</p>
            </div>
            <div class="details col-4">
                <p><strong>商品名稱：</strong>{{ productName }}</p>
                <p><strong>訂單號碼：</strong>{{ orderId }}</p>
                <p><strong>價格：</strong>{{ singlePrice }} 元</p>
                <p><strong>數量：</strong>{{ productQuality }} 間</p>
                <p><strong>總計：</strong>{{ orderPrice }} 元</p>
                <p><strong>訂單狀態：</strong>{{ transactionStatus }}</p>
            </div>
            <div class="col-2 buttonCon">
                <button v-if="transactionStatus!='完成付款，但已退訂'" type="button" class="btn btn-outline-danger" @click="callShowRefund">申請退訂</button>
                <button v-if="transactionStatus =='完成付款，但已退訂'" type="button" class="btn btn-outline-danger" @click="callShowRefund">重新下定</button>
            </div>

        </div>
    </div>
    <RefundModal
     ref="refundRef"
     :refund-type="refundType"
     :refund-fee="refundRatio*orderPrice"
     v-model:reasonInput="reasonInput"
     @modify="applyRefund"
    ></RefundModal>
</template>
    
<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import axiosapi from '@/plugins/axios.js';
    import { ref, onMounted } from 'vue';
    import RefundModal from '@/components/member/refundModal.vue';
    import Swal from 'sweetalert2';

    const roomsData = ref('');
    const productImage = sessionStorage.getItem("productPicture");
    const orderPrice = ref(null); //sessionStorage.getItem("orderTotalAmount");
    const orderId = "RnJlZVJlbHggSE9URUw_"+sessionStorage.getItem("orderId");
    const productName = ref(null);//sessionStorage.getItem("productName");
    const productQuality = ref(null);//sessionStorage.getItem("productQuality");
    const singlePrice = ref(null);//sessionStorage.getItem("singlePrice");
    const roomTypeId = ref(null);
    const transactionStatus = ref(null);
    const checkinDate = ref(null);
    const checkoutDate = ref(null);
    const refundRef = ref(null);
    const differenceDays = ref(null);
    const reasonInput = ref('');
    // refundType
    const refundTypeId = ref('');
    const refundType = ref('');
    const refundRatio = ref(0);

    // const roomsData = ref('');


    function callOrderData(){
        axiosapi.get(`hotel/orderRoom/datas/${sessionStorage.getItem("orderId")}`).then(function (response){
            if (response.data.success){
                console.log(response.data.roomInfoData);
                roomsData.value = response.data.roomInfoData;
                roomsData.value = roomsData.value.split(',');
                orderPrice.value = roomsData.value[0].split('.')[0]; //sessionStorage.getItem("orderTotalAmount");

                productName.value = roomsData.value[3];//sessionStorage.getItem("productName");
                productQuality.value = roomsData.value[1];//sessionStorage.getItem("productQuality");
                singlePrice.value = roomsData.value[4].split('.')[0];//sessionStorage.getItem("singlePrice");
                roomTypeId.value = roomsData.value[5];
                transactionStatus.value = roomsData.value[6];
                checkinDate.value = roomsData.value[7].split(' ')[0];
                checkoutDate.value = roomsData.value[8].split(' ')[0];
            }
        })
    }

    function callShowRefund(){
        let currentDate = new Date();
        let checkdate = new Date(checkinDate.value);
        differenceDays.value = Math.floor((checkdate.getTime()-currentDate.getTime())/(1000*60*60*24));
        console.log("現在時間和訂單時間相差天數", differenceDays.value);
        if (differenceDays.value>=21){
            refundTypeId.value = 1;
        }else if (differenceDays.value>=14){
            refundTypeId.value = 2;
        }else if (differenceDays.value >=7){
            refundTypeId.value = 3;
        }else{
            refundTypeId.value = 4;
        }
        axiosapi.get(`hotel/refundTypes/${refundTypeId.value}`).then(function (response){
            console.log("response", response);
            refundType.value = response.data.type;
            refundRatio.value = response.data.refundRatio;
        }).catch(function (error){
            console.log("error", error);
        })
        refundRef.value.showModal();
    }
    function applyRefund(){
        Swal.fire({
            text: "是否真的退訂",
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認',
            cancelButtonText: "取消",
            showCancelButton: true,
        }).then(function (isConfirmed){
            if (isConfirmed){
                axiosapi.get(`hotel/orderRoom/transactions/orderId-${sessionStorage.getItem("orderId")}`).then(function (response){
                    console.log("response", response);
                    if (response.status==200){
                        let d = new Date();
                        let data = {
                            "transactionId": response.data.transactionId,
                            "transactionStatus": '完成付款，但已退訂',
                            "unsubscribeDate": `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                            "rffundAmount":refundRatio.value*orderPrice.value,
                            "refund_id": refundTypeId.value,
                        }
                        axiosapi.put(`hotel/orderRoom/transactions/${response.data.transactionId}`, data).then(function (response){
                            console.log('response form transaction update', response);
                        }).catch(function (error){
                            console.log('error form transaction update', error);
                        });

                        let dataStatus = {
                            "reservation_status":"Canceled",
                            "cancellation_reason":reasonInput.value,
                            "reservation_status_date":`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                        }
                        axiosapi.put(`hotel/orderRoom/alert/${sessionStorage.getItem("orderId")}`, dataStatus).then(function (response){
                            console.log('response form orderRoom update', response);
                        }).catch(function (error){
                            console.log('error form orderRoom update', error);
                        })
                        // 房間數回復待做

                        
                        // 資料重新整理
                        callOrderData();
                    }
                })

            }
            
        })
    }

    onMounted(function (){
        callOrderData();
    })

</script>
    
<style scoped>
    h2{
        margin-bottom: 20px;
    }
    .row{
        border:0.5rem ridge rgb(218, 136, 98);
        border-radius: 15px;
        padding-top: 20px;
    }
    .box{
        margin-top: 20px;
    }
    .product-image {
        max-width: 300px;
        margin-right: 20px;
    }
    .details {
        text-align: left;
    }
    .buttonCon{
        text-align: center;
    }
</style>