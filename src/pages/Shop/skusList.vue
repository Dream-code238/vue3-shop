<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 16:19:17
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:07:49
 * @FilePath: \shop-admin\src\pages\Shop\categoryList.vue
 * @Description: 规格管理
-->
<template>
  <div class="skus-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 新增刷新 -->
      <ListHeader checked :check-keys="checkedIds" @add="handleAddSkus" @check="handleDeleteAll" @refresh="onRefresh" />

      <!-- 规格列表 -->
      <el-table ref="tableRef" :data="skus" stripe style="width: 100%" height="500" class="flex-1 py-5"
        v-loading="pageConfig.loading" @selection-change="onTableSelection">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="规格名称" />
        <el-table-column prop="default" label="规格值" />
        <el-table-column prop="order" label="排序" />
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :v-loading="row.loading"
              @change="onUpdateStatus($event, row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">

            <el-button type="primary" size="small" text @click="handleSkusUpdate(scope.row)">修改</el-button>

            <el-popconfirm title="你确定要删除此规格吗？" confirm-button-text="确定" cancel-button-text="取消"
              @confirm="handleSkusDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <div class="skus-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <SkusModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" />

    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import SkusModel from './components/SkusModel.vue';

import { getSkusList, addSkus, updateSkus, deleteSkus, updateSkusStatus } from '@/api/shop';
import useTable from '@/hooks/useTable';

// 规格列表
const skus = ref([]);

// 弹框列表
const drawerType = ref('');

const {
  pageConfig,
  checkedIds,
  tableRef,
  formDrawerRef,
  initLoadList,
  onRefresh,
  onTableSelection,
  onOk,
  onUpdate,
  onDelete,
  onUpdateStatus,
  onPageChange
} = useTable({
  getList: {
    api: getSkusList,
    onSuccess: result => {
      const { list } = result;

      skus.value = list;
    }
  },
  addApi: {
    api: addSkus
  },
  updateApi: {
    api: updateSkus
  },
  deleteApi: {
    api: deleteSkus
  },
  updateStatusApi: {
    api: updateSkusStatus
  }
});

// 新增规格
const handleAddSkus = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({
    name: '', status: 1, order: 50, default: ''
  });
  formDrawerRef.value.open();
};

// 批量删除
const handleDeleteAll = () => {
  onDelete?.({ ids: checkedIds.value });
}

// 更新规格
const handleSkusUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
};

// 删除规格
const handleSkusDelete = item => {
  onDelete?.({ ids: [item.id] });
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.skus-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .skus-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }

}
</style>