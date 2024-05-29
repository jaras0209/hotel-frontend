<template>
    <NavigationBar></NavigationBar>
    <form class="row g-3">

        <div class="col-md-3">
            <label for="validationDefault01" class="form-label"><span class="star">*</span>姓名</label>
            <input type="text" class="form-control" id="validationDefault01" v-model="name" required>
        </div>

        <div class="col-md-3">
            <label for="validationDefault02" class="form-label"><span class="star">*</span>身分證字號/護照</label>
            <input type="text" class="form-control" id="validationDefault02" value="Otto" required v-model="nationalId">
        </div>
        <div class="col-md-3">
            <label for="validationDefaultSexual" class="form-label"><span class="star">*</span>生理性別</label>
            <div class="input-group">
                <select class="form-select" id="validationDefaultSexual" required v-model="sexual">
                    <option selected disabled value="">Choose...</option>
                    <option vaiue="man">男</option>
                    <option vaiue="female">女</option>
                </select>
            </div>
        </div>
        <div class="col-md-3">
            <label for="validationbirth" class="form-label"><span class="star">*</span>生日</label>
            <div class="input-group">
                <FlatPickr class="form-select" v-model="birth" id="validationbirth"/>
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultUsername" class="form-label"><span class="star">*</span>信箱</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required v-model="email">
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultPassword" class="form-label"><span class="star">*</span>密碼</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="password" class="form-control" id="validationDefaultPassword" required autocomplete v-model="password" @blur="checkPwd">
            </div>
            <div class="passworderror">
                {{ passwordError }}
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultPhone" class="form-label"><span class="star">*</span>手機</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="text" class="form-control" id="validationDefaultPhone" aria-describedby="inputGroupPrepend2" required v-model="phone">
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultCredircard" class="form-label">信用卡</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="text" class="form-control" id="validationDefaultCredircard" v-model="creditCard">
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultNation" class="form-label"><span class="star">*</span>國籍</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <select class="form-select" id="validationDefaultNation" required v-model="nationality">
                <option selected disabled value="">Choose...</option>
                <option v-for="country in countries" :key="country.phone" :value="country.name" >{{ country.name }}</option>
            </select>
            </div>
        </div>
        



        <div class="col-md-3">
            <label for="validationDefault04" class="form-label"><span class="star">*</span>縣市</label>
            <select class="form-select" id="validationDefault04" required v-model="countSelect" @change="selected()">
                <option selected disabled value="">Choose...</option>
                <option v-for="city1 in taiwan" :key="city1.CityName" :value="city1.CityName">{{ city1.CityName }} </option>
            </select>
        </div>
        <div class="col-md-3">
            <label for="validationDefault05" class="form-label"><span class="star">*</span>鄉/鎮/區</label>
            <select type="text" class="form-select" id="validationDefault05" required v-model="area">
                <option selected disabled value="">Choose...</option>
                <option v-for="areaoption in areaList" :key="areaoption.ZipCode" :value="areaoption.AreaName">{{ areaoption.AreaName }} </option>
                

            </select>
        </div>
        <div class="col-md-6">
            <label for="validationDefault03" class="form-label"><span class="star">*</span>村級區域名/道路名/門牌號</label>
            <input type="text" class="form-control" id="validationDefault03" required v-model="roadName">
        </div>
        <!-- <div class="col-12">
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
            <label class="form-check-label" for="invalidCheck2">
                Agree to terms and conditions
            </label>
            </div>
        </div> -->
        <div class="col-12">
            <button class="btn btn-primary" type="button" disabled="true" v-if="passwordError!=''">註冊</button>
            <button class="btn btn-primary" type="button" v-if="passwordError==''" @click="register">註冊</button>
        </div>
    </form>
</template>
    
<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';
    import axiosapi from '@/plugins/axios.js';
    import FlatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import json from '@/CityCountyData.json';
    import countries from '@/Country.json';
    const nationality = ref("");
    const taiwan = ref(json);
    const countSelect = ref("");
    const areaList = ref(null);
    const area = ref("");
    const roadName = ref("");
    const password = ref("");
    const passwordError = ref(".");
    const email = ref("");
    const name = ref("");
    const nationalId = ref("");
    const sexual = ref("");
    const birth = ref(null);
    const phone = ref("");
    const creditCard = ref("");
    const router = useRouter();


    function selected(){
        console.log("select觸發")
        for (var i=0 ; i<json.length;i++){
            // console.log(json[i]);
            if (json[i].CityName==countSelect.value){
                areaList.value = json[i].AreaList;
                console.log(areaList.value);
            }
        }
        console.log(json.length)
    }

    function checkPwd() {

        //判斷元素值是否為空白，密碼長度是否大於6
        //如果長度是否大於6，判斷是否包含字母、數字、特殊符號
        // console.log("密碼長度" ,password.value.length)
        let thePwdObjValLen = password.value.length;
        let ch, flag1 = false, flag2 = false, flag3 = false
        const specialCh = ["!", "@", "#", "$", "%", "^", "&", "*"];
        if (password.value == "") {
            passwordError.value = " \u2718不可為空白";
        }
        else if (thePwdObjValLen >= 6) {
            // sp.innerHTML = ">=6";
            for (let i = 0; i < thePwdObjValLen; i++) {
                ch = password.value.charAt(i);
                // console.log(ch)
                if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {
                    flag1 = true
                } else if (ch >= "0" && ch <= "9") {
                    flag2 = true
                } else if (specialCh.includes(ch)) {
                    flag3 = true
                }
                if (flag1 && flag2 && flag3)
                    break;
            }
            if (flag1 && flag2 && flag3) {
                passwordError.value = ""
            } else {
                passwordError.value = "\u2718格式錯誤"
                
            }

        } else {
            passwordError.value = "\u2718Password length must been greater than 6";
        }
    }

    function register(){
        Swal.fire({
            text: "Loading....",
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        if (email.value === ""){
            email.value = null;
        }
        if (password.value === ""){
            password.value = null;
        }
        if (name.value ===""){
            name.value = null;
        }
        if (creditCard.value ===""){
            creditCard.value=null;
        }

        let data = {
            "name":name.value,
            "gender":sexual.value,
            "birth":birth.value,
            "national_id":nationalId.value,
            "email":email.value,
            "phone_number":phone.value,
            "credit_card":creditCard.value,
            "contact_address":countSelect.value+area.value+roadName.value,
            "password":password.value,
            "nationality":nationality.value
        }
        axiosapi.post("hotel/member/apply", data).then((response)=>{
            console.log("response",response);
            if (response.data.success){
                Swal.fire({
                    text: response.data.message,
                    icon:"success",
                    allowOutsideClick: false,
                    confirmButtonText: "確認",
                }).then(function (result){ 
                    if (result.isConfirmed){
                        router.push({name:"login-link"})
                    }
                });
            }else{
                console.log("error")
                message.value = response.data.message;
                setTimeout(function(){
                    Swal.close();
                }, 500);
            }

        }).catch((error)=>{
            Swal.fire({
                text: '註冊失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認'
            })
        })
    }
    
    onMounted(function(){
        console.log(password.value);
        // checkPwd()
    })
    
</script>
    
<style scoped>
    .passworderror{
        color: red;
    }
    .star{
        color: red;
    }
    
    .row{
        margin-top: 20px;
        margin-left: 30px;
        background-color: beige;
        border-radius: 20px;
        width: 95%;
        /* justify-content: center; */
        
    }
    .col-12{
        justify-content: center;
        display: flex;
    }
</style>