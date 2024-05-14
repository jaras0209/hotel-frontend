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
                            <td>Name : </td>
                            <td><input type="text" name="name" :value="name"
                                    @input="emits('update:name', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Phone : </td>
                            <td><input type="text" name="phone" :value="phone"
                                    @input="emits('update:phone', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Contactname : </td>
                            <td><input type="text" name="cname" :value="cname"
                                    @input="emits('update:cname', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Address : </td>
                            <td><input type="text" name="address" :value="address"
                                    @input="emits('update:address', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Email : </td>
                            <td><input type="text" name="email" :value="email"
                                    @input="emits('update:email', $event.target.value)"></td>
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
// 
const props = defineProps(["name", "phone", "cname", "address", "email", "isShowButtonInsert"]);
const emits = defineEmits(["update:name", "update:phone",
    "update:cname", "update:address", "update:email", "insert", "update"]);
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