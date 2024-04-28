<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 17:54:58
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 17:14:01
 * @FilePath: \shop-admin\src\pages\Layout\components\FHeader.vue
 * @Description: 主内容
-->
<template>
  <el-main class="main-page-container">
    <f-tag-list></f-tag-list>
    <div class="page-content-container">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <keep-alive :max="10">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </el-main>
</template>

<script setup>
import FTagList from './FTagList.vue';
</script>


<style lang="less" scoped>
.main-page-container {
  padding: 0;
  @apply flex-1 flex flex-col;

  .page-content-container {
    width: 100%;
    @apply flex flex-1 p-2 bg-gray-300;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-leave-from {
    opacity: 1;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-active {
    transition-delay: 0.3s;
  }
}
</style>