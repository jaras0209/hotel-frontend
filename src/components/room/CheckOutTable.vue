<template>
    <div>
        <!-- // 新增 -->
        <table class="assign">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">編號</th>
                    <th scope="col">住房編號</th>
                    <th scope="col">賠償項目</th>
                    <th scope="col">賠償費用</th>
                    <th scope="col">相片</th>
                    <th scope="col">revise</th>
                    <th scope="col">delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
                    <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
                    <td>{{ assign.id }}</td>
                    <td>{{ assign.housingManagement.id }}</td>
                    <td>{{ assign.compensation }}</td>
                    <td>NTD {{ assign.fee }}</td>
                    <td>
                        <div v-if="assign.image">
                            <a :href="assign.image" target="_blank">查看圖片</a>
                        </div>
                        <div v-else>
                            <input type="file" @change="uploadImage($event, assign.id)" />
                        </div>
                    </td>
                    <td><a href="#" @click.prevent="doclick1(assign.id)" class="btn btn-success">編輯</a></td>
                    <td><a href="#" @click.prevent="doclick2(assign.id)" class="btn btn-danger">刪除</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps(['assigns', 'currentPage', 'rowsPerPage']);
const emits = defineEmits(["add1", "remove"]);

const paginatedAssigns = computed(() => {
    const start = (props.currentPage - 1) * props.rowsPerPage;
    return props.assigns.slice(start, start + props.rowsPerPage);
});

function doclick1(id) {
    emits("add1", id);
}

function doclick2(id) {
    emits("remove", id);
}

function uploadImage(event, id) {
    const file = event.target.files[0];
    if (file) {
        // 这里添加处理图像上传的逻辑，例如通过 axios 上传到服务器
        const formData = new FormData();
        formData.append('image', file);
        // 使用 axios 或其他方式上传图像
        axios.post(`/upload/image/${id}`, formData).then(response => {
            // 处理成功响应，更新相应的 assign 对象的 image 属性
            console.log(response.data);
        }).catch(error => {
            console.error("Image upload failed:", error);
        });
    }
}
</script>
<style scoped>
.assign {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
}
.assign th, .assign td {
    border: 1px solid #dddddd;
    padding: 8px;
}
.assign th {
    background-color: #f2f2f2;
}
</style>
