<template>
    <div class="row g-0 bg-warning-subtle ">
        <div id="carouselExample" class="carousel slide col-md-6 mb-md-0 p-md-4" data-bs-ride="carousel"
            data-bs-wrap="true" data-bs-interval="1800">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="`${PATHP}/hotel/photo/${pic}`" class="d-block w-100" alt="..."
                        style="width: 500px; height: 500px;">
                    <div class="carousel-caption">
                    </div>
                </div>
                <div class="carousel-item">
                    <img :src="`${PATHP}/hotel/photo/${pict}`" class="d-block w-100" alt="..."
                        style="width: 500px; height: 500px;">
                    <div class="carousel-caption">
                    </div>
                </div>
                <div class="carousel-item">
                    <img :src="`${PATHP}/hotel/photo/${pictu}`" class="d-block w-100" alt="..."
                        style="width: 500px; height: 500px;">
                    <div class="carousel-caption">
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="false"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <div class="carousel-indicators">
                <button type="button" class="active" data-bs-target="#carouselExample" data-bs-slide-to="0">
                    <img :src="`${PATHP}/hotel/photo/${pic}`" class="d-block w-100" alt="..."
                        style="width: 150px; height: 150px;">
                </button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1">
                    <img :src="`${PATHP}/hotel/photo/${pict}`" class="d-block w-100" alt="..."
                        style="width: 150px; height: 150px;">
                </button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2">
                    <img :src="`${PATHP}/hotel/photo/${pictu}`" class="d-block w-100" alt="..."
                        style="width: 150px; height: 150px;">
                </button>
            </div>
        </div>
        <div class="col-md-6 p-4 ps-md-0">
            <h2 class="mt-0">商品名稱 :{{ product.productName }}</h2>
            <br><br>
            <h2 class="mt-0">商品價格 :{{ product.productPrice }}</h2>
            <br><br>
            <h2 class="mt-0" v-if="commentcount > 0" >商品分數 :{{ commentaveragescore }}分</h2>
            <a href="#commemtblock" v-if="commentcount > 0" style="font-size: 24px;">{{commentcount}}則評價</a>
            <br><br><br>
            <h2 class="mt-0">商品介紹 :{{ product.productDescription }}</h2>
            <br><br>
            <select size="1" @change="emits('update:modelValue', $event.target.value)">
                <option v-for="item in options" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>數量
            <button class="btn btn-info btn-sm" @click="doclick(product.id)">加入購物車</button>
        </div>
    </div>
</template>
<script setup>
const PATHP = import.meta.env.VITE_BACKEND_URL;
const props = defineProps(["product", "pic", "pict", "pictu", "options", "modelValue", "commentcount", "commentaveragescore"]);
const emits = defineEmits(["update:modelValue", "cart"]);
function doclick(id) {
    emits("cart", id)
}
</script>
<style>
.carousel-indicators button.active img {
    border: 1px solid white
}

.carousel-indicators {
    position: unset
}

.carousel-indicators button {
    width: max-content !important;
}

.carousel-indicators img {
    width: 70px;
    display: block;
}
</style>
