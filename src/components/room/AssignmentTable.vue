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
        <tr v-for="(assign, index) in assigns" :key="assign.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ assign.roomInformation.id }}</td>
          <td>{{ assign.roomInformation.total }}</td>
          <td>{{ assign.left }}</td>
          <td>{{ assign.date }}</td>
          <td>
            <div>
              <a href="#" @click="doclick1(assign.id)" class="btn btn-warning btn-sm">編輯</a>
              <a href="#" @click="doclick2(assign.id)" class="btn btn-danger btn-sm">刪除</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps(['assigns']);
const emits = defineEmits(["edit", "delete"]);

function doclick1(id) {
  emits("edit", id);
}

function doclick2(id) {
  emits("delete", id);
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
