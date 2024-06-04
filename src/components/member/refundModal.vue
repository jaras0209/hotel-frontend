<template>
    <div class="modal" ref="modalRef" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">退訂申請</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <label for="validationDefault01" class="form-label"><strong>退款種類 :</strong></label>
                        <span id="validationDefault01"> &nbsp;&nbsp;{{ props.refundType }}</span>
                        <!-- <input type="text" class="form-control" id="validationDefault01" :value ="name" required @input="emits('update:name', $event.target.value)"> -->
                    </div>
                    <div class="col-md-12">
                        <label for="refundfee" class="form-label"><strong>退款費用 :</strong></label>
                        <span id="refundfee"> &nbsp;&nbsp;{{ props.refundFee }}&nbsp;元</span>
                        <!-- <input type="text" class="form-control" id="validationDefault01" :value ="name" required @input="emits('update:name', $event.target.value)"> -->
                    </div>
                    <div class="col-md-12">
                        <label for="refundReason" class="form-label"><span class="star">*</span><strong>退訂原因</strong></label>
                        <textarea class="form-control" id="validationDefault02" placeholder="請簡述退訂原因"required :value="reasonInput" @input="emits('update:reasonInput', $event.target.value)"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="emits('modify')">確認</button>
            </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import { ref, onMounted } from 'vue';

    const modalRef = ref(null);
    const modalObj = ref(null);
    const props = defineProps(["refundType","refundFee", "reasonInput"]);
    const emits = defineEmits(["update:reasonInput", "modify"]);

    onMounted(()=>{
        modalObj.value = new bootstrap.Modal(modalRef.value);
    })

    function showModal(){
        modalObj.value.show();
    }
    function hideModal(){
        modalObj.value.hide();
    }

    defineExpose({
        showModal, hideModal
    })
</script>
    
<style scoped>

</style>