<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:27:31
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-26 23:11:40
 * @FilePath: \shop-admin\src\pages\Other\imageList.vue
 * @Description: 图库管理
-->
<template>
  <div class="image-page-container">
    <el-container class="image-content-container">
      <el-header>
        <el-button type="primary" size="small" @click="handleCreateClassify">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleUploadImage">上传图片</el-button>
      </el-header>
      <el-container class="image-classtify-container">
        <!-- 图片分类 -->
        <image-classtify ref="imageClasstifyRef" @change="handleClasstifyCheck"></image-classtify>
        <!-- 分类图片 -->
        <image-main ref="imageMainRef"></image-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import imageClasstify from '@/components/ImageClasstify/index.vue';
import imageMain from '@/components/ImageMain/index.vue';

// 图片分类
const imageClasstifyRef = ref(null);
// 分类图片
const imageMainRef = ref(null);


// 创建分类
const handleCreateClassify = () => imageClasstifyRef.value.handleAddClasstify();
// 上传图片
const handleUploadImage = () => imageMainRef.value.handleUpload();
// 选中分类
const handleClasstifyCheck = id => imageMainRef.value.handleCurrentId(id);

</script>


<style lang="less" scoped>
.image-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .image-content-container {
    height: 100%;
    @apply flex flex-col;

    .el-header {
      height: 60px;
      border-bottom: 1px solid #ccc;
      @apply flex items-center;
    }

    .image-classtify-container {
      @apply flex-1 flex;
      height: calc(100% - 60px);
    }
  }
}
</style>