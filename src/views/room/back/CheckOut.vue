<template>
    <div>
    <backendNavbar />
    <div class="box">
        <h1 class="title">退房檢查</h1>
        <div class="button-container">
        <button type="button" class="btn btn-primary" @click="showModal">新增</button>
        </div>
        <table class="assign">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">編號</th>
            <th scope="col">住房編號</th>
            <th scope="col">賠償項目</th>
            <th scope="col">賠償費用</th>
            <th scope="col">相片</th>
            <th scope="col">編輯</th>
            <th scope="col">刪除</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(assign, index) in assigns" :key="assign.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ assign.id }}</td>
            <td>{{ assign.housingManagement.id }}</td>
            <td>{{ assign.compensation }}</td>
            <td>NTD {{ assign.fee }}</td>
            <td>
                <a href="#" class="card-link" @click="showImage(assign.photo)">查看圖片</a>
            </td>
            <td>
                <a href="#" @click.prevent="editCompensation(assign)" class="btn btn-success">編輯</a>
            </td>
            <td>
                <a href="#" @click.prevent="deleteCompensation(assign.id)" class="btn btn-danger">刪除</a>
            </td>
            </tr>
        </tbody>
        </table>
    </div>

    <div ref="exampleModalRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">編輯退房檢查</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <table>
                <tr>
                <td>住房編號 : </td>
                <td><input type="text" name="housingManagement.id" v-model="product.housingManagement.id"></td>
                </tr>
                <tr>
                <td>賠償項目 : </td>
                <td><input type="text" name="compensation" v-model="product.compensation"></td>
                </tr>
                <tr>
                <td>賠償費用 : </td>
                <td><input type="text" name="fee" v-model="product.fee"></td>
                </tr>
                <tr>
                <td>相片 : </td>
                <td>
                    <input type="file" @change="uploadImage($event)" />
                    <input type="hidden" name="photo" v-model="product.photo">
                </td>
                </tr>
            </table>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-if="isShowButtonInsert" @click="insertProduct">新增</button>
            <button type="button" class="btn btn-primary" v-else @click="updateProduct">修改</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>  


<script setup>
import backendNavbar from '@/views/backendNavbar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const assigns = ref([]);
const product = ref({
    id: '',
    housingManagement: { id: '' },
    compensation: '',
    fee: '',
    photo: ''
});
const isShowButtonInsert = ref(true);
const exampleModalRef = ref(null);
const exampleModalObj = ref(null);
const router = useRouter();

function callFind() {
    Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
    });

    axiosapi.get('/hotel/backend/checkOutInspection')
    .then(response => {
        assigns.value = response.data;
        setTimeout(() => {
        Swal.close();
        }, 250);
    })
    .catch(error => {
        showError(error.message, error);
    });
}

function editCompensation(assign) {
    product.value = { ...assign };
    isShowButtonInsert.value = false;
    showModal();
}

function deleteCompensation(id) {
    Swal.fire({
    text: "確定刪除？",
    icon: 'warning',
    allowOutsideClick: false,
    confirmButtonText: '確認',
    showCancelButton: true,
    cancelButtonText: '取消',
    }).then(result => {
    if (result.isConfirmed) {
        showLoading();
        axiosapi.delete(`/hotel/backend/checkOutInspection/${id}`).then(response => {
        handleResponse(response, '刪除');
        }).catch(error => {
        showError(error.message, error);
        });
    }
    });
}

function insertProduct() {
    showLoading();

    let data = {
    id: product.value.id,
    housingManagement: { id: product.value.housingManagement.id },
    compensation: product.value.compensation,
    fee: product.value.fee,
    photo: product.value.photo
    };

    axiosapi.post("/hotel/backend/checkOutInspection", data).then(response => {
    handleResponse(response, '新增');
    }).catch(error => {
    showError(error.message, error);
    });
}

function updateProduct() {
    showLoading();

    let data = {
    id: product.value.id,
    housingManagement: { id: product.value.housingManagement.id },
    compensation: product.value.compensation,
    fee: product.value.fee,
    photo: product.value.photo
    };

    axiosapi.put(`/hotel/backend/checkOutInspection/${product.value.id}`, data).then(response => {
    handleResponse(response, '修改');
    }).catch(error => {
    showError(error.message, error);
    });
}

function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        product.value.photo = base64String;
    };
    reader.readAsDataURL(file);
    }
}

function showImage(photo) {
    if (photo) {
    Swal.fire({
        title: '查看圖片',
        imageUrl: `data:image/png;base64,${photo}`,
        imageAlt: '退房檢查相片',
        confirmButtonText: '關閉'
    });
    } else {
    Swal.fire({
        text: '沒有圖片可顯示',
        icon: 'info',
        confirmButtonText: '確認'
    });
    }
}

function showModal() {
    resetProduct();
    isShowButtonInsert.value = true;
    exampleModalObj.value.show();
}

function hideModal() {
    exampleModalObj.value.hide();
}

function resetProduct() {
    product.value = {
    id: '',
    housingManagement: { id: '' },
    compensation: '',
    fee: '',
    photo: ''
    };
}

function showLoading() {
    Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
    });
}

function showError(message, error) {
    Swal.fire({
    text: '查詢失敗：' + message,
    icon: 'error',
    allowOutsideClick: false,
    confirmButtonText: '確認',
    }).then(() => {
    if (error && error.response && error.response.status === 403) {
        router.push("/secure/login");
    }
    });
}

function handleResponse(response, action) {
    if (response.data) {
        Swal.fire({
            text: `${action}成功`,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        }).then(() => {
            hideModal();
            callFind();
        });
    } else {
        Swal.fire({
            text: `${action}失敗：${response.data.message}`,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '確認',
        });
    }
}


onMounted(() => {
    callFind();
    exampleModalObj.value = new bootstrap.Modal(exampleModalRef.value);
});
</script>

<style scoped>
.box {
    margin-top: 100px;
    text-align: center;
}
.button-container {
    text-align: left;
    margin-bottom: 20px;
}
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
/* .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.pagination button {
    margin: 0 10px;
} */
</style>