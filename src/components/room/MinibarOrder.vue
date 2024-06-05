<template>
    <div ref="exampleModalRef" class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="orderModalLabel">商品資訊</h1>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>商品編號:</td>
                            <td>{{ item.id }}</td>
                        </tr>
                        <tr>
                            <td>商品名稱:</td>
                            <td>{{ item.item }}</td>
                        </tr>
                        <tr>
                            <td>價格:</td>
                            <td>{{ item.price }}</td>
                        </tr>
                        <tr>
                            <td>數量:</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <input type="number" v-model="orderAmount" @input="calculateTotalPrice"
                                        min="1" max="5" required class="form-control mr-2">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>總價:</td>
                            <td>{{ totalPrice }}</td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary" @click="confirmOrder">確認訂單</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['item']);
const emits = defineEmits(['insert']);
const orderAmount = ref(1);
const totalPrice = ref(props.item.price);

const calculateTotalPrice = () => {
    totalPrice.value = props.item.price * orderAmount.value;
};

watch(orderAmount, calculateTotalPrice);

const confirmOrder = () => {
    const orderData = {
        quantity: orderAmount.value,
        amount: totalPrice.value,
        id: {
            minibarId: props.item.id,
            housingManagementId: null
        }
    };
    emits('insert', orderData);
};
</script>

<style scoped>
.modal-body {
    text-align: left;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
}
</style>