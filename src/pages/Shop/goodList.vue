<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 15:53:04
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 13:51:22
 * @FilePath: \shop-admin\src\pages\Shop\goodList.vue
 * @Description: 商品管理 
-->
<template>
  <div class="goods-page-container">
    <!-- 标签页 -->
    <el-tabs v-model="pageConfig.tab" class="goods-tabs-container px-2" @tab-change="initLoadList">
      <el-tab-pane v-for="item in goodsTab" :label="item.label" :name="item.value"></el-tab-pane>
    </el-tabs>

    <el-card shadow="never" class="flex-1 flex flex-col border-0">
      <!-- 搜索 -->
      <Search class="flex items-center mb-3" :model="pageConfig" @search="handleSearch" @reset="handleReset">
        <SearchItem label="关键词" class="mr-5">
          <el-input v-model="pageConfig.title" size="small" placeholder="请输入商品名称" clearable />
        </SearchItem>
        <template #show>
          <SearchItem label="商品分类">
            <el-select v-model="pageConfig.category_id" placeholder="请选择商品分类" style="width: 240px;">
              <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </SearchItem>
        </template>
      </Search>
      <!-- 新增刷新 -->
      <ListHeader :checked="pageConfig.tab != 'delete'" :check-keys="checkedIds" @add="handleAddGoods"
        @check="handleDeleteAll" @refresh="onRefresh">
        <el-button v-if="pageConfig.tab == 'delete'" size="small" type="warning"
          @click="handleResetGoods">恢复商品</el-button>
        <el-popconfirm v-if="pageConfig.tab == 'delete'" title="是否要彻底删除该商品？" confirmButtonText="确认"
          cancelButtonText="取消" @confirm="handleDestroyGoods">
          <template #reference>
            <el-button type="danger" size="small">彻底删除</el-button>
          </template>
        </el-popconfirm>
        <el-button size="small" @click="handleGoodUpdateStatus(1)"
          v-if="pageConfig.tab == 'all' || pageConfig.tab == 'off'" :disabled="!checkedIds.length">上架</el-button>
        <el-button size="small" @click="handleGoodUpdateStatus(0)"
          v-if="pageConfig.tab == 'all' || pageConfig.tab == 'saling'" :disabled="!checkedIds.length">下架</el-button>
      </ListHeader>
      <!-- 通知列表 -->
      <el-table ref="tableRef" :data="goods" stripe style="width: 100%" height="500" width="100%" class="flex-1 py-5"
        v-loading="pageConfig.loading" @selection-change="onTableSelection">
        <el-table-column type="selection" width="55" />
        <el-table-column label="商品" width="300">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-image class="mr-3 rounded" :src="row.cover" fit="cover" :lazy="true" style="width:50px;height: 50px;">
              </el-image>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <div>
                  <span class="text-rose-500">￥{{ row.min_price }}</span>
                  <el-divider direction="vertical" />
                  <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
                </div>
                <p class="text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category.name : "未分类" }}</p>
                <p class="text-gray-400 text-xs">创建时间：{{ row.create_time }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际销量" width="180" prop="sale_count" align="center" />
        <el-table-column label="商品状态" width="180" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status" type="success" size="small">上架</el-tag>
            <el-tag v-else type="danger" size="small">仓库</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="180" align="center" v-if="pageConfig.tab != 'delete'">
          <template #default="{ row }">
            <div class="flex flex-col" v-if="row.ischeck == 0">
              <el-button type="success" size="small" @click="handleGoodCheck(row, 1)" plain>审核通过</el-button>
              <el-button class="mt-2 !ml-0" type="danger" size="small" @click="handleGoodCheck(row, 2)"
                plain>审核拒绝</el-button>
            </div>
            <span v-else>{{ row.ischeck == 1 ? '通过' : '拒绝' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" width="180" prop="stock" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div v-if="pageConfig.tab != 'delete'">
              <el-button class="px-1" type="primary" size="small" text
                @click="handleGoodUpdate(scope.row)">修改</el-button>

              <el-button class="px-1"
                :type="(scope.row.sku_type == 0 && !scope.row.sku_value) || (scope.row.sku_type == 1 && !scope.row.goods_skus.length) ? 'danger' : 'primary'"
                size="small" text :loading="scope.row.skusLoading"
                @click="handleSetGoodSkus(scope.row)">商品规格</el-button>

              <el-button class="px-1" :type="scope.row.goods_banner.length == 0 ? 'danger' : 'primary'" size="small"
                text @click="handleSetGoodBanner(scope.row)" :loading="scope.row.bannerLoading">设置轮播图</el-button>

              <el-button class="px-1" :type="!scope.row.content ? 'danger' : 'primary'" size="small" text
                @click="handleSetGoodContent(scope.row)" :loading="scope.row.contentLoading">商品详情</el-button>

              <el-popconfirm title="是否要删除该商品？" confirmButtonText="确认" cancelButtonText="取消"
                @confirm="handleGoodDelete(scope.row)">
                <template #reference>
                  <el-button class="px-1" text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
            <span v-else>暂无操作</span>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="goods-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>
      <!-- 新增/更新 -->
      <GoodModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" :category="category" />

      <!-- 轮播图 -->
      <GoodBanner ref="bannerRef" @refresh="onRefresh" />

      <!-- 商品详情 -->
      <GoodDetail ref="contentRef" @refresh="onRefresh" />

      <!-- 商品规格 -->
      <GoodSkus ref="skusRef" @refresh="onRefresh" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Search from '@/components/Search/index.vue';
import SearchItem from '@/components/Search/SearchItem.vue';
import ListHeader from '@/components/ListHeader/index.vue';
import GoodModel from './components/GoodModel.vue';
import GoodBanner from './components/GoodBanner.vue';
import GoodDetail from './components/GoodDetail.vue';
import GoodSkus from './components/GoodSkus.vue';

import { getGoodsList, addGood, checkGood, updateGoodStatus, deleteGood, resetGoodStatus, deleteGoodDestroy } from '@/api/shop';
import { goodsTab } from '@/contants/index';
import { toast } from '@/utils/common';
import useTable from '@/hooks/useTable';

// 商品分类
const goods = ref([]);
// 商品分类
const category = ref([]);
// 弹框列表
const drawerType = ref('');

const {
  // 列表筛选数据
  pageConfig,
  // 选中id
  checkedIds,
  tableRef,
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
  onTableSelection,
  // 分页切换
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
      const { list, cates } = result;
      goods.value = list.map(item => ({ ...item, bannerLoading: false, contentLoading: false, skusLoading: false }));
      category.value = cates;
    }
  },
  addApi: {
    api: addGood
  },
  deleteApi: {
    api: deleteGood
  }
});



