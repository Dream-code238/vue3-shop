<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 15:53:04
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 20:15:27
 * @FilePath: \shop-admin\src\pages\Shop\goodList.vue
 * @Description: 商品管理
-->
<template>
  <el-tabs v-model="activeName" class="goods-tabs-container px-2" @tab-click="handleClick">
    <el-tab-pane v-for="item in goodsTab" :label="item.label" :name="item.value">

    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue';





const goodsTab = ref([
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '审核中',
    value: 'checking'
  },
  {
    label: '出售中',
    value: 'saling'
  },
  {
    label: '已下架',
    value: 'off'
  },
  {
    label: '库存预警',
    value: 'min_stock'
  },
  {
    label: '回收站',
    value: 'delete'
  }
]);
</script>

<style lang="less" scoped>
.goods-tabs-container {
  width: 100%;
}
</style>