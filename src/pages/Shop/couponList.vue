<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 16:19:17
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 13:41:28
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

            <template v-if="scope.row.statusText === '领取中'">
              <el-popconfirm title="你确定要让此优惠券失效吗？" confirm-button-text="确定" cancel-button-text="取消"
                @confirm="onUpdateStatus(0, scope.row)">
                <template #reference>
                  <el-button type="danger" size="small">失效</el-button>
                </template>
              </el-popconfirm>
            </template>

            <template v-else>
              <el-button v-if="scope.row.statusText === '未开始'" type="primary" size="small" text
                @click="handleCouponUpdate(scope.row)">修改</el-button>

              <el-popconfirm v-if="scope.row.statusText !== '领取中'" title="你确定要删除此优惠券吗？" confirm-button-text="确定"
                cancel-button-text="取消" @confirm="handleCouponDelete(scope.row)">
                <template #reference>
                  <el-button type="danger" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </template>

          </template>
        </el-table-column>
      </el-table>

      <div class="coupon-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 新增/更新 -->
      <CouponModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" />

    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import CouponModel from './components/CouponModel.vue';

import { getCouponList, addCoupon, updateCoupon, deleteCoupon, updateCouponStatus } from '@/api/shop';
import useTable from '@/hooks/useTable';
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
  onUpdateStatus,
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
  updateStatusApi: {
    api: updateCouponStatus
  }
});

const handleAddCoupon = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({
    name: '', type: 0, value: 20, total: 100, min_price: 100, start_time: 0, end_time: 0, order: 50
  });
  formDrawerRef.value.open();
};

const handleCouponUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
};

const handleCouponDelete = item => {
  onDelete?.({ id: item.id });
}

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