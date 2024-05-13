<template>
  <el-drawer title="订单详情" v-model="dialogVisible" size="50%">

    <el-card shadow="never" class="mb-3">
      <template #header>
        <b class="text-sm">订单详情</b>
      </template>
      <el-form label-width="120px" label-position="left" label-suffix="：">
        <el-form-item label="订单号">
          {{ info.no }}
        </el-form-item>
        <el-form-item label="付款方式">
          {{ BUY_KEY?.[info.payment_method] }}
        </el-form-item>
        <el-form-item label="付款时间">
          {{ info.paid_time }}
        </el-form-item>
        <el-form-item label="创建时间">
          {{ info.create_time }}
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="info.ship_data" shadow="never" class="mb-3">
      <template #header>
        <b class="text-sm">发货信息</b>
      </template>
      <el-form label-width="120px" label-position="left" label-suffix="：">
        <el-form-item label="物流公司">
          {{ info.ship_data.express_company }}
        </el-form-item>
        <el-form-item label="运单号">
          <small>{{ info.ship_data.express_no }}</small>
          <el-button class="ml-3" type="primary" text size="small" @click="handleShipInfo"
            :loading="loading">查看物流</el-button>
        </el-form-item>
        <el-form-item label="发货时间">
          {{ ship_time }}
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="mb-3">
      <template #header>
        <b class="text-sm">商品信息</b>
      </template>
      <div class="flex mb-2" v-for="(item, index) in info.order_items" :key="index">
        <el-image :src="item.goods_item?.cover ?? ''" fit="fill" :lazy="true"
          style="width:60px;height:60px;"></el-image>
        <div class="ml-2 text-sm">
          <p>{{ item.goods_item?.title ?? '商品已被删除' }}</p>
          <p v-if="item.sku" class="mt-1">
            <el-tag type="info" size="small">
              {{ item.sku }}
            </el-tag>
          </p>
          <p>
            <b class="text-rose-500 mr-2">￥{{ item.price }}</b>
            <span class="text-xs text-gray-500">x{{ item.num }}</span>
          </p>
        </div>
      </div>
      <el-form label-width="80px" label-position="left" label-suffix="：">
        <el-form-item label="成交价">
          <span class="text-rose-500 font-bold">￥{{ info.total_price }}</span>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" v-if="info.address" class="mb-3">
      <template #header>
        <b class="text-sm">收货信息</b>
      </template>
      <el-form label-width="120px" label-position="left" label-suffix="：">
        <el-form-item label="收货人">
          {{ info.address.name }}
        </el-form-item>
        <el-form-item label="联系方式">
          {{ info.address.phone }}
        </el-form-item>
        <el-form-item label="收货地址">
          {{ info.address.province + info.address.city + info.address.district + info.address.address }}
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" v-if="info.refund_status != 'pending'">
      <template #header>
        <b class="text-sm">退款信息</b>
        <el-button text disabled style="float: right;">{{ refund_status }}</el-button>
      </template>
      <el-form label-width="120px" label-position="left" label-suffix="：">
        <el-form-item label="退款理由">
          {{ info.extra.refund_reason }}
        </el-form-item>
      </el-form>
    </el-card>

  </el-drawer>

  <ShipInfo ref="shipInfoRef" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDateFormat } from '@vueuse/core';

import ShipInfo from './ShipInfo.vue';

import { BUY_KEY } from '@/contants/index';

const dialogVisible = ref(false);
// 详情
const info = ref({});

const ship_time = computed(
  () => {
    if (info.value.ship_data) {
      const s = useDateFormat(info.value.ship_data.express_time * 1000, 'YYYY-MM-DD HH:mm:ss');
      return s.value;
    }
    return '';
  }
);

const refund_status = computed(
  () => {
    const opt = {
      pending: '未退款',
      applied: '已申请，等待审核',
      processing: '退款中',
      success: '退款成功',
      failed: '退款失败'
    };
    return info.value.refund_status ? opt[info.value.refund_status] : '';
  }
);

// 打开
const open = item => {
  item.order_items = item.order_items.map(o => {
    if (o.skus_type == 1 && o.goods_skus) {
      const s = [];
      for (const k in o.goods_skus.skus) {
        s.push(o.goods_skus.skus[k].value);
      }
      o.sku = s.join(",");
    }
    return o;
  })
  info.value = item;
  dialogVisible.value = true;
};
// 关闭
const close = () => dialogVisible.value = false;

// 查看物流
const loading = ref(false);
const shipInfoRef = ref(null);
const handleShipInfo = () => {
  loading.value = true;
  shipInfoRef.value.open(info.value.id)
    .finally(() => loading.value = false);
}

defineExpose({
  open
});
</script>