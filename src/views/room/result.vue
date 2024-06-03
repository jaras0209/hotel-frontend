<template>
  <div>
    <BackendNavbar />
    <div class="box">   
      <h1 class="title">退房檢查</h1>
      <button type="button" class="btn btn-primary" @click="showModal">新增</button>
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
            <td><a href="#" @click.prevent="editCompensation(assign)" class="btn btn-success">編輯</a></td>
            <td><a href="#" @click.prevent="deleteCompensation(assign.id)" class="btn btn-danger">刪除</a></td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <!-- Modal -->
    <div ref="exampleModalRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table>
              <tr>
                <td>編號 : </td>
                <td><input type="text" name="id" v-model="product.id"></td>
              </tr>
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
                <td><input type="text" name="photo" v-model="product.photo"></td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-show="isShowButtonInsert" @click="insertProduct">新增</button>
            <button type="button" class="btn btn-primary" v-show="!isShowButtonInsert" @click="updateProduct">修改</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import BackendNavbar from '@/views/BackendNavbar.vue';
import { Modal } from 'bootstrap';

const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(assigns.value.length / rowsPerPage.value));
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

  axiosapi.get('/hotel/backend/checkOutInspection', {
    params: { p: currentPage.value }
  })
  .then(response => {
    assigns.value = response.data;
    setTimeout(() => {
      Swal.close();
    }, 250);
  })
  .catch(error => {
    Swal.fire({
      text: '查詢失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(() => {
      if (error && error.response && error.response.status === 403) {
        router.push("/secure/login");
      }
    });
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
    if(result.isConfirmed){
      Swal.fire({
        text: "Loading......",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      axiosapi.delete(`/hotel/backend/checkOutInspection/${id}`).then(response => {
        if(response.data.success){
          Swal.fire({
            text: response.data.message,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: '確認',
          }).then(() => {
            callFind();
          });
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonText: '確認',
          });
        }          
      }).catch(error => {
        Swal.fire({
          text: '失敗：'+error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonText: '確認',
        });
      });
    }
  });
}

function insertProduct() {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  let data = {
    id: product.value.id,
    compensation: product.value.compensation,
    fee: product.value.fee,
    photo: product.value.photo
  };

  console.log("Insert Product Data:", data);

  axiosapi.post("/hotel/backend/checkOutInspection", data).then(function(response) {
    console.log("Insert Response:", response.data);
    if(response.data.success) {
      Swal.fire({
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(function() {
        hideModal();
        callFind();
      });
    } else {
      Swal.fire({
        text: response.data.message,
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      });
    }
  }).catch(function(error) {
    console.log("Insert Error:", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    });
  });
}

function updateProduct() {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  let data = {
    id: product.value.id,
    compensation: product.value.compensation,
    fee: product.value.fee,
    photo: product.value.photo
  };

  console.log("Update Product Data:", data);

  axiosapi.put(`/hotel/backend/checkOutInspection/${product.value.id}`, data).then(function(response) {
    console.log("Update Response:", response.data);
    if(response.data.success) {
      Swal.fire({
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      }).then(function() {
        hideModal();
        callFind();
      });
    } else {
      Swal.fire({
        text: response.data.message,
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      });
    }
  }).catch(function(error) {
    console.log("Update Error:", error);
    Swal.fire({
      text: '失敗：'+error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    });
  });
}

function uploadImage(event, id) {
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

const paginatedAssigns = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return assigns.value.slice(start, start + rowsPerPage.value);
});

function showModal() {
  exampleModalObj.value.show();
}

function hideModal() {
  exampleModalObj.value.hide();
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    callFind();
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    callFind();
  }
}

onMounted(() => {
  callFind();
  exampleModalObj.value = new Modal(exampleModalRef.value);
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
}
</style>
