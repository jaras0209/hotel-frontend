<template>
    <div class="card">
        <div class="card-header" style="font-size: 28px;">
            {{ memberName }}
        </div>
        <div class="card-body">
            <p class="card-text" style="font-size: 15px;">{{ commentText }}</p>
            <button type="button" v-if="commentmemberId == userId">編輯留言</button>&nbsp;&nbsp;
            <button type="button" v-if="commentmemberId == userId">刪除留言</button>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["memberName", "commentText", "commentmemberId", "userId"]);
</script>
<style scoped></style>