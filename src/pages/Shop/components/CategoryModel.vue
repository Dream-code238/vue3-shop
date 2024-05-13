<template>
  <drawer-model ref="categoryModelRef" :title="title === 'add' ? '新增商品分类' : '修改商品分类'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item prop="name" label="分类名称">
        <el-input placeholder="请输入分类名称" v-model="formConfig.name" />
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
const categoryModelRef = ref(null);

const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    // 分类名称
    name: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入分类名称', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => categoryModelRef.value.open();
// 关闭
const close = () => categoryModelRef.value.close();
// 加载loading
const showLoading = () => categoryModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => categoryModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    categoryModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        name: formConfig.name
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        name: formConfig.name
      });

    }

    categoryModelRef.value.close();

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