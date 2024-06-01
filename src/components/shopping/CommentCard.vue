<template>
    <div class="card text-bg-light mb-3">
        <div class="card-header" style="font-size: 40px;">
            {{ memberName }}
            <img src="@/assets/images/star1.jpg" alt="..." width="40px" id="img1" v-if="score >= 1">
            <img src="@/assets/images/star2.jpg" alt="..." width="40px" id="img2" v-if="score >= 2">
            <img src="@/assets/images/star3.jpg" alt="..." width="40px" id="img3" v-if="score >= 3">
            <img src="@/assets/images/star4.jpg" alt="..." width="40px" id="img4" v-if="score >= 4">
            <img src="@/assets/images/star5.jpg" alt="..." width="40px" id="img5" v-if="score >= 5">
            <img src="@/assets/images/blackstar1.jpg" alt="..." width="40px" id="img1" v-if="score < 1">
            <img src="@/assets/images/blackstar2.jpg" alt="..." width="40px" id="img2" v-if="score < 2">
            <img src="@/assets/images/blackstar3.jpg" alt="..." width="40px" id="img3" v-if="score < 3">
            <img src="@/assets/images/blackstar4.jpg" alt="..." width="40px" id="img4" v-if="score < 4">
            <img src="@/assets/images/blackstar5.jpg" alt="..." width="40px" id="img5" v-if="score < 5">
            {{ create }}
        </div>
        <div class="card-body">
            <p class="card-text" style="font-size: 30px;">{{ commentText }}</p>
            <button type="button" v-if="commentmemberId == userId" @click="doclick1(commentId)"
                style="font-size: 20px;">編輯留言</button>&nbsp;&nbsp;
            <button type="button" v-if="commentmemberId == userId" @click="doclick(commentId)"
                style="font-size: 20px;">刪除留言</button>
        </div>
    </div>
    <td v-if="commentmemberId == userId">{{ dodo() }}</td>
</template>
<script setup>
const props = defineProps(["memberName", "commentText", "commentmemberId", "userId", "commentId", "score", "create"]);
const emits = defineEmits(["delet", "method-result", "update"]);
function doclick(commentId) {
    emits("delet", commentId);
}
function doclick1(commentId) {
    emits("update", commentId);
}
function dodo() {
    const result = false;
    emits("method-result", result);
}
</script>
<style scoped></style>