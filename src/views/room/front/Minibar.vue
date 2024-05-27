<template>
  <FrontNavBar></FrontNavBar>
  <div class="container">
    <h1 class="row mb-6 justify-content-center">Minibar</h1>
    <div class="row mb-3 justify-content-center align-items-center">
      <div class="col-4 text-start">
        <input type="text" v-model="findName" placeholder="請輸入產品名稱" @input="callFind(0)" class="form-control">
      </div>
      <div class="col-8 text-end">
        <MinibarRows :total="total" :choices="[2, 4, 8, 12]" v-model="rows" @change="callFind"></MinibarRows>
      </div>
    </div>

    <div class="row">
      <MinibarCard v-for="product in products" 
          :key="product.id" 
          :item="product" 
          @detail="openModal">
      </MinibarCard>
    </div>

    <MinibarModal 
      ref="minibarModalRef" 
      :item="selectedProduct" 
      @close="closeModal">
    </MinibarModal>

    <div class="col-4" v-show="total != 0">
      <Paginate 
        :first-last-button="true" 
        first-button-text="&lt;&lt;" 
        last-button-text="&gt;&gt;"
        prev-text="&lt;" next-text="&gt;" 
        :page-count="pages" 
        :initial-page="current" 
        v-model="current" 
        :click-handler="callFind">
      </Paginate>
    </div>
  </div>
  <div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import FrontNavBar from '../../FrontNavBar.vue';
import MinibarCard from '@/components/room/MinibarCard.vue';
import MinibarModal from '@/components/room/MinibarModal.vue';
import MinibarRows from '@/components/room/MinibarRows.vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from 'vuejs-paginate-next';
import Footer from '@/components/room/Footer.vue';

const total = ref(0);
const current = ref(1);
const pages = ref(10);
const start = ref(0);
const rows = ref(8);
const lastPageRows = ref(0);

const products = ref([]);
const minibarModalRef = ref(null);
const isShowButtonInsert = ref(true);
const findName = ref("");
const selectedProduct = ref(null);
const router = useRouter();

onMounted(() => {
  callFind();
});

// function openModal(productId) {
//   callFindById(productId);
// }

// function closeModal() {
//   selectedProduct.value = null;
//   minibarModalRef.value.closeModal();
// }

function callFind(page) {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  if (page) {
    start.value = (page - 1) * rows.value;
    current.value = page;
  } else {
    start.value = 0;
    current.value = 1;
  }

  if (findName.value === "") {
    findName.value = null;
  }

  let request = {
    start: start.value,
    rows: rows.value,
    dir: false,
    order: "id",
    name: findName.value
  };

  axiosapi.post(`/hotel/minibar/find`, request).then(function (response) {
    products.value = response.data.list;
    total.value = response.data.count;
    pages.value = Math.ceil(response.data.count / rows.value);
    lastPageRows.value = total.value % rows.value;

    setTimeout(function () {
      Swal.close();
    }, 250);
  }).catch(function (error) {
    Swal.fire({
      text: '查詢失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(function () {
      if (error && error.response && error.response.status === 403) {
        router.push("/secure/login");
      }
    });
  });
}

// 后端返回的 JSON 数据嵌套在 list 数组中的作法
function openModal(itemId) {
  axiosapi.get(`/hotel/minibar/${itemId}`).then(response => {
    if (response.data.list && response.data.list.length > 0) {
      selectedProduct.value = response.data.list[0]; // 取第一个元素
      minibarModalRef.value.showModal();
    } else {
      Swal.fire({
        text: '找不到該商品。',
        icon: 'warning',
        confirmButtonText: '確認'
      });
    }
  }).catch(error => {
    Swal.fire({
      text: '查詢失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    }).then(() => {
      if (error.response && error.response.status === 403) {
        router.push("/secure/login");
      }
    });
  });
}


function closeModal() {
  selectedProduct.value = null;
}

// function callFindById(id) {
//   Swal.fire({
//     text: "Loading......",
//     showConfirmButton: false,
//     allowOutsideClick: false,
//   });

//   axiosapi.get(`/hotel/minibar/${id}`).then(function (response) {
//     selectedProduct.value = response.data.product;
//     minibarModalRef.value.showModal();
    
//     setTimeout(function() {
//       Swal.close();
//     }, 250);
//   }).catch(function (error) {
//     Swal.fire({
//       text: '查詢失敗：' + error.message,
//       icon: 'error',
//       allowOutsideClick: false,
//       confirmButtonText: '確認',
//     }).then(function () {
//       if (error && error.response && error.response.status === 403) {
//         router.push("/secure/login");
//       }
//     });
//   });
// }
</script>

<style scoped>
/* 你的樣式 */
</style>
