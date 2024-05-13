<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:27:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:21:12
 * @FilePath: \shop-admin\src\pages\Other\noticeList.vue
 * @Description: 公告管理
-->
<template>
  <div class="notice-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 新增刷新 -->
      <ListHeader @add="handleAddNotice" @refresh="onRefresh" />

      <!-- 通知列表 -->
      <el-table :data="notices" stripe style="width: 100%" class="flex-1 py-5" v-loading="pageConfig.loading">
        <el-table-column prop="title" label="公告标题" />
        <el-table-column prop="create_time" label="发布时间" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" text @click="handleNoticeUpdate(scope.row)">修改</el-button>

            <el-popconfirm title="你确定要删除此公告吗？" confirm-button-text="确定" cancel-button-text="取消"
              @confirm="handleNoticeDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 新增/更新 -->
      <NoticeModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { noticeList, addNotice, deleteNotice, updateNotice } from '@/api/other';

import ListHeader from '@/components/ListHeader/index.vue';
import NoticeModel from './components/NoticeModel.vue';

import useTable from '@/hooks/useTable';


// 公告列表
const notices = ref([]);
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
  onPageChange
} = useTable({
  getList: {
    api: noticeList,
    onSuccess: result => {
      const { list } = result;

      notices.value = list;
    }
  },
  addApi: {
    api: addNotice
  },
  updateApi: {
    api: updateNotice
  },
  deleteApi: {
    api: deleteNotice
  }
});

// 新增公告
const handleAddNotice = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ title: '', content: '' });
  formDrawerRef.value.open();
}

// 更新公告
const handleNoticeUpdate = item => {
  const { id, title, content } = item;
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm({ id, title, content });
  formDrawerRef.value.open();
}

// 删除公告
const handleNoticeDelete = async item => {
  onDelete?.(item);
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.notice-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;
}
</style>