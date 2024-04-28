<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 17:54:05
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 15:30:15
 * @FilePath: \shop-admin\src\pages\Layout\components\FAside.vue
 * @Description: 侧边导航
-->
<template>
  <div class="layout-aside-container" :style="{ width: store.state.manager.asideWidth }">
    <div class="layout-logo-container">
      <el-icon>
        <ElemeFilled />
      </el-icon>
      <span v-if="!store.state.manager.isCollapse">电商后台</span>
    </div>
    <el-aside>
      <el-menu :default-active="active" :collapse="store.state.manager.isCollapse" :collapse-transition="false"
        unique-opened @select="handleMenuSelect">
        <!-- 多级菜单 -->
        <template v-for="item in store.state.manager.menus" :key="item.id">
          <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="child in item.child" :key="child.id" :index="child.frontpath">
              <el-icon>
                <component :is="child.icon"></component>
              </el-icon>
              <template #title>{{ child.name }}</template>
            </el-menu-item>
          </el-sub-menu>
          <!-- 一级菜单 -->
          <el-menu-item v-else :index="item.frontpath">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const active = ref(route.path);

onBeforeRouteUpdate(
  (to, from) => {
    active.value = to.path;
  }
);


const handleMenuSelect = item => {
  router.push(item);
}


</script>


<style lang="less" scoped>
.layout-aside-container {
  @apply flex flex-col bg-white;
  position: relative;
  transition: all 0.2s;

  .layout-logo-container {
    @apply flex items-center justify-center bg-indigo-700 text-light-50 font-thin;
    width: 100%;
    height: 64px;
    transition: none;

    .el-icon {
      @apply m-1;
    }
  }

  .el-aside {
    position: absolute;
    top: 64px;
    bottom: 0;
    left: 0;
    width: 100%;

    &::-webkit-scrollbar {
      width: 0px;
    }

    .el-menu {
      border: 0 !important;
    }
  }
}
</style>