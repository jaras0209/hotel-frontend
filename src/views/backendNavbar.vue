<template>
    <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand hotel" href="#"><img src="/Logo.png" alt="Logo" style="width:40px; border-radius: 40px;">FreeRelx HOTEL Backend</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">FreeRelx HOTEL</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/home">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/orderRoom">OrderRoom</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/roomService">Room Service</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/memberManage">Member Manage</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/backend/shoppingManage">Shopping Manage</RouterLink>
                </li>
                <li class="nav-item" v-if="position=='GeneralManger'">
                    <RouterLink class="nav-link active" to="/backend/employeeManage">Employees Manage</RouterLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" v-if="employee!=null">
                    歡迎 {{employee}}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                    <li><a class="dropdown-item" href="#" @click="revisePassword">修改密碼</a></li>
                    <!-- <li><a class="dropdown-item" href="#" @click="revisePassword">個人修改</a></li> -->
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" @click="logout">登出</a></li>
                    </ul>
                </li>
                </ul>
                <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </div>
    </nav>
    <EmployeesPassword 
        ref="employeeRef"
        :errorMess="errorMessg"
        v-model:original="inputPass"
        v-model:updatePassword="newPass"
        v-model:againUpdatePassword="newPassAg"
        @modify="modifyPassword"
        ></EmployeesPassword>
</template>
    
<script setup>
    import { useRouter } from 'vue-router';
    import store from '@/store/index.js';
    import { onMounted, ref } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import EmployeesPassword from '@/components/backend/employeePassword.vue';

    const router = useRouter();
    const employee = sessionStorage.getItem('employee');
    const position = sessionStorage.getItem('position');
    const employeeId = sessionStorage.getItem('employeeId');
    const employeeRef = ref(null);
    //--------修改密碼
    const inputPass = ref("");
    const newPass = ref("");
    const newPassAg = ref("");
    const errorMessg = ref("")
    

    function revisePassword(){
        errorMessg.value="";
        inputPass.value="";
        newPass.value="";
        newPassAg.value=""
        employeeRef.value.showModal();
    }    
    function modifyPassword(){
        Swal.fire({
            text: "Loading...",
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        if (inputPass.value === ""){
            inputPass.value = null;
        }
        if (newPass.value === ""){
            newPass.value = null;
        }
        if (newPassAg.value === ""){
            newPassAg.value = null;
        }

        if (newPass.value != newPassAg.value){
            errorMessg.value="兩次密碼輸入不一致";
            setTimeout(function () {
                    Swal.close();
                }, 500);
        }else{
            errorMessg.value=""
            let data = {
                "employeeId":employeeId,
                "originPassword":inputPass.value,
                "newPassword":newPass.value
            }
            console.log("data",data)
            axiosapi.put(`/hotel/employees/password/${employeeId}`, data).then(function (response){
                console.log("response", response);
                if (response.status==200){
                    console.log("hahahaha")
                    Swal.fire({
                        text: '修改成功',
                        icon: 'success',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    }).then(function (){
                        employeeRef.value.hideModal();
                    })
                }
            }).catch(function (error){
                console.log("error", error.response.status);
                if (error.response.status== 404){
                    Swal.fire({
                        text: "原始密碼錯誤，請重新輸入",
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
                }else{
                    Swal.fire({
                        text:'失敗：'+error.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    });
                }
            
            })
        }
    }
    //-------------

    function logout() {

        sessionStorage.removeItem('employee');
        sessionStorage.removeItem('position');
        // router.push({name:"backend-login-link"})
        // 使用 window.location.href 是為了確保網頁狀態全部重置
        store.dispatch('logout'); //store.commit('setAuthentication', false);
        window.location.href = '/backend/login';
    }

    function callFind(){
        axiosapi.get(`hotel/member/${userId}`).then(function (response){
            // console.log("response",response);
            // userData.value = response.data;
            Object.assign(proxyData, response.data);
            // console.log("userData.value",response.data.birth);
            console.log("userData.value",userData.value)
            console.log("userData.value", typeof(userData.value.contactAddress))
        }).catch(function (){
            
        })
    }

    onMounted(function(){

    })
</script>
    
<style scoped>
    @import '../assets/style/all.scss';
    .hotel{
        font-family: "Dancing Script", cursive;
        font-optical-sizing: auto;
        font-weight:weight;
        font-style:normal;
    }
</style>