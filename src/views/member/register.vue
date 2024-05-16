<template>
    <form class="row g-3">

        <div class="col-md-4">
            <label for="validationDefault01" class="form-label">姓名</label>
            <input type="text" class="form-control" id="validationDefault01" value="Mark" required>
        </div>

        <div class="col-md-4">
            <label for="validationDefault02" class="form-label">身分證字號</label>
            <input type="text" class="form-control" id="validationDefault02" value="Otto" required>
        </div>
        <div class="col-md-4">
            <label for="validationDefaultSexual" class="form-label">生理性別</label>
            <div class="input-group">
                <select class="form-select" id="validationDefaultSexual" required>
                    <option selected disabled value="">Choose...</option>
                    <option vaiue="man">男</option>
                    <option vaiue="female">女</option>
                </select>
            </div>
        </div>
        <div class="col-md-12">
            <label for="validationDefaultUsername" class="form-label">信箱</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required>
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultPassword" class="form-label">密碼</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="password" class="form-control" id="validationDefaultPassword" required>
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultCredircard" class="form-label">信用卡</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <input type="text" class="form-control" id="validationDefaultCredircard">
            </div>
        </div>

        <div class="col-md-4">
            <label for="validationDefaultNation" class="form-label">國籍</label>
            <div class="input-group">
            <!-- <span class="input-group-text" id="inputGroupPrepend2">@</span> -->
            <select class="form-select" id="validationDefaultNation" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
            </select>
            </div>
        </div>
        



        <div class="col-md-3">
            <label for="validationDefault04" class="form-label">縣市</label>
            <select class="form-select" id="validationDefault04" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
            </select>
        </div>
        <div class="col-md-3">
            <label for="validationDefault05" class="form-label">鄉/鎮/區</label>
            <select type="text" class="form-select" id="validationDefault05" required>
                <option selected disabled value="">Choose...</option>
                <option> </option>

            </select>
        </div>
        <div class="col-md-6">
            <label for="validationDefault03" class="form-label">City</label>
            <input type="text" class="form-control" id="validationDefault03" required>
        </div>
        <div class="col-12">
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
            <label class="form-check-label" for="invalidCheck2">
                Agree to terms and conditions
            </label>
            </div>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="button">註冊</button>
        </div>
    </form>
</template>
    
<script setup>
    import { ref } from 'vue';
    const nationality = ref("");
    
</script>
    
<style>
    
</style>