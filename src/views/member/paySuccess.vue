<template>
    <NavigationBar></NavigationBar>
    <div></div>
    <h3>Pay Success</h3>
</template>
    
<script setup>
    import NavigationBar from '../NavigationBar.vue';
    import axiosapi from '@/plugins/axios.js';
    import { onMounted } from 'vue';
    import Swal from 'sweetalert2';

    function confirmLine(){
        Swal.fire({
            text: "繳費成功",
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(function (result){
            if (result.isConfirmed){
                let data = {
                    "orderTotalAmount": sessionStorage.getItem("orderTotalAmount"),
                    "transactionId":sessionStorage.getItem("transactionId")
                }
                console.log(sessionStorage.getItem("orderTotalAmount"));
                axiosapi.post('hotel/orderRoom/transactions/confirm/line-pay',data).then(function (response){
                    console.log("response", response);
                    // if (response.status == 200){

                    // }

                    // 成功就接收後端的資料跳轉到成功畫面
                }).catch(function (error){
                    console.log("error", error);
                })
            }
        })
    }

    onMounted(function (){
        confirmLine()
    })

</script>
    
<style>
    
</style>