<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:23:44
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 22:52:10
 * @FilePath: \shop-admin\src\pages\Setting\baseList.vue
 * @Description: 基础设置
-->
<template>
  <div class="base-page-container" v-loading="loading">
    <el-form :model="form" label-width="160px" label-position="left" label-suffix="：">
      <!-- 标签页 -->
      <el-tabs v-model="activeTab" class="base-tabs-container px-2">
        <el-tab-pane v-for="item in baseTab" :label="item.label" :name="item.value"></el-tab-pane>
      </el-tabs>

      <template v-if="activeTab === 'first'">

        <el-form-item label="是否允许注册会员">
          <el-radio-group v-model="form.open_reg">
            <el-radio :value="0" border>关闭</el-radio>
            <el-radio :value="1" border>开启</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="注册类型">
          <el-radio-group v-model="form.reg_method">
            <el-radio value="username" border>普通注册</el-radio>
            <el-radio value="phone" border>手机注册</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="密码最小长度">
          <el-input v-model="form.password_min" placeholder="密码最小长度" style="width: 30%;" type="number"></el-input>
        </el-form-item>

        <el-form-item label="强制密码复杂度">
          <el-checkbox-group v-model="form.password_encrypt">
            <el-checkbox value="0" border>数字</el-checkbox>
            <el-checkbox value="1" border>小写字母</el-checkbox>
            <el-checkbox value="2" border>大写字母</el-checkbox>
            <el-checkbox value="3" border>符号</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </template>

      <template v-else-if="activeTab === 'second'">

        <el-form-item label="默认上传方式">
          <el-radio-group v-model="form.upload_method">
            <el-radio value="oss" border>对象存储</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Bucket">
          <el-input v-model="form.upload_config.Bucket" placeholder="Bucket" style="width: 30%;"></el-input>
        </el-form-item>

        <el-form-item label="ACCESS_KEY">
          <el-input v-model="form.upload_config.ACCESS_KEY" placeholder="ACCESS_KEY" style="width: 30%;"></el-input>
        </el-form-item>

        <el-form-item label="SECRET_KEY">
          <el-input v-model="form.upload_config.SECRET_KEY" placeholder="SECRET_KEY" style="width: 30%;"></el-input>
        </el-form-item>

        <el-form-item label="空间域名">
          <el-input v-model="form.upload_config.http" placeholder="空间域名" style="width: 30%;"></el-input>
          <small class="text-gray-500 flex ml-3">请补全 http:// 或 https://</small>
        </el-form-item>

      </template>

      <template v-else>

        <el-form-item label="是否开启API安全">
          <el-radio-group v-model="form.api_safe">
            <el-radio :value="0" border>关闭</el-radio>
            <el-radio :value="1" border>开启</el-radio>
          </el-radio-group>
          <small class="text-gray-500 flex ml-3">api安全功能开启之后调用前端api需要传输签名串</small>
        </el-form-item>

        <el-form-item label="秘钥">
          <el-input v-model="form.api_secret" placeholder="秘钥" style="width: 30%;"></el-input>
          <small class="text-gray-500 flex ml-3">
            秘钥设置关系系统中api调用传输签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token
          </small>
        </el-form-item>

      </template>

      <el-form-item>
        <el-button type="primary" size="default" @click="handleOk">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue';

import { getSysConfig, setSysConfig } from '@/api/setting';
import { baseTab } from '@/contants/index';
import { toast } from '@/utils/common';

const activeTab = ref('first');
const form = reactive({
  //开启注册，0关闭1开启
  open_reg: 1,
  //注册方式，username普通phone手机
  reg_method: 'username',
  //密码最小长度
  password_min: 7,
  //密码复杂度，0数字、1小写字母、2大写字母、3符号；例如0,1,2
  password_encrypt: [],
  //上传方式，oss对象存储
  upload_method: 'oss',
  //上传配置 { Bucket:"", ACCESS_KEY:"", SECRET_KEY:"", http:""}
  upload_config: {
    Bucket: '',
    ACCESS_KEY: '',
    SECRET_KEY: '',
    http: ''
  },
  //api安全，0关闭1开启
  api_safe: 1,
  //秘钥
  api_secret: ''
})

const loading = ref(false);
const initLoadData = async () => {
  loading.value = true;
  const res = await getSysConfig({})
    .finally(() => loading.value = false);
  for (const k in form) {
    form[k] = res[k];
  }
  form.password_encrypt = form.password_encrypt.split(",");
}

const handleOk = () => {
  loading.value = true
  setSysConfig({ ...form, password_encrypt: form.password_encrypt.join(",") })
    .then(() => initLoadData())
    .finally(() => loading.value = false);
  toast("修改成功");
}


// 挂载获取
onMounted(() => initLoadData());
</script>

<style lang="less" scoped>
.base-page-container {
  @apply flex-1 flex flex-col p-5 rounded bg-white;
  max-height: 100%;
}
</style>