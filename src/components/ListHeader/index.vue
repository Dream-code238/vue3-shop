<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-27 12:33:02
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 15:52:28
 * @FilePath: \shop-admin\src\components\ListHeader\index.vue
 * @Description: 列表头部组件
-->
<template>
  <div class="flex items-center justify-between">
    <div class="opear">

      <el-button v-if="btns.includes('add')" type="primary" size="small" @click="handleAdd">新增</el-button>

      <template v-if="btns.includes('delete') || checked">
        <el-popconfirm title="你确定要删除所选择的规格吗？" confirm-button-text="确定" cancel-button-text="取消"
          @confirm="handleDeleteAll">
          <template #reference>
            <el-button type="danger" size="small" :disabled="checkKeys.length === 0">批量删除</el-button>
          </template>
        </el-popconfirm>
      </template>

      <slot></slot>

    </div>
    <div class="reload">
      <template v-if="btns.includes('refresh')">
        <el-tooltip content="刷新数据" placement="bottom">
          <el-button size="small" @click="handleRefresh">
            <el-icon>
              <Refresh />
            </el-icon>
          </el-button>
        </el-tooltip>
      </template>

      <template v-if="btns.includes('download')">
        <el-tooltip effect="dark" content="导出数据" placement="top">
          <el-button size="small" text @click="handleDownload">
            <el-icon :size="15">
              <Download />
            </el-icon>
          </el-button>
        </el-tooltip>
      </template>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
  layout: {
    type: String,
    default: "add,refresh"
  },
  checked: {
    type: Boolean,
    default: false
  },
  checkKeys: {
    type: Array,
    default: []
  }
});

const btns = computed(() => props.layout.split(","));

const emit = defineEmits(['add', 'check', 'refresh', 'download']);
const handleAdd = () => {
  emit('add');
}

const handleDeleteAll = () => {
  emit('check');
}

const handleRefresh = () => {
  emit('refresh');
}

const handleDownload = () => {
  emit('download');
}
</script>