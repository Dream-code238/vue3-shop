<template>
  <drawer-model ref="noticeModelRef" :title="title === 'add' ? '新增公告' : '修改公告'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">
      <el-form-item prop="title" label="公告标题">
        <el-input placeholder="请输入公告标题" v-model="formConfig.title" />
      </el-form-item>
      <el-form-item prop="content" label="公告内容">
        <el-input type="textarea" placeholder="请输入公告内容" :rows="5" v-model="formConfig.content" />
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
const noticeModelRef = ref(null);

const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    title: '',
    content: ''
  },
  rules: {
    title: [
      { required: true, message: '请输入公告标题', trigger: 'blur' }
    ],
    content: [
      { required: true, message: '请输入公告内容', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => noticeModelRef.value.open();
// 关闭
const close = () => noticeModelRef.value.close();
// 加载loading
const showLoading = () => noticeModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => noticeModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    levelModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        title: formConfig.title,
        content: formConfig.content
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        title: formConfig.title,
        content: formConfig.content
      });

    }

    levelModelRef.value.close();

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