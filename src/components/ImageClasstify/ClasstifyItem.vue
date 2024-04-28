<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 14:10:16
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 11:29:41
 * @FilePath: \shop-admin\src\pages\Other\components\imageClasstifyItem.vue
 * @Description: 图片分类组件项
-->
<template>
  <div class="classtify-list-item" :class="{ 'active': active }">
    <div class="classtify-item-title">
      <slot></slot>
    </div>
    <div class="classtify-item-opear">
      <el-button text type="primary" size="small" class="px-1" @click="handleUpdate">
        <el-icon :size="12">
          <Edit />
        </el-icon>
      </el-button>
      <span @click.stop="() => { }">
        <el-popconfirm title="你确定要删除此图片分类吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete">
          <template #reference>
            <el-button text type="primary" size="small" class="px-1">
              <el-icon :size="12">
                <Close />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </span>
    </div>
  </div>
</template>

<script setup>

defineProps({
  active: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update', 'delete']);
// 更新
const handleUpdate = () => emit('update');
// 删除
const handleDelete = () => emit('delete');

</script>

<style lang="less" scoped>
.classtify-list-item {
  @apply flex justify-between items-center p-3 text-sm text-gray-600;
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;

  &:hover {
    @apply bg-blue-50;
  }
}

.active {
  @apply bg-blue-50;
}
</style>