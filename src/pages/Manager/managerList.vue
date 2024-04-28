<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:27:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 20:40:01
 * @FilePath: \shop-admin\src\pages\Other\noticeList.vue
 * @Description: 管理员管理
-->
<template>
  <div class="manager-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 搜索 -->
      <el-form :model="pageConfig" label-width="80px" label-suffix="：" class="flex items-center justify-between mb-3">
        <el-form-item label="关键词">
          <el-input v-model="pageConfig.keyword" size="small" placeholder="请输入管理员昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
          <el-button size="small" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

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

      <drawer-model ref="formDrawerRef" :title="drawerType === 'add' ? '新增管理员' : '修改管理员'" destroyOnClose
        @submit="handleOk">
        <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
          label-suffix="：">
          <el-form-item prop="username" label="用户名">
            <el-input placeholder="请输入用户名" v-model="formConfig.username" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input placeholder="请输入密码" v-model="formConfig.password" />
          </el-form-item>
          <el-form-item prop="avatar" label="头像">
            <upload-avatar v-model="formConfig.avatar" />
          </el-form-item>
          <el-form-item prop="role_id" label="所属角色">
            <el-select v-model="formConfig.role_id" placeholder="请选择所属角色" style="width: 240px">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-switch :active-value="1" :inactive-value="0" v-model="formConfig.status" />
          </el-form-item>
        </el-form>
      </drawer-model>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import DrawerModel from '@/components/DrawerModel/index.vue';
import UploadAvatar from './components/UploadAvatar.vue';

import {
  getManagerList,
  updateManStatus,
  addManager,
  updateManager,
  deleteManager
} from '@/api/manager';
import useTable from '@/hooks/useTable';
import useForm from '@/hooks/useForm';

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

// 表单相关配置
const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    username: '',
    password: '',
    role_id: '',
    status: 1,
    avatar: ''
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    role_id: [
      { required: true, message: '请选择所属角色', trigger: 'blur' }
    ]
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
  resetForm({ username: '', password: '', role_id: '', status: 1, avatar: '' });
  formDrawerRef.value.open();
}

// 管理员更新
const handleManagerUpdate = item => {
  drawerType.value = 'update';
  resetForm(item);
  formDrawerRef.value.open();
}

// 删除管理员
const handleManagerDelete = item => {
  onDelete?.({ id: item.id });
}

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    formDrawerRef.value.showLoading();

    // 添加
    if (drawerType.value === 'add') {

      onOk?.({
        username: formConfig.username,
        password: formConfig.password,
        role_id: formConfig.role_id,
        status: formConfig.status,
        avatar: formConfig.avatar
      });

    }
    // 更新
    else {

      onUpdate?.({
        id: formConfig.id,
        username: formConfig.username,
        password: formConfig.password,
        role_id: formConfig.role_id,
        status: formConfig.status,
        avatar: formConfig.avatar
      });

    }

    formDrawerRef.value.close();

  });
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
