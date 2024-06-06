<template>
    <backendNavbar></backendNavbar>
    <div class="box">
        <h1>員工目錄</h1>
        <table>
            <tr>
                <th>employeeId</th>
                <th>Name</th>
                <th>position</th>
                <th>permission</th>
                <th>email</th>
                <th>status</th>
                <th>revise</th>
                <th>delete</th>
            </tr>
            <tr v-for="employee in employeesData" :key="employee.employeeId">
                <td>{{ employee.employeeId }}</td>
                <td>{{ employee.employeeName }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.premission }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.status }}</td>
                <td v-if="employee.employeeId!=currentManage"><a class="btn btn-outline-success" @click="callShowModify(employee.employeeId)">修改</a></td>
                <td v-else>無法編輯自身狀態</td>
                <td v-if="employee.employeeId!=currentManage"><a class="btn btn-outline-danger" @click="callDelete(employee.employeeId)">刪除</a></td>
                <td v-else>無法編輯自身狀態</td>
            </tr>
        </table>
        <button type="button" class="btn btn-outline-light" @click="callShowAdd">+</button>
    </div>
    <EmployeeModal 
        ref="employeeModal"
        :name="employee.employeeName"
        :employee-id="employee.employeeId"
        :email="employee.email"
        v-model:premission="permission"
        v-model:position="employee.position"
        v-model:status="employee.status"
        @selected="selected"
        @modify="callModify"
    ></EmployeeModal>

    <NewEmployeeModal 
        ref="addEmployeeModal"
        v-model:name="newName"
        v-model:password="newPassword"
        v-model:email="newEmail"
        v-model:premission="newPermission"
        v-model:position="newPosition"
        v-model:status="newsStatus"
        @selected="selected"
        @insert="callInsert"
    ></NewEmployeeModal>
</template>
    
<script setup>
    import backendNavbar from '../backendNavbar.vue';
    import EmployeeModal from '@/components/backend/employeeModal.vue';
    import NewEmployeeModal from '@/components/backend/addEmployee.vue'; 
    import { ref, onMounted } from 'vue';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    // import { useRouter } from 'vue-router';

    const employeesData = ref(null);
    const employeeModal = ref(null);
    const addEmployeeModal = ref(null);
    const employee = ref({});
    const newName = ref("");
    const newEmail = ref("");
    const newPassword = ref("");
    const newPosition = ref("");
    const permission = ref("");
    const newsStatus = ref("");
    const newPermission = ref("");
    const currentManage = sessionStorage.getItem('employeeId');


    function callShowAdd(){
        addEmployeeModal.value.showModal();
    }
    function callShowModify(id){
        employeeModal.value.showModal();
        callFindEmployee(id);
        

    }
    //--------------------------------------------------
    // 使用 Proxy 處理數據
    const handler = {
        set(target, property, value) {
            console.log(`Setting ${property} to ${value}`);
            target[property] = value;
            return true;
        },
        get(target, property) {
            console.log(`Getting ${property}`);
            return target[property];
        }
    };

    const proxyData = new Proxy(employee.value, handler);

//-----------------------------

    function callFind(){
        axiosapi.get("hotel/employees").then(function (response){
            // console.log("data", response.data);
            employeesData.value = response.data;
        }).catch(function (error){
            console.log(error);
        })
    }

    function callFindEmployee(id){
        axiosapi.get(`hotel/employees/${id}`).then(function (response){
            // console.log("data", response.data);
            Object.assign(proxyData, response.data);
            permission.value = employee.value.premission;
            // employee.value = response.data;
        }).catch(function (error){
            console.log(error);
        })
    }
    
    function callDelete(id){
        axiosapi.delete(`hotel/employees/${id}`).then(function (response){
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

    function selected(){
        if (employee.value.position == "Housekeeping"){
            permission.value = "查看管理訂單";
        }else if(employee.value.position == "Purchaser"){
            permission.value = "管理商城";
        }else if(employee.value.position == "GeneralManger"){
            permission.value = "沒有限制";
        }else if(employee.value.position == "MemberManager"){
            permission.value = "管理會員";
        }else{
            permission.value = "房務管理";
        }

        if (newPosition.value == "Housekeeping"){
            newPermission.value = "查看管理訂單";
        }else if(newPosition.value == "Purchaser"){
            newPermission.value = "管理商城";
        }else if(newPosition.value == "GeneralManger"){
            newPermission.value = "沒有限制";
        }else if(newPosition.value == "MemberManager"){
            newPermission.value = "管理會員";
        }else{
            newPermission.value = "房務管理";
        }
    }
    function callModify(){
        console.log(permission.value)
        Swal.fire({
            text: "Loading...",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        
        if (employee.value.employeeName===""){
            employee.value.employeeName = null;
        }
        if (employee.value.employeeId===""){
            employee.value.employeeId=null;
        }
        if (employee.value.email===""){
            employee.value.email=null;
        }
        if (permission.value===""){
            permission.value = null;
        }
        if (employee.value.position===""){
            employee.value.position=null;
        }
        if (employee.value.status===""){
            employee.value.status=null;
        }

        let data = {
            "employeeId": employee.value.employeeId,
            "employeeName": employee.value.employeeName,
            "position": employee.value.position,
            "premission": permission.value,
            "password":"1234",//後端不會處理道所以任一值都可
            "email": employee.value.email,
            "status":employee.value.status
        }
        axiosapi.put(`hotel/employees/manager/${employee.value.employeeId}`, data).then(function (response){
            console.log("response", response);
            if (response.status==200){
                Swal.fire({
                    text: '修改成功',
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                }).then(function (){
                    employeeModal.value.hideModal();
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
    function callInsert(){
        Swal.fire({
            text: "Loading...",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        
        if (newName.value===""){
            newName.value = null;
        }
        if (newEmail.value===""){
            newEmail.value=null;
        }
        if (newPassword.value===""){
            newPassword.value=null;
        }
        if (newPosition.value===""){
            newPosition.value = null;
        }
        if (newsStatus.value===""){
            newsStatus.value=null;
        }
        if (newPermission.value===""){
            newPermission.value=null;
        }

        let data = {
            "employeeName":newName.value,
            "position": newPosition.value,
            "premission": newPermission.value,
            "password": newPassword.value,
            "email": newEmail.value
        }
        console.log("data", data);
        axiosapi.post(`hotel/employees/register`, data).then(function (response){
            console.log("response", response);
            if (response.status==201){
                Swal.fire({
                    text: "新增成功",
                    icon: 'success',
                    allowOutsideClick: false,
                    confirmButtonText: '確認',
                }).then(function (){
                    addEmployeeModal.value.hideModal();
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

    onMounted(function(){
        callFind();
    });
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
    .box h1{
        text-shadow: 5px;
    }
    table{
        border-collapse:collapse;
    }
    th{
        background-color:#009879;
        color:#ffffff;
        width:25vw;
        height:75px;
    }
    td{
        background-color:#ffffff;
        width:25vw;
        height:50px;
        text-align:center;
    }
</style>