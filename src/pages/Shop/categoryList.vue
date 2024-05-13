<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 16:19:17
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 12:00:19
 * @FilePath: \shop-admin\src\pages\Shop\categoryList.vue
 * @Description: 分类管理
-->
<template>
  <div class="category-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">
      <!-- 新增刷新 -->
      <div class="category-page-header">
        <ListHeader @add="handleAddCategory" @refresh="onRefresh" />
      </div>

      <!-- 组件树 -->
      <div class="category-main-container">
        <el-tree :data="treeData" :props="{ label: 'name', children: 'child' }" v-loading="pageConfig.loading"
          node-key="id">
          <template #default="{ node, data }">
            <div class="tree-node">

              <div class="tree-node-left flex items-center">
                <span class="mr-2">{{ data.name }}</span>
              </div>

              <div class="tree-node-right flex items-center">
                <el-button type="primary" text size="small" @click.stop="handleGoodRecom(data)"
                  :loading="data.goodsRecomLoading">推荐商品</el-button>
                <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                  @change="onUpdateStatus($event, data)" />
                <el-button type="primary" text size="small" @click.stop="handleCategoryUpdate(data)">修改</el-button>
                <el-popconfirm title="是否要删除该菜单权限吗？" confirmButtonText="确认" cancelButtonText="取消"
                  @confirm="handleCategoryDelete(data)">
                  <template #reference>
                    <el-button type="primary" text size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>

            </div>
          </template>
        </el-tree>
      </div>
      <!-- 新增/更新 -->
      <CategoryModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" />
      <!-- 推荐商品 -->
      <GoodRecom ref="goodRecomRef" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import CategoryModel from './components/CategoryModel.vue';
import GoodRecom from './components/GoodRecom.vue';

import { getCategoryList, addCategory, updateCategory, deleteCategory, updateCategoryStatus } from '@/api/shop';
import useTable from '@/hooks/useTable';

const treeData = ref([]);
// 弹框列表
const drawerType = ref('');

const {
  // 列表筛选数据
  pageConfig,
  // 抽屉弹框
  formDrawerRef,
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
} = useTable({
  getList: {
    api: getCategoryList,
    onSuccess: result => {
      const key = Object.values(result);
      treeData.value = key.map(item => ({ ...item, goodsRecomLoading: false }));
    }
  },
  addApi: {
    api: addCategory
  },
  updateApi: {
    api: updateCategory
  },
  deleteApi: {
    api: deleteCategory
  },
  updateStatusApi: {
    api: updateCategoryStatus
  }
});



// 新增商品分类
const handleAddCategory = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ id: 0, name: '' });
  formDrawerRef.value.open();
}

// 更新商品分类
const handleCategoryUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
}

// 删除商品分类
const handleCategoryDelete = item => {
  onDelete?.({ id: item.id, name: item.name });
}

// 推荐商品
const goodRecomRef = ref(null);
const handleGoodRecom = item => goodRecomRef.value.open(item);

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.category-page-container {
  @apply flex-1 flex flex-col p-5 rounded bg-white;
  max-height: 100%;

  :deep(.el-card__body) {
    height: 100%;
    @apply flex-1 flex flex-col;
  }

  .category-page-header {
    height: 24px;
  }

  .category-main-container {
    height: calc(100% - 24px);
    max-height: 100%;
    @apply flex-1 flex flex-col py-5;

    .el-tree {
      max-height: 100%;
      overflow-y: scroll;
      @apply flex-1 flex flex-col;
    }
  }



  .tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  :deep(.el-tree-node__content) {
    padding: 20px 0;
  }

}
</style>