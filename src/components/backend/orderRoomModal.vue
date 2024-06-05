<template>
    <div class="modal" ref="orderRoomRef" tabindex="-1">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">訂單詳細資料</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
            <label class="col-form-label"><strong>身分：</strong></label>
            <span>{{ props.identity }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label"><strong>是否為入住人：</strong></label>
            <span>{{ props.samePerson }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label" v-if="props.livingName!=null"><strong>入住人名字：</strong></label>
            <span>{{ props.livingName }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label" v-if="props.livingEmail!=null"><strong>入住人信箱：</strong></label>
            <span>{{ props.livingEmail }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label" v-if="props.livingNationId!=null"><strong>入住人身分證字號：</strong></label>
            <span>{{ props.livingNationId }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label" v-if="props.livingPhone!=null"><strong>入住人電話：</strong></label>
            <span>{{ props.livingPhone }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label"><strong>房型名稱：</strong></label>
            <span>{{ props.roomName }}</span>
        </div>
        <div class="mb-3">
            <label class="col-form-label"><strong>總金額：</strong></label>
            <span>{{ props.orderPrice }} 元</span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

    const orderRoomRef = ref(null);
    const modalObj = ref(null);
    const props = defineProps(["identity","samePerson", "livingName", "livingEmail", "livingNationId", "livingPhone", "roomName", "orderPrice"])

    function showModal(){
        modalObj.value.show();
    }
    function hideModal(){
        modalObj.value.hide();
    }

    onMounted(function (){
        modalObj.value = new bootstrap.Modal(orderRoomRef.value);
    })

    defineExpose({
        showModal, hideModal
    })
</script>
    
<style scoped>

</style>