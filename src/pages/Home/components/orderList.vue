<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-23 20:45:20
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 19:20:42
 * @FilePath: \shop-admin\src\pages\Home\components\orderList.vue
 * @Description: 订单统计
-->
<template>
  <el-row :gutter="20">
    <template v-if="panelList.length === 0">
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-skeleton style="width: 100%" animated loading>
          <template #template>
            <el-card shadow="hover" class="border-0">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 50%;" />
                  <el-skeleton-item variant="text" style="width: 10%;" />
                </div>
              </template>
              <el-skeleton-item variant="h3" style="width: 80%;" />
              <el-divider />
              <div class="flex justify-between">
                <el-skeleton-item variant="text" style="width: 50%;" />
                <el-skeleton-item variant="text" style="width: 30%;" />
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </template>
    <template v-else>
      <el-col :span="6" :offset="0" v-for="(item, index) in panelList" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor || 'success'" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold">
            <count-to :value="item.value" />
          </span>
          <el-divider />
          <div class="flex justify-between">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import CountTo from '@/components/CountTo/index.vue';

import {
  getOrderList
} from '@/api/home';


const store = useStore();

const panelList = ref([]);

const initLoadList = async () => {
  const { panels } = await getOrderList({});
  panelList.value = panels;
};




onMounted(() => initLoadList());

</script>