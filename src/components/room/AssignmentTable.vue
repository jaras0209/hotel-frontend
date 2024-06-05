<template>
  <div>
    <table class="assign">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">房間型號</th>
          <th scope="col">總共間數</th>
          <th scope="col">剩餘間數</th>
          <th scope="col">日期</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
          <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
          <td>{{ assign.roomInformation.id }}</td>
          <td>{{ assign.roomInformation.total }}</td>
          <td>
            <div class="d-flex align-items-center">
              <input type="number" v-model="assign.left" min="0" max="5" required class="form-control mr-2">
            </div>
          </td>
          <td>{{ assign.date }}</td>
          <td>
            <a href="#" @click.prevent="doclick1(assign.id, add1)" class="btn btn-primary btn-sm">更新</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['assigns', 'currentPage', 'rowsPerPage']);
const emits = defineEmits(['add1']);

const paginatedAssigns = computed(() => {
  const start = (props.currentPage - 1) * props.rowsPerPage;
  return props.assigns.slice(start, start + props.rowsPerPage);
});

function doclick1(id) {
  emits('add1', id);
}

// function doclick2(id, action) {
//   emits('minus1', { id, action });
// }
</script>

<style scoped>
.assign {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}
.assign th,
.assign td {
  border: 1px solid #dddddd;
  padding: 8px;
}
.assign th {
  background-color: #f2f2f2;
}
</style>