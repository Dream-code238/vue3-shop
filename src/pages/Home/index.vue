<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-19 22:26:27
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 19:46:54
 * @FilePath: \shop-admin\src\pages\Home\index.vue
 * @Description: 主控台
-->
<template>
  <div class="home-page-container">
    <order-list v-auth="['getStatistics1,GET', 'getStatistics5,GET']"></order-list>
    <nav-list></nav-list>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <order-echarts></order-echarts>
      </el-col>
      <el-col :span="12" :offset="0">
        <shop-transaction title="店铺及商品提示" tip="店铺及商品提示" :transaction="transactionType.goods" class="mb-5" />
        <shop-transaction title="交易提示" tip="需要立即处理的交易订单" :transaction="transactionType.order" />
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

import orderList from './components/orderList.vue';
import navList from './components/navList.vue';
import orderEcharts from './components/orderEcharts.vue';
import shopTransaction from './components/shopTransaction.vue';

import {
  getShopTransaction
} from '@/api/home';

const store = useStore();

const transactionType = reactive({
  goods: [],
  order: []
})

const initLoadList = async () => {

  const { goods, order } = await getShopTransaction();

  transactionType.goods = goods;

  transactionType.order = order;
};

onMounted(() => initLoadList());

</script>


<style lang="less" scoped>
.home-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
}
</style>
