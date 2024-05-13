<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:26:27
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 14:11:20
 * @FilePath: \shop-admin\src\pages\Distribution\setting.vue
 * @Description: 分销设置
-->
<template>
  <div class="setting-page-container">
    <el-form :model="form" label-width="160px" label-position="left" label-suffix="：">
      <h5 class="bg-gray-100 p-3 rounded mb-5">基础设置</h5>

      <el-form-item label="分销启用">
        <el-radio-group v-model="form.distribution_open">
          <el-radio :value="0" border>禁用</el-radio>
          <el-radio :value="1" border>开启</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="分销海报图">
        <UploadButton :max="9" v-model="form.spread_banners" />
      </el-form-item>

      <h5 class="bg-gray-100 p-3 rounded mb-5">返佣设置</h5>

      <el-form-item label="一级返佣比例">
        <div>
          <el-input v-model="form.store_first_rebate" placeholder="一级返佣比例" style="width: 50%;" type="number">
            <template #append>%</template>
          </el-input>
          <small class="text-gray-500 flex mt-1">订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</small>
        </div>
      </el-form-item>

      <el-form-item label="二级返佣比例">
        <div>
          <el-input v-model="form.store_second_rebate" placeholder="一级返佣比例" style="width: 50%;" type="number">
            <template #append>%</template>
          </el-input>
          <small class="text-gray-500 flex mt-1">订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</small>
        </div>
      </el-form-item>

      <el-form-item label="自购返佣">
        <div>
          <el-radio-group v-model="form.is_self_brokerage">
            <el-radio :value="1" border>是</el-radio>
            <el-radio :value="0" border>否</el-radio>
          </el-radio-group>
          <small class="text-gray-500 flex mt-1">是否开启自购返佣（开启：分销员自己购买商品，享受一级返佣，上级享受二级返佣； 关闭：分销员自己购买商品没有返佣）</small>
        </div>
      </el-form-item>

      <h5 class="bg-gray-100 p-3 rounded mb-5">结算设置</h5>

      <el-form-item label="结算时间">
        <div>
          <el-input v-model="form.settlement_days" placeholder="结算时间" style="width: 80%;" type="number">
            <template #prepend>订单完成后</template>
            <template #append>天</template>
          </el-input>
          <small class="text-gray-500 flex mt-1">预估佣金结算后无法进行回收，请谨慎设置结算天数</small>
        </div>
      </el-form-item>

      <el-form-item label="佣金到账方式">
        <div>
          <el-radio-group v-model="form.brokerage_method">
            <el-radio value="hand" border>手动到账</el-radio>
            <el-radio value="wx" border>自动到微信零钱</el-radio>
          </el-radio-group>
          <small class="text-gray-500 flex mt-1">佣金到账方式支持线下转账和微信零钱自动转账，手动转账更安全，自动转账更方便</small>
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

import UploadButton from '@/components/UploadButton/index.vue'

import { getConfig, SetConfig } from '@/api/distribution';
import { toast } from '@/utils/common';

const form = reactive({
  //分销启用:0禁用1启用
  distribution_open: 1,
  //一级返佣比例：0~100
  store_first_rebate: 10,
  //二级返佣比例：0~100
  store_second_rebate: 20,
  //分销海报图
  spread_banners: ['http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62710076cd93e.png'],
  //自购返佣:0否1是
  is_self_brokerage: 1,
  //结算时间（单位：天）
  settlement_days: 7,
  //佣金到账方式:hand手动,wx微信
  brokerage_method: 'hand'
});

const loading = ref(false);
const initLoadData = async () => {
  loading.value = true;
  const res = await getConfig({})
    .finally(() => loading.value = false);
  for (const k in form) {
    form[k] = res[k];
  }
}

const handleOk = () => {
  loading.value = true
  SetConfig({ ...form })
    .then(() => initLoadData())
    .finally(() => loading.value = false);
  toast("修改成功");
}

// 挂载获取
onMounted(() => initLoadData());
</script>


<style lang="less" scoped>
.setting-page-container {
  @apply flex-1 flex flex-col p-5 rounded bg-white;
  overflow-y: scroll;
}
</style>