<template>
  <div>
    <table class="assign">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">住房編號</th>
          <th scope="col">商品編號</th>
          <th scope="col">數量</th>
          <th scope="col">價格</th>
          <th scope="col">revise</th>
          <th scope="col">delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
          <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
          <td>{{ assign.additionalChargesId.housingManagementId }}</td>
          <td>{{ assign.additionalChargesId.minibarId }}</td>
          <td>{{ assign.quantity }}</td>
          <td>{{ assign.amount }}</td>
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
const emits = defineEmits(["add1", "minus1"]);

const paginatedAssigns = computed(() => {
  const start = (props.currentPage - 1) * props.rowsPerPage;
  return props.assigns.slice(start, start + props.rowsPerPage);
});

function doclick1(id) {
  emits("add1", id);
}

function doclick2(id) {
  emits("minus1", id);
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
