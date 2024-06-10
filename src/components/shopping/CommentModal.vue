<template>
    <div ref="commentModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title fs-5" id="exampleModalLabel"> {{ typeInstance
                        }}</span>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td v-if="member != null" style="font-size: 40px;"><img :src="PATH+member.memberId"  alt="..." height="60px" width="60px" style="border-radius: 50%;">{{ member.memberName }}</td>
                        </tr>
                        <tr>
                            <img src="@/assets/images/star1.jpg" alt="..." width="40px" id="iimg1" v-if="score >= 1" 
                                @click="ichangecolor1">
                            <img src="@/assets/images/star2.jpg" alt="..." width="40px" id="iimg2" v-if="score >= 2"
                                @click="ichangecolor2">
                            <img src="@/assets/images/star3.jpg" alt="..." width="40px" id="iimg3" v-if="score >= 3"
                                @click="ichangecolor3">
                            <img src="@/assets/images/star4.jpg" alt="..." width="40px" id="iimg4" v-if="score >= 4"
                                @click="ichangecolor4">
                            <img src="@/assets/images/star5.jpg" alt="..." width="40px" id="iimg5" v-if="score >= 5"
                                @click="ichangecolor5">
                            <img src="@/assets/images/blackstar1.jpg" alt="..." width="40px" id="iimg1" v-if="score < 1"
                                @click="ichangecolor1">
                            <img src="@/assets/images/blackstar2.jpg" alt="..." width="40px" id="iimg2"
                                @click="ichangecolor2" v-if="score < 2">
                            <img src="@/assets/images/blackstar3.jpg" alt="..." width="40px" id="iimg3"
                                @click="ichangecolor3" v-if="score < 3">
                            <img src="@/assets/images/blackstar4.jpg" alt="..." width="40px" id="iimg4"
                                @click="ichangecolor4" v-if="score < 4">
                            <img src="@/assets/images/blackstar5.jpg" alt="..." width="40px" id="iimg5"
                                @click="ichangecolor5" v-if="score < 5">
                        </tr>
                        <tr>
                            <textarea name="" id="" cols="30" rows="3" :value="commentText"
                                @input="emits('update:commentText', $event.target.value)"
                                style="font-size: 28px;"></textarea>
                        </tr>
                        <button type="button" @click="emits('send', commentId)" style="font-size: 20px;">送出</button>
                    </table>
                </div>
            </div>
        </div>
    </div>
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
const props = defineProps(["commentId", "member", "commentText", "score", "typeInstance"]);
const emits = defineEmits(["update:commentText", "update:score", "send"]);
import { ref, onMounted } from "vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
const commentModal = ref(null);
const commentModalObj = ref(null);
const newscore = ref(null)
const PATH = import.meta.env.VITE_MEMBER_PICTURE;
onMounted(function () {
    commentModalObj.value = new bootstrap.Modal(commentModal.value);
});
function showModal() {
    commentModalObj.value.show();
}
function hideModal() {
    commentModalObj.value.hide();
}
defineExpose({
    showModal, hideModal
});
function ichangecolor1() {
    emits('update:score', 1)
    newscore.value = 1
    document.getElementById("iimg1").src = star1
    document.getElementById("iimg2").src = blackstar2
    document.getElementById("iimg3").src = blackstar3
    document.getElementById("iimg4").src = blackstar4
    document.getElementById("iimg5").src = blackstar5
}
function ichangecolor2() {
    emits('update:score', 2)
    newscore.value = 2
    document.getElementById("iimg1").src = star1
    document.getElementById("iimg2").src = star2
    document.getElementById("iimg3").src = blackstar3
    document.getElementById("iimg4").src = blackstar4
    document.getElementById("iimg5").src = blackstar5
}
function ichangecolor3() {
    emits('update:score', 3)
    newscore.value = 3
    document.getElementById("iimg1").src = star1
    document.getElementById("iimg2").src = star2
    document.getElementById("iimg3").src = star3
    document.getElementById("iimg4").src = blackstar4
    document.getElementById("iimg5").src = blackstar5
}
function ichangecolor4() {
    emits('update:score', 4)
    newscore.value = 4
    document.getElementById("iimg1").src = star1
    document.getElementById("iimg2").src = star2
    document.getElementById("iimg3").src = star3
    document.getElementById("iimg4").src = star4
    document.getElementById("iimg5").src = blackstar5
}
function ichangecolor5() {
    emits('update:score', 5)
    newscore.value = 5
    document.getElementById("iimg1").src = star1
    document.getElementById("iimg2").src = star2
    document.getElementById("iimg3").src = star3
    document.getElementById("iimg4").src = star4
    document.getElementById("iimg5").src = star5
}
</script>
<style></style>