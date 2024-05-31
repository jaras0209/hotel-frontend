<template>

    <div ref="exampleModalRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">CheckOut title</h1>
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
                            <td>住房編號 : </td>
                            <td><input type="text" name="housingManagement.id" :value="housingManagement.id"
                                        @input="emits('update:housingManagement.id', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>賠償項目 : </td>
                            <td><input type="text" name="compensation" :value="compensation"
                                        @input="emits('update:compensation', $event.target.value)"></td>
                        </tr>
                        <tr>
                            <td>賠償費用 : </td>
                            <td><input type="text" name="fee" :value="fee"
                                        @input="emits('update:fee', $event.target.value)"></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"
                            v-show="isShowButtonInsert" @click="emits('insert')">新增</button>
                    <button type="button" class="btn btn-primary"
                            v-show="!isShowButtonInsert" @click="emits('update')">修改</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>
    
<script setup>
    const props = defineProps(["id", "housingManagement.id", "compensation", "fee", "isShowButtonInsert"]);
    const emits = defineEmits(["update:id", "update:name", "update:price",
                        "update:make","insert", "update"]);

    import { ref, onMounted } from "vue";
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

    const exampleModalRef = ref(null);
    const exampleModalObj = ref(null);
    onMounted(function() {
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
    
<style>
    
</style>