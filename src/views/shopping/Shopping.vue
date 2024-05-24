<template>

    <body>
        <div class="main">
            <main>
                <ShoppingCard v-for="product in find" :key="product.id" :product="product" :pic="pic" :pict="pict"
                    :pictu="pictu" @cart="cart" :options="options" v-model="data">
                </ShoppingCard>
                <br><br><br><br><br><br>
                <button type="button" @click="comment" style="background-color: aquamarine;">評論送出</button>
                <input type="text" v-model="commentmessage" placeholder="詳細說明您的想法" width="50%">
            </main>
        </div>
        <CommentCard v-for="comment in instancecomment" :memberName="comment.member.memberName"
            :commentText="comment.commentText" :commentmemberId="comment.member.memberId" :userId="userId">
        </CommentCard>
    </body>
    <footer>
    </footer>
</template>
<script setup>
const options = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const data = ref(1)
import { useRouter } from "vue-router"
const router = useRouter();
import ShoppingCard from '@/components/shopping/ShoppingCard.vue';
import CommentCard from '@/components/shopping/CommentCard.vue';
import { useRoute } from 'vue-router';
import Swal from "sweetalert2"
const route = useRoute();
import { ref, onMounted } from "vue";
const id = route.params.id;
import xxx from "@/plugins/axios.js"
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
onMounted(function () {
    userId.value = sessionStorage.getItem("userId")
    callFindid(id)
    callFindProduct(id)
    xxx.get(`/hotel/carts/mes/${userId.value}`).then(function (response) {
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
    Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
    });
    xxx.get(`/hotel/products/${id}`).then(function (response) {
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
    xxx.get(`/hotel/photosALL/${id}`).then(function (response) {
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
    xxx.post(`/hotel/carts/post`, send).then(function (response) {
        Swal.fire({
            position: "top-end",
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
        "score": 5,
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
    xxx.post(`/hotel/comments`, send).then(function (response) {
        Swal.fire({
            position: "top-end",
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
    xxx.get(`/hotel/comments/instances/${productName.value}`).then(function (response) {
        instancecomment.value = response.data
        console.log(instancecomment.value)
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
    background: #34e7e4;
    font-family: sans-serif;
    text-align: start;
    color: black;
    font-size: 16px;
    display: flex;
    flex-direction: column;
}

header {
    background: yellow;
    padding: 2em 0 2em 0;
}

.left {
    background: gainsboro;
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
    background: gainsboro;
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
</style>