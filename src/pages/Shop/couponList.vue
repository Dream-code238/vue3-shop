<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 16:19:17
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-28 14:25:18
 * @FilePath: \shop-admin\src\pages\Shop\categoryList.vue
 * @Description: 规格管理
-->
<template>
  <div class="coupon-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 新增刷新 -->
      <ListHeader @add="handleAddCoupon" @refresh="onRefresh" />

      <!-- 规格列表 -->
      <el-table :data="coupon" stripe style="width: 100%" height="500" class="flex-1 py-5"
        v-loading="pageConfig.loading">
        <el-table-column label="优惠券名称" width="350">
          <template #default="{ row }">
            <div class="border border-dashed py-2 px-4 rounded"
              :class="row.statusText === '领取中' ? 'active' : 'inactive'">
              <h5 class="font-bold text-md">{{ row.name }}</h5>
              <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="statusText" label="状态" />
        <el-table-column prop="name" label="优惠">
          <template #default="{ row }">
            {{ row.type ? '折扣' : '满减' }} {{ row.type ? `${row.value}折` : `￥${row.value}` }}
          </template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量" />
        <el-table-column prop="used" label="已使用" />
        <el-table-column label="操作" align="center">
          <template #default="scope">

            <el-button type="primary" size="small" text @click="handleCouponUpdate(scope.row)">修改</el-button>

            <el-popconfirm title="你确定要删除此优惠券吗？" confirm-button-text="确定" cancel-button-text="取消"
              @confirm="handleCouponDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <div class="coupon-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <drawer-model ref="formDrawerRef" :title="drawerType === 'add' ? '新增优惠券' : '修改优惠券'" destroyOnClose
        @submit="handleOk">
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
            <el-date-picker :editable="false" v-model="activeTime" value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>

          <el-form-item prop="desc" label="描述">
            <el-input type="textarea" :rows="5" placeholder="请输入描述" v-model="formConfig.desc" />
          </el-form-item>

        </el-form>
      </drawer-model>

    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';

import {
  getCouponList,
  addCoupon,
  updateCoupon,
  deleteCoupon
} from '@/api/shop';
import useTable from '@/hooks/useTable';
import useForm from '@/hooks/useForm';
import usePassive from '@/hooks/usePassive';

usePassive();

// 优惠列表
const coupon = ref([]);
// 弹框列表
const drawerType = ref('');


const formateStatus = item => {
  let s = '领取中';
  const start_time = new Date(item.start_time).getTime();
  const now = new Date().getTime();
  const end_time = new Date(item.end_time).getTime();
  if (start_time > now) {
    s = '未开始';
  } else if (end_time > now) {
    s = '已结束';
  }
  else if (item.status === 0) {
    s = '已失效';
  }

  return s;
}

const {
  pageConfig,
  formDrawerRef,
  initLoadList,
  onRefresh,
  onOk,
  onUpdate,
  onDelete,
  onPageChange
} = useTable({
  getList: {
    api: getCouponList,
    onSuccess: result => {
      const { list } = result;

      coupon.value = list.map(item => ({ ...item, statusText: formateStatus(item) }));
    }
  },
  addApi: {
    api: addCoupon
  },
  updateApi: {
    api: updateCoupon
  },
  deleteApi: {
    api: deleteCoupon
  },
});

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
})

const handleAddCoupon = () => {
  drawerType.value = 'add';
  resetForm({
    name: '', type: 0, value: 20, total: 100, min_price: 100, start_time: 0, end_time: 0, order: 50
  });
  formDrawerRef.value.open();
};

const handleCouponUpdate = item => {
  drawerType.value = 'update';
  resetForm(item);
  formDrawerRef.value.open();
};

const handleCouponDelete = item => {
  onDelete?.({ id: item.id });
}

const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    formDrawerRef.value.showLoading();

    // 添加
    if (drawerType.value === 'add') {

      onOk?.({
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

      onUpdate?.({
        id: formConfig.id,
        name: formConfig.name,
        desc: formConfig.desc,
        status: formConfig.status
      });

    }

    formDrawerRef.value.close();

  });
};

onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.coupon-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .active {
    @apply border-rose-200 bg-red-50 text-red-400;
  }

  .inactive {
    @apply border-gray-200 bg-gray-50 text-gray-400;
  }

  .coupon-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }

}
</style>