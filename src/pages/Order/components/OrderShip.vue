<template>
  <drawer-model ref="orderShipRef" title="订单发货" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item prop="express_company" label="快递公司">
        <el-select v-model="formConfig.express_company" placeholder="请选择快递公司">
          <el-option v-for="item in ships" :key="item.code" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="express_no" label="快递单号">
        <el-input placeholder="请输入快递单号" v-model="formConfig.express_no" />
      </el-form-item>

    </el-form>
  </drawer-model>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DrawerModel from '@/components/DrawerModel/index.vue';

import { getCompanyList } from '@/api/order';
import useForm from '@/hooks/useForm';

// 父组件传递参数
const props = defineProps({
  create: {
    type: Function,
    default: () => { }
  }
});

const orderShipRef = ref(null);
const ships = ref([]);

// 表单相关配置
const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    express_company: '',
    express_no: ''
  },
  rules: {
    express_company: [
      { required: true, message: '请输入快递公司', trigger: 'blur' }
    ],
    express_no: [
      { required: true, message: '请输入快递单号', trigger: 'blur' }
    ]
  }
});

const initLoadData = async () => {
  const { list } = await getCompanyList({});
  ships.value = list;
}

// 打开弹框
const open = () => orderShipRef.value.open();
// 关闭
const close = () => orderShipRef.value.close();
// 加载loading
const showLoading = () => orderShipRef.value.showLoading();
// 隐藏loading
const hideLoading = () => orderShipRef.value.hideLoading();
// 表单重置
const handleResetForm = item => resetForm(item);

// 提交
const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    orderShipRef.value.showLoading();

    props?.create?.({
      id: formConfig.id,
      express_company: formConfig.express_company,
      express_no: formConfig.express_no
    });

    orderShipRef.value.close();

  });
}

onMounted(() => initLoadData());

defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
  handleResetForm
});
</script>