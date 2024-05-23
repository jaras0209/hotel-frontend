<template>
    <div>
        <MyTable 
            :mydata="tableData" 
            :myCols="tableCols" 
            :total="totalItems" 
            :size="pageSize" 
            :page="currentPage"
            @addNewTable="openDialog" 
            @myDelete="deleteItems" 
            @myEmit="editItem" 
            @update:page="updatePage" 
        />
        <MyDialog 
            :dialogItem="dialogItems" 
            ref="myDialog" 
            @upLoadDate="saveData" 
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MyTable from '@/components/room/MyTable.vue';
import MyDialog from '@/components/room/MyDialog.vue';

const tableData = ref([
    // 示例数据
    { id: 1, name: 'Item 1', prop1: 'Value 1', prop2: 'Value 2' },
    { id: 2, name: 'Item 2', prop1: 'Value 3', prop2: 'Value 4' }
]);
const tableCols = ref([
    { label: 'ID', prop: 'id', type: 'number' },
    { label: 'Name', prop: 'name', type: 'text' },
    { label: 'Prop 1', prop: 'prop1', type: 'text' },
    { label: 'Prop 2', prop: 'prop2', type: 'text' }
]);
const totalItems = ref(100); // 示例总项数
const pageSize = ref(10);
const currentPage = ref(1);
const dialogItems = ref([
    { label: '名称', prop: 'name', type: 'text', IsShow: true },
    { label: '属性1', prop: 'prop1', type: 'text', IsShow: true },
    { label: '属性2', prop: 'prop2', type: 'text', IsShow: true }
]);

const openDialog = () => {
    const myDialogRef = ref(null);
    if (myDialogRef.value) {
        myDialogRef.value.openDialog();
    }
};

const editItem = (item) => {
    const myDialogRef = ref(null);
    if (myDialogRef.value) {
        myDialogRef.value.openDialog(item);
    }
};

const deleteItems = (items) => {
    // 處理刪除邏輯
    console.log('删除项目：', items);
};

const saveData = (data) => {
    // 處理保存邏輯
    console.log('保存数据：', data);
};

const updatePage = (page) => {
    currentPage.value = page;
    // 重新加载数据
    console.log('更新页面：', page);
};
</script>

<style scoped>
/* 样式 */
</style>
