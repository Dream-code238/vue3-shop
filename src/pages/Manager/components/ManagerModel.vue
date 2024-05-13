<template>
  <drawer-model ref="managerModelRef" :title="title === 'add' ? '新增管理员' : '修改管理员'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">
      <el-form-item prop="username" label="用户名">
        <el-input placeholder="请输入用户名" v-model="formConfig.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input placeholder="请输入密码" v-model="formConfig.password" />
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <upload-button v-model="formConfig.avatar" />
      </el-form-item>
      <el-form-item prop="role_id" label="所属角色">
        <el-select v-model="formConfig.role_id" placeholder="请选择所属角色" style="width: 240px">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-switch :active-value="1" :inactive-value="0" v-model="formConfig.status" />
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
  roleList: [Array],
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
const managerModelRef = ref(null);

// 表单相关配置
const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    username: '',
    password: '',
    role_id: '',
    status: 1,
    avatar: ''
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    role_id: [
      { required: true, message: '请选择所属角色', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => managerModelRef.value.open();
// 关闭
const close = () => managerModelRef.value.close();
// 加载loading
const showLoading = () => managerModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => managerModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    managerModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        username: formConfig.username,
        password: formConfig.password,
        role_id: formConfig.role_id,
        status: formConfig.status,
        avatar: formConfig.avatar
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        username: formConfig.username,
        password: formConfig.password,
        role_id: formConfig.role_id,
        status: formConfig.status,
        avatar: formConfig.avatar
      });

    }

    managerModelRef.value.close();

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