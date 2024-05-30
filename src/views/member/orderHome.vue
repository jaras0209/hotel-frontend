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
            <input type="date" v-model="formData.checkinDate" required><br>
    
            <label for="checkout-date">退房日期:</label>
            <input type="date" v-model="formData.checkoutDate" required><br>
    
            <label for="room-type">房型:</label>
            <select v-model="formData.roomType" required>
                <option value="standard">標準房</option>
                <option value="deluxe">豪華房</option>
                <option value="suite">套房</option>
            </select><br>
    
            <label for="guests">入住人數:</label>
            <input type="number" v-model="formData.guests" min="1" max="10" required><br>
            <div class="d-flex justify-content-evenly">
                <button type="submit" class="btn btn-outline-success">下一步</button>
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
                    <p>入住人數: {{ formData.guests }}</p>
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
                <button @click="nextStep(4)" class="btn btn-outline-success">確認並繼續</button>                
            </div>
        </div>
    
        <div v-if="currentStep === 4" class="step">
            <h2>4. 付款</h2>
            <form @submit.prevent="submitPayment">
            <label for="payment-method">付款方式:</label>
            <select v-model="formData.paymentMethod" @change="toggleCreditCardInfo" required>
                <option value="credit-card">信用卡</option>
                <option value="alipay">支付寶</option>
                <option value="wechat">微信支付</option>
            </select><br>
    
            <div v-if="formData.paymentMethod === 'credit-card'" id="credit-card-info">
                <label for="card-number">信用卡號碼:</label>
                <input type="text" v-model="formData.cardNumber" required><br>
    
                <label for="expiry-date">有效日期:</label>
                <input type="text" v-model="formData.expiryDate" placeholder="MM/YY" required><br>
    
                <label for="cvv">CVV碼:</label>
                <input type="text" v-model="formData.cvv" required><br>
            </div>
            <div class="d-flex justify-content-evenly">
                <button type="submit">確認付款</button>
            </div>
            </form>
        </div>
        </div>
</template>

<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import FlatPickr from 'vue-flatpickr-component';
    import countries from '@/Country.json';
    import { ref } from 'vue';
    const currentStep = ref(1);
    const steps = ref(["選擇房型", "填寫資料", "確認畫面", "付款"]);
    const isNotSamePerson = ref(false)
    const formData = ref({
        checkinDate: '',
        checkoutDate: '',
        roomType: 'standard',
        guests: 1,
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
        paymentMethod: 'credit-card',
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