// 搜索
const handleSearch = () => initLoadList();

// 重置筛选项
const handleReset = () => {
  initLoadConfig({
    title: '',
    category_id: ''
  });
  initLoadList();
}

// 新增商品
const handleAddGoods = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({
    title: '',
    category_id: '',
    cover: '',
    desc: '',
    unit: '件',
    stock: 100,
    min_stock: 10,
    status: 1,
    stock_display: 1,
    min_price: 0,
    min_oprice: 0
  });
  formDrawerRef.value.open();
};

// 商品审核
const handleGoodCheck = async (item, status) => {
  pageConfig.loading = true;
  await checkGood({ id: item.id, ischeck: status })
    .then(() => pageConfig.loading = false)
    .finally(() => initLoadList());
  toast(status === 1 ? '该商品审核已经成功' : '该商品审核已被拒绝');
}

// 更新商品
const handleGoodUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
}

// 上架/下架
const handleGoodUpdateStatus = async status => {
  await updateGoodStatus({ ids: checkedIds.value, status: status })
    .then(() => {
      if (tableRef?.value) {
        tableRef?.value?.clearSelection();
      }
      initLoadList();
    })
  toast(status ? '上架成功' : '下架成功');
}

// 删除商品
const handleGoodDelete = item => {
  onDelete?.({ ids: [item.id] });
}

// 批量删除
const handleDeleteAll = () => {
  onDelete?.({ ids: checkedIds.value });
}

// 恢复商品
const handleResetGoods = async () => {
  await resetGoodStatus({ ids: checkedIds.value })
    .then(() => {
      if (tableRef?.value) {
        tableRef?.value?.clearSelection();
      }
      initLoadList();
    });
  toast('所选的商品已成功恢复');
}

const handleDestroyGoods = async () => {
  await deleteGoodDestroy({ ids: checkedIds.value })
    .then(() => {
      if (tableRef?.value) {
        tableRef?.value?.clearSelection();
      }
      initLoadList();
    });
  toast('所选的商品已经成功彻底删除');
}

// 设置轮播图
const bannerRef = ref(null);
const handleSetGoodBanner = item => bannerRef.value.open(item);

// 商品详情
const contentRef = ref(null);
const handleSetGoodContent = item => contentRef.value.open(item);

// 商品规格
const skusRef = ref(null);
const handleSetGoodSkus = item => skusRef.value.open(item);

// 挂在获取列表
onMounted(() => initLoadList());
</script>

<style lang="less" scoped>
.goods-page-container {
  @apply flex-1 flex flex-col;
  max-height: 100%;

  .goods-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}
</style>