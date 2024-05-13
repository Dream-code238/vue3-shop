<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 21:25:53
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 18:34:10
 * @FilePath: \shop-admin\src\components\DrawerModel.vue
 * @Description: 抽屉弹框
-->
<template>
  <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose">
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions" v-if="footer">
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';

// 抽屉弹框
const showDrawer = ref(false);
// 加载
const loading = ref(false);

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提交'
  },
  footer: {
    type: Boolean,
    default: true
  }
});

// 加载loading
const showLoading = () => loading.value = true;

// 隐藏loading
const hideLoading = () => loading.value = false;

// 打开
const open = () => showDrawer.value = true;

// 关闭
const close = () => showDrawer.value = false;

// 提交
const emit = defineEmits(['submit']);
const submit = () => emit('submit');

// 向父组件暴露子组件地方法
defineExpose({
  showLoading,
  hideLoading,
  open,
  close
});
</script>

<style lang="less" scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;

  .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }

  .actions {
    height: 50px;

    @apply mt-auto flex items-center;
  }
}
</style>