    <template>
        <div>
        <table class="assign">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">編號</th>
                <th scope="col">住房編號</th>
                <th scope="col">賠償項目</th>
                <th scope="col">賠償費用</th>
                <th scope="col">控制</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(assign, index) in paginatedAssigns" :key="assign.id">
                <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
                <td>{{ assign.id }}</td>
                <td>{{ assign.housingManagement.id }}</td>
                <td>{{ assign.compensation }}</td>
                <td>{{ assign.fee }}</td>
                <td>
                <div>
                    <a href="#" @click.prevent="doclick1(assign.id)" class="btn btn-success">編輯</a>
                    <a href="#" @click.prevent="doclick2(assign.id)" class="btn btn-danger">刪除</a>
                </div>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </template>
    
    <script setup>
    import { defineEmits, defineProps, computed } from 'vue';
    
    const props = defineProps(['assigns', 'currentPage', 'rowsPerPage']);
    const emits = defineEmits(["add1", "remove"]);
    
    const paginatedAssigns = computed(() => {
        const start = (props.currentPage - 1) * props.rowsPerPage;
        return props.assigns.slice(start, start + props.rowsPerPage);
    });
    
    function doclick1(id) {
        emits("add1", id);
    }
    
    function doclick2(id) {
        emits("remove", id);
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
    