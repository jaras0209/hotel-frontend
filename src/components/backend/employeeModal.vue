<template>
        <div class="modal" tabindex="-1" ref="employeeRef" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">員工資料修改</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="col-form-label">EmployeeId：</label>
                    <span>{{ props.employeeId }}</span>
                </div>
                <div class="mb-3">
                    <label class="col-form-label">Name：</label>
                    <span>{{ props.name }}</span>
                </div>
                <div class="mb-3">
                    <label class="col-form-label">Email：</label>
                    <span>{{ props.email }}</span>
                </div>
                <div class="mb-3">
                    <label for="position" class="form-label">職位</label>
                    <div class="input-group">
                        <select class="form-select" id="position" required :value="position" @change="emits('update:position', $event.target.value);emits('selected')">
                            <option selected disabled value="">Choose...</option>
                            <option vaiue="Housekeeping">Housekeeping</option>
                            <option vaiue="Purchaser">Purchaser</option>
                            <option vaiue="RoomService">RoomService</option>
                            <option vaiue="GeneralManger">GeneralManger</option>
                            <option vaiue="MemberManager">MemberManager</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="premission" class="col-form-label">權限：</label>
                    <input type="text" class="form-control" id="premission" disabled :value="premission">
                </div>
                <div class="mb-3">
                    <label for="status" class="form-label">狀態</label>
                    <div class="input-group">
                        <select class="form-select" id="status" required :value="status" @change="emits('update:status', $event.target.value)">
                            <option selected disabled value="">Choose...</option>
                            <option vaiue="Housekeeping">在職</option>
                            <option vaiue="Purchaser">留職</option>
                            <option vaiue="RoomService">離職</option>
                        </select>
                    </div>
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
    import { ref, onMounted } from 'vue';
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

    const employeeRef = ref(null);
    const modalObj = ref(null);
    const props = defineProps(["name", "employeeId", "email", "position", "premission", "status"])
    const emits = defineEmits(["update:position", "update:status", "update:premission", "selected","modify"])

    function showModal(){
        modalObj.value.show();
    }
    function hideModal(){
        modalObj.value.hide();
    }

    onMounted(function (){
        modalObj.value = new bootstrap.Modal(employeeRef.value);
    })

    defineExpose({
        showModal, hideModal
    })

</script>
    
<style>
    
</style>