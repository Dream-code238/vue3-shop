<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 09:33:39
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-24 10:10:33
 * @FilePath: \shop-admin\src\pages\Home\components\shopTransaction.vue
 * @Description: 店铺商品展示
-->
<template>
  <el-card shadow="never" class="border-0">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">{{ title }}</span>
        <el-tag type="danger" effect="plain">{{ tip }}</el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item, index) in transaction" :key="index">
        <el-card shadow="hover" class="border-0 bg-light-400">
          <div class="flex flex-col items-center justify-center cursor-pointer">
            <span class="text-x1 mb-2">{{ item.value }}</span>
            <span class="text-xs text-gray-500">{{ item.label }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </el-card>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  transaction: {
    type: Array,
    default: []
  }
});
</script>

<style lang="less" scoped></style>
