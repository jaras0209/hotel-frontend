<template>
    <div class="modal" tabindex="-1" ref="modalRefPass" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">修改密碼</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="origin-password" class="col-form-label">原密碼：</label>
                    <input type="password" class="form-control" id="origin-password" :value="original" @input="emits('update:original',$event.target.value)">
                </div>
                <div class="mb-3">
                    <label for="update-password" class="col-form-label">新密碼：</label>
                    <input type="password" class="form-control" id="update-password" :value="updatePassword" @input="emits('update:updatePassword',$event.target.value)">
                </div>
                <div class="mb-3">
                    <label for="again-update-password" class="col-form-label">再次輸入新密碼：</label>
                    <input type="password" class="form-control" id="again-update-password" :value="againUpdatePassword" @input="emits('update:againUpdatePassword',$event.target.value)">
                </div>
                <div class="mb-3">
                    <label class="col-form-label" style="color: red;">{{ props.errorMess }}</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="emits('modify')">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import { ref, onMounted} from 'vue';
    const modalRefPass = ref(null);
    const modalObj = ref(null);
    const props = defineProps(["original", "updatePassword", "againUpdatePassword", "errorMess"])
    const emits = defineEmits(["update:original", "update:updatePassword", "update:againUpdatePassword", "modify"]);

    function showModal(){
        modalObj.value.show();
    }
    function hideModal(){
        modalObj.value.hide();
    }

    onMounted(()=>{
        modalObj.value = new bootstrap.Modal(modalRefPass.value);
    })
    defineExpose({
        showModal, hideModal
    })
</script>
    
<style>
    
</style>