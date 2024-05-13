<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-29 16:51:23
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 15:37:16
 * @FilePath: \shop-admin\src\components\Search\index.vue
 * @Description: 封装搜索组件
-->
<template>
  <el-form :model="model" label-position="right" label-width="90px" label-suffix="：" class="flex flex-wrap">
    <slot></slot>
    <template v-if="isCollapse">
      <slot name="show" />
    </template>
    <search-item class="filter-opear">
      <el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
      <el-button size="small" @click="handleReset">重置</el-button>
      <el-button type="primary" text @click="isCollapse = !isCollapse" v-if="hasShowCollapse">
        {{ isCollapse ? '收起' : "展开" }}
        <el-icon>
          <ArrowUp v-if="isCollapse" />
          <ArrowDown v-else />
        </el-icon>
      </el-button>
    </search-item>
  </el-form>
</template>



<script setup>
import { ref, useSlots } from 'vue';
import SearchItem from './SearchItem.vue';


const isCollapse = ref(false);

const emit = defineEmits(['search', 'reset']);
// 搜索
const handleSearch = () => {
  emit('search');
}
// 重置
const handleReset = () => {
  emit('reset');
}

// 查看是否有使用插槽
const slots = useSlots();
const hasShowCollapse = ref(!!slots.show)




defineProps({
  model: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style lang="less" scoped>
.filter-opear {
  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
</style>