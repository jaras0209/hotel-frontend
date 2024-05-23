<template>
  <div>
    <!-- <button @click="createAddition" class="btn btn-primary mb-3">新增</button> -->
    <AssignmentTable
      :assigns="assigns"
      :currentPage="currentPage"
      :rowsPerPage="rowsPerPage"
      @edit="editAddition"
      @delete="deleteAddition"/>
    
      <!-- :currentPage="currentPage"
:rowsPerPage="rowsPerPage" -->
    <!-- <div class="col-4" v-show="total != 0">
      <Paginate 
        :first-last-button="true" 
        first-button-text="&lt;&lt;" 
        last-button-text="&gt;&gt;"
        prev-text="&lt;" next-text="&gt;" 
        :page-count="pages" 
        :initial-page="currentPage" 
        v-model="currentPage" 
        :click-handler="fetchAdditions">
      </Paginate>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import AssignmentTable from '@/components/room/AssignmentTable.vue';
// import Paginate from 'vuejs-paginate-next'; // Uncomment if you need pagination

const assigns = ref([]);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const total = ref(0);
const pages = ref(0);
const router = useRouter();


function callFind() {
  Swal.fire({
    text: "Loading......",
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axiosapi.get('/hotel/backend/roomAssignment', {
    params: { p: currentPage.value }
  })
  .then(response => {
    assigns.value = response.data;
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

function editAddition(assign) {
  console.log('编辑', assign);
}

function deleteAddition(id) {
  console.log('删除', id);
}

onMounted(() => {
  callFind();
});
</script>

<style scoped>
.button-container {
  text-align: left;
  margin-bottom: 20px;
}
</style>
