<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-29 22:17:45
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:02:34
 * @FilePath: \shop-admin\src\pages\Shop\components\Banner.vue
 * @Description: 商品详情
-->
<template>
  <drawer-model ref="formDrawerRef" title="设置商品详情" destroyOnClose @submit="handleOk">
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <Editor v-model="form.content" />
      </el-form-item>
    </el-form>
  </drawer-model>
</template>
<script setup>
import { ref, reactive } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';
import Editor from '@/components/Editor/index.vue';

import {
  readGood,
  updateGood
} from '@/api/shop';
import { toast } from '@/utils/common';

// 抽屉弹框
const formDrawerRef = ref(null);

const goodsId = ref(0);
const form = reactive({
  content: ''
})

const open = async item => {
  const { id } = item;
  goodsId.value = id;
  item.contentLoading = true;
  const { content } = await readGood({ id: item.id }).finally(() => item.contentLoading = false);
  form.content = content;
  formDrawerRef.value.open();
}

const emit = defineEmits(["refresh"]);
const handleOk = async () => {
  formDrawerRef.value.showLoading();
  await updateGood({ id: goodsId.value, content: form.content }).finally(() => formDrawerRef.value.hideLoading());
  formDrawerRef.value.close();
  emit("refresh");
  toast("更新成功");
}

defineExpose({
  open
});
</script>
