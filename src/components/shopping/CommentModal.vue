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
                            <td v-if="member != null" style="font-size: 40px;">{{ member.memberName }}</td>
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
const props = defineProps(["commentId", "member", "commentText", "score", "typeInstance"]);
const emits = defineEmits(["update:commentText", "update:score", "send"]);
import { ref, onMounted } from "vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
const commentModal = ref(null);
const commentModalObj = ref(null);
const newscore = ref(null)
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
    document.getElementById("iimg1").src = "/src/assets/images/star1.jpg"
    document.getElementById("iimg2").src = "/src/assets/images/blackstar2.jpg"
    document.getElementById("iimg3").src = "/src/assets/images/blackstar3.jpg"
    document.getElementById("iimg4").src = "/src/assets/images/blackstar4.jpg"
    document.getElementById("iimg5").src = "/src/assets/images/blackstar5.jpg"
}
function ichangecolor2() {
    emits('update:score', 2)
    newscore.value = 2
    document.getElementById("iimg1").src = "/src/assets/images/star1.jpg"
    document.getElementById("iimg2").src = "/src/assets/images/star2.jpg"
    document.getElementById("iimg3").src = "/src/assets/images/blackstar3.jpg"
    document.getElementById("iimg4").src = "/src/assets/images/blackstar4.jpg"
    document.getElementById("iimg5").src = "/src/assets/images/blackstar5.jpg"
}
function ichangecolor3() {
    emits('update:score', 3)
    newscore.value = 3
    document.getElementById("iimg1").src = "/src/assets/images/star1.jpg"
    document.getElementById("iimg2").src = "/src/assets/images/star2.jpg"
    document.getElementById("iimg3").src = "/src/assets/images/star3.jpg"
    document.getElementById("iimg4").src = "/src/assets/images/blackstar4.jpg"
    document.getElementById("iimg5").src = "/src/assets/images/blackstar5.jpg"
}
function ichangecolor4() {
    emits('update:score', 4)
    newscore.value = 4
    document.getElementById("iimg1").src = "/src/assets/images/star1.jpg"
    document.getElementById("iimg2").src = "/src/assets/images/star2.jpg"
    document.getElementById("iimg3").src = "/src/assets/images/star3.jpg"
    document.getElementById("iimg4").src = "/src/assets/images/star4.jpg"
    document.getElementById("iimg5").src = "/src/assets/images/blackstar5.jpg"
}
function ichangecolor5() {
    emits('update:score', 5)
    newscore.value = 5
    document.getElementById("iimg1").src = "/src/assets/images/star1.jpg"
    document.getElementById("iimg2").src = "/src/assets/images/star2.jpg"
    document.getElementById("iimg3").src = "/src/assets/images/star3.jpg"
    document.getElementById("iimg4").src = "/src/assets/images/star4.jpg"
    document.getElementById("iimg5").src = "/src/assets/images/star5.jpg"
}
</script>
<style></style>