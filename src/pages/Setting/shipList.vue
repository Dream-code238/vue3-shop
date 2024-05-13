<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:24:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 23:13:17
 * @FilePath: \shop-admin\src\pages\Setting\shipList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="ship-page-container" v-loading="loading">
    <el-form :model="form" label-width="160px" label-position="left" label-suffix="：">
      <el-form-item label="物流查询key">
        <div>
          <el-input v-model="form.ship" placeholder="物流查询key"></el-input>
          <small class="text-gray-500 flex mt-1">用于查询物流信息，接口申请（仅供参考）</small>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="default" @click="handleOk">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

import { getSysConfig, setSysConfig } from '@/api/setting';
import { toast } from '@/utils/common';

const form = reactive({
  ship: ''
})

const loading = ref(false);
const initLoadData = async () => {
  loading.value = true;
  const res = await getSysConfig({})
    .finally(() => loading.value = false);
  for (const k in form) {
    form[k] = res[k];
  }
}

const handleOk = () => {
  loading.value = true
  setSysConfig({ ...form })
    .then(() => initLoadData())
    .finally(() => loading.value = false);
  toast("修改成功");
};

// 挂载获取
onMounted(() => initLoadData());
</script>

<style lang="less" scoped>
.ship-page-container {
  @apply flex-1 flex flex-col p-5 rounded bg-white;
  max-height: 100%;
}
</style>