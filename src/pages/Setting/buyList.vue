<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:24:46
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 22:54:41
 * @FilePath: \shop-admin\src\pages\Setting\buyList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="buy-page-container" v-loading="loading">
    <el-form :model="form" label-width="160px" label-position="left" label-suffix="：">
      <!-- 标签页 -->
      <el-tabs v-model="activeTab" class="buy-tabs-container px-2">
        <el-tab-pane v-for="item in buyTab" :label="item.label" :name="item.value"></el-tab-pane>
      </el-tabs>

      <template v-if="activeTab === 'first'">
        <el-table :data="buyData" border stripe style="width: 100%">
          <el-table-column label="支付方式" align="left">
            <template #default="{ row }">
              <div class="flex items-center">
                <el-image :src="row.src" fit="fill" :lazy="true" style="width:40px;height: 40px;"
                  class="rounded mr-2"></el-image>
                <div>
                  <h6>{{ row.name }}</h6>
                  <small class="flex text-gray-500 mt-1">{{ row.desc }}</small>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template #default="{ row }">
              <el-button type="primary" size="small" text @click="handleBuyConfig(row)">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template v-else>

        <el-form-item label="未支付订单">
          <div>
            <el-input v-model="form.close_order_minute" placeholder="未支付订单" type="number">
              <template #append>
                分钟后自动关闭
              </template>
            </el-input>
            <small class="text-gray-500 flex mt-1">订单下单未付款，n分钟后自动关闭，设置0不自动关闭</small>
          </div>
        </el-form-item>

        <el-form-item label="已发货订单">
          <div>
            <el-input v-model="form.auto_received_day" placeholder="已发货订单" type="number">
              <template #append>
                天后自动确认收货
              </template>
            </el-input>
            <small class="text-gray-500 flex mt-1">如果在期间未确认收货，系统自动完成收货，设置0不自动收货</small>
          </div>
        </el-form-item>

        <el-form-item label="已完成订单">
          <div>
            <el-input v-model="form.after_sale_day" placeholder="已完成订单" type="number">
              <template #append>
                天内允许申请售后
              </template>
            </el-input>
            <small class="text-gray-500 flex mt-1">订单完成后 ，用户在n天内可以发起售后申请，设置0不允许申请售后</small>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="default" @click="handleOk">保存</el-button>
        </el-form-item>
      </template>
    </el-form>

    <BuyModel ref="formDrawerRef" :drawerType="drawerType" :formConfig="form" :uploadClient="handleUploadClient"
      :uploadKey="handleUploadKey" :create="handleOk" />
  </div>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue';

import BuyModel from './components/BuyModel.vue';

import { getSysConfig, setSysConfig } from '@/api/setting';
import { buyTab, buyData } from '@/contants/index';
import { toast } from '@/utils/common';

const formDrawerRef = ref(null);
const activeTab = ref('first');
const form = reactive({
  close_order_minute: 30,
  auto_received_day: 7,
  after_sale_day: 23,
  alipay: {
    app_id: '****已配置****',
    ali_public_key: '****已配置****',
    private_key: '****已配置****'
  },
  wxpay: {
    app_id: '****已配置****',
    miniapp_id: '****已配置****',
    secret: '****已配置****',
    appid: '****已配置****',
    mch_id: '****已配置****',
    key: '****已配置****',
    cert_client: '****已配置****.pem',
    cert_key: '****已配置****.pem'
  }
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

const drawerType = ref('alipay');
const handleBuyConfig = item => {
  drawerType.value = item.key;
  formDrawerRef.value.open();
}

const handleUploadClient = data => {
  form.wxpay.cert_client = data;
}

const handleUploadKey = data => {
  form.wxpay.cert_key = data;
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
.buy-page-container {
  @apply flex-1 flex flex-col p-5 rounded bg-white;
  max-height: 100%;
}
</style>