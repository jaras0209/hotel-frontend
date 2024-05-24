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
          <th scope="col">控制</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
          <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
          <td>{{ assign.roomInformation.id }}</td>
          <td>{{ assign.roomInformation.total }}</td>
          <td>{{ assign.left }}</td>
          <td>{{ assign.date }}</td>
          <td>
            <div>
              <a href="#" @click.prevent="doclick1(assign.id)" class="btn btn btn-sm">增加</a>
              <a href="#" @click.prevent="doclick2(assign.id)" class="btn btn btn-sm">減少</a>
            </div>
          </td>
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
