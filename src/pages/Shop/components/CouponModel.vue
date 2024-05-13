<template>
  <drawer-model ref="couponModelRef" :title="title === 'add' ? '新增优惠券' : '修改优惠券'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item prop="name" label="优惠券名称">
        <el-input placeholder="请输入优惠券名称" v-model="formConfig.name" />
      </el-form-item>

      <el-form-item prop="type" label="类型">
        <el-radio-group v-model="formConfig.type">
          <el-radio :value="0" border>满减</el-radio>
          <el-radio :value="1" border>折扣</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="value" label="面值">
        <el-input placeholder="请输入面值" v-model="formConfig.value">
          <template #append>{{ formConfig.type ? '折' : '元' }}</template>
        </el-input>
      </el-form-item>

      <el-form-item prop="total" label="发行量">
        <el-input-number :min="0" :max="10000" v-model="formConfig.total" />
      </el-form-item>

      <el-form-item prop="min_price" label="最低使用价格">
        <el-input type="number" placeholder="请输入最低使用价格" v-model="formConfig.min_price" />
      </el-form-item>

      <el-form-item prop="order" label="排序">
        <el-input-number :min="0" :max="10000" v-model="formConfig.order" />
      </el-form-item>

      <el-form-item label="活动时间">
        <el-date-picker :editable="false" v-model="activeTime" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange"
          range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
      </el-form-item>

      <el-form-item prop="desc" label="描述">
        <el-input type="textarea" :rows="5" placeholder="请输入描述" v-model="formConfig.desc" />
      </el-form-item>

    </el-form>
  </drawer-model>
</template>

<script setup>
import { ref, computed } from 'vue';
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
const couponModelRef = ref(null);

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
    type: 0,
    value: 20,
    total: 100,
    min_price: 100,
    start_time: 0,
    end_time: 0,
    order: 50,
    desc: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入优惠名称', trigger: 'blur' }
    ]
  }
});

const activeTime = computed({
  get () {
    return formConfig.start_time && formConfig.end_time ? [formConfig.start_time, formConfig.end_time] : [];
  },
  set (value) {
    const [start, end] = value;
    formConfig.start_time = start;
    formConfig.end_time = end;
  }
});

// 打开弹框
const open = () => couponModelRef.value.open();
// 关闭
const close = () => couponModelRef.value.close();
// 加载loading
const showLoading = () => couponModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => couponModelRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    couponModelRef.value.showLoading();

    // 添加
    if (props.title === 'add') {

      props?.create?.({
        name: formConfig.name,
        type: formConfig.type,
        value: formConfig.value,
        total: formConfig.total,
        min_price: formConfig.min_price,
        start_time: new Date(formConfig.start_time).getTime(),
        end_time: new Date(formConfig.end_time).getTime(),
        order: formConfig.order,
        desc: formConfig.desc
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

    couponModelRef.value.close();

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