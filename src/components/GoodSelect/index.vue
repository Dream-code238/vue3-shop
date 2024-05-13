<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-02 00:21:32
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 18:30:15
 * @FilePath: \shop-admin\src\components\GoodSelect\index.vue
 * @Description: 商品选择组件
-->
<template>
  <el-dialog title="商品选择" v-model="dialogvisible" width="80%" destroy-on-close>
    <el-table ref="tableRef" @selection-change="onTableSelection" :data="goods" stripe style="width: 100%"
      v-loading="pageConfig.loading" height="300px">
      <el-table-column type="selection" width="55" />
      <el-table-column label="商品">
        <template #default="{ row }">
          <div class="flex">
            <el-image class="mr-3 rounded" :src="row.cover" fit="cover" :lazy="true" style="width:50px;height: 50px;">
            </el-image>
            <div class="flex-1">
              <p>{{ row.title }}</p>
              <p class="text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category.name : "未分类" }}</p>
              <p class="text-gray-400 text-xs">创建时间：{{ row.create_time }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总库存" width="90" prop="stock" align="center" />
      <el-table-column label="价格（元）" width="150" align="center">
        <template #default="{ row }">
          <span class="text-rose-500">￥{{ row.min_price }}</span>
          <el-divider direction="vertical"></el-divider>
          <span class=" text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
    </div>
    <!-- 弹框 -->
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';

import {
  getGoodsList
} from '@/api/shop';
import useTable from '@/hooks/useTable';

const goods = ref([]);

const {
  pageConfig,
  // 选中id
  checkedIds,
  tableRef,
  initLoadList,
  onTableSelection,
  onPageChange
} = useTable({
  filterData: {
    tab: 'all',
    title: '',
    category_id: ''
  },
  getList: {
    api: getGoodsList,
    payload: ['tab', 'title', 'category_id'],
    onSuccess: result => {
      const { list } = result;
      goods.value = list;
    }
  },
});

const dialogvisible = ref(false);

const callbackFunction = ref(null);
const open = (callback = null) => {
  callbackFunction.value = callback;
  dialogvisible.value = true;
};

const close = () => dialogvisible.value = false;

const handleOk = () => {
  if (typeof callbackFunction.value === "function") {
    callbackFunction.value(checkedIds.value);
  }
  close();
};

onMounted(() => initLoadList());

defineExpose({
  open
});
</script>