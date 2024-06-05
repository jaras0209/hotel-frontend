<template>
    <NavigationBar></NavigationBar>
    <div class="box">
        <h1>訂房流程</h1>
    
        <div class="timeline">
        <div
            v-for="(step, index) in steps"
            :key="index"
            :class="['timeline-step', { active: currentStep === index+1 }]"
        >
            <div class="timeline-icon">{{ index + 1 }}</div>
            <div class="timeline-content">{{ step }}</div>
        </div>
        </div>


        <div v-if="currentStep === 1" class="step">
            <h2>1. 選擇房型</h2>
            <form @submit.prevent="nextStep(2)">
            <label for="checkin-date">入住日期:</label>
            <FlatPickr class="form-select" v-model="checkInDate" id="checkin-date" @change="findCheckStartChange"/><br>
            <!-- <input type="date" v-model="checkInDate" required @change=""><br> -->
    
            <label for="checkout-date">退房日期:</label>
            <FlatPickr class="form-select" v-model="checkOutDate" id="checkout-date" @change="findCheckEndChange"/><br>
            <!-- <input type="date" v-model="formData.checkoutDate" required><br> -->
    
            <label for="room-type">房型:</label>
            <input type="text" v-model="roomType" required class="form-control" disabled><br>
            <!-- <select v-model="formData.roomType" required>
                <option value="standard">標準房</option>
                <option value="deluxe">豪華房</option>
                <option value="suite">套房</option>
            </select><br> -->
            <div class="d-flex justify-content-evenly">

            <div class="col-md-3">
            <label for="guests">入住大人人數:</label>
                <input type="number" v-model="formData.adults" min="1" max="10" required class="form-control"><br>
            </div>
            <div class="col-md-3">
                <label for="guests">入住小孩人數:</label>
                <input type="number" v-model="formData.children" min="0" max="10" required class="form-control"><br>
            </div>
            <div class="col-md-3">
                <label for="guests">預訂房間數:</label>
                <input type="number" v-model="formData.roomAmount" min="1" :max="leftRoomNumer" required class="form-control"><br>
            </div>
        </div>
            <div class="d-flex justify-content-evenly">
                <button type="submit" class="btn btn-outline-success" @click="checkFormData">下一步</button>
            </div>
            </form>
        </div>
    
        <div v-if="currentStep === 2" class="step">
            <h2>2. 填寫資料</h2>
            <form @submit.prevent="nextStep(3)" class="row">
                <div class="col-md-4">
                    <label for="name" class="form-label"><span class="star">*</span>姓名:</label>
                    <input type="text" v-model="formData.name" required class="form-control"><br>
                </div>
                <div class="col-md-4">
                    <label for="phone" class="form-label"><span class="star">*</span>聯絡電話:</label>
                    <input type="tel" v-model="formData.phone" required class="form-control"><br>
                </div>
                <div class="col-md-4">
                    <label for="validationDefault02" class="form-label"><span class="star">*</span>身分證字號/護照</label>
                    <input type="text" class="form-control" id="validationDefault02" required v-model="formData.nationId">
                </div>
                


                <div class="col-md-4">
                    <label for="validationDefaultNation" class="form-label"><span class="star">*</span>國籍</label>
                    <div class="input-group">
                    <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                    <select class="form-select" id="validationDefaultNation" required v-model="formData.nationality">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="country in countries" :key="country.phone" :value="country.name" >{{ country.name }}</option>
                    </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationDefaultSexual" class="form-label"><span class="star">*</span>生理性別</label>
                    <div class="input-group">
                        <select class="form-select" id="validationDefaultSexual" required v-model="formData.sexual">
                            <option selected disabled value="">Choose...</option>
                            <option vaiue="man">男</option>
                            <option vaiue="female">女</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationbirth" class="form-label"><span class="star">*</span>生日</label>
                    <div class="input-group">
                        <FlatPickr class="form-select" v-model="formData.birth" id="validationbirth"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="email" class="form-label"><span class="star">*</span>電子郵件:</label>
                    <input type="email" v-model="formData.email" required class="form-control"><br>
                </div>

                <div class="col-md-4">
                    <label for="origin-password" class="form-label"><span class="star">*</span>交易密碼：</label>
                    <input type="password" class="form-control" id="origin-password" v-model="formData.transPassword">
                </div>
                
                <label for="checkin-time">入住時間:</label>
                <input type="time" v-model="formData.checkinTime" required class="form-control"><br>
        
                <label for="requests" class="form-label">其他需求:</label>
                <input type="text" v-model="formData.requests" class="form-control"><br>
                <div class="col-md-12">
                    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" v-model="isNotSamePerson">
                        <label class="btn btn-outline-info" for="btncheck1">住宿和訂房非同一人</label>
                    </div>
                </div>
                
                <div v-if="isNotSamePerson" class="col-md-4 sptop">
                    <label for="spname" class="form-label"><span class="star">*</span>住宿人姓名:</label>
                    <input type="text" v-model="formData.spname" required class="form-control"><br>
                </div>
                <div v-if="isNotSamePerson" class="col-md-4 sptop">
                    <label for="spphone" class="form-label"><span class="star">*</span>住宿人聯絡電話:</label>
                    <input type="tel" v-model="formData.spphone" required class="form-control"><br>
                </div>
                <div v-if="isNotSamePerson" class="col-md-4 sptop">
                    <label for="Default02" class="form-label"><span class="star">*</span>住宿人身分證字號/護照</label>
                    <input type="text" class="form-control" id="Default02" required v-model="formData.spnationId">
                </div>

                <div v-if="isNotSamePerson" class="col-md-4">
                    <label for="spemail" class="form-label"><span class="star">*</span>住宿人電子郵件:</label>
                    <input type="email" v-model="formData.spemail" required class="form-control"><br>
                </div>
                <div v-if="isNotSamePerson" class="col-md-4">
                    <label for="spbirth" class="form-label"><span class="star">*</span>住宿人生日</label>
                    <div class="input-group">
                        <FlatPickr class="form-select" v-model="formData.spbirth" id="spbirth"/>
                    </div>
                </div>
                <div v-if="isNotSamePerson" class="col-md-4">
                    <label for="spSexual" class="form-label"><span class="star">*</span>住宿人生理性別</label>
                    <div class="input-group">
                        <select class="form-select" id="spSexual" required v-model="formData.spsexual">
                            <option selected disabled value="">Choose...</option>
                            <option vaiue="man">男</option>
                            <option vaiue="female">女</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-evenly">
                    <button  @click="previousStep(1)" class="btn btn-outline-success">上一步</button>
                    <button type="submit" class="btn btn-outline-success">下一步</button>
                </div>
            </form>
        </div>
    
        <div v-if="currentStep === 3" class="step">
            <h2>3. 確認畫面</h2>
            <div id="order-summary" class="d-flex justify-content-around">
                <div>
                    <h3>訂單概覽</h3>
                    <p>房型: {{ formData.roomType }}</p>
                    <p>入住日期: {{ formData.checkinDate }}</p>
                    <p>退房日期: {{ formData.checkoutDate }}</p>
                    <p>入住大人人數: {{ formData.adults }}</p>
                    <p>入住小孩人數: {{ formData.children }}</p>
                    <p>房間數量: {{ formData.roomAmount }}</p>
                    <p>價格: {{ basePrice*formData.roomAmount*(allDate.length-1) }}</p>
                    
                </div>
                <div>
                    <h3>訂房個人資料</h3>
                    <table class="table table-striped-columns">
                        <tr>
                            <td>姓名:</td>
                            <td>{{ formData.name }}</td>
                        </tr>
                        <tr>
                            <td>聯絡電話:</td>
                            <td>{{ formData.phone }}</td>
                        </tr>
                        <tr>
                            <td>電子郵件:</td>
                            <td>{{ formData.email }}</td>
                        </tr>
                        <tr>
                            <td>身分證字號/護照:</td>
                            <td>{{ formData.nationId }}</td>
                        </tr>
                        <tr>
                            <td>國籍:</td>
                            <td>{{ formData.nationality }}</td>
                        </tr>
                        <tr>
                            <td>生理性別:</td>
                            <td>{{ formData.sexual }}</td>
                        </tr>
                        <tr>
                            <td>生日:</td>
                            <td>{{ formData.birth }}</td>
                        </tr>
                        <tr>
                            <td>入住時間:</td>
                            <td>{{ formData.checkinTime }}</td>
                        </tr>
                        <tr>
                            <td>其他需求:</td>
                            <td>{{ formData.requests }}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="isNotSamePerson">
                    <h3>住宿人資料</h3>
                    <table class="table table-striped-columns">
                        <tr>
                            <td>住宿人姓名:</td>
                            <td>{{ formData.spname }}</td>
                        </tr>
                        <tr>
                            <td>住宿人聯絡電話:</td>
                            <td>{{ formData.spphone }}</td>
                        </tr>
                        <tr>
                            <td>住宿人電子郵件:</td>
                            <td>{{ formData.spemail }}</td>
                        </tr>
                        <tr>
                            <td>住宿人身分證字號/護照:</td>
                            <td>{{ formData.spnationId }}</td>
                        </tr>
                        <tr>
                            <td>住宿人生理性別:</td>
                            <td>{{ formData.spsexual }}</td>
                        </tr>
                        <tr>
                            <td>住宿人生日:</td>
                            <td>{{ formData.spbirth }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="d-flex justify-content-evenly">
                <button  @click="previousStep(2)" class="btn btn-outline-success">上一步</button>
                <button @click="nextStep(4);buildOrder()" class="btn btn-outline-success">確認並繼續</button>                
            </div>
        </div>
    
        <div v-if="currentStep === 4" class="step">
            <h2>4. 付款</h2>
            <form @submit.prevent="submitPayment">
            <label for="payment-method">付款方式:</label>
            <select v-model="formData.paymentMethod" @change="toggleCreditCardInfo" required>
                <option value="linePay" selected>Line Pay</option>
                <option value="credit-card">信用卡</option>
                <option value="wechat">微信支付</option>
            </select><br>
    
            <!-- <div v-if="formData.paymentMethod === 'credit-card'" id="credit-card-info">
                <label for="card-number">信用卡號碼:</label>
                <input type="text" v-model="formData.cardNumber" required><br>
    
                <label for="expiry-date">有效日期:</label>
                <input type="text" v-model="formData.expiryDate" placeholder="MM/YY" required><br>
    
                <label for="cvv">CVV碼:</label>
                <input type="text" v-model="formData.cvv" required><br>
            </div> -->
            <div class="d-flex justify-content-evenly">
                <button type="button" @click="callLinePay">確認付款</button>
            </div>
            </form>
        </div>
        </div>
</template>

<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import FlatPickr from 'vue-flatpickr-component';
    import countries from '@/Country.json';
    import axiosapi from '@/plugins/axios.js';
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Swal from 'sweetalert2';
    

    const route = useRoute();
    const currentStep = ref(1);

    const checkInDate = ref('');
    const checkOutDate = ref('');
    const basePrice = ref('');
    const roomInfoId = ref('');
    const roomType = ref('');
    const leftRoomNumer = ref(null);
    const roomImg = ref(null);
    const orderId = ref(null);
    const allDate = ref([]);

    const steps = ref(["選擇房型", "填寫資料", "確認畫面", "付款"]);
    const isNotSamePerson = ref(false)
    const formData = ref({
        userId: '',
        checkinDate: '',
        checkoutDate: '',
        roomType: '',
        adults: 1,
        children:0,
        roomAmount:1,
        name: '',
        phone: '',
        email: '',
        birth:'',
        sexual: '',
        nationId:'',
        nationality:'',
        transPassword:'',
        spname:'',
        spphone:'',
        spnationId:'',
        spemail:'',
        spbirth:'',
        spsexual:'',

        checkinTime: '',
        requests: '',
        paymentMethod: 'linePay',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const nextStep = (step) => {
        currentStep.value = step;
    };

    const previousStep = (step) =>{
        currentStep.value = step;
    }

    const toggleCreditCardInfo = () => {
        // Logic for toggling credit card info can be added here if needed
    };

    const submitPayment = () => {
        // Handle payment submission logic here
        alert('付款成功');
    };

    // 在第一次填完資料時就塞入會員資料
    function checkFormData(){
        formData.value.roomType = roomType.value;
        if (sessionStorage.getItem("userId")){
            formData.value.userId = sessionStorage.getItem("userId")
            formData.value.name = sessionStorage.getItem("name");
            formData.value.sexual = sessionStorage.getItem("gender");
            formData.value.birth = sessionStorage.getItem("birth");
            formData.value.nationId = sessionStorage.getItem("national_id");
            formData.value.email = sessionStorage.getItem("email");
            formData.value.phone = sessionStorage.getItem("phone_number");
            formData.value.transPassword = sessionStorage.getItem("password");
            formData.value.nationality = sessionStorage.getItem("nationality");
        }

        console.log(formData)
    }

    function findCheckStartChange(date) {
        checkInDate.value = date.target.value;
        if (checkOutDate.value != null && checkInDate.value > checkOutDate.value) {
            checkOutDate.value = checkInDate.value;
        }
        formData.value.checkinDate = checkInDate.value;
        // console.log('formData.value.checkinDate',formData.value.checkinDate)
        let result = getDatesBetween(formData.value.checkinDate, formData.value.checkoutDate);
        allDate.value =[];
        result.forEach(date => allDate.value.push(date.toISOString().split('T')[0]));// console.log(date.toISOString().split('T')[0])
        console.log(allDate.value.length)
    }

    function findCheckEndChange(date) {
        checkOutDate.value = date.target.value;
        if (checkInDate.value != null && checkInDate.value > checkOutDate.value) {
            checkInDate.value = checkOutDate.value;
        }
        formData.value.checkoutDate = checkOutDate.value;

        let result = getDatesBetween(formData.value.checkinDate, formData.value.checkoutDate);

        // 打印結果
        allDate.value =[];
        result.forEach(date => allDate.value.push(date.toISOString().split('T')[0]));// console.log(date.toISOString().split('T')[0])
        console.log(allDate.value.length)
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



    // 訂單成立
    function buildOrder(){
        if (formData.value.spname===''){
            formData.value.spname = null;
        }
        if (formData.value.spphone===''){
            formData.value.spphone = null;
        }
        if (formData.value.spnationId===''){
            formData.value.spnationId = null;
        }
        if (formData.value.spemail===''){
            formData.value.spemail = null;
        }
        if (formData.value.spbirth===''){
            formData.value.spbirth = null;
        }
        if (formData.value.spsexual===''){
            formData.value.spsexual = null;
        }
        if (formData.value.requests===''){
            formData.value.requests = null;
        }
        if (formData.value.userId===''){
            formData.value.userId = null;
        }

        let data ={
            "order_person_name": formData.value.name,
            "gender": formData.value.sexual,
            "birth": formData.value.birth,
            "national_id": formData.value.nationId,
            "email": formData.value.email,
            "phone_number": formData.value.phone,
            "credit_card": null,
            "adult_pax": formData.value.adults,
            "child_pax": formData.value.children,
            "room_type_amount": formData.value.roomAmount,
            "arrival_date": formData.value.checkinDate +" "+formData.value.checkinTime+":00.0",
            "checkout_date": formData.value.checkoutDate + " 00:00:00.0",
            "transaction_password": formData.value.transPassword,
            "base_price":  basePrice.value*formData.value.roomAmount*(allDate.value.length-1),  
            "remark":formData.value.requests,
            "member_id": formData.value.userId,
            "stay_person_name": formData.value.spname,
            "stay_person_birth": formData.value.spbirth,
            "stay_person_Email":formData.value.spemail,
            "stay_person_gender": formData.value.spsexual,
            "stay_person_national_id": formData.value.spnationId,
            "stay_person_phone": formData.value.spphone
        }


        console.log(data);
        axiosapi.post('hotel/orderRoom/add', data).then(function (response){
            console.log("response",response);
            if (response.data.success){
                axiosapi.get(`hotel/orderRoom/latest/${formData.value.name}`).then(function (response){
                    console.log("response from findLatest order", response);
                    //
                    if (response.data.success){
                        orderId.value = response.data.orderId;
                        sessionStorage.setItem("orderId", orderId.value); // 呼叫transaction Table需要
                        let detailData = {
                            "roomAmount": formData.value.roomAmount,
                            "price": basePrice.value*formData.value.roomAmount*(allDate.value.length-1),
                            "id": {
                                "orderId": response.data.orderId,
                                "roomInformationId": roomInfoId.value
                            }
                        }

                        axiosapi.post('hotel/orderRooms/detailBuild', detailData).then(function (response){
                            console.log("respose in create orderDetail", response);
                            if (response.data.success){
                                Swal.fire({
                                    text: "下單成功",
                                    icon: 'success',
                                    allowOutsideClick: false,
                                    confirmButtonText: '確認',
                                }).then(function (result){
                                    if (result.isConfirmed){
                                        // 數量調整

                                        // roomAssignment controller modify
                                        let dataRooms={
                                            'rooms':formData.value.roomAmount,
                                            'booking':true
                                        }
                                        // 只計算某一天，沒有用for-loop

                                        // **********************************
                                        // axiosapi.post(`hotel/backend/roomAssignment/findID/${formData.value.checkinDate}/${roomInfoId.value}`, dataRooms).then(function (response){
                                        //     console.log('response in callAssignment',response);
                                        // }).catch(function (error){
                                        //     console.log("error in callAssignment", error);
                                        // });
                                        //*********************************

                                        // 用for-loop
                                        for (let i=0; i<=allDate.value.length-2;i++){
                                            axiosapi.post(`hotel/backend/roomAssignment/findID/${allDate.value[i]}/${roomInfoId.value}`, dataRooms).then(function (response){
                                                console.log('response in callAssignment',response);
                                            }).catch(function (error){
                                                console.log("error in callAssignment", error);
                                            });
                                        }

                                    

                                        console.log("orderId.value",orderId.value);
                                        // 付款成功和查看訂單所需資料
                                        sessionStorage.setItem("productPicture", roomImg.value);
                                        sessionStorage.setItem("productName", roomType.value);
                                        sessionStorage.setItem("productQuality", formData.value.roomAmount);
                                        sessionStorage.setItem("singlePrice", basePrice.value);
                                        sessionStorage.setItem("arrival_date", formData.value.checkinDate);
                                        sessionStorage.setItem("checkout_date", formData.value.checkoutDate);
                                        sessionStorage.setItem("days", allDate.value.length);
            
                                    }
                                })
                            }
                        }).catch(function (error){
                            console.log("error in create orderDetail", error)
                        })
                    }
                    //
                    
                }).catch(function (error){
                    console.log("error from findLatest order", error);
                })
            }
        }).catch(function (error){
            console.log("error", error)
        })
    }

    function callLinePay(){
        let data = {
            "orderTotalAmount": basePrice.value*formData.value.roomAmount*(allDate.value.length-1), // 目前只做一個房型的訂購
            "orderId" : orderId.value,
            "totalPrice" : basePrice.value*formData.value.roomAmount*(allDate.value.length-1),
            "productId" : roomInfoId.value,
            "productName" : roomType.value,
            "productPicture" : roomImg.value,
            "productQuality": formData.value.roomAmount,
            "singlePrice" : basePrice.value*(allDate.value.length-1)
        }
        console.log(data)
        axiosapi.post('hotel/orderRoom/transactions/line-pay', data).then(function (response){
            console.log("response", response.data);
            if (response.data.returnMessage=="Success."){
                // window.location.href = response.data.info.paymentUrl.web;
                
                sessionStorage.removeItem("transactionId");
                sessionStorage.removeItem("orderTotalAmount");
                sessionStorage.setItem("transactionId", response.data.info.transactionId);
                sessionStorage.setItem("orderTotalAmount", basePrice.value*formData.value.roomAmount*(allDate.value.length-1));
                
                // 

                console.log("transactionId",sessionStorage.getItem("transactionId"));
                console.log("orderTotalAmount",sessionStorage.getItem("orderTotalAmount"));
                // window.location.replace(response.data.info.paymentUrl.web);
                window.open(response.data.info.paymentUrl.web);
            }
        }).catch(function (error){
            console.log("error", error);
        })
    }

    
    onMounted(function (){
        const queryString = route.query;
        checkInDate.value = queryString.checkInDate || '';
        basePrice.value = queryString.price || '';
        roomInfoId.value = queryString.id || '';
        roomType.value = queryString.typeName || '';
        leftRoomNumer.value = queryString.leftRoomNumer || '';
        roomImg.value = queryString.picture || '';

        console.log("roomImg.value",roomImg.value);
    })
</script>

<style scoped>
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
    }
    .sptop{
        margin-top: 30px
    }
    .box {
        width: 100%;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }
    
    .step {
        margin-bottom: 20px;
    }
    

    .timeline {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    }

    .timeline-step {
    text-align: center;
    flex: 1;
    }

    .timeline-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ddd;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-size: 18px;
    line-height: 30px;
    }

    .timeline-step.active .timeline-icon {
    background-color: #4CAF50;
    }

    .timeline-content {
    margin-top: 5px;
    }


    label {
        display: block;
        margin-top: 10px;
    }
    
    input, select {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
    }
    
    button {
        display: block;
        /* width: 100%; */
        padding: 10px;
        margin-top: 30px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #45a049;
    }

    td{
        width:8vw;
        height:50px;
        text-align:left;
    }
    
    #credit-card-info {
        display: none;
    }
</style>
