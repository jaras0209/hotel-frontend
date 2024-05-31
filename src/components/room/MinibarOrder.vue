    <template>
        <div ref="exampleModalRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table>
                            <tr>
                                <td>商品編號: </td>
                                <td>{{ item.id }}</td>
                            </tr>
                            <tr>
                                <td>商品名稱: </td>
                                <td>{{ item.item }}</td>
                            </tr>
                            <tr>
                                <td>價格 : </td>
                                <td>{{ item.price }}</td>
                            </tr>
                            <tr>
                                <td>數量 : </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <input type="number" v-model="assign.left" @input="calculateTotalPrice"
                                            min="0" max="5" required class="form-control mr-2">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>總價 : </td>
                                <td>{{ totalPrice }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-show="!isShowButtonInsert"
                            @click="confirmOrder">確認訂單</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from "vue";
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    
    const emits = defineEmits(["insert"]);
    
    const exampleModalRef = ref(null);
    const exampleModalObj = ref(null);
    
    const assign = reactive({
        left: 0,
    });
    
    const totalPrice = computed(() => {
        return item.price * assign.left;
    });
    
    function calculateTotalPrice() {
        // 计算总价
        console.log("Total Price:", totalPrice.value);
    }
    
    function confirmOrder() {
        // 发送数据到后端
        emits("insert", { id: item.id, quantity: assign.left, totalPrice: totalPrice.value });
    }
    
    onMounted(function () {
        exampleModalObj.value = new bootstrap.Modal(exampleModalRef.value);
    });
    
    </script>
    
    <style></style>
    