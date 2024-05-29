<template>
    <div class="card">
        <div class="card-header" style="font-size: 28px;">
            {{ memberName }}
        </div>
        <div class="card-body">
            <p class="card-text" style="font-size: 15px;">{{ commentText }}</p>
            <button type="button" v-if="commentmemberId == userId">編輯留言</button>&nbsp;&nbsp;
            <button type="button" v-if="commentmemberId == userId" @click="doclick(commentId)">刪除留言</button>
        </div>
    </div>
    <td v-if="commentmemberId == userId">{{ dodo() }}</td>
</template>
<script setup>
const props = defineProps(["memberName", "commentText", "commentmemberId", "userId", "commentId"]);
const emits = defineEmits(["delet", "method-result"]);
function doclick(commentId) {
    emits("delet", commentId);
}
function dodo() {
    const result = false;
    emits("method-result", result);
}
</script>
<style scoped></style>