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
                <p><strong>天數：</strong>{{ allDate.length-1 }} 個夜晚</p>
                <p><strong>總計：</strong>{{ orderPrice }} 元</p>
                <p><strong>訂單狀態：</strong>{{ transactionStatus }}</p>
            </div>
            <div class="col-2 buttonCon">
                <button v-if="transactionStatus!='完成付款，但已退訂' && transactionStatus!='尚未完成付款'" type="button" class="btn btn-outline-danger" @click="callShowRefund">申請退訂</button>
                <button v-if="transactionStatus =='完成付款，但已退訂'" type="button" class="btn btn-outline-success" @click="callGoBooking">重新下定</button>
                <button v-if="transactionStatus =='尚未完成付款'" type="button" class="btn btn-outline-success" @click="callLinePay">付費</button>
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
    import { useRouter } from 'vue-router';
    import RefundModal from '@/components/member/refundModal.vue';
    import Swal from 'sweetalert2';

    const roomsData = ref('');
    const productImage = ref('');//sessionStorage.getItem("productPicture");
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
    const allDate= ref([]);
    const fronendPoint = import.meta.env.VITE_LINEPAY_URL

    // const roomsData = ref('');
    const router = useRouter();

    function callGoBooking(){
        router.push({name:"roomView-link"})
    }

    function callLinePay(){
        // v3
        // let data = {
        //     "orderTotalAmount": orderPrice.value, // 目前只做一個房型的訂購
        //     "orderId" : sessionStorage.getItem("orderId"),
        //     "totalPrice" : orderPrice.value,
        //     "productId" : roomTypeId.value,
        //     "productName" : productName.value,
        //     "productPicture" : productImage.value,
        //     "productQuality": productQuality.value,
        //     "singlePrice" : singlePrice.value
        // }
        // console.log(data)
        // axiosapi.post('hotel/orderRoom/transactions/line-pay', data).then(function (response){
        //     console.log("response", response.data);
        //     if (response.data.returnMessage=="Success."){
        //         // window.location.href = response.data.info.paymentUrl.web;
                
        //         sessionStorage.removeItem("transactionId");
        //         sessionStorage.removeItem("orderTotalAmount");
        //         sessionStorage.setItem("transactionId", response.data.info.transactionId);
        //         sessionStorage.setItem("orderTotalAmount", orderPrice.value);
        //         // 

        //         console.log("transactionId",sessionStorage.getItem("transactionId"));
        //         console.log("orderTotalAmount",sessionStorage.getItem("orderTotalAmount"));
        //         // window.location.replace(response.data.info.paymentUrl.web);
        //         window.open(response.data.info.paymentUrl.web);
        //     }
        // }).catch(function (error){
        //     console.log("error", error);
        // })
        // -----------------------------------------------

         // v2版本
         let data = {
            "orderId" : sessionStorage.getItem("orderId"),
            "totalPrice" : orderPrice.value,
            "productName" : productName.value,
            "productPicture" : productImage.value,
            "successUri" : fronendPoint + '/member/paySuccess'

        }
        console.log(data)
        axiosapi.post('hotel/orderRoom/transactions/line-payV2', data).then(function (response){
            console.log("response", response.data);
            if (response.data.returnMessage=="Success."){
                // window.location.href = response.data.info.paymentUrl.web;
                
                sessionStorage.removeItem("transactionId");
                sessionStorage.removeItem("orderTotalAmount");
                sessionStorage.setItem("transactionId", response.data.info.transactionId);
                sessionStorage.setItem("orderTotalAmount", orderPrice.value);
                
                // 

                console.log("transactionId",sessionStorage.getItem("transactionId"));
                console.log("orderTotalAmount",sessionStorage.getItem("orderTotalAmount"));
                window.location.replace(response.data.info.paymentUrl.web);
                // window.open(response.data.info.paymentUrl.web);
            }
        }).catch(function (error){
            console.log("error", error);
        })
        //
    }


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
                productImage.value = roomsData.value[9];
                allDate.value =[];
                getDatesBetween(checkinDate.value, checkoutDate.value).forEach(date => allDate.value.push(date.toISOString().split('T')[0]));
                
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


    function getDatesBetween(startDate, endDate) {
        // 解析輸入的日期
        let start = new Date(startDate);
        let end = new Date(endDate);

        // 確保開始日期早於或等於結束日期
        if (start > end) {
            console.error("開始日期不能晚於結束日期");
            return [];
        }

        // 初始化結果數組
        let dates = [];
        let currentDate = start;

        // 使用循環來獲取中間日期
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // 將日期加1
        }

        return dates;
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
                        checkinDate.value = roomsData.value[7].split(' ')[0];
                
                        let result = getDatesBetween(checkinDate.value, checkoutDate.value);

                        // 退房所需日期
                        allDate.value =[];
                        result.forEach(date => allDate.value.push(date.toISOString().split('T')[0]));// console.log(date.toISOString().split('T')[0])
                        // 房間數回復待做
                        let dataRooms={
                            'rooms':productQuality.value,
                            'booking':false
                        }
                        console.log('allDate.value', allDate.value);

                        // 沒有使用for-loop，只有當天的部分
                        // axiosapi.post(`hotel/backend/roomAssignment/findID/${checkinDate.value}/${roomTypeId.value}`, dataRooms).then(function (response){
                        //     console.log('response in callAssignment',response);
                        // }).catch(function (error){
                        //     console.log("error in callAssignment", error);
                        // })
                        // 用for-loop
                        for (let i=0; i<=allDate.value.length-2;i++){
                            axiosapi.post(`hotel/backend/roomAssignment/findID/${allDate.value[i]}/${roomTypeId.value}`, dataRooms).then(function (response){
                                console.log('response in callAssignment',response);
                            }).catch(function (error){
                                console.log("error in callAssignment", error);
                            });
                        }


                        
                        // 資料重新整理
                        refundRef.value.hideModal();
                        router.go(0);
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