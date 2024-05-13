<template>
  <drawer-model ref="skusModelRef" :title="title === 'add' ? '新增规格' : '修改规格'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item prop="name" label="规格名称">
        <el-input placeholder="请输入规格名称" v-model="formConfig.name" />
      </el-form-item>

      <el-form-item prop="order" label="排序">
        <el-input-number :min="1" :max="10000" v-model="formConfig.order" />
      </el-form-item>

      <el-form-item prop="status" label="状态">
        <el-switch :active-value="1" :inactive-value="0" v-model="formConfig.status" />
      </el-form-item>

      <el-form-item prop="default" label="规格值">
        <TagInput v-model="formConfig.default" />
      </el-form-item>

    </el-form>
  </drawer-model>
</template>

<script setup>
import { ref } from 'vue';
import DrawerModel from '@/components/DrawerModel/index.vue';
import TagInput from '@/components/TagInput/index.vue';

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
const skusModelRef = ref(null);

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
    order: 50,
    default: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入规格名称', trigger: 'blur' }
    ],
    default: [
      { required: true, message: '请输入规格值', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => skusModelRef.value.open();
// 关闭
const close = () => skusModelRef.value.close();
// 加载loading
const showLoading = () => skusModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => skusModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    skusModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        name: formConfig.name,
        status: formConfig.status,
        order: formConfig.order,
        default: formConfig.default
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        name: formConfig.name,
        status: formConfig.status,
        order: formConfig.order,
        default: formConfig.default
      });

    }

    skusModelRef.value.close();

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