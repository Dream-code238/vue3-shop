<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-12 21:51:14
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 22:38:12
 * @FilePath: \shop-admin\src\pages\Setting\components\BuyModel.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <drawer-model ref="buyModelRef" title="配置" destroyOnClose @submit="handleOk">
    <el-form :model="form" label-width="120px" label-position="left" label-suffix="：">

      <template v-if="drawerType == 'alipay'">

        <el-form-item label="app_id">
          <el-input v-model="form.app_id" placeholder="app_id" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="ali_public_key">
          <el-input v-model="form.ali_public_key" placeholder="ali_public_key" style="width:90%;" type="textarea"
            rows="4"></el-input>
        </el-form-item>

        <el-form-item label="private_key">
          <el-input v-model="form.private_key" placeholder="private_key" style="width:90%;" type="textarea"
            rows="4"></el-input>
        </el-form-item>

      </template>

      <template v-else>

        <el-form-item label="公众号 APPID">
          <el-input v-model="form.app_id" placeholder="app_id" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="小程序 APPID">
          <el-input v-model="form.miniapp_id" placeholder="miniapp_id" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="小程序 secret">
          <el-input v-model="form.secret" placeholder="secret" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="appid">
          <el-input v-model="form.appid" placeholder="appid" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="商户号">
          <el-input v-model="form.mch_id" placeholder="商户号" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="API 密钥">
          <el-input v-model="form.key" placeholder="API 密钥" style="width:90%;"></el-input>
        </el-form-item>

        <el-form-item label="cert_client">
          <el-upload :action="uploadAction" :headers="{ token }" accept=".pem" :limit="1"
            :on-success="uploadClientSuccess">
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <p class="text-red-500">{{ form.cert_client ? form.cert_client : '还未配置' }}</p>
              <div class="el-upload__tip">例如：apiclient_cert.pem</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="cert_key">
          <el-upload :action="uploadAction" :headers="{ token }" accept=".pem" :limit="1"
            :on-success="uploadKeySuccess">
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <p class="text-red-500">{{ form.cert_key ? form.cert_key : '还未配置' }}</p>
              <div class="el-upload__tip">例如：apiclient_key.pem</div>
            </template>
          </el-upload>
        </el-form-item>

      </template>
    </el-form>
  </drawer-model>
</template>

<script setup>
import { ref, computed } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';

import { uploadAction } from '@/api/setting';
import { getToken } from '@/utils/common';

// 父组件传递参数
const props = defineProps({
  drawerType: {
    type: String,
    default: ''
  },
  formConfig: {
    type: Object,
    default: () => ({})
  },
  uploadClient: {
    type: Function,
    default: () => { }
  },
  uploadKey: {
    type: Function,
    default: () => { }
  },
  create: {
    type: Function,
    default: () => { }
  }
});

const token = getToken();

const form = computed(
  () => {
    if (props.formConfig?.[props.drawerType]) {
      return props.formConfig?.[props.drawerType];
    }
    return {};
  }
);

// 弹框ref
const buyModelRef = ref(null);

// 打开弹框
const open = () => buyModelRef.value.open();
// 关闭
const close = () => buyModelRef.value.close();
// 加载loading
const showLoading = () => buyModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => buyModelRef.value.hideLoading();

const uploadClientSuccess = (response, uploadFile, uploadFiles) => {
  props?.uploadClient?.(response.data);
}

const uploadKeySuccess = (response, uploadFile, uploadFiles) => {
  props?.uploadKey?.(response.data);

}

// 提交
const handleOk = () => props?.create?.();


defineExpose({
  open,
  close,
  showLoading,
  hideLoading
});
</script>