<template>
  <div class="room_col">
    <div class="cover" :style="bgCss">
      <h3>{{ roomData.name }}</h3>
      <i class="fa fa-times" @click="handleDelete"></i>
      <img :src="roomData.cover" alt="Room Cover Image">
    </div>
    <div class="info">
      <h5>{{ roomData.eng }}</h5>
      <!-- <div class="icons">
        <span v-if="roomData.equipment.breakfast"><i class="fa fa-coffee"></i></span>
        <span v-if="roomData.equipment.bathtub"><i class="fa fa-bath"></i></span>
        <span v-if="roomData.equipment.wifi"><i class="fa fa-wifi"></i></span>
      </div> -->
      <h5>{{ roomData.discount }} * {{ hotelDiscount }} = {{ finalDiscountShow }} 折</h5>
      <h4>TWD{{ roomData.price }}起</h4>
      <p>(須另加10%服務費及5%營業稅)</p>
      <div class="final_price">{{ finalPrice }}</div>
      <button class="btn btn-secondary room_edit" @click="addRoom">立即下訂</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  roomData: {
    type: Object,
    required: true
  },
  hotelDiscount: {
    type: Number,
    required: true
  },
  hotelFee: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  onDelete: {
    type: Function,
    required: true
  }
});

const bgCss = computed(() => {
  return {
    backgroundImage: `url(${props.roomData.cover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '150px',
    position: 'relative',
    backgroundColor: '#f8f9fa'
  };
});

const finalDiscount = computed(() => {
  return props.roomData.discount * props.hotelDiscount;
});

const finalDiscountShow = computed(() => {
  return parseInt(finalDiscount.value * 100);
});

const finalPrice = computed(() => {
  return parseInt(((props.roomData.price * finalDiscount.value) + props.hotelFee * 1.0) * 1.1 * 1.05);
});

const handleDelete = () => {
  props.onDelete(props.id);
};
</script>

<style scoped lang="scss">
.room_col {
  padding: 20px;

  .cover {
    height: 150px;
    background-color: #f8f9fa;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    h3 {
      position: absolute;
      border: 1px solid #666;
      bottom: 10px;
      font-size: 20px;
      padding: 5px 15px;
      background-color: #fff;
    }
  }

  .info {
    padding: 10px;

    h5 {
      font-size: 12px;
    }

    .final_price {
      float: right;
      color: #DB4343;

      &:after {
        content: "$";
      }
    }

    .icons {
      span {
        margin-right: 10px;

        i {
          font-size: 20px;
        }
      }
    }

    p {
      margin-right: 10px;
      font-size: 10px;
    }
  }
}
</style>
