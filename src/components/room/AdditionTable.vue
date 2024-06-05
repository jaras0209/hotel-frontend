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
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
          <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
          <td>{{ assign.additionalChargesId.housingManagementId }}</td>
          <td>{{ assign.additionalChargesId.minibarId }}</td>
          <td>{{ assign.quantity }}</td>
          <td>{{ assign.amount }}</td>
          <td>
            <a href="#" @click.prevent="editAssign(assign)" class="btn btn-success">編輯</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['assigns', 'currentPage', 'rowsPerPage']);
const emits = defineEmits(['edit']);

const paginatedAssigns = computed(() => {
  const start = (props.currentPage - 1) * props.rowsPerPage;
  return props.assigns.slice(start, start + props.rowsPerPage);
});

function editAssign(assign) {
  emits('edit', assign);
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