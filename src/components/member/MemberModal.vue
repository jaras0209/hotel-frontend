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
                        <input type="text" class="form-control" id="validationDefault01" v-model="name" required>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefault02" class="form-label"><span class="star">*</span>身分證字號/護照</label>
                        <input type="text" class="form-control" id="validationDefault02" value="Otto" required v-model="nationalId">
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefaultSexual" class="form-label"><span class="star">*</span>生理性別</label>
                        <div class="input-group">
                            <select class="form-select" id="validationDefaultSexual" required v-model="sexual">
                                <option selected disabled value="">Choose...</option>
                                <option vaiue="man">男</option>
                                <option vaiue="female">女</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="validationbirth" class="form-label"><span class="star">*</span>生日</label>
                        <div class="input-group">
                            <FlatPickr class="form-select" v-model="birth" id="validationbirth"/>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultUsername" class="form-label"><span class="star">*</span>信箱</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required v-model="email">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultPhone" class="form-label"><span class="star">*</span>手機</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <input type="text" class="form-control" id="validationDefaultPhone" aria-describedby="inputGroupPrepend2" required v-model="phone">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultCredircard" class="form-label">信用卡</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <input type="text" class="form-control" id="validationDefaultCredircard" v-model="creditCard">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <label for="validationDefaultNation" class="form-label"><span class="star">*</span>國籍</label>
                        <div class="input-group">
                        <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
                        <select class="form-select" id="validationDefaultNation" required v-model="nationality">
                            <option selected disabled value="">Choose...</option>
                            <option v-for="country in countries" :key="country.phone" :value="country.name" >{{ country.name }}</option>
                        </select>
                        </div>
                    </div>
                    



                    <div class="col-md-6">
                        <label for="validationDefault04" class="form-label"><span class="star">*</span>縣市</label>
                        <select class="form-select" id="validationDefault04" required v-model="countSelect" @change="selected()">
                            <option selected disabled value="">Choose...</option>
                            <option v-for="city1 in taiwan" :key="city1.CityName" :value="city1.CityName">{{ city1.CityName }} </option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefault05" class="form-label"><span class="star">*</span>鄉/鎮/區</label>
                        <select type="text" class="form-select" id="validationDefault05" required v-model="area">
                            <option selected disabled value="">Choose...</option>
                            <option v-for="areaoption in areaList" :key="areaoption.ZipCode" :value="areaoption.AreaName">{{ areaoption.AreaName }} </option>
                            

                        </select>
                    </div>
                    <div class="col-md-12">
                        <label for="validationDefault03" class="form-label"><span class="star">*</span>村級區域名/道路名/門牌號</label>
                        <input type="text" class="form-control" id="validationDefault03" required v-model="roadName">
                    </div>
                </div>

                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
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

    onMounted(()=>{
        modalObj.value = new bootstrap.Modal(modalRef.value);
    })

    function showModal(){
        modalObj.value.show();
    }

    defineExpose({
        showModal
    })

</script>
    
<style>
    
</style>