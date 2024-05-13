<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-11 14:23:59
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:50:32
 * @FilePath: \shop-admin\src\pages\Manager\components\AccessModel.vue
 * @Description: 权限新增更新组件
-->
<template>
  <drawer-model ref="accessModelRef" :title="title === 'add' ? '新增菜单权限' : '修改菜单权限'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item prop="rule_id" label="上级菜单">
        <el-cascader v-model="formConfig.rule_id" placeholder="请选择上级菜单" :options="ruleOptions"
          :props="{ label: 'name', value: 'id', children: 'child', checkStrictly: true, emitPath: false }" clearable />
      </el-form-item>

      <el-form-item prop="menu" label="菜单/规则">
        <el-radio-group v-model="formConfig.menu">
          <el-radio :value="1" border>菜单</el-radio>
          <el-radio :value="0" border>权限</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="name" label="名称">
        <el-input placeholder="请输入名称" v-model="formConfig.name" />
      </el-form-item>

      <el-form-item prop="condition" label="后端规则" v-if="!formConfig.menu">
        <el-input placeholder="请输入后端规则" v-model="formConfig.condition" />
      </el-form-item>

      <el-form-item prop="icon" label="菜单图标" v-if="formConfig.menu">
        <icon-select v-model="formConfig.icon" />
      </el-form-item>

      <el-form-item prop="method" label="请求方式" v-if="!formConfig.menu">
        <el-select v-model="formConfig.method" placeholder="请选择请求方式">
          <el-option v-for="item in methods" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item prop="frontpath" label="前端路由" v-if="formConfig.menu && formConfig.rule_id">
        <el-input placeholder="请输入前端路由" v-model="formConfig.frontpath" />
      </el-form-item>

      <el-form-item prop="order" label="排序">
        <el-input-number :min="1" :max="1000" v-model="formConfig.order" />
      </el-form-item>

    </el-form>
  </drawer-model>
</template>

<script setup>
import { ref } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';
import IconSelect from './IconSelect.vue';

import { methods } from '@/contants';
import useForm from '@/hooks/useForm';

// 父组件传递参数
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  ruleOptions: [Array],
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
const accessModelRef = ref(null);

const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    rule_id: 0,
    menu: 0,
    name: '',
    condition: '',
    method: '',
    status: 1,
    order: 20,
    icon: '',
    frontpath: ''
  },
  rules: {
    rule_id: [
      { required: true, message: '请选择上级菜单', trigger: 'blur' }
    ],
    menu: [
      { required: true, message: '请选择菜单/规则', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    condition: [
      { required: true, message: '请输入后端规则', trigger: 'blur' }
    ],
    icon: [
      { required: true, message: '请选择菜单图标', trigger: 'blur' }
    ],
    method: [
      { required: true, message: '请选择请求方式', trigger: 'blur' }
    ],
    frontpath: [
      { required: true, message: '请输入前端路由', trigger: 'blur' }
    ],
    order: [
      { required: true, message: '请输入排序', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => accessModelRef.value.open();
// 关闭
const close = () => accessModelRef.value.close();
// 加载loading
const showLoading = () => accessModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => accessModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    accessModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        rule_id: formConfig.rule_id,
        menu: formConfig.menu,
        name: formConfig.name,
        condition: formConfig.condition,
        method: formConfig.method,
        status: formConfig.status,
        order: formConfig.order,
        icon: formConfig.icon,
        frontpath: formConfig.frontpath
      });

    }
    // 更新
    else {

      props?.update?.({
        rule_id: formConfig.rule_id,
        menu: formConfig.menu,
        name: formConfig.name,
        condition: formConfig.condition,
        method: formConfig.method,
        status: formConfig.status,
        order: formConfig.order,
        icon: formConfig.icon,
        frontpath: formConfig.frontpath
      });

    }

    accessModelRef.value.close();

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