<template>
  <drawer-model ref="goodModelRef" :title="title === 'add' ? '新增商品' : '修改商品'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item label="商品名称" prop="title">
        <el-input v-model="formConfig.title" placeholder="请输入商品名称，不能超过60个字符"></el-input>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <upload-button v-model="formConfig.cover" />
      </el-form-item>

      <el-form-item label="商品分类" prop="category_id">
        <el-select v-model="formConfig.category_id" placeholder="请选择商品分类" style="width: 240px;">
          <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" v-model="formConfig.desc" placeholder="选填，商品卖点"></el-input>
      </el-form-item>

      <el-form-item label="单位" prop="unit">
        <el-input v-model="formConfig.unit" placeholder="请输入单位" style="width:50%;"></el-input>
      </el-form-item>

      <el-form-item label="总库存" prop="stock">
        <el-input v-model="formConfig.stock" type="number" style="width:40%;">
          <template #append>件</template>
        </el-input>
      </el-form-item>

      <el-form-item label="库存预警" prop="min_stock">
        <el-input v-model="formConfig.min_stock" type="number" style="width:40%;">
          <template #append>件</template>
        </el-input>
      </el-form-item>

      <el-form-item label="最低销售价" prop="min_price">
        <el-input v-model="formConfig.min_price" type="number" style="width:40%;">
          <template #append>元</template>
        </el-input>
      </el-form-item>

      <el-form-item label="最低原价" prop="min_oprice">
        <el-input v-model="formConfig.min_oprice" type="number" style="width:40%;">
          <template #append>元</template>
        </el-input>
      </el-form-item>

      <el-form-item label="库存显示" prop="stock_display">
        <el-radio-group v-model="formConfig.stock_display">
          <el-radio :value="0" border>隐藏</el-radio>
          <el-radio :value="1" border>显示</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否上架" prop="status">
        <el-radio-group v-model="formConfig.status">
          <el-radio :value="0" border>放入仓库</el-radio>
          <el-radio :value="1" border>立即上架</el-radio>
        </el-radio-group>
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
  category: [Array],
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
const goodModelRef = ref(null);

const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    // 商品名称
    title: '',
    // 商品分类
    category_id: 0,
    // 商品封面
    cover: '',
    // 商品描述
    desc: '',
    // 商品单位
    unit: '件',
    // 总库存
    stock: 100,
    // 库存预警
    min_stock: 10,
    // 是否上架 0仓库 1上架
    status: 1,
    // 库存显示 0隐藏 1禁用
    stock_display: 1,
    // 最低销售价
    min_price: 0,
    // 最低原价
    min_oprice: 0
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
const open = () => goodModelRef.value.open();
// 关闭
const close = () => goodModelRef.value.close();
// 加载loading
const showLoading = () => goodModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => goodModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    goodModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        title: formConfig.title,
        category_id: formConfig.category_id,
        cover: formConfig.cover,
        desc: formConfig.desc,
        unit: formConfig.unit,
        stock: formConfig.stock,
        min_stock: formConfig.min_stock,
        status: formConfig.status,
        stock_display: formConfig.stock_display,
        min_price: formConfig.min_price,
        min_oprice: formConfig.min_oprice
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        title: formConfig.title,
        category_id: formConfig.category_id,
        cover: formConfig.cover,
        desc: formConfig.desc,
        unit: formConfig.unit,
        stock: formConfig.stock,
        min_stock: formConfig.min_stock,
        status: formConfig.status,
        stock_display: formConfig.stock_display,
        min_price: formConfig.min_price,
        min_oprice: formConfig.min_oprice
      });

    }

    goodModelRef.value.close();

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