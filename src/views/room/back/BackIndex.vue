<template>
    <backendNavbar></backendNavbar>
    <div class="box">
        <div class="button-wrapper">
            <div class="context"><RouterLink class="button--secondary" to="/room/back/housingManagement"><span class="text">住房管理</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomManagement"><span class="text">房間管理</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomAssignment"><span class="text">房間分配</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/additionalCharges"><span class="text">附加費用</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/checkOut"><span class="text">退房檢查</span></RouterLink></div>
            <div class="context"><RouterLink class="button--secondary" to="/room/back/roomInfo"><span class="text">編輯房間資料</span></RouterLink></div>
        </div>
    </div>

    <div v-if="currentStep === 1" class="step">
        <div class="wrap">
            <h1 class="title">房客報到登記表</h1>
            <div class="info address">FreeRelx Hotel</div>
            <div class="info date">報到日期：2024/06/12</div>
            <form @submit.prevent="nextStep" class="form">

                <div class="form-group" :class="{ error: errors.type }">
                    <div class="form-group__text required">訂房類型</div>
                    <div class="input-group">
                        <input type="radio" v-model="formData.type" id="option1" value="線上預定" class="inputGroup__radio" required />
                        <label for="option1" class="input-group__label">線上預定</label>
                    </div>
                    <div class="input-group">
                        <input type="radio" v-model="formData.type" id="option2" value="現場訂房" class="input-group__radio" required />
                        <label for="option2" class="input-group__label">現場訂房</label>
                    </div>
                    <div class="error__label">{{ errors.type }}</div>
                </div>

                <div class="form-group" :class="{ error: errors.orderid }">
                    <label for="orderid" class="form-group__text required">訂單編號</label>
                    <input type="text" v-model="formData.orderid" id="orderid" class="form-group__input" placeholder="您的回答" required pattern="^[a-zA-Z0-9_-]+$" />
                    <div class="error__label">{{ errors.orderid }}</div>
                </div>

                <div class="form-group" :class="{ error: errors.member }">
                    <label for="member" class="form-group__text required">會員編號</label>
                    <input type="text" v-model="formData.member" id="member" class="form-group__input" placeholder="您的回答" required pattern="^[a-zA-Z0-9_-]+$" />
                    <div class="error__label">{{ errors.member }}</div>
                </div>

                <div class="form-group" :class="{ error: errors.roomType }">
                    <label for="roomType" class="form-group__text required">房間型號</label>
                    <select v-model="formData.roomType" id="roomType" class="form-group__input" required>
                        <option v-for="option in roomTypes" :value="option.id" :key="option.id">{{ option.name }}</option>
                    </select>
                    <div class="error__label">{{ errors.roomType }}</div>
                </div>

                <div class="form-group" :class="{ error: errors.remarks }">
                    <label for="remarks" class="form-group__text">備註</label>
                    <textarea v-model="formData.remarks" id="remarks" class="form-group__input" placeholder="您的回答" maxlength="100"></textarea>
                    <div class="error__label">{{ errors.remarks }}</div>
                </div>
                <div class="d-flex justify-content-evenly">
                    <button type="submit" class="btn submit">下一步</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="currentStep === 2" class="step">
        <div class="wrap">
            <form @submit.prevent="onSubmit" class="form">
                <div class="form-group" :class="{ error: errors.roomNumber }">
                    <label for="roomNumber" class="form-group__text required">選擇房號</label>
                    <select v-model="formData.roomNumber" id="roomNumber" class="form-group__input" required>
                        <option v-for="room in availableRooms" :value="room.id" :key="room.id">{{ room.number }}</option>
                    </select>
                    <div class="error__label">{{ errors.roomNumber }}</div>
                </div>
                <button type="submit" class="btn submit">提交</button>
            </form>
        </div>
    </div>

    <footer class="footer">© FreeRelx © Copyright. All rights Reserved.</footer>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import axios from 'axios';
import backendNavbar from '../../BackendNavbar.vue';

const currentStep = ref(1);

const formData = reactive({
    orderid: '',
    member: '',
    type: '',
    roomType: '',
    roomNumber: '',
    remarks: ''
});

const errors = reactive({
    orderid: '',
    member: '',
    type: '',
    roomType: '',
    roomNumber: '',
    remarks: ''
});

