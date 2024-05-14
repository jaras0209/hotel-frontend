<template>
    <div ref="practiceModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                            <td>productId : </td>
                            <td><input type="text" name="id" :value="id" v-show="!isShowButtonInsert"
                                    @input="emits('update:id', $event.target.value)" disabled="disabled">
                            </td>
                        </tr>
                        <tr>
                            <td>productSupplierId : </td>
                            <td><input type="text" name="productSupplierId" :value="productSupplierId"
                                    @input="emits('update:productSupplierId', $event.target.value)">
                            </td>
                        </tr>
                        <tr>
                            <td>Name : </td>
                            <td><input type="text" name="productName" :value="productName"
                                    @input="emits('update:productName', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Price : </td>
                            <td><input type="text" name="productPrice" :value="productPrice"
                                    @input="emits('update:productPrice', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Stock : </td>
                            <td><input type="text" name="productStock" :value="productStock"
                                    @input="emits('update:productStock', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>Description : </td>
                            <td><input type="text" name="productDescription" :value="productDescription"
                                    @input="emits('update:productDescription', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>ArrivalDay : </td>
                            <td><input type="text" name="productArrivalDay" :value="productArrivalDay"
                                    @input="emits('update:productArrivalDay', $event.target.value)"></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-show="isShowButtonInsert"
                        @click="emits('insert')">新增</button>
                    <button type="button" class="btn btn-primary" v-show="!isShowButtonInsert"
                        @click="emits('update', id)">修改</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["id", "productSupplierId", "productName", "productPrice", "productStock", "productDescription", "productArrivalDay", "isShowButtonInsert"]);
const emits = defineEmits(["update:productName", "update:productPrice", "update:productSupplierId",
    "update:productStock", "update:productDescription", "update:productArrivalDay", "insert", "update"]);
import { ref, onMounted } from "vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
const practiceModal = ref(null);
const exampleModalObj = ref(null);
onMounted(function () {
    exampleModalObj.value = new bootstrap.Modal(practiceModal.value);
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