<template>

    <body>
        <header>
            <nav>
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
                    :pictu="pictu" @cart="cart" :options="options" v-model="data">
                </ShoppingCard>
                <br><br><br><br><br><br>
                <div>
                    <div>
                        <h2 id="commemtblock">商品評價</h2>
                    </div>
                    <div>
                        <textarea type="text" v-model="commentmessage" placeholder="詳細說明您的想法" width="50%"
                            v-if="disabled" rows="4" cols="70"></textarea>
                        <img src="@/assets/images/blackstar1.jpg" alt="..." width="80px" @click="changecolor1" id="img1"
                            style="cursor: pointer;" v-if="disabled">
                        <img src="@/assets/images/blackstar2.jpg" alt="..." width="80px" @click="changecolor2" id="img2"
                            style="cursor: pointer;" v-if="disabled">
                        <img src="@/assets/images/blackstar3.jpg" alt="..." width="80px" @click="changecolor3" id="img3"
                            style="cursor: pointer;" v-if="disabled">
                        <img src="@/assets/images/blackstar4.jpg" alt="..." width="80px" @click="changecolor4" id="img4"
                            style="cursor: pointer;" v-if="disabled">
                        <img src="@/assets/images/blackstar5.jpg" alt="..." width="80px" @click="changecolor5" id="img5"
                            style="cursor: pointer;" v-if="disabled">
                    </div>
                    <div>
                        <button type="button" @click="comment" style="background-color: aquamarine;"
                            v-if="disabled">評論送出</button>
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
        <div>
            <h2 id="mustknow">關於退貨</h2>
            <ul>
                <li>
                    歡迎來到,這並非商業用途,參考地方來源於,無商業用途,若有冒犯抱歉,依照消費者保護法的規定，享有商品貨到次日起七天猶豫期的權益。(請留意猶豫期非試用期!!)您所退回的商品必須回復原狀（復原至商品到貨時的原始狀態並且保持完整包裝，包括商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料的完整性）。商品一經拆封/啟用歡迎來到,這並非商業用途,參考地方來源於,保固，將使商品價值減損，您理解本公司將依法收取回復原狀必要之費用(若無法復原，費用將以商品價值損失計算)，請先確認商品正確、外觀可接受再行使用，以免影響您的權利，祝您購物順心。
                </li>
                <li>
                    如果您所購買商品是下列特殊商品，請留意下述退貨注意事項：
                    <ol>
                        <li>
                            易於腐敗之商品、保存期限較短之商品、客製化商品、報紙、期刊、雜誌，依據消費者保護法之規定，於收受商品後將無法享有七天猶豫期之權益且不得辦理退貨,歡迎來到,這並非商業用途,參考地方來源於,無商業用途,若有冒犯抱歉歡迎來到,這並非商業用途,參考地方來源於。
                        </li>
                        <li>
                            非以有形媒介提供之數位內容或一經提供即為完成之線上服務，一經您事先同意後始提供者，依消費者保護法之規定，您將無法享有七天猶豫期之權益且不得辦理退貨歡迎來到,這並非商業用途,參考地方來源於。
                        </li>
                        <li>
                            若因您要求退貨或換貨、或因本公司無法接受您全部或部分之訂單、或因契約解除或失其效力，而需為您辦理退款事宜時，您同意本公司得代您處理發票或折讓單等相關法令所要求之單據，以利本公司為您辦理退款,歡迎來到,這並非商業用途,參考地方來源於,無商業用途,若有冒犯抱歉歡迎來到,這並非商業用途,參考地方來源於。
                        </li>
                        <li>
                            歡迎來到,這並非商業用途,參考地方來源於,無商業用途,若有冒犯抱歉,依照消費者保護法的規定，享有商品貨到次日起七天猶豫期的權益。(請留意猶豫期非試用期!!)您所退回的商品必須回復原狀歡迎來到,這並非商業用途,參考地方來源於。
                        </li>
                    </ol>
                </li>
                <li>
                    歡迎來到,這並非商業用途,參考地方來源於,無商業用途,若有冒犯抱歉,依照消費者保護法的規定，享有商品貨到次日起七天猶豫期的權益。(請留意猶豫期非試用期!!)您所退回的商品必須回復原狀（復原至商品到貨時的原始狀態並且保持完整包裝，包括商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料的完整性）。商品一經拆封/啟用保固，將使商品價值減損，您理解本公司將依法收取回復原狀必要之費用(若無法復原，費用將以商品價值損失計算)，請先確認商品正確、外觀可接受再行使用，歡迎來到,這並非商業用途,參考地方來源於,無商業用途,若有冒犯抱歉,依以免影響您的權利，祝您購物順心,歡迎來到,這並非商業用途,參考地方來源批溪轟。
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
})
function callFindid(id) {
    axiosapi.get(`/hotel/products/${id}`).then(function (response) {
        if (response.data.list[0] != 0) {
            find.value = response.data.list;
            console.log(find.value)
            productName.value = response.data.list[0].productName
            console.log(productName.value)
        }
        setTimeout(function () {
            Swal.close();
        }, 500);
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
        callcoment()
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
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
function handleMethodResult(result) {
    console.log("父元件收到方法的返回值：", result);
    disabled.value = result
}
function dodelet(commentId) {
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
function changecolor1() {
    score.value = 1
    document.getElementById("img1").src = "/src/assets/images/star1.jpg"
    document.getElementById("img2").src = "/src/assets/images/blackstar2.jpg"
    document.getElementById("img3").src = "/src/assets/images/blackstar3.jpg"
    document.getElementById("img4").src = "/src/assets/images/blackstar4.jpg"
    document.getElementById("img5").src = "/src/assets/images/blackstar5.jpg"
}
function changecolor2() {
    score.value = 2
    document.getElementById("img1").src = "/src/assets/images/star1.jpg"
    document.getElementById("img2").src = "/src/assets/images/star2.jpg"
    document.getElementById("img3").src = "/src/assets/images/blackstar3.jpg"
    document.getElementById("img4").src = "/src/assets/images/blackstar4.jpg"
    document.getElementById("img5").src = "/src/assets/images/blackstar5.jpg"
}
function changecolor3() {
    score.value = 3
    document.getElementById("img1").src = "/src/assets/images/star1.jpg"
    document.getElementById("img2").src = "/src/assets/images/star2.jpg"
    document.getElementById("img3").src = "/src/assets/images/star3.jpg"
    document.getElementById("img4").src = "/src/assets/images/blackstar4.jpg"
    document.getElementById("img5").src = "/src/assets/images/blackstar5.jpg"
}
function changecolor4() {
    score.value = 4
    document.getElementById("img1").src = "/src/assets/images/star1.jpg"
    document.getElementById("img2").src = "/src/assets/images/star2.jpg"
    document.getElementById("img3").src = "/src/assets/images/star3.jpg"
    document.getElementById("img4").src = "/src/assets/images/star4.jpg"
    document.getElementById("img5").src = "/src/assets/images/blackstar5.jpg"
}
function changecolor5() {
    score.value = 5
    document.getElementById("img1").src = "/src/assets/images/star1.jpg"
    document.getElementById("img2").src = "/src/assets/images/star2.jpg"
    document.getElementById("img3").src = "/src/assets/images/star3.jpg"
    document.getElementById("img4").src = "/src/assets/images/star4.jpg"
    document.getElementById("img5").src = "/src/assets/images/star5.jpg"
}
function update(commentId) {
    mfind.value = null
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