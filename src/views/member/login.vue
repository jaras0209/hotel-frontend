<template>
    
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-6">
                <h1>登入頁面</h1>
                

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" name="username" aria-describedby="emailHelp" v-model="userEmail" @blur="checkEmail">
                    <div id="emailHelp" class="form-text" >We'll never share your email with anyone else. </div> <span class="error">{{ erMess }}</span>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="pwd" v-model="password">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary" @click="login">登入</button><span>{{ message }}</span>


                <div th:text="${loginSuccess}"></div>
                <div th:text="${loginFail}"></div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import Swal from 'sweetalert2';
    import axiosapi from '@/plugins/axios.js';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const userEmail = ref("");
    const password = ref("");
    const message = ref("");
    const router = useRouter();
    const erMess = ref("")

    function checkEmail(){
        if (userEmail.value===""){
            erMess.value = "&nbsp;\u2718格式錯誤";
        }
    }

    function login(){
        Swal.fire({
            text: "Loading....",
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        if (userEmail.value === ""){
            userEmail.value = null;
        }
        if (password.value === ""){
            password.value = null;
        }

        let data = {
            "email":userEmail.value,
            "password":password.value
        }

        axiosapi.post("hotel/member/login", data).then((response)=>{
            console.log("response",response);
            if (response.data.success){
                Swal.fire({
                    text: response.data.message,
                    icon:"success",
                    allowOutsideClick: false,
                    confirmButtonText: "確認",
                }).then(function (result){ 
                    if (result.isConfirmed){
                        axiosapi.defaults.headers.authorization = "Bearer "+response.data.token;
                        sessionStorage.setItem("user",response.data.user);
                        router.push({name:"home-link"})
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
                text: '登入失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認'
            })
        })
    }

</script>


<style scoped>
    .container{
        background-image: url("src/assets/images/sunset-8516639_1920.jpg");
    }
    .error{
        color: red
    }
</style>