<template>
    
    <div class="modal" tabindex="-1" ref="modalRef" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">會員資料修改</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="/a-double-wing.png" class="card-img-top" alt="...">

                <div class="row">
                    <div class="col-md-6">
                        <label for="validationDefault01" class="form-label"><span class="star">*</span>姓名</label>
                        <input type="text" class="form-control" id="validationDefault01" :value ="name" required @input="emits('update:name', $event.target.value)">
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefault02" class="form-label"><span class="star">*</span>身分證字號/護照</label>
                        <input type="text" class="form-control" id="validationDefault02" required :value="nationId" @input="emits('update:nationId', $event.target.value)">
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefaultSexual" class="form-label"><span class="star">*</span>生理性別</label>
                        <div class="input-group">
                            <select class="form-select" id="validationDefaultSexual" required :value="sexual" @change="emits('update:sexual',$event.target.value)">
                                <option selected disabled value="">Choose...</option>
                                <option vaiue="man">男</option>
                                <option vaiue="female">女</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="validationbirth" class="form-label"><span class="star">*</span>生日</label>
                        <div class="input-group">
                            <FlatPickr class="form-select" :model-value="birth" id="validationbirth" @change="emits('update:birth', $event.target.value)"/>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultUsername" class="form-label"><span class="star">*</span>信箱</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required :value="email" @input="emits('update:email', $event.target.value)">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultPhone" class="form-label"><span class="star">*</span>手機</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <input type="text" class="form-control" id="validationDefaultPhone" aria-describedby="inputGroupPrepend2" required :value="phone" @input="emits('update:phone', $event.target.value)">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultCredircard" class="form-label">信用卡</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <input type="text" class="form-control" id="validationDefaultCredircard" :value="creditCard" @input="emits('update:creditCard', $event.target.value)">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultNation" class="form-label"><span class="star">*</span>國籍</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <select class="form-select" id="validationDefaultNation" required :value="nationality" @change="emits('update:nationality', $event.target.value)">
                            <option selected disabled value="">Choose...</option>
                            <option v-for="country in countries" :key="country.phone" :value="country.name" >{{ country.name }}</option>
                        </select>
                        </div>
                    </div>
                    



                    <div class="col-md-6">
                        <label for="validationDefault04" class="form-label"><span class="star">*</span>縣市</label>
                        <select class="form-select" id="validationDefault04" required :value="countSelect" @change="emits('update:countSelect', $event.target.value);emits('selected');"><!--emits('selected')-->
                            <option selected disabled value="">Choose...</option>
                            <option v-for="city1 in taiwan" :key="city1.CityName" :value="city1.CityName">{{ city1.CityName }} </option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefault05" class="form-label"><span class="star">*</span>鄉/鎮/區</label>
                        <select type="text" class="form-select" id="validationDefault05" required :value="area" @change="emits('update:area', $event.target.value)">
                            <option selected disabled value="">Choose...</option>
                            <option v-for="areaoption in props.areaList" :key="areaoption.ZipCode" :value="areaoption.AreaName">{{ areaoption.AreaName }} </option>
                            

                        </select>
                    </div>
                    <div class="col-md-12">
                        <label for="validationDefault03" class="form-label"><span class="star">*</span>村級區域名/道路名/門牌號</label>
                        <input type="text" class="form-control" id="validationDefault03" required :value="roadName" @input="emits('update:roadName', $event.target.value)">
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="emits('modify')">Save changes</button>
            </div>
            </div>
        </div>
    </div>

</template>
    
<script setup>
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import { ref, onMounted } from 'vue';

    import FlatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import json from '@/CityCountyData.json';
    import countries from '@/Country.json';
    const taiwan = ref(json);
    const areaList = ref(null);

    function selected(){
        console.log("select觸發")
        for (var i=0 ; i<json.length;i++){
            console.log(json[i]);
            if (json[i].CityName==props.countSelect){
                areaList.value = json[i].AreaList;
                // console.log(areaList.value);
            }
        }
        console.log(json.length)
    }

    const props = defineProps(["name", "nationId", "sexual", "birth", "email", "phone", "creditCard", "nationality", "countSelect", "area", "roadName","areaList"]);
    const emits = defineEmits(["update:name", "update:nationId", "update:sexual", "update:birth", "update:email", "update:phone", "update:creditCard", "update:nationality", "update:countSelect", "update:area", "update:roadName", "update:areaList", "selected", "modify"]);
    const modalRef = ref(null);
    const modalObj = ref(null);

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
    
<style>
    
</style>