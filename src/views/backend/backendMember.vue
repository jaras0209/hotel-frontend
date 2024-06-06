<template>
    <backendNavbar></backendNavbar>
    <div class="box">
        <h1>會員資料</h1>
        <table class="table-danger">
            <tr>
                <th>memberId</th>
                <th>Name</th>
                <th>gender</th>
                <th>birth</th>
                <th>email</th>
                <th>nationId</th>
                <th>phoneNumber</th>
                <th>contactAddress</th>
                <th>registrationDate</th>
                <th>memberStatus</th>
                <th>loginTime</th>
                <th>loginStatus</th>
                <th>revise</th>
                <th>delete</th>
            </tr>
            <tr v-for="member in memberData" :key="member.member_id">
                <td>{{ member.member_id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.gender }}</td>
                <td>{{ member.birth }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.nationId }}</td>
                <td>{{ member.phone_number }}</td>
                <td>{{ member.contact_address }}</td>
                <td>{{ member.registration_date }}</td>
                <td>
                    <select class="form-select" id="position" required v-model="member.member_status">
                            <option selected disabled value="">Choose...</option>
                            <option vaiue="normal">normal</option>
                            <option vaiue="banned">banned</option>
                        </select>
                </td>
                <td>{{ member.login_time }}</td>
                <td>{{ member.login_status }}</td>
                <td><a class="btn btn-outline-success" @click="callModifyStatus(member.member_id, member.member_status)">修改</a></td>
                <td><a class="btn btn-outline-danger" @click="callDelete(member.member_id)">刪除</a></td>
            </tr>
        </table>
    </div>

</template>
    
<script setup>
    import backendNavbar from '../backendNavbar.vue';
    import { ref, onMounted } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';

    const memberData = ref(null);

    function callFind(){
        axiosapi.post("hotel/members/find").then(function (response){
            console.log("data", response.data);
            memberData.value = response.data;
        }).catch(function (error){
            console.log(error);
        })
    }

    function callDelete(id){
        axiosapi.delete(`hotel/backend/delete/${id}`).then(function (response){
            Swal.fire({
                text: '刪除成功',
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            }).then(function (){
                callFind();
            })
        }).catch(function (error){
            console.log("error", error);
        })
    }

    function callModifyStatus(id, status){
        console.log("id", id);
        console.log("status", status)
        Swal.fire({
            text: "Loading...",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        let data ={
            "memberId":id,
            "status":status
        }
        axiosapi.put(`hotel/backend/members/status/${id}`,data).then(function (response){
            console.log("data", response.data);
            if (response.status==200){
                Swal.fire({
                    text: "更新成功",
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                }).then(function (){
                    callFind();
                })
            }
        }).catch(function (error){
            Swal.fire({
                text:'失敗：'+error.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: '確認',
            });
        })
    }

    onMounted(function (){
        callFind();
    })
    
</script>
    
<style scoped>
    #app {
    height: 100%;
    overflow-y: auto; /* 允許滾動 */
    }
    .box{
        margin-top: 100px;
        text-align: center;
    }
    table{
        border-collapse:collapse;
        border-radius: 5px;
    }
    th{
        background-color:#059b87;
        color:#ffffff;
        width:30vw;
        height:75px;
    }
    td{
        background-color:#ffffff;
        width:30vw;
        height:50px;
        text-align:center;
    }
</style>