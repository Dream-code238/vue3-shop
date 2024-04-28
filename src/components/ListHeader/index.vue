<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-27 12:33:02
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-28 12:10:40
 * @FilePath: \shop-admin\src\components\ListHeader\index.vue
 * @Description: 列表头部组件
-->
<template>
  <div class="flex items-center justify-between">
    <div class="opear">

      <el-button type="primary" size="small" @click="handleAdd">新增</el-button>


      <template v-if="checked">
        <el-popconfirm title="你确定要删除所选择的规格吗？" confirm-button-text="确定" cancel-button-text="取消"
          @confirm="handleDeleteAll">
          <template #reference>
            <el-button type="danger" size="small" :disabled="checkKeys.length === 0">批量删除</el-button>
          </template>
        </el-popconfirm>
      </template>

    </div>
    <el-tooltip content="刷新数据" placement="bottom">
      <el-button size="small" @click="handleRefresh">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>


<script setup>

defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  checkKeys: {
    type: Array,
    default: []
  }
});

const emit = defineEmits(['add', 'check', 'refresh']);
const handleAdd = () => {
  emit('add');
}

const handleDeleteAll = () => {
  emit('check');
}

const handleRefresh = () => {
  emit('refresh');
}
</script>