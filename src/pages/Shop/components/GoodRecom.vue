<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-01 23:19:47
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-02 01:08:15
 * @FilePath: \shop-admin\src\pages\Shop\components\GoodRecom.vue
 * @Description: 推荐商品
-->
<template>
  <drawer-model ref="formDrawerRef" title="推荐商品" destroyOnClose @submit="handleOk" confirmText="关联">
    <el-table :data="goodsRecom" border stripe style="width:100%;">
      <el-table-column prop="goods_id" label="ID" width="60" />
      <el-table-column label="商品封面" width="180">
        <template #default="{ row }">
          <el-image :src="row.cover" fit="fill" :lazy="true" style="width: 64px;height: 64px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"
            @confirm="handleGoodRecomDelete(row)">
            <template #reference>
              <el-button text type="primary" size="small" :loading="row.loading">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </drawer-model>
  <GoodSelect ref="goodSelectRef" />
</template>

<script setup>
import { ref } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';
import GoodSelect from '@/components/GoodSelect/index.vue';

import {
  getCategoryProducts,
  deleteCategoryProduct,
  addCategoryProduct
} from '@/api/shop';
import { toast } from '@/utils/common';

const formDrawerRef = ref(null);
const category_id = ref(0)
const goodsRecom = ref([]);

const initLoadData = () => {
  return getCategoryProducts({ category_id: category_id.value })
    .then(result => {
      goodsRecom.value = result.map(recom => ({ ...recom, loading: false }));
    })
}

const open = async item => {
  category_id.value = item.id;
  item.goodsRecomLoading = true;
  initLoadData()
    .then(() => formDrawerRef.value.open())
    .finally(() => item.goodsRecomLoading = false)
};

const handleGoodRecomDelete = item => {
   
  item.loading = true;
  deleteCategoryProduct({ id: item.id })
    .then(() => initLoadData());
  toast("删除成功");
}

const goodSelectRef = ref(null);
const handleOk = () => {
  goodSelectRef.value.open(goods_ids => {
    formDrawerRef.value.showLoading()
    addCategoryProduct({ category_id: category_id.value, goods_ids })
      .then(() => {
        initLoadData();
        toast("关联成功");
      })
      .finally(() => formDrawerRef.value.hideLoading());
  });
}

defineExpose({
  open
});
</script>