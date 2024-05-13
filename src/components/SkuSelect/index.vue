<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-01 00:58:58
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 18:42:36
 * @FilePath: \shop-admin\src\components\SkuSelect.vue\index.vue
 * @Description: 规格选择
-->
<template>
  <el-dialog title="规格选择" v-model="dialogVisible" width="80%">

    <el-container style="height:65vh;" class="sku-select-container">
      <el-aside class="sku-aside-container">
        <div class="sku-list-container">
          <div class="sku-list-item" v-for="item in skus" :class="{ 'active': (activeId == item.id) }" :key="item.id"
            @click="handleSkuActiveId(item.id)">
            {{ item.name }}
          </div>
        </div>
        <div class="sku-footer-container">
          <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
        </div>
      </el-aside>
      <el-main class="sku-main-container">
        <el-checkbox-group v-model="form.list">
          <el-checkbox v-for="item in skusOptions" :key="item" :label="item" :value="item" border />
        </el-checkbox-group>
      </el-main>
    </el-container>

    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';

import {
  getSkusList
} from '@/api/shop';
import useTable from '@/hooks/useTable';

const skus = ref([]);
const activeId = ref(0);
const skusOptions = ref([]);

const form = reactive({
  name: "",
  list: []
});

const {
  pageConfig,
  initLoadList,
  onPageChange
} = useTable({
  getList: {
    api: getSkusList,
    onSuccess: result => {
      const { list } = result;
      skus.value = list;
      if (list.length > 0) {
        handleSkuActiveId(list[0].id);
      }
    }
  },
});

const dialogVisible = ref(false);

const callbackFunction = ref(null);
const open = (callback = null) => {
  callbackFunction.value = callback;
  dialogVisible.value = true;
};

const handleSkuActiveId = id => {
  activeId.value = id;
  skusOptions.value = [];
  const item = skus.value.find(item => item.id == id);
  if (item) {
    skusOptions.value = item.default.split(",");
    form.name = item.name;
  }
}

const handleOk = () => {
  if (typeof callbackFunction.value === "function") {
    callbackFunction.value(form);
  }
  dialogVisible.value = false;
};

onMounted(() => initLoadList());

defineExpose({
  open
});
</script>



<style lang="less" scoped>
.sku-select-container {
  @apply flex;

  .sku-aside-container {
    width: 220px;
    @apply flex flex-col;

    .sku-list-container {
      height: calc(100% - 60px);
      overflow-y: scroll;
      @apply flex-1 flex flex-col;

      .sku-list-item {
        border-bottom: 1px solid #f4f4f4;
        @apply p-3 text-sm text-gray-600 flex items-center cursor-pointer;
      }

      .sku-list:hover,
      .active {
        @apply bg-blue-50;
      }
    }

    .sku-footer-container {
      height: 60px;
      @apply flex items-center justify-center;
    }
  }

  .sku-main-container {
    @apply bg-green-300;
  }
}
</style>