const roomTypes = ref([
    { id: 1, name: '標準客房' },
    { id: 2, name: '精緻客房' },
    { id: 3, name: '豪華客房' },
    { id: 4, name: '豪華家庭房' },
    { id: 5, name: '標準商務房' },
    { id: 6, name: '尊榮商務房' },
    { id: 7, name: '大使套房' },
    { id: 8, name: '皇家套房' },
    { id: 9, name: '總統套房' }
]);

const availableRooms = ref([]);

const validateForm = () => {
    errors.orderid = formData.orderid.match(/^[a-zA-Z0-9_-]+$/) ? '' : '訂單編號只能包含字母、數字、下劃線和連字符';
    errors.member = formData.member.match(/^[a-zA-Z0-9_-]+$/) ? '' : '請輸入有效的會員編號';
    errors.type = formData.type ? '' : '請選擇訂房類型';
    errors.roomType = formData.roomType ? '' : '請選擇房間型號';
    if (currentStep.value === 2) {
        errors.roomNumber = formData.roomNumber ? '' : '請選擇房號';
    }
};

const nextStep = () => {
    validateForm();
    if (Object.values(errors).every(error => !error)) {
        fetchAvailableRooms();
        currentStep.value = 2;
    }
};

const onSubmit = async () => {
    validateForm();
    if (Object.values(errors).every(error => !error)) {
        try {
            const response = await axios.post('/hotel/backend/checkIn', formData);
            console.log('Form submitted successfully:', response.data);
            // Reset form or redirect to another page upon successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
};

const fetchAvailableRooms = async () => {
    try {
        const response = await axios.get('/hotel/backend/roomManagement/available', {
            params: { roomType: formData.roomType }
        });
        availableRooms.value = response.data;
    } catch (error) {
        console.error('Error fetching available rooms:', error);
    }
};

watch(() => formData.roomType, fetchAvailableRooms);

</script>


<style scoped>
.button-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.context {
    margin: 0;
}

.button--secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ddd;
    color: #333;
    width: 150px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.button--secondary .text {
    font-size: 16px;
}

.button--secondary:hover {
    background-color: #bbb;
    color: #000;
}

*,
::after,
::before {
    box-sizing: border-box;
    position: relative;
}

html,
body {
    width: 100%;
    padding: 0;
    margin: 0;
    line-height: 1.5;
    font-family: 'PingFang', 'Questrial', sans-serif, 'Microsoft JhengHei';
    color: #4b4d50;
    font-size: 14px;
    background-color: #f3f3f3;
}

a {
    text-decoration: none;
    color: #5ea55c;
}

a:hover {
    text-decoration: underline;
}

p {
    margin: 0;
}

input[type='radio'],
input[type='checkbox'] {
    margin: 0;
    margin-right: 5px;
}

.text-red {
    color: #dc4f59 !important;
}

.flex {
    display: flex;
    flex-wrap: wrap;
}

.text-center {
    text-align: center;
}

.wrap {
    max-width: 550px;
    width: 90%;
    margin: 40px auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(18, 46, 123, 0.1);
    padding: 45px 50px;
}

.title {
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 2em;
}

.title::before {
    content: '';
    position: absolute;
    width: 8%;
    height: 4px;
    border-radius: 5px;
    background-color: #507efa;
    top: -10px;
}

.info {
    line-height: 1.5;
    color: #6c6c6c;
}

.form {
    padding-top: 20px;
}

.form-group {
    padding: 10px 0;
}

.form-group__text {
    margin-bottom: 10px;
    font-size: 1em;
}

.form-group__text.required::after {
    content: '*';
    color: #dc4f59;
    margin-left: 5px;
}

.input-group__label {
    cursor: pointer;
}

.form-group__input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #cfcfcf;
    border-radius: 10px;
    font-size: 14px;
}

.form-group__input:focus {
    border: 1px solid #507efa;
}

.error__label {
    padding: 5px 0;
    font-size: 12px;
    color: #dc4f59;
}

.error .form-group__input {
    border: 1px solid #dc4f59;
}

.input-group {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
}

.inputGroup__radio {
    width: auto;
}

.btn.submit {
    width: 100%;
    border: none;
    border-radius: 10px;
    background-color: #507efa;
    color: #fff;
    padding: 12px 15px;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
}

.footer {
    text-align: center;
    padding: 20px 0;
    color: #6c6c6c;
}

.box{
    margin-top: 100px;
    text-align: center;
}
</style>

