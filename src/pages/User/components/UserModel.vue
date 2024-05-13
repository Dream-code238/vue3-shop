<template>
  <drawer-model ref="userModelRef" :title="title === 'add' ? '新增用户' : '修改用户'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="formConfig.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="formConfig.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formConfig.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <upload-button v-model="formConfig.avatar" />
      </el-form-item>

      <el-form-item label="会员等级" prop="user_level_id">
        <el-select v-model="formConfig.user_level_id" placeholder="选择会员等级">
          <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="formConfig.phone" placeholder="手机"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formConfig.email" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="content">
        <el-switch v-model="formConfig.status" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>

    </el-form>
  </drawer-model>
</template>



<script setup>
import { ref } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';
import UploadButton from '@/components/UploadButton/index.vue';

import useForm from '@/hooks/useForm';

// 父组件传递参数
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  levels: [Array],
  create: {
    type: Function,
    default: () => { }
  },
  update: {
    type: Function,
    default: () => { }
  }
});

// 弹框ref
const userModelRef = ref(null);

// 表单相关配置
const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    // 用户名
    username: '',
    // 密码
    password: '',
    // 状态：0禁用1启用
    status: 1,
    // 昵称
    nickname: '',
    // 手机
    phone: '',
    // 邮箱
    email: '',
    // 头像
    avatar: '',
    // 会员等级
    user_level_id: ''
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择用户状态', trigger: 'blur' }
    ],
    user_level_id: [
      { required: true, message: '请选择会员等级', trigger: 'blur' }
    ],
  }
});

// 打开弹框
const open = () => userModelRef.value.open();
// 关闭
const close = () => userModelRef.value.close();
// 加载loading
const showLoading = () => userModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => userModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    userModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        username: formConfig.username,
        password: formConfig.password,
        status: formConfig.status,
        nickname: formConfig.nickname,
        phone: formConfig.phone,
        email: formConfig.email,
        avatar: formConfig.avatar?.[0],
        user_level_id: formConfig.user_level_id
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        username: formConfig.username,
        password: formConfig.password,
        status: formConfig.status,
        nickname: formConfig.nickname,
        phone: formConfig.phone,
        email: formConfig.email,
        avatar: Array.isArray(formConfig.avatar) ? formConfig.avatar?.[0] : formConfig.avatar,
        user_level_id: formConfig.user_level_id
      });

    }

    userModelRef.value.close();

  });
};

defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
  handleResetForm
});
</script>



<style lang="less" scoped></style>