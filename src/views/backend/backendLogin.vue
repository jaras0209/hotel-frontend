<template>

    <backendNavbar></backendNavbar>
    <div class="row justify-content-md-center">
        <div class="col-6">
            <h1>後台登入</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="text" class="form-control" id="exampleInputEmail1" name="username"
                    aria-describedby="emailHelp" v-model="userEmail" @blur="checkEmail">
                <div id="emailHelp" class="form-text">{{ erMess }}</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" name="pwd" v-model="password"
                    placeholder="請輸入密碼" autocomplete>
            </div>

            <div class="mb-3 form-check">
                {{ message }}
            </div>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary" @click="login">登入</button><span></span>
                <!-- <div class="p-3 mb-2 bg-success-subtle text-success-emphasis rounded">
                    <RouterLink class="nav-link" to="/member/register">註冊</RouterLink>
                </div> -->
            </div>

            <!-- <div th:text="${loginSuccess}"></div>
            <div th:text="${loginFail}"></div> -->
        </div>
    </div>
</template>

<script setup>
import backendNavbar from '../backendNavbar.vue';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store/index.js';

const userEmail = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();
const erMess = ref("")

function checkEmail() {
    if (userEmail.value === "") {
        erMess.value = "\u2718請輸入Email";
    }
    var re = /^.+@.+\..{2,3}$/;

    if (!re.test(userEmail.value)) {
        console.log("正則", re.test(userEmail.value))
        erMess.value = "\u2718Email格式錯誤";
    } else {
        erMess.value = "";

    }
}

function login() {
    Swal.fire({
        text: "Loading....",
        showConfirmButton: false,
        allowOutsideClick: false,
    });

    // axiosapi.defaults.headers.authorization = '';
    sessionStorage.removeItem("employee");

    if (userEmail.value === "") {
        userEmail.value = null;
    }
    if (password.value === "") {
        password.value = null;
    }

    let data = {
        "email": userEmail.value,
        "password": password.value
    }
    console.log("data", data);
    axiosapi.post("hotel/employees/login", data).then((response) => {
        console.log("response", response);
        if (response.data.Success) {
            console.log("success")
            Swal.fire({
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "確認",
            }).then(function (result) {
                if (result.isConfirmed) {
                    // axiosapi.defaults.headers.authorization = "Bearer " + response.data.token;
                    // console.log("axiosapi.defaults.headers.authorization",axiosapi.defaults.headers.authorization);
                    console.log("employee_position", response.data.position);
                    sessionStorage.setItem("employee", response.data.employee);
                    sessionStorage.setItem("position", response.data.position);
                    sessionStorage.setItem("employeeId", response.data.EmpId);
                    // sessionStorage.setItem("userId", response.data.userId);
                    // window.location.href = '/backend/home';
                    store.commit('setAuthentication', true);
                    store.commit('setUserRole', response.data.position);
                    router.push({ name: "backend-home-link" });
                }
            });
        } else {
            console.log("error")
            message.value = response.data.message;
            setTimeout(function () {
                Swal.close();
            }, 500);
        }

    }).catch((error) => {
        Swal.fire({
            text: '登入失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認'
        })
    })
}
</script>

<style scoped>
.row {
    margin-top: 100px;
    background-image: url('@/assets/images/pexels-johnnoibn.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    opacity: 0.8;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 5px black;
    border-radius: 20px;
}

.col-6 {
    background-color: rgba(255, 255, 2255, 0.6);
    ;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0px 70px rgba(0, 0, 0, 0.1);
}

.form-check {
    color: red;
    font-size: 18px;
    font-family: '標楷體';
}
</style>