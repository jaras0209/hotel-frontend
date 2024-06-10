<template>
    <body id="A">
        <header>
            <nav id="B">
                <NavigationBar></NavigationBar>
                <a href="#product">商品</a>
                <a href="#commemtblock">評論</a>
                <a href="#mustknow">關於退貨</a>
            </nav>
        </header>
        <span id="product"></span>
        <br>
        <br>
        <div class="main">
            <main>
                <ShoppingCard v-for="product in find" :key="product.id" :product="product" :pic="pic" :pict="pict"
                    :pictu="pictu" @cart="cart" :options="options" v-model="data" :commentcount="commentcount"
                    :commentaveragescore="commentaveragescore">
                </ShoppingCard>
                <br><br><br><br><br><br>
                <div>
                    <div>
                        <h2 id="commemtblock">{{ getAverageScore() }}商品評論區</h2>
                    </div>
                    <div>
                        <textarea type="text" v-model="commentmessage" placeholder="詳細說明您的想法" width="50%"
                            v-if="disabled & iscanputmessage" rows="4" cols="70"></textarea>
                        <img src="@/assets/images/blackstar1.jpg" alt="..." width="80px" @click="changecolor1" id="img1"
                            style="cursor: pointer;" v-if="disabled & iscanputmessage">
                        <img src="@/assets/images/blackstar2.jpg" alt="..." width="80px" @click="changecolor2" id="img2"
                            style="cursor: pointer;" v-if="disabled & iscanputmessage">
                        <img src="@/assets/images/blackstar3.jpg" alt="..." width="80px" @click="changecolor3" id="img3"
                            style="cursor: pointer;" v-if="disabled & iscanputmessage">
                        <img src="@/assets/images/blackstar4.jpg" alt="..." width="80px" @click="changecolor4" id="img4"
                            style="cursor: pointer;" v-if="disabled & iscanputmessage">
                        <img src="@/assets/images/blackstar5.jpg" alt="..." width="80px" @click="changecolor5" id="img5"
                            style="cursor: pointer;" v-if="disabled & iscanputmessage">
                    </div>
                    <div >
                        <button type="button" @click="comment" style="background-color: aquamarine;"
                        v-if="disabled & iscanputmessage">評論送出</button>
                    </div>
                </div>
            </main>
        </div>
        <div>
            <CommentCard v-for="comment in instancecomment" :memberName="comment.member.memberName"
                :commentText="comment.commentText" :commentmemberId="comment.member.memberId" :userId="userId"
                :commentId="comment.commentId" @delet="dodelet" @method-result="handleMethodResult"
                :score="comment.score" :create="comment.createDate" @update="update">
            </CommentCard>
        </div>
        <div style="background-color: #C7EFEB;">
            <h2 id="mustknow">關於退貨</h2>
            <ul>
                <li>
                    消費者：指以消費為目的而為交易、使用商品或接受服務者。
                    個別磋商條款：指契約當事人個別磋商而合意之契約條款。定型化契約：指以企業經營者提出之定型化契約條款作為契約內容之全部或一部而訂立之契約。
                    通訊交易：指企業經營者以廣播、電視、電話、傳真、型錄、報紙、雜誌、網際網路、傳單或其他類似之方法，消費者於未能檢視商品或服務下而與企業經營者所訂立之契約。
                    訪問交易：指企業經營者未經邀約而與消費者在其住居所、工作場所、公共場所或其他場所所訂立之契約。
                    分期付款：指買賣契約約定消費者支付頭期款，餘款分期支付，而企業經營者於收受頭期款時，交付標的物與消費者之交易型態。
                </li>
                <li>
                    企業經營者：指以設計、生產、製造、輸入、經銷商品或提供服務為營業者。
                    <ol>
                        <li>
                            消費關係：指消費者與企業經營者間就商品或服務所發生之法律關係。
                        </li>
                        <li>
                            消費爭議：指消費者與企業經營者間因商品或服務所生之爭議。
                        </li>
                        <li>
                            消費訴訟：指因消費關係而向法院提起之訴訟。
                        </li>
                        <li>
                            從事設計、生產、製造商品或提供服務之企業經營者，於提供商品流通進入市場，或提供服務時，應確保該商品或服務，符合當時科技或專業水準可合理期待之安全性。
                            商品或服務具有危害消費者生命、身體、健康、財產之可能者，應於明顯處為警告標示及緊急處理危險之方法。
                            企業經營者違反前二項規定，致生損害於消費者或第三人時，應負連帶賠償責任。但企業經營者能證明其無過失者，法院得減輕其賠償責任。
                        </li>
                    </ol>
                </li>
                <li>
                    維護商品或服務之品質與安全衛生。
                    防止商品或服務損害消費者之生命、身體、健康、財產或其他權益。
                    確保商品或服務之標示，符合法令規定。
                    確保商品或服務之廣告，符合法令規定。
                    確保商品或服務之度量衡，符合法令規定。
                    促進商品或服務維持合理價格。
                    促進商品之合理包裝。
                    促進商品或服務之公平交易。
                    扶植、獎助消費者保護團體。
                    協調處理消費爭議。
                    推行消費者教育。
                    辦理消費者諮詢服務。
                    其他依消費生活之發展所必要之消費者保護措施。
                </li>
            </ul>
        </div>
        <CommentModal ref="modal" v-model:commentId="mfind.commentId" v-model:member="mfind.member"
            v-model:commentText="mfind.commentText" v-model:score="mfind.score"
            v-model:typeInstance="mfind.typeInstance" @send="send">
        </CommentModal>
    </body>
    <footer>
    </footer>
</template>
<script setup>
import star1 from '@/assets/images/star1.jpg';
import star2 from '@/assets/images/star2.jpg';
import star3 from '@/assets/images/star3.jpg';
import star4 from '@/assets/images/star4.jpg';
import star5 from '@/assets/images/star5.jpg';
import blackstar2 from '@/assets/images/blackstar2.jpg';
import blackstar3 from '@/assets/images/blackstar3.jpg';
import blackstar4 from '@/assets/images/blackstar4.jpg';
import blackstar5 from '@/assets/images/blackstar5.jpg';
import NavigationBar from '../NavigationBar.vue';
const options = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const data = ref(1)
import { useRouter } from "vue-router"
const router = useRouter();
import ShoppingCard from '@/components/shopping/ShoppingCard.vue';
import CommentCard from '@/components/shopping/CommentCard.vue';
import CommentModal from '@/components/shopping/CommentModal.vue';
const modal = ref(null)
import { useRoute } from 'vue-router';
import Swal from "sweetalert2"
const route = useRoute();
import { ref, onMounted } from "vue";
const id = route.params.id;
import axiosapi from "@/plugins/axios.js"
const find = ref({});
const pic = ref(0)
const pict = ref(0)
const pictu = ref(0)
const productName = ref(null)
const commentmessage = ref(null)
const people = ref(null)
const memberid = ref(null)
const name = ref(null)
const birth = ref(null)
const gender = ref(null)
const nationId = ref(null)
const email = ref(null)
const contactAddress = ref(null)
const phoneNumber = ref(null)
const creditcard = ref(null)
const nationality = ref(null)
const logintime = ref(null)
const loginstatus = ref(null)
const userId = ref(null)
const instancecomment = ref({})
const disabled = ref(true)
const score = ref(1)
const mfind = ref({})
const commentcount = ref(0)
const commentaveragescore = ref(0)
const iscanputmessage=ref(false)
onMounted(function () {
    userId.value = sessionStorage.getItem("userId")
    callFindid(id)
    callFindProduct(id)
    axiosapi.get(`/hotel/carts/mes/${userId.value}`).then(function (response) {
        people.value = response.data.listt[0]
        console.log(people.value)
        memberid.value = people.value.memberid
        name.value = people.value.MemberName
        birth.value = people.value.birth
        gender.value = people.value.gender
        nationId.value = people.value.nationId
        email.value = people.value.email
        contactAddress.value = people.value.contactAddress
        phoneNumber.value = people.value.phoneNumber
        creditcard.value = people.value.creditcard
        nationality.value = people.value.nationality
        logintime.value = people.value.logintime
        loginstatus.value = people.value.loginstatus
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
    // 獲取 A 元素
    var elementA = document.getElementById('A');
    // 獲取 A 元素的寬度
    var widthA = elementA.offsetWidth;
    // 將 B 元素設置為與 A 元素相同的寬度
    document.getElementById('B').style.width = widthA + 'px';
    callthispeoplebuywhat()
})
function getAverageScore() {
    let total = 0
    for (let i = 0; i < instancecomment.value.length; i++) {
        console.log(instancecomment.value[i].score)
        total = total + instancecomment.value[i].score
    }
    commentaveragescore.value = total / instancecomment.value.length
    console.log("commentaveragescore.value=" + commentaveragescore.value)
}
function callFindid(id) {
    axiosapi.get(`/hotel/products/${id}`).then(function (response) {
        if (response.data.list[0] != 0) {
            find.value = response.data.list;
            console.log(find.value)
            productName.value = response.data.list[0].productName
            callcoment()
            //換位置
            console.log(productName.value)
        }
    }).catch(function (error) {
        console.log("callFindById error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
function callFindProduct(id) {
    axiosapi.get(`/hotel/photosALL/${id}`).then(function (response) {
        console.log("count", response.data.list.length);
        console.log("list", response.data.list);
        if (response.data.list[0]) {
            pic.value = response.data.list[0].id;
        }
        if (response.data.list[1]) {
            pict.value = response.data.list[1].id;
        }
        if (response.data.list[2]) {
            pictu.value = response.data.list[2].id;
        }
        console.log(pic.value)
        console.log(pict.value)
        console.log(pictu.value)
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
function cart(id) {
    let send = {
        "memberId": userId.value,
        "productId": id,
        "quality": data.value,
    }
    axiosapi.post(`/hotel/carts/post`, send).then(function (response) {
        Swal.fire({
            icon: "success",
            title: "新增成功",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000
        });
        console.log(response);
        setTimeout(function () {
            Swal.close();
            router.push({ path: '/shopping/shoppinglist' });
        }, 2000);
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
function comment() {
    let send = {
        "commentText": commentmessage.value,
        "situationType": "商品品質",
        "typeInstance": productName.value,
        "score": score.value,
        "member": {
            "memberId": userId.value,
            "name": name.value,
            "birth": birth.value,
            "gender": gender.value,
            "nationId": nationId.value,
            "email": email.value,
            "phone_number": phoneNumber.value,
            "credit_card": creditcard.value,
            "contact_address": contactAddress.value,
            "nationality": nationality.value,
            "login_time": logintime.value,
            "login_status": loginstatus.value
        }
    }
    axiosapi.post(`/hotel/comments`, send).then(function (response) {
        Swal.fire({
            icon: "success",
            title: "新增成功",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000
        });
        setTimeout(function () {
            Swal.close();
            router.go(0);
        }, 2000);
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
function callcoment() {
    console.log(productName.value)
    axiosapi.get(`/hotel/comments/instances/${productName.value}`).then(function (response) {
        instancecomment.value = response.data
        console.log(instancecomment.value)
        commentcount.value = response.data.length
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
function handleMethodResult(result) {
    console.log("父元件收到方法的返回值：", result);
    disabled.value = result
}
function dodelet(commentId) {
    Swal.fire({
        text: "確定刪除留言嗎",
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: '確認',
        showCancelButton: true,
        cancelButtonText: '取消',
    }).then(function(result){
        if(result.isConfirmed){
            axiosapi.delete(`/hotel/comments/instances/${commentId}`).then(function (response) {
        Swal.fire({
            icon: "success",
            title: "刪除成功",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1300
        });
        setTimeout(function () {
            Swal.close();
            router.go(0);
        }, 1000);
    }).catch(function (error) {
        console.log(error)
    })
        }
    })
}
//第1部分照片  第二部分Shopping.vue的import還有function的更改  第三部分bug的刪除  第四部分CommentModal.vue的import還有function的更改
function changecolor1() {
    score.value = 1
    document.getElementById("img1").src = star1
    document.getElementById("img2").src = blackstar2
    document.getElementById("img3").src = blackstar3
    document.getElementById("img4").src = blackstar4
    document.getElementById("img5").src = blackstar5
}
function changecolor2() {
    score.value = 2
    document.getElementById("img1").src = star1
    document.getElementById("img2").src = star2
    document.getElementById("img3").src = blackstar3
    document.getElementById("img4").src = blackstar4
    document.getElementById("img5").src = blackstar5
}
function changecolor3() {
    score.value = 3
    document.getElementById("img1").src = star1
    document.getElementById("img2").src = star2
    document.getElementById("img3").src = star3
    document.getElementById("img4").src = blackstar4
    document.getElementById("img5").src = blackstar5
}
function changecolor4() {
    score.value = 4
    document.getElementById("img1").src = star1
    document.getElementById("img2").src = star2
    document.getElementById("img3").src = star3
    document.getElementById("img4").src = star4
    document.getElementById("img5").src = blackstar5
}
function changecolor5() {
    score.value = 5
    document.getElementById("img1").src = star1
    document.getElementById("img2").src = star2
    document.getElementById("img3").src = star3
    document.getElementById("img4").src = star4
    document.getElementById("img5").src = star5
}
function update(commentId) {
    //3
    axiosapi.get(`/hotel/comments/one/${commentId}`).then(function (response) {
        mfind.value = response.data
        console.log(mfind.value)
    }).catch(function (error) {
        console.log(error)
    })
    modal.value.showModal();
}
function send(commentId) {
    console.log(mfind.value)
    let send = {
        "commentId": commentId,
        "commentText": mfind.value.commentText,
        "situationType": "商品品質",
        "typeInstance": mfind.value.typeInstance,
        "score": mfind.value.score,
        "member": {
            "memberId": mfind.value.member.memberId,
            "name": mfind.value.member.name,
            "birth": mfind.value.member.birth,
            "gender": mfind.value.member.gender,
            "nationId": mfind.value.member.nationId,
            "email": mfind.value.member.email,
            "phone_number": mfind.value.member.phoneNumber,
            "credit_card": mfind.value.member.creditCard,
            "contact_address": mfind.value.member.contactAddress,
            "nationality": mfind.value.member.nationality,
            "login_time": mfind.value.member.loginTime,
            "login_status": mfind.value.member.loginStatus
        }
    }
    axiosapi.put(`/hotel/comments/${commentId}`, send).then(function (response) {
        Swal.fire({
            icon: "success",
            title: "修改成功",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1000
        });
        setTimeout(function () {
            Swal.close();
            router.go(0);
        }, 1000);
    }).catch(function (error) {
        console.log("callFind error", error);
        Swal.fire({
            text: '失敗：' + error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    });
}
//判斷是否能留言
function callthispeoplebuywhat(){
    axiosapi.get(`/hotel/orders/all/${userId.value}`).then(function (response) {
        console.log("callthispeoplebuywhat");
        console.log(response)
        for (let i = 0; i < response.data.list.length; i++) {
        if(response.data.list[i].ProductName==productName.value){
            console.log("可留言")
            iscanputmessage.value =true
        }
    }
    console.log("iscanputmessage.value"+iscanputmessage.value)
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
</script>
<style scoped>
* {
    margin: 1px;
    box-sizing: border-box;
}

body {
    height: 95vh;
    background: white;
    font-family: sans-serif;
    text-align: start;
    color: black;
    font-size: 16px;
    display: flex;
    flex-direction: column;
}

header {
    background: white;
    padding: 0em 0 0em 0;
    position: fixed;
    z-index: 9999
}

.left {
    background: white;
    padding: 3em 0 3em 0;
    flex: 1 1 100px
}

main {
    background: white;
    padding: 3em 0 3em 0;
    flex: 10 10 150px
}

.main {
    display: flex;
    flex: 1
}

.right {
    background: white;
    padding: 3em 0 3em 0;
    flex: 1 1 100px
}

footer {
    background: rgba(42, 212, 110, 0.29);
}

@media all and (max-width: 550px) {
    .main {
        flex-direction: column;
    }

    main {
        padding: 5em 0 5em 0;
    }
}

.card {
    background: white;
    margin-bottom: 10px
}

textarea {
    resize: none;
}

header nav a {
    padding: 10px 25px;
    font-size: 25px;
}

header nav a:hover {
    background: yellow;
}
</style>