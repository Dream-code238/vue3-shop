<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:19:41
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 13:25:06
 * @FilePath: \shop-admin\src\pages\Order\commentList.vue
 * @Description: 评论管理
-->
<template>
  <div class="comment-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 搜索 -->
      <Search class="flex items-center mb-3" :model="pageConfig" @search="handleSearch" @reset="handleReset">
        <searchItem label="关键词" class="mr-5">
          <el-input v-model="pageConfig.title" size="small" placeholder="商品标题" clearable />
        </searchItem>
      </Search>

      <el-table default-expand-all :data="comments" stripe style="width: 100%" height="500" width="100%"
        class="flex-1 py-5" v-loading="pageConfig.loading">

        <el-table-column type="expand">
          <template #default="{ row }">
            <div class="flex pl-18">
              <el-avatar :size="50" :src="row.user.avatar" fit="fill" class="mr-3"></el-avatar>
              <div class="flex-1">
                <h6 class="flex items-center">
                  {{ row.user.nickname || row.user.username }}
                  <small class=" text-gray-400 ml-2">{{ row.review_time }}</small>
                  <el-button size="small" class="ml-auto" @click="handleTextarea(row)"
                    v-if="!row.textareaEdit && !row.extra">回复</el-button>
                </h6>
                {{ row.review.data }}
                <div class="py-2">
                  <el-image v-for="(item, index) in row.review.image" :key="index" :src="item" fit="cover" :lazy="true"
                    style="width: 100px;height: 100px;" class="rounded"></el-image>
                </div>

                <div v-if="row.textareaEdit">
                  <el-input v-model="textarea" placeholder="请输入评价内容" type="textarea" :rows="2"></el-input>
                  <div class="py-2">
                    <el-button type="primary" size="small" @click="handleReview(row)">回复</el-button>
                    <el-button size="small" class="ml-2" @click="row.textareaEdit = false">取消</el-button>
                  </div>
                </div>

                <template v-else>
                  <div class="mt-3 bg-gray-100 p-3 rounded" v-for="(item, index) in row.extra" :key="index">
                    <h6 class="flex font-bold">
                      客服
                      <el-button type="info" size="small" class="ml-auto"
                        @click="handleTextarea(row, item.data)">修改</el-button>
                    </h6>
                    <p>{{ item.data }}</p>
                  </div>
                </template>

              </div>
            </div>
          </template>
        </el-table-column>


        <el-table-column label="ID" width="70" align="center" prop="id" />

        <el-table-column label="商品" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-image :src="row.goods_item ? row.goods_item.cover : ''" fit="fill" :lazy="true"
                style="width:50px;height:50px;" class="rounded"></el-image>
              <div class="ml-3">
                <h6>{{ row.goods_item?.title ?? '商品已被删除' }}</h6>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="评价信息" width="200">
          <template #default="{ row }">
            <div>
              <p>用户：{{ row.user.nickname || row.user.username }}</p>
              <p>
                <el-rate v-model="row.rating" disabled show-score text-color="#ff9900" />
              </p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="评价时间" width="180" align="center" prop="review_time" />

        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
              :disabled="row.super == 1" @change="onUpdateStatus($event, row)">
            </el-switch>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <div class="comment-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Search from '@/components/Search/index.vue';
import searchItem from '@/components/Search/SearchItem.vue';

import {
  getCommentList,
  updateCommentStatus,
  reviewComment
} from '@/api/order';
import { toast } from '@/utils/common';
import useTable from '@/hooks/useTable';

// 评论列表
const comments = ref([]);

const {
  pageConfig,
  initLoadConfig,
  initLoadList,
  onUpdateStatus,
  onPageChange
} = useTable({
  filterData: {
    title: ''
  },
  getList: {
    api: getCommentList,
    payload: ['title'],
    onSuccess: result => {
      const { list } = result;
      comments.value = list.map(item => ({ ...item, statusLoading: false, textareaEdit: false }));
    }
  },
  updateStatusApi: {
    api: updateCommentStatus
  }
});

// 搜索
const handleSearch = () => initLoadList();
// 重置筛选项
const handleReset = () => {
  initLoadConfig({
    title: ''
  });
  initLoadList();
}

const textarea = ref("");
const handleTextarea = (row, data = "") => {
  textarea.value = data;
  row.textareaEdit = true;
}

const handleReview = (row) => {
  if (textarea.value == "") {
    return toast("回复内容不能为空", "error");
  }
  reviewComment({ id: row.id, data: textarea.value })
    .then(() => row.textareaEdit = false)
    .finally(() => initLoadList());
  toast("回复成功");
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>

<style lang="less" scoped>
.comment-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .comment-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}
</style>