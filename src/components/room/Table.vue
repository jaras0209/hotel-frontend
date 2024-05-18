<!-- <template>
    <div class="mytable">
        <el-row type="flex" justify="space-between" :gutter="20">
            <el-col :span="6"></el-col>
            <el-col :span="12">
                <el-button-group>
                    <el-button size="mini" icon="el-icon-edit" @click="$emit('addNewTable')">添加</el-button>
                    <el-button size="mini" icon="el-icon-delete" @click="$emit('myDelete', selection)"
                        :disabled="selection.length === 0" type="danger">删除</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="20">
            <el-col :span="6">
                {{ selection }}
            </el-col>
            <el-col :span="12">
                <el-table stripe :data="mydata" @select-all="updateSelection" @select="updateSelection">
                    <el-table-column label="编号" type="selection" align="center" width="50"></el-table-column>

                    <template v-for="(item, index) in myColsShow" :key="index">
                        <el-table-column v-if="item.prop && item.type === 'file'" :label="item.label" :prop="item.prop"
                            :align="item.align" :width="item.width">
                            <template #default="scope">
                                <el-image :src="scope.row[item.prop]"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column v-else-if="item.prop && item.type !== 'select'" :label="item.label"
                            :prop="item.prop" :align="item.align" :width="item.width"></el-table-column>
                        <el-table-column v-else-if="item.prop && item.type === 'select'" :label="item.label"
                            :prop="item.prop" :align="item.align" :width="item.width">
                            <template #default="scope">
                                {{ scope.row[item.prop] }}
                            </template>
                        </el-table-column>
                        <el-table-column v-else :label="item.label" :align="item.align" :width="item.width">
                            <template #default="scope">
                                <slot :name="item.slot" :myDateData="scope.row"></slot>
                            </template>
                        </el-table-column>
                    </template>

                    <el-table-column label="操作" align="center">
                        <template #default="scope">
                            <el-button-group>
                                <el-button type="primary" size="mini" @click="$emit('myEmit', scope.row)">编辑</el-button>
                                <el-button type="danger" size="mini" @click="$emit('myDelete', [scope.row])">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="20">
            <el-col :span="6"></el-col>
            <el-col :span="12">
                {{ page }}
                <el-pagination :current-page.sync="curPage" :total="total" :page-size="size"></el-pagination>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: ['mydata', 'myCols', 'total', 'size', 'page'],
    setup(props, { emit }) {
        const selection = ref([]);

        const myColsShow = computed(() => {
            return props.myCols.filter(item => item.IsShow !== false);
        });

        const curPage = computed({
            get() {
                return props.page;
            },
            set(val) {
                emit('update:page', val);
            }
        });

        const updateSelection = (val) => {
            selection.value = val;
        };

        return {
            selection,
            myColsShow,
            curPage,
            updateSelection
        };
    }
};
</script>

<style scoped>
/* 样式 */
</style> -->
