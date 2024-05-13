<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-29 17:38:20
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 15:37:47
 * @FilePath: \shop-admin\src\components\Search\searchItem.vue
 * @Description: 列表筛选项
-->
<template>
  <el-form-item class="ml-2" :label="label">
    <slot></slot>
  </el-form-item>
</template>


<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>
