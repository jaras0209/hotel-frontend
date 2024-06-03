<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand hotel" to="/"><img src="/Logo.png" alt="Logo" style="width:40px; border-radius: 40px;">&nbsp;&nbsp;FreeRelx HOTEL</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">

          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/front/frontIndex">關於我們</RouterLink>
          </li>   

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/room/roomInfo" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">房務管理</a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/room/back/roomManagement">客房管理</RouterLink>
                <RouterLink class="dropdown-item" to="/room/back/roomAssignment">分配房型</RouterLink>
                <RouterLink class="dropdown-item" to="/room/back/housingManagement">住房管理</RouterLink>
                <RouterLink class="dropdown-item" to="/room/back/additionalCharges">附加費用</RouterLink>
                <RouterLink class="dropdown-item" to="/room/back/checkOut">賠償費用</RouterLink>
                <RouterLink class="dropdown-item" to="/room/back/roomInfo">編輯房型</RouterLink>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/room/roomInfo" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">客房介紹</a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/room/front/standard">標準客房</RouterLink>
                <RouterLink class="dropdown-item" to="/room/front/executive">商務客房</RouterLink>
                <RouterLink class="dropdown-item" to="/room/front/deluxe">尊榮套房</RouterLink>
              </li>
            </ul>
          </li>

            
          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/back/backIndex">backIndex</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/room">test</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/b">B</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/room/calendar">t</RouterLink>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">線上購物</a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/supplier/allsupplier">合作夥伴(後端)</RouterLink>
                <RouterLink class="dropdown-item" to="/shopping/shoppinglist">
                  <font-awesome-icon :icon="['fas', 'shop']" /> &nbsp;&nbsp;商城
                </RouterLink>
                <RouterLink class="dropdown-item" to="/shopping/cart">
                  <font-awesome-icon :icon="['fas', 'cart-shopping']" />&nbsp;&nbsp;&nbsp;購物車
                </RouterLink>
                <RouterLink class="dropdown-item" to="/shopping/myorder">
                  <font-awesome-icon :icon="['fas', 'truck-fast']" />&nbsp;&nbsp;&nbsp;訂單查詢
                </RouterLink>
              </li>
              <li><a class="dropdown-item" href="#">link1</a></li>
              <li><a class="dropdown-item" href="#">link2</a></li>
              <li><a class="dropdown-item" href="#">link3</a></li>
            </ul>
          </li>

          <li class="nav-item" v-if="user==null">
            <RouterLink class="nav-link" to="/member/login">登入/註冊{{ user }}</RouterLink>
          </li>
          <li class="nav-item dropdown" v-if="user!=null">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              哈囉! {{ user }}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click="doclickShow" >資料修改</a></li>
              <li><RouterLink class="dropdown-item" to="/member/orderHistory">訂房紀錄</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/member/orderHome">訂房</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/room/front/minibar">RoomService</RouterLink></li>
              <li><a class="dropdown-item" href="#" @click="revisePassword">修改密碼</a></li>

              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="logout">登出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <MemberModal ref="memberRef"
      v-model:name="userData.memberName"
      v-model:nationId="userData.nationId"
      v-model:sexual="userData.gender"
      v-model:birth="userData.birth"
      v-model:email="userData.email"
      v-model:phone="userData.phoneNumber"
      v-model:creditCard="userData.creditCard"
      v-model:nationality="userData.nationality"
      v-model:countSelect="addressCounty"
      v-model:area="addressArea"
      v-model:roadName="addressRoadname"
      v-model:areaList="areaList"
      v-model:id="userId"
      @upload="catchPicture"
      @selected="selected"
      @modify="callModify"
    ></MemberModal>

    <MemberPassword
      ref="memberPasswordRef"
      :errorMess="errorMessg"
      v-model:original="inputPass"
      v-model:updatePassword="newPass"
      v-model:againUpdatePassword="newPassAg"
      @modify="modifyPassword"
    >
    </MemberPassword>
  </nav>
</template>

<script setup>
import axiosapi from '@/plugins/axios.js';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import MemberModal from '@/components/member/MemberModal.vue';
import MemberPassword from '@/components/member/memberPassword.vue';
import json from '@/CityCountyData.json';// 可能可以改進
import Swal from 'sweetalert2';

const router = useRouter();
const user = sessionStorage.getItem('user');
const userId = sessionStorage.getItem('userId');
const userData = ref({});
const memberRef = ref(null);
const memberPasswordRef = ref(null);
const addressCounty = ref("");
const addressArea = ref("");
const addressRoadname = ref("")
const areaList = ref(null);
const photoFile = ref(null);

    //--------修改密碼
    const inputPass = ref("");
    const newPass = ref("");
    const newPassAg = ref("");
    const errorMessg = ref("");

// const putData = FormData();
//--------------------------------------------------
    // 使用 Proxy 處理數據
    const handler = {
      set(target, property, value) {
        // console.log(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
      },
      get(target, property) {
        // console.log(`Getting ${property}`);
        return target[property];
      }
    };

    const proxyData = new Proxy(userData.value, handler);

//-----------------------------

    function selected(){
        // console.log("select觸發")
        for (var i=0 ; i<json.length;i++){
            // console.log(json[i]);
            if (json[i].CityName==addressCounty.value){
                areaList.value = json[i].AreaList;
                // console.log(areaList.value);
            }
        }
        // console.log(json.length)
    }

function logout() {
  sessionStorage.removeItem('user');
  axiosapi.defaults.headers.authorization = '';
  axiosapi.put(`hotel/member/logout/${userId}`).then(function(response){}).catch(function(error){})
  // console.log("logout", userId)
  sessionStorage.removeItem("userId");
  sessionStorage.clear();
  router.go(0);
}

function doclickShow(){
        memberRef.value.showModal()
        console.log("ihi");
        callFindUser()
        selected();
    }

    function callFindUser(){

      axiosapi.get(`hotel/member/${userId}`).then(function (response){
        // console.log("response",response);
        // userData.value = response.data;
        Object.assign(proxyData, response.data);
        // console.log("userData.value",response.data.birth);
        // console.log("userData.value",userData.value)
        // console.log("userData.value", typeof(userData.value.contactAddress))
        addressCounty.value = userData.value.contactAddress.substr(0,3);
        addressArea.value = userData.value.contactAddress.substr(3,3);
        // console.log(addressArea.value)
        addressRoadname.value = userData.value.contactAddress.substr(6);

        sessionStorage.setItem("name", userData.value.memberName);
        sessionStorage.setItem("gender", userData.value.gender);
        sessionStorage.setItem("birth",userData.value.birth);
        sessionStorage.setItem("national_id",userData.value.nationId);
        sessionStorage.setItem("email", userData.value.email);
        sessionStorage.setItem("phone_number", userData.value.phoneNumber);
        sessionStorage.setItem("password",userData.value.password);
        sessionStorage.setItem("nationality", userData.value.nationality);
      }).catch(function (error){
        console.log("error", error);
      })
    }

    function catchPicture(){
      photoFile.value = event.target.files[0];
      console.log("photoFile.value",photoFile.value)
    }

    function callModify(){
      Swal.fire({
        text: "Loading...",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      
      if (userData.value.memberName===""){
        userData.value.memberName = null;
      }
      if (userData.value.nationId===""){
        userData.value.nationId=null;
      }
      if (userData.value.gender===""){
        userData.value.gender=null;
      }
      if (userData.value.birth===""){
        userData.value.birth = null;
      }
      if (userData.value.email===""){
        userData.value.email=null;
      }
      if (userData.value.phoneNumber===""){
        userData.value.phoneNumber=null;
      }
      if (userData.value.creditCard===""){
        userData.value.creditCard=null;
      }
      if (userData.value.nationality===""){
        userData.value.nationality=null;
      }
      // let data={
      //   "name":userData.value.memberName,
      //   "gender":userData.value.gender,
      //   "birth":userData.value.birth,
      //   "national_id":userData.value.nationId,
      //   "email":userData.value.email,
      //   "phone_number":userData.value.phoneNumber,
      //   "credit_card":userData.value.creditCard,
      //   "contact_address":addressCounty.value+addressArea.value+addressRoadname.value,
      //   "password":userData.value.password,
      //   "nationality":userData.value.nationality
      // }

      const formData = new FormData();
      formData.append("multipartFile",photoFile.value);
      formData.append("json",JSON.stringify({
        "name":userData.value.memberName,
        "gender":userData.value.gender,
        "birth":userData.value.birth,
        "national_id":userData.value.nationId,
        "email":userData.value.email,
        "phone_number":userData.value.phoneNumber,
        "credit_card":userData.value.creditCard,
        "contact_address":addressCounty.value+addressArea.value+addressRoadname.value,
        "password":userData.value.password,
        "nationality":userData.value.nationality
      }))


      console.log("修改function裡");
      console.log(formData)
      axiosapi.put(`/hotel/member/alert2/${userId}`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (response){
        if (response.data.success){
          Swal.fire({
            text: response.data.message,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認',
          }).then(function (){
            memberRef.value.hideModal();
            router.go(0);
          })
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "warning",
            allowOutsideClick: false,
            confirmButtonText: '確認',
          });
        }
      }).catch(function (error){
        console.log("error",error)
        Swal.fire({
          text:'失敗：'+error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: '確認',
        });
      });
    }

    // 修改密碼
    function revisePassword(){
        errorMessg.value="";
        inputPass.value="";
        newPass.value="";
        newPassAg.value=""
        memberPasswordRef.value.showModal();
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
                "memberId":userId,
                "originPassword":inputPass.value,
                "newPassword":newPass.value
            }
            console.log("data",data)
            axiosapi.put(`/hotel/members/password/${userId}`, data).then(function (response){
                console.log("response", response);
                if (response.status==200){
                    Swal.fire({
                        text: '修改成功',
                        icon: 'success',
                        allowOutsideClick: false,
                        confirmButtonText: '確認',
                    }).then(function (){
                        memberPasswordRef.value.hideModal();
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

    onMounted(function (){
      if (userId){
        callFindUser()
      }
    })
</script>


<style scoped>
@import '../assets/style/all.scss';

.hotel{
    font-family: "Dancing Script", cursive;
    font-optical-sizing: auto;
    font-weight:weight;
    font-style:normal;}

.navbar-dark .navbar-nav .nav-link {
  color: #fff;
}

.navbar-dark .navbar-nav{
  color: #ccc;
}

.navbar-dark .navbar-nav .dropdown-menu {
  background-color: #343a40;
  color: #fff;
}

.navbar-dark .navbar-nav .dropdown-menu .dropdown-item {
  color: #fff;
}

.navbar-dark .navbar-nav .dropdown-menu .dropdown-item:hover {
  background-color: #495057;
}

.navbar-dark .navbar-nav .dropdown-menu .dropdown-divider {
  border-color: #6c757d;
}

.brand-logo {
  width: 80px; 
  height: auto;
}

/* .logo-container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 1050;
}  */


</style>