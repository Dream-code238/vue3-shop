<template>
  <drawer-model ref="roleModelRef" :title="title === 'add' ? '新增角色' : '修改角色'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item prop="name" label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="formConfig.name" />
      </el-form-item>

      <el-form-item prop="desc" label="角色描述">
        <el-input type="textarea" :rows="5" placeholder="请输入角色描述" v-model="formConfig.desc" />
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

import useForm from '@/hooks/useForm';

// 父组件传递参数
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
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
const roleModelRef = ref(null);

// 表单相关配置
const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    name: '',
    status: 1,
    desc: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => roleModelRef.value.open();
// 关闭
const close = () => roleModelRef.value.close();
// 加载loading
const showLoading = () => roleModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => roleModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    roleModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        name: formConfig.name,
        desc: formConfig.desc,
        status: formConfig.status
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        name: formConfig.name,
        desc: formConfig.desc,
        status: formConfig.status
      });

    }

    roleModelRef.value.close();

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