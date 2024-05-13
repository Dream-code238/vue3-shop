<template>
  <drawer-model ref="levelModelRef" :title="title === 'add' ? '新增会员等级' : '修改会员等级'" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
      label-suffix="：">

      <el-form-item label="等级名称" prop="name">
        <el-input v-model="formConfig.name" placeholder="等级名称"></el-input>
      </el-form-item>

      <el-form-item label="等级权重" prop="level">
        <el-input type="number" v-model="formConfig.level" placeholder="等级权重"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="formConfig.status" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>

      <el-form-item label="升级条件">
        <div>
          <small class="text-xs mr-2">累计消费满</small>
          <el-input type="number" v-model="formConfig.max_price" placeholder="累计消费" style="width:50%;">
            <template #append>元</template>
          </el-input>
          <small class="text-gray-400 flex">
            设置会员等级所需要的累计消费必须大于等于0,单位：元
          </small>
        </div>
        <div>
          <small class="text-xs mr-2">累计次数满</small>
          <el-input type="number" v-model="formConfig.max_times" placeholder="累计次数" style="width:50%;">
            <template #append>%</template>
          </el-input>
          <small class="text-gray-400 flex">
            设置会员等级所需要的购买量必须大于等于0,单位：笔
          </small>
        </div>
      </el-form-item>

      <el-form-item label="折扣率(%)" prop="discount">
        <el-input type="number" v-model="formConfig.discount" placeholder="折扣率(%)" style="width:50%;">
          <template #append>%</template>
        </el-input>
        <small class="text-gray-400 flex">
          折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
        </small>
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
const levelModelRef = ref(null);

// 表单相关配置
const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    // 等级名称
    name: '',
    // 等级权重
    level: 100,
    // 状态：0禁用1启用
    status: 1,
    // 折扣率(%)
    discount: 10,
    // 累计消费金额
    max_price: 1000,
    // 累计消费次数
    max_times: 500

  },
  rules: {
    name: [
      { required: true, message: '请输入等级名称', trigger: 'blur' }
    ]
  }
});

// 打开弹框
const open = () => levelModelRef.value.open();
// 关闭
const close = () => levelModelRef.value.close();
// 加载loading
const showLoading = () => levelModelRef.value.showLoading();
// 隐藏loading
const hideLoading = () => levelModelRef.value.hideLoading();
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
        name: formConfig.name,
        level: formConfig.level,
        status: formConfig.status,
        discount: formConfig.discount,
        max_price: formConfig.max_price,
        max_times: formConfig.max_times
      });

    }
    // 更新
    else {

      props?.update?.({
        id: formConfig.id,
        name: formConfig.name,
        level: formConfig.level,
        status: formConfig.status,
        discount: formConfig.discount,
        max_price: formConfig.max_price,
        max_times: formConfig.max_times
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



<style lang="less" scoped></style>