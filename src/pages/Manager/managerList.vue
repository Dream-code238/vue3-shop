<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:27:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:46:46
 * @FilePath: \shop-admin\src\pages\Other\noticeList.vue
 * @Description: 管理员管理
-->
<template>
  <div class="manager-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 搜索 -->
      <Search class="flex items-center mb-3" :model="pageConfig" @search="handleSearch" @reset="handleReset">
        <SearchItem label="关键词" class="mr-5">
          <el-input v-model="pageConfig.keyword" size="small" placeholder="请输入管理员昵称" clearable />
        </SearchItem>
      </Search>

      <!-- 新增刷新 -->
      <ListHeader @add="handleAddManager" @refresh="onRefresh" />

      <!-- 通知列表 -->
      <el-table :data="manages" stripe style="width: 100%" height="500" class="flex-1 py-5"
        v-loading="pageConfig.loading">
        <el-table-column prop="role" label="管理员" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="40" :src="row.avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <div class="ml-3">
                <h6>{{ row.username }}</h6>
                <small>ID: {{ row.id }}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属角色" align="center">
          <template #default="{ row }">
            <div>{{ row.role.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :v-loading="row.loading"
              :disabled="row.super === 1" @change="onUpdateStatus($event, row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">

            <template v-if="scope.row.super === 1">
              <small class="text-sm text-gray-500">暂无操作</small>
            </template>

            <template v-else>
              <el-button type="primary" size="small" text @click="handleManagerUpdate(scope.row)">修改</el-button>

              <el-popconfirm title="你确定要删除此管理员吗？" confirm-button-text="确定" cancel-button-text="取消"
                @confirm="handleManagerDelete(scope.row)">
                <template #reference>
                  <el-button type="danger" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </template>

          </template>
        </el-table-column>
      </el-table>

      <div class="manager-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 新增/更新 -->
      <ManagerModel ref="formDrawerRef" :title="drawerType" :roleList="roleList" :create="onOk" :update="onUpdate" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Search from '@/components/Search/index.vue';
import SearchItem from '@/components/Search/SearchItem.vue';
import ListHeader from '@/components/ListHeader/index.vue';
import ManagerModel from './components/ManagerModel.vue';

import {
  getManagerList,
  updateManStatus,
  addManager,
  updateManager,
  deleteManager
} from '@/api/manager';
import useTable from '@/hooks/useTable';

// 管理员列表
const manages = ref([]);
// 角色列表
const roleList = ref([]);
// 弹框列表
const drawerType = ref('');

// 列表相关配置
const {
  // 列表筛选数据
  pageConfig,
  // 抽屉弹框
  formDrawerRef,
  // 初始化筛选数据
  initLoadConfig,
  // 获取列表
  initLoadList,
  // 刷新列表
  onRefresh,
  // 添加功能
  onOk,
  // 更新功能
  onUpdate,
  // 删除功能
  onDelete,
  // 更新状态
  onUpdateStatus,
  // 分页切换
  onPageChange
} = useTable({
  filterData: {
    keyword: ''
  },
  getList: {
    api: getManagerList,
    payload: ['keyword'],
    onSuccess: result => {
      const { list, roles } = result;

      manages.value = list.map(item => ({ ...item, loading: false }));

      roleList.value = roles;
    }
  },
  addApi: {
    api: addManager
  },
  updateApi: {
    api: updateManager
  },
  deleteApi: {
    api: deleteManager
  },
  updateStatusApi: {
    api: updateManStatus
  }
});

// 搜索
const handleSearch = () => initLoadList();

// 重置筛选项
const handleReset = () => {
  initLoadConfig({ keyword: '' });
  initLoadList();
}

// 新增管理员
const handleAddManager = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ username: '', password: '', role_id: '', status: 1, avatar: '' });
  formDrawerRef.value.open();
}

// 管理员更新
const handleManagerUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
}

// 删除管理员
const handleManagerDelete = item => {
  onDelete?.({ id: item.id });
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.manager-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .manager-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }

}
</style>
