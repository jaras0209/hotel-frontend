<template>
    <div class="myDialog">
        <el-dialog width="30%" :title="formState === '0' ? '添加' : '修改'" :visible="dialogVisible"
            @update:visible="dialogVisible = arguments[0]" :before-close="handleClose" :destroy-on-close="true">
            <el-form ref="myForm" :model="myForm" label-width="60px">
                <el-form-item v-for="(item, index) in dialogItemFilter" :key="index" :label="item.label"
                    :prop="item.prop" :rules="item.rule">
                    <template>
                        <el-input v-if="item.type === 'text' || item.type === 'password' || item.type === 'number'"
                            :type="item.type" v-model="myForm[item.prop]"></el-input>
                        <el-upload v-else-if="item.type === 'file'" action="" :http-request="uploadManual(item.prop)">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <el-select v-else-if="item.type === 'select'" v-model="myForm[item.prop]" placeholder="请选择">
                            <el-option label="男" value="male"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                        <el-date-picker v-else-if="item.type === 'time'" v-model="myForm[item.prop]" type="date"
                            value-format="timestamp" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="myDate">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useConfirm } from '@/hooks/useConfirm';
// import { dataClone } from '@/libs/common.js';

const props = defineProps(['dialogItem']);
const emit = defineEmits(['upLoadDate']);

const dialogVisible = ref(false);
const myForm = ref({});
const formState = ref('0');

const dialogItemFilter = computed(() => {
    return props.dialogItem.filter(item => item.IsShow !== false);
});

const handleClose = (done) => {
    useConfirm('确认关闭？').then(() => {
        done();
    }).catch(() => {});
};

const myDate = () => {
    this.$refs.myForm.validate((valid) => {
        if (valid) {
            emit('upLoadDate', myForm.value);
            closeDialog();
        } else {
            useConfirm('请完善表单数据');
        }
    });
};

const openDialog = (item) => {
    if (item) {
        myForm.value = dataClone(item);
        if (myForm.value['time']) {
            myForm.value['time'] = myForm.value['time'] * 1000;
        }
        formState.value = '1';
    } else {
        myForm.value = {};
        formState.value = '0';
    }
    dialogVisible.value = true;
};

const closeDialog = () => {
    dialogVisible.value = false;
    myForm.value = {};
};

const uploadManual = (prop) => {
    return ({ file }) => {
        myForm.value[prop] = file;
    };
};
</script>

<style scoped>
/* 样式 */
</style>
