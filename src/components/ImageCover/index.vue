<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 20:51:57
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 22:37:33
 * @FilePath: \shop-admin\src\pages\Other\components\imageCoverItem.vue
 * @Description: 分类图片项
-->
<template>
  <el-card shadow="hover" class="mx-5 my-3">
    <div class="classtify-cover-container">
      <el-image :src="value.url" fit="cover" lazy class="h-[150px]" style="width: 100%;" :preview-src-list="[value.url]"
        :initial-index="0" />
      <div class="image-cover-url">{{ value.name || value.path }}</div>
    </div>
    <div class="classtify-cover-opear flex items-center justify-center py-2">

      <el-checkbox v-if="checked" v-model="value.checked" @change="handleCheckAvatar(value)" />

      <el-button type="primary" size="small" text @click="handleResetName(value)">重命名</el-button>

      <el-popconfirm title="你确定要删除此图片吗？" confirm-button-text="确定" cancel-button-text="取消"
        @confirm="handleDelete(value)">
        <template #reference>
          <el-button type="primary" size="small" text>删除</el-button>
        </template>
      </el-popconfirm>

    </div>
  </el-card>
</template>


<script setup>

defineProps({
  value: {
    type: Object,
    default: {}
  },

  checked: {
    type: Boolean,
    default: false
  }
});


const emit = defineEmits(['update', 'delete', 'check']);
// 重命名
const handleResetName = item => {
  emit('update', item);
}

// 删除功能
const handleDelete = item => {
  emit('delete', item);
}

// 图片选择

const handleCheckAvatar = item => {
  emit('check', item);
}
</script>

<style scoped>
.classtify-cover-container {
  position: relative;

  .image-cover-url {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
  }
}

:deep(.el-card__body) {
  padding: 0;
}
</style>