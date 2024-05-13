<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 15:54:14
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 11:03:05
 * @FilePath: \shop-admin\src\pages\User\userList.vue
 * @Description: 用户管理
-->
<template>
  <div class="user-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 搜索 -->
      <Search class="flex items-center mb-3" :model="pageConfig" @search="handleSearch" @reset="handleReset">
        <SearchItem label="关键词" class="mr-5">
          <el-input v-model="pageConfig.keyword" size="small" placeholder="手机号/邮箱/会员昵称" clearable />
        </SearchItem>
        <template #show>
          <SearchItem label="会员等级">
            <el-select v-model="pageConfig.user_level_id" placeholder="请选择会员等级" style="width: 240px;">
              <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </SearchItem>
        </template>
      </Search>

      <!-- 新增刷新 -->
      <ListHeader @add="handleAddUser" @refresh="onRefresh" />

      <!-- 用户列表 -->
      <el-table :data="users" stripe style="width: 100%" height="500" width="100%" class="flex-1 py-5"
        v-loading="pageConfig.loading">
        <el-table-column label="会员" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="40" :src="row.avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <div class="ml-3">
                <h6>{{ row.username }}</h6>
                <small>ID:{{ row.id }}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" align="center">
          <template #default="{ row }">
            {{ row.user_level?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="登录注册" align="center">
          <template #default="{ row }">
            <p v-if="row.last_login_time">最后登录 : {{ row.last_login_time }}</p>
            <p>注册时间 : {{ row.create_time }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
              :disabled="row.super == 1" @change="onUpdateStatus($event, row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
            <div v-else>
              <el-button type="primary" size="small" text @click="handleUserUpdate(scope.row)">修改</el-button>

              <el-popconfirm title="是否要删除该用户？" confirmButtonText="确认" cancelButtonText="取消"
                @confirm="handleUserDelete(scope.row)">
                <template #reference>
                  <el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="user-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 新增/更新 -->
      <UserModel ref="formDrawerRef" :title="drawerType" :levels="levels" :create="onOk" :update="onUpdate" />
    </el-card>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Search from '@/components/Search/index.vue';
import SearchItem from '@/components/Search/SearchItem.vue';
import ListHeader from '@/components/ListHeader/index.vue';
import UserModel from './components/UserModel.vue';

import { getUserList, addUser, updateUser, updateUserStatus, deleteUser } from '@/api/user';
import useTable from '@/hooks/useTable';


// 用户列表
const users = ref([]);
// 会员等级
const levels = ref([]);
// 弹框列表
const drawerType = ref('');

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
    keyword: '',
    user_level_id: ''
  },
  getList: {
    api: getUserList,
    payload: ['keyword', 'user_level_id'],
    onSuccess: result => {
      const { list, user_level } = result;
      users.value = list;
      levels.value = user_level;
    }
  },
  addApi: {
    api: addUser
  },
  updateApi: {
    api: updateUser
  },
  deleteApi: {
    api: deleteUser
  },
  updateStatusApi: {
    api: updateUserStatus
  }
});

// 搜索
const handleSearch = () => initLoadList();
// 重置筛选项
const handleReset = () => {
  initLoadConfig({
    keyword: '',
    user_level_id: ''
  });
  initLoadList();
}

// 新增用户
const handleAddUser = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({
    username: '',
    password: '',
    status: 1,
    nickname: '',
    phone: '',
    email: '',
    avatar: '',
    user_level_id: ''
  });
  formDrawerRef.value.open();
};
// 更新用户
const handleUserUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
};
// 删除用户
const handleUserDelete = item => {
  onDelete?.({ id: item.id });
};

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.user-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .user-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}
</style>
