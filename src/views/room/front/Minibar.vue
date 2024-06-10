<template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <div class="container">
    <h1 class="row mb-6 justify-content-center">Minibar</h1>
    <div class="row mb-3 justify-content-center align-items-center">
      <div class="col-4 text-start">
        <input type="text" v-model="findName" placeholder="請輸入產品名稱" @input="callFind(1)" class="form-control">
      </div>
      <div class="col-8 text-end">
        <MinibarRows :total="total" :choices="[2, 4, 8, 12]" v-model="rows" @change="callFind(1)"></MinibarRows>
      </div>
    </div>

    <div class="row">
      <MinibarCard v-for="product in filteredProducts" 
          :key="product.id" 
          :item="product" 
          @detail="openMinibarModal"
          @order="openOrderModal">
      </MinibarCard>
    </div>

    <MinibarOrder 
      ref="minibarOrderRef" 
      v-if="selectedOrderProduct"
      :item="selectedOrderProduct"
      :isShowButtonInsert="true"
      @insert="insertOrder">
    </MinibarOrder>

    <MinibarModal 
      ref="minibarModalRef" 
      v-if="selectedDetailProduct"
      :item="selectedDetailProduct" 
      @close="closeModal">
    </MinibarModal>

    <div class="row justify-content-center" v-show="total != 0">
      <div class="col-auto">
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
  </div>
  <div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script setup>
import FrontNavBar from '@/views/FrontNavBar.vue';
import MinibarCard from '@/components/room/MinibarCard.vue';
import MinibarModal from '@/components/room/MinibarModal.vue';
import MinibarRows from '@/components/room/MinibarRows.vue';
import MinibarOrder from '@/components/room/MinibarOrder.vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from 'vuejs-paginate-next';

const total = ref(0);
const current = ref(1);
const pages = ref(10);
const start = ref(0);
const rows = ref(8);
const lastPageRows = ref(0);

const products = ref([]);
const findName = ref("");
const selectedDetailProduct = ref(null);
const selectedOrderProduct = ref(null);
const router = useRouter();

onMounted(() => {
  callFind();
});

function callFind(page = 1) {
  if (page < 1) {
    page = 1;
  } 
  // Swal.fire({
  //   text: "Loading......",
  //   showConfirmButton: false,
  //   allowOutsideClick: false,
  // });
  start.value = (page - 1) * rows.value;
  if (start.value < 0) {
    start.value = 0;
  }
  current.value = page;

  let request = {
    start: start.value,
    rows: rows.value,
    dir: false,
    order: "id",
    name: findName.value || null
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

const filteredProducts = computed(() => {
  if (!findName.value) return products.value;
  const regex = new RegExp(findName.value.split('').join('.*'), 'i');
  return products.value.filter(product => regex.test(product.item));
});

function openMinibarModal(itemId) {
  axiosapi.get(`/hotel/minibar/${itemId}`).then(response => {
    if (response.data.list && response.data.list.length > 0) {
      selectedDetailProduct.value = response.data.list[0];
      const modalElement = document.getElementById('minibarModal');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
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

function openOrderModal(itemId) {
  axiosapi.get(`/hotel/minibar/${itemId}`).then(response => {
    if (response.data.list && response.data.list.length > 0) {
      selectedOrderProduct.value = response.data.list[0];
      const modalElement = document.getElementById('orderModal');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
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
  selectedDetailProduct.value = null;
  selectedOrderProduct.value = null;
}

function insertOrder(orderData) {
  axiosapi.post('/hotel/minibar/order', orderData).then(response => {
    Swal.fire({
      text: '訂單提交成功',
      icon: 'success',
      confirmButtonText: '確認'
    }).then(() => {
      router.push('/room/front/minibar');
    });
  }).catch(error => {
    Swal.fire({
      text: '訂單提交失敗：' + error.message,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認',
    });
  });
}
</script>