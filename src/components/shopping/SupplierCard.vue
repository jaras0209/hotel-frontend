<template>
    <div class="card " style="width:24em; ">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="font-size: 24px;">貴公司 :{{ itemone.name }}</li>
            <li class="list-group-item" style="font-size: 24px;">貴公司電話 :{{ itemone.phone }}</li>
            <li class="list-group-item" style="font-size: 24px;">貴公司地址 :{{ itemone.address }}</li>
        </ul>
        <div class="card-body">
            <RouterLink class=" card-link" :to="{
                name: 'products-link',
                params: { demo: itemone.id, name: itemone.name }
            }" style="font-size: 18px;">貴公司商品
            </RouterLink>
        </div>
        <div class="row">
            <div class="col text-start">
                <a href="#" class="btn btn-info btn-sm" @click="doclick1(itemone.id)" style="font-size:20px;">修改</a>
            </div>
            <div class="col text-end">
                <a href="#" class="btn btn-warning btn-sm" @click="doclick2(itemone.id)" style="font-size:20px;">刪除</a>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["itemone"]);
const emits = defineEmits(["openUpdate", "delete"]);
function doclick1(id) {
    emits("openUpdate", "update", id);
}
function doclick2(id) {
    emits("delete", id);
}
</script>
<style></style>