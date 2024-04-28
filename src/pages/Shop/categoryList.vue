<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 16:19:17
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 20:18:39
 * @FilePath: \shop-admin\src\pages\Shop\categoryList.vue
 * @Description: 分类管理
-->
<template>
  <div class="category-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">
      <!-- 新增刷新 -->
      <div class="flex items-center justify-between">
        <el-button type="primary" size="small" @click="handleAddManager">新增</el-button>
        <el-tooltip content="刷新数据" placement="bottom">
          <el-button size="small" @click="handleRefresh">
            <el-icon>
              <Refresh />
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </el-card>
  </div>
</template>

<script setup>
</script>


<style lang="less" scoped>
.category-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .category-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }

}
</style>