<template>
    <div class="modal" ref="orderRoomMailRef" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">信件通知</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="mail-receiver" class="col-form-label"><strong>收件人：</strong></label>
                <input type="text" class="form-control" id="mail-receiver" :value="receiver" disabled>
            </div>
            <div class="mb-3">
                <label for="mail-subject" class="col-form-label"><strong>主旨：</strong></label>
                <input type="text" class="form-control" id="mail-subject" :value="subject" @input="emits('update:subject',$event.target.value)">
            </div>
            <div class="mb-3">
                <label for="mail-context" class="col-form-label"><strong>內容：</strong></label>
                <textarea class="form-control" id="mail-context"  style="height:50px;" :value="context" @input="emits('update:context',$event.target.value)"></textarea>
            </div>
        </div>
    
        <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="emits('send')">寄送</button>
        </div>
    </div>
    </div>
</div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

    const orderRoomMailRef = ref(null);
    const modalObj = ref(null);
    const props = defineProps(["receiver","subject", "context"])
    const emits = defineEmits(["update:subject", "update:context", 'send'])

    function showModal(){
        modalObj.value.show();
    }
    function hideModal(){
        modalObj.value.hide();
    }

    onMounted(function (){
        modalObj.value = new bootstrap.Modal(orderRoomMailRef.value);
    })

    defineExpose({
        showModal, hideModal
    })
</script>
    
<style scoped>

</style>