<template>
    <div ref="exampleModalRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>Id : </td>
                            <td><input type="text" name="id" :value="id"
                                    @input="emits('update:id', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Name : </td>
                            <td><input type="text" name="name" :value="name"
                                    @input="emits('update:name', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Price : </td>
                            <td><input type="text" name="price" :value="price"
                                    @input="emits('update:price', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Make : </td>
                            <td><input type="text" name="make" :value="make"
                                    @input="emits('update:make', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Expire : </td>
                            <td><input type="text" name="expire" :value="expire"
                                    @input="emits('update:expire', $event.target.value)"></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-show="isShowButtonInsert"
                        @click="emits('insert')">新增</button>
                    <button type="button" class="btn btn-primary" v-show="!isShowButtonInsert"
                        @click="emits('update')">修改</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    id: String,
    item: String,
    price: Number,
    make: String,
    expire: String,
    isShowButtonInsert: Boolean,
    photo: String
});

const emits = defineEmits(["update:id", "update:item", "update:price",
    "update:make", "update:expire", "insert", "update"]);

import { ref, onMounted } from "vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const exampleModalRef = ref(null);
const exampleModalObj = ref(null);
onMounted(function () {
    exampleModalObj.value = new bootstrap.Modal(exampleModalRef.value);
});

function showModal() {
    exampleModalObj.value.show();
}
function hideModal() {
    exampleModalObj.value.hide();
}
defineExpose({
    showModal, hideModal
});

</script>

<style></style>