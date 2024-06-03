<template>
  <div class="minibar-card-container">
    <div class="card">
      <img class="card-img-top" :src="`data:image/jpeg;base64,${item.photo}`" :alt="item.item">
      <div class="card-body">
        <h5 class="card-title">{{ item.item }}</h5>
        <div class="card-text text-danger text-end">NT$ {{ item.price }}</div>
        <div class="row">
          <div class="col text-start">
            <a href="#" class="btn btn-primary" @click="openMinibarModal(item.id)">詳細資訊</a>
          </div>
          <div class="col text-end">
            <a href="#" class="btn btn-primary" @click="openOrderModal(item.id)">點餐</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["item"]);
const emits = defineEmits(["detail", "order"]);

function openMinibarModal(id) {
  emits("detail", id);
}

function openOrderModal(id) {
  emits("order", id);
}
</script>

<style scoped>
.minibar-card-container {
  max-width: 300px;
  margin: auto;
  margin-bottom: 20px;
}

.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
