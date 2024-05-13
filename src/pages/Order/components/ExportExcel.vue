<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-11 15:56:02
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 14:18:22
 * @FilePath: \shop-admin\src\pages\Order\components\ExportExcel.vue
 * @Description: 导出表格
-->
<template>
  <el-drawer title="导出订单" v-model="dialogVisible" size="40%">
    <el-form :model="formConfig" label-width="80px">
      <el-form-item label="订单类型">
        <el-select v-model="formConfig.tab" placeholder="请选择订单类型">
          <el-option v-for="item in orderTab" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围">
        <el-date-picker v-model="formConfig.time" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleOk" :loading="formConfig.loading">导出</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';

import { getOrderList } from '@/api/order';
import { orderTab, ORDER_KEY, BUY_KEY } from '@/contants/index';
import { toast, exportExcel } from '@/utils/common';
// 表格头
const titleArr = ['订单ID', '订单号', '收获地址', '商品', '支付情况', '发货情况', '下单时间'];

const dialogVisible = ref(false);
const formConfig = reactive({
  tab: null,
  time: '',
  loading: false
});

// 打开
const open = () => dialogVisible.value = true;
// 关闭
const close = () => dialogVisible.value = false;

const handleOk = async () => {
  if (!formConfig.tab) return toast('订单类型不能为空', 'error');
  let starttime = null;
  let endtime = null;
  if (formConfig.time && Array.isArray(formConfig.time)) {
    starttime = formConfig.time[0];
    endtime = formConfig.time[1];
  }

  formConfig.loading = true;
  // 结果
  const { list } = await getOrderList({ limit: 1000, tab: formConfig.tab, starttime, endtime })
    .finally(() => formConfig.loading = false);
  close();
  // 展示内容
  const tableData = list.map(item => {
    // 收货地址
    const address = `地址：${item.address.address || '不详'}`;
    // 商品
    const goods = `商品：${item.order_items?.map(item => item?.goods_item?.title).join(';')}`;
    // 支付方式
    const payMethod = BUY_KEY?.[item.payment_method] || '未支付';
    // 物流状态
    const shipStatus = ORDER_KEY?.[item?.ship_status] || '未发货';
    return {
      id: item.id,
      no: item.no,
      address: address,
      order_items: goods,
      payment_method: payMethod,
      ship_status: shipStatus,
      create_time: item.create_time
    }
  });
  // 导出表格
  exportExcel(XLSX, {
    json: tableData,//数据
    name: new Date().getTime(),//表名
    titleArr: titleArr,//表头
    sheetName: 'sheet',//页签
  });
}

defineExpose({
  open
});
</script>