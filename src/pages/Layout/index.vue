<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 17:47:33
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-23 21:10:29
 * @FilePath: \shop-admin\src\pages\Layout\index.vue
 * @Description: 页面布局
-->
<template>
  <el-container class="layout-page-container">
    <f-aside></f-aside>
    <el-container class="layout-main-container">
      <f-header></f-header>
      <f-main></f-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FAside from './components/FAside.vue';
import FHeader from './components/FHeader.vue';
import FMain from './components/FMain.vue';
</script>

<style lang="less" scoped>
.layout-page-container {
  width: 100vw;
  height: 100vh;
  @apply flex;

  .layout-main-container {
    @apply flex-1 flex-col;
  }
}
</style>