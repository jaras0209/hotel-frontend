    <template>
        <backendNavbar></backendNavbar>
        <div class="wrapper">
        <div class="context"><RouterLink class="button--secondary" to="/room/back/roomManagement"><span class="text">訂房管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/room/back/roomAssignment"><span class="text">會員管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/room/back/housingManagement"><span class="text">商城管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/room/back/additionalCharges"><span class="text">房務管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/room/back/checkOut"><span class="text">房務管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/room/back/roomInfo"><span class="text">房務管理</span></RouterLink></div>
        </div>
    
        <div class="wrap">
        <h1 class="title">房客報到登記表</h1>
        <div class="info address">FreeRelx Hotel</div>
        <div class="info date">報到日期：2024/06/12</div>
        <form @submit.prevent="onSubmit" class="form">

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

            <div class="form-group" :class="{ error: errors.nickname }">
            <label for="nickname" class="form-group__text required">訂單編號</label>
            <input type="text" v-model="formData.nickname" id="nickname" class="form-group__input" placeholder="您的回答" required pattern="^[a-zA-Z0-9_-]+$" />
            <div class="error__label">{{ errors.nickname }}</div>
            </div>

            <div class="form-group" :class="{ error: errors.email }">
            <label for="email" class="form-group__text required">會員編號</label>
            <input type="email" v-model="formData.email" id="email" class="form-group__input" placeholder="您的回答" required />
            <div class="error__label">{{ errors.email }}</div>
            </div>



            <div class="form-group" :class="{ error: errors.media }">
            <label for="media" class="form-group__text required">房間型號</label>
            <select v-model="formData.media" id="media" class="form-group__input" required>
                <option value="標準客房">標準客房</option>
                <option value="精緻客房">精緻客房</option>
                <option value="豪華客房">豪華客房</option>
                <option value="豪華家庭房">豪華家庭房</option>
                <option value="標準商務房">標準商務房</option>
                <option value="尊榮商務房">尊榮商務房</option>
                <option value="大使套房">大使套房</option>
                <option value="皇家套房">皇家套房</option>
                <option value="總統套房">總統套房</option>
            </select>
            <div class="error__label">{{ errors.media }}</div>
            </div>


            <div class="form-group" :class="{ error: errors.other }">
            <label for="other" class="form-group__text">備註</label>
            <textarea v-model="formData.other" id="other" class="form-group__input" placeholder="您的回答" maxlength="100"></textarea>
            <div class="error__label">{{ errors.other }}</div>
            </div>
            <input class="btn submit" type="submit" value="提交" />
        </form>
        </div>
        <footer class="footer">© FreeRelx © Copyright. All rights Reserved.</footer>
    </template>
    
    <script setup>
    import { reactive } from 'vue';
    import backendNavbar from '../../BackendNavbar.vue';
    
    const formData = reactive({
        nickname: '',
        email: '',
        phone: '',
        type: '',
        media: '',
        other: ''
    });
    
    const errors = reactive({
        nickname: '',
        email: '',
        phone: '',
        type: '',
        media: '',
        other: ''
    });
    
    const validateForm = () => {
        errors.nickname = formData.nickname.match(/^[a-zA-Z0-9_-]+$/) ? '' : '暱稱只能包含字母、數字、下劃線和連字符';
        errors.email = formData.email.match(/^\S+@\S+\.\S+$/) ? '' : '請輸入有效的電子郵件';
        errors.phone = formData.phone.match(/^[0-9]+$/) ? '' : '手機號碼只能包含數字';
        errors.type = formData.type ? '' : '請選擇報名類型';
        errors.media = formData.media ? '' : '請選擇一個選項';
    };
    
    const onSubmit = () => {
        validateForm();
        if (Object.values(errors).every(error => !error)) {
        console.log(formData);
        // 提交表單邏輯
        }
    };
    </script>
    
    <style scoped>
    .context {
        background-color: #0055cd;
        height: 100px;
        border-radius: 5%;
        border: 0.5rem outset rgb(5, 73, 220);
        margin-bottom: 10px;
    }
    .wrapper {
        margin-top: 200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: auto;
    }
    a {
        text-decoration: none;
    }
    .button--secondary {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        color: #0055cd;
        width: 150px;
        height: 100px;
        border-radius: 10px;
        padding: 0;
        line-height: normal;
        text-align: center;
        cursor: pointer;
    }
    .button--secondary .text {
        white-space: nowrap;
        font-size: 18px;
        transition: all .3s cubic-bezier(.68, -.55, .265, 1.55);
    }
    .button--secondary:hover {
        background-color: #0044aa;
        color: #fff;
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
        padding: 0px;
        margin: 0px;
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
        margin: 0px;
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
        padding: 10px 0px 30px;
    }
    .form-group.error .error__label {
        display: block;
    }
    .form-group.error .form-group__input {
        border-color: #dc4f59;
    }
    .form-group.error .form-group__input:focus {
        border-color: #dc4f59;
        box-shadow: 0px 0px 0px 2px rgba(220, 79, 89, 0.2);
    }
    .form-group__text,
    .form-group__input {
        display: block;
        width: 100%;
    }
    .form-group__text {
        padding: 8px 0px;
    }
    .form-group__text.required::after {
        content: '*';
        color: #dc4f59;
        padding: 0px 5px;
    }
    .form-group__input {
        border: 1px solid #b3b9c9;
        padding: 10px;
        border-radius: 3px;
        min-height: 40px;
    }
    .form-group__desc {
        font-size: 0.8em;
        margin-top: -6px;
        margin-bottom: 8px;
        color: #6c6c6c;
    }
    .form-group__input:focus {
        border: 1px solid #507efa;
        box-shadow: 0px 0px 0px 2px rgba(13, 61, 193, 0.2);
        outline: none;
    }
    .error__label {
        padding: 10px 0px;
        color: #dc4f59;
        font-size: 0.9em;
        display: none;
        position: absolute;
    }
    .error__label::before {
        content: '!';
        display: inline-block;
        border: 1px solid #dc4f59;
        width: 19px;
        height: 19px;
        text-align: center;
        border-radius: 50%;
        margin-right: 3px;
        transform: scale(0.8);
    }
    .input-group {
        display: inline-flex;
        align-items: center;
        width: 100%;
        padding: 5px 0px;
    }
    .input-group__label {
        line-height: 1;
    }
    .input-group__radio:focus {
        outline: none;
    }
    .btn {
        padding: 0.4em 1em;
        border-width: 0px;
        background-color: #507efa;
        color: #fff;
        border-radius: 0.2em;
        font-size: 1.1em;
        cursor: pointer;
        transition: all 0.2s;
    }
    .btn:hover {
        background-color: #3e70fa;
    }
    input[type='submit'] {
        margin-top: 40px;
        margin-bottom: 10px;
    }
    .footer {
        text-align: center;
        padding: 20px;
    }
    @media (max-width: 767px) {
        .wrap {
        padding: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
        }
    }
    </style>
    