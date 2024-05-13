<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-29 22:17:45
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:01:48
 * @FilePath: \shop-admin\src\pages\Shop\components\Banner.vue
 * @Description: 轮播图组件
-->
<template>
  <drawer-model ref="formDrawerRef" title="设置轮播图" destroyOnClose @submit="handleOk">
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <upload-button v-model="form.banners" :max="7" />
      </el-form-item>
    </el-form>
  </drawer-model>
</template>
<script setup>
import { ref, reactive } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';
import UploadButton from '@/components/UploadButton/index.vue';

import {
  readGood,
  setGoodBanner
} from '@/api/shop';
import { toast } from '@/utils/common';

// 抽屉弹框
const formDrawerRef = ref(false);

const goodsId = ref(0);
const form = reactive({
  banners: []
})

const open = async item => {
  const { id } = item;
  goodsId.value = id;
  item.bannerLoading = true;
  const { goodsBanner } = await readGood({ id: item.id }).finally(() => item.bannerLoading = false);
  form.banners = goodsBanner.map(item => item.url);
  formDrawerRef.value.open();
}

const emit = defineEmits(["refresh"]);
const handleOk = async () => {
  formDrawerRef.value.showLoading();
  await setGoodBanner({ id: goodsId.value, banners: form.banners }).finally(() => formDrawerRef.value.hideLoading());
  formDrawerRef.value.close();
  emit("refresh");
  toast("设置轮播图成功");
}

defineExpose({
  open
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
