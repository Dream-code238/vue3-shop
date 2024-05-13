<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:17:52
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 10:45:24
 * @FilePath: \shop-admin\src\pages\User\levelList.vue
 * @Description: 会员等级
-->
<template>
  <div class="level-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 新增刷新 -->
      <ListHeader @add="handleAddLevel" @refresh="onRefresh" />

      <!-- 通知列表 -->
      <el-table :data="levels" stripe style="width: 100%" class="flex-1 py-5" v-loading="pageConfig.loading">
        <el-table-column prop="name" label="会员等级" />
        <el-table-column prop="discount" label="折扣率" align="center" />
        <el-table-column prop="level" label="等级序号" align="center" />
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :v-loading="row.loading"
              @change="onUpdateStatus($event, row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">

            <el-button type="primary" size="small" text @click="handleLevelUpdate(scope.row)">修改</el-button>

            <el-popconfirm title="你确定要删除此会员等级吗？" confirm-button-text="确定" cancel-button-text="取消"
              @confirm="handleLevelDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="level-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 新增/更新 -->
      <LevelModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import LevelModel from './components/LevelModel.vue';

import { getLevelList, addLevel, updateLevel, updateLevelStatus, deleteLevel } from '@/api/user';
import useTable from '@/hooks/useTable';

// 会员等级列表
const levels = ref([]);
// 弹框列表
const drawerType = ref('');

const {
  pageConfig,
  formDrawerRef,
  initLoadList,
  onRefresh,
  onOk,
  onUpdate,
  onDelete,
  onUpdateStatus,
  onPageChange
} = useTable({
  getList: {
    api: getLevelList,
    onSuccess: result => {
      const { list } = result;
      levels.value = list;
    }
  },
  addApi: {
    api: addLevel
  },
  updateApi: {
    api: updateLevel
  },
  deleteApi: {
    api: deleteLevel
  },
  updateStatusApi: {
    api: updateLevelStatus
  }
});

// 新增会员等级
const handleAddLevel = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ name: '', level: 100, status: 1, discount: 10, max_price: 1000, max_times: 500 });
  formDrawerRef.value.open();
};

// 更新会员等级
const handleLevelUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
};

// 删除会员等级
const handleLevelDelete = item => {
  onDelete?.({ id: item.id });
};

// 挂在获取列表
onMounted(() => initLoadList());
</script>



<style lang="less" scoped>
.level-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .level-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}
</style>