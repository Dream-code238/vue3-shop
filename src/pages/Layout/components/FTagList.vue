<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 17:54:58
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 15:28:12
 * @FilePath: \shop-admin\src\pages\Layout\components\FHeader.vue
 * @Description: 路由导航
-->
<template>
  <div class="tag-list-container">
    <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-change="handleTabChange">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
        :closable="item.path !== '/'">

      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';

const route = useRoute();
const router = useRouter();
const cookie = useCookies();

// 当前标签
const activeTab = ref(route.path);

// 标签列表
const tabList = ref([
  {
    title: '后台首页',
    path: '/'
  }
]);

// 初始化标签
const initTabList = () => {
  const tabs = cookie.get('tabList');

  if (tabs) {
    tabList.value = tabs;
  }

}

onMounted(() => initTabList());

// 添加标签
const addTab = tab => {
  const noTab = tabList.value.findIndex(item => item.path === tab.path);

  if (noTab < 0) {

    tabList.value.push({
      title: tab.meta.title,
      path: tab.path
    });

    cookie.set('tabList', tabList.value);

  }
}

// 移除标签
const removeTab = tab => {

  // 查找标签索引
  const index = tabList.value.findIndex(item => item.path === tab);
  // 切换后选中的标签
  const nextTab = tabList.value[index + 1] || tabList.value[index - 1];

  if (nextTab) {
    activeTab.value = nextTab.path;
  }

  // 删除标签
  tabList.value = tabList.value.filter(item => item.path !== tab);

  cookie.set('tabList', tabList.value);

  router.push(activeTab.value);

}

// 标签选中
const handleTabChange = tab => {
  activeTab.value = tab;
  router.push(tab);
}

// 路由切换
onBeforeRouteUpdate((to, from) => {

  activeTab.value = to.path;

  addTab(to);

});

const handleCommand = type => {
  // 如果关闭的是其他
  if (type === 'clearOther') {
    tabList.value = tabList.value.filter(item => item.path === activeTab.value || item.path === '/');
  }
  else {
    tabList.value = tabList.value.filter(item => item.path === '/');
    activeTab.value = '/';
  }

  cookie.set('tabList', tabList.value);

  router.push(activeTab.value);

}

</script>


<style lang="less" scoped>
.tag-list-container {
  @apply flex items-center justify-between bg-gray-100;
  height: 44px;

  .el-tabs {

    @apply flex-1;

    min-width: 100px;

    :deep(.el-tabs__header) {

      @apply mb-0;
      height: 32px;
      border: 0 !important;

    }

    :deep(.el-tabs__nav) {

      border: 0 !important;

    }

    :deep(.el-tabs__item) {
      @apply bg-white mx-1 rounded;
      border: 0 !important;
      height: 32px;
      line-height: 32px;
    }

    :deep(.el-tabs__nav_next),
    :deep(.el-tabs__nav-prev) {

      height: 32px;
      line-height: 32px;

    }

    :deep(.is-disabled) {

      cursor: not-allowed;
      @apply text-gray-300;

    }

    :deep(.el-tabs__nav-wrap) {
      @apply flex items-center;
    }

  }

  .el-dropdown {
    width: 44px;
    height: 44px;
    line-height: 44px;

    .el-dropdown-link {
      outline: none;
    }
  }
}
</style>, onBeforeRouteUpdate