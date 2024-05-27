<template>
    <div class="album">
      <img :src="require('../assets/img/icons/close.png')" class="album-close" alt="" @click="$emit('closeAlbum')" />
      <img :src="imgUrl" class="album-main" alt="" />
      <div class="album-btnGroup">
        <button @click="prevImg">上一張</button>
        <button @click="nextImg">下一張</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['imgUrl', 'imageUrls']);
  
  const imgUrl = ref(props.imgUrl);
  
  const nextImg = () => {
    let index = props.imageUrls.findIndex((item) => item === imgUrl.value);
    if (index == props.imageUrls.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    imgUrl.value = props.imageUrls[index];
  };
  
  const prevImg = () => {
    let index = props.imageUrls.findIndex((item) => item === imgUrl.value);
    if (index == 0) {
      index = props.imageUrls.length - 1;
    } else {
      index -= 1;
    }
    imgUrl.value = props.imageUrls[index];
  };
  </script>
  