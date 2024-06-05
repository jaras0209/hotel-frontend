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

    <div class="wrap">
        <h1 class="title">房客報到登記表</h1>
        <div class="info address">FreeRelx Hotel</div>
        <div class="info date">報到日期：2024/06/12</div>

        <div v-if="currentStep === 1" class="step">
            <form @submit.prevent="nextStep(2)">
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
                    <input type="text" v-model="formData.orderid" id="orderid" class="form-group__input" placeholder="您的回答" />
                    <div class="error__label">{{ errors.orderid }}</div>
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
        
        <div v-if="currentStep === 2" class="step">
            <form @submit.prevent="onSubmit" class="row">
                <div class="form-group" :class="{ error: errors.roomNumber }">
                    <label for="roomNumber" class="form-group__text required">選擇房號</label>
                    <select v-model="formData.roomNumber" id="roomNumber" class="form-group__input" required>
                        <option v-for="room in availableRooms" :value="room.id" :key="room.id">{{ room.number }}</option>
                    </select>
                    <div class="error__label">{{ errors.roomNumber }}</div>
                </div>
                <div class="d-flex justify-content-evenly">
                    <button @click="previousStep(1)" class="btn submit">上一步</button>
                    <button type="submit" class="btn submit">提交</button>
                </div>
            </form>
            <div v-if="isLoadingRooms" class="loading">載入房號中...</div>
        </div>     
    <footer class="footer">© FreeRelx © Copyright. All rights Reserved.</footer>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import backendNavbar from '../../backendNavbar.vue';

const router = useRouter();
const currentStep = ref(1);

const formData = reactive({
    type: '',
    orderid: '',
    roomType: '',
    roomNumber: '',
    remarks: ''
});

const errors = reactive({
    type: '',
    orderid: '',
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
const isLoadingRooms = ref(false);

const validateForm = () => {
    errors.type = formData.type ? '' : '請選擇訂房類型';
    errors.orderid = formData.orderid.match(/^[a-zA-Z0-9_-]+$/) ? '' : '訂單編號只能包含字母、數字、下劃線和連字符';
    errors.roomType = formData.roomType ? '' : '請選擇房間型號';
    if (currentStep.value === 2) {
        errors.roomNumber = formData.roomNumber ? '' : '請選擇房號';
    }
};

const nextStep = (step) => {
    validateForm();
    if (Object.values(errors).every(error => !error)) {
        currentStep.value = step;
    }
};

const previousStep = (step) => {
    currentStep.value = step;
};

const onSubmit = async () => {
    validateForm();
    if (Object.values(errors).every(error => !error)) {
        const submissionData = {
            orderid: formData.orderid,
            roomid: formData.roomNumber,
            remarks: formData.remarks || 'No remarks',
            totalAdditional: 0.000000,
            totalCompensation: 0.000000
        };

        try {
            const response = await axiosapi.post('/hotel/backend/housingManagement', submissionData);
            alert('完成報到手續!');
            router.push('/room/back/housingManagement');
        } catch (error) {
            alert('Error submitting form. Please try again.');
            console.error('Error submitting form:', error);
        }
    }
};

const fetchAvailableRooms = async () => {
    if (!formData.roomType) return;
    isLoadingRooms.value = true;
    try {
        const response = await axiosapi.get('/hotel/backend/list/roomManagement', {
            params: { roomType: formData.roomType }
        });
        const rooms = Array.isArray(response.data) ? response.data : [];
        availableRooms.value = rooms.filter(room => room.roomInformation.id === formData.roomType && room.roomState.id === 4);
    } catch (error) {
        console.error('Error fetching available rooms:', error);
    } finally {
        isLoadingRooms.value = false;
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
    font-size: 16px;
}

.box {
        margin-top: 100px;
        text-align: center;
}

.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 1rem;
    margin: 2rem auto;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: white;
}

.title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}

.info {
    font-size: 1rem;
    text-align: center;
}

.date {
    margin-bottom: 1rem;
}

.step {
    width: 100%;
    max-width: 600px;
    margin-top: 1rem;
}

.step h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group.error .form-group__input {
    border-color: red;
}

.form-group__text {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.required:after {
    content: '*';
    color: red;
    margin-left: 0.2rem;
}

.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.input-group__label {
    margin-left: 0.5rem;
}

.form-group__input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
}

.form-group__input:focus {
    border-color: #007bff;
}

.error__label {
    font-size: 0.875rem;
    color: red;
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    text-align: center;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.d-flex {
    display: flex;
}

.justify-content-evenly {
    justify-content: space-evenly;
}

.footer {
    text-align: center;
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f8f9fa;
    width: 100%;
}

.loading {
    text-align: center;
    margin-top: 1rem;
    font-size: 1rem;
    color: #007bff;
}
</style>