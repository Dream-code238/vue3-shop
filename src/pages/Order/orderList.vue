<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:19:16
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 15:21:25
 * @FilePath: \shop-admin\src\pages\Order\orderList.vue
 * @Description: 订单管理
-->
<template>
  <div class="order-page-container">
    <!-- 标签页 -->
    <el-tabs v-model="pageConfig.tab" class="goods-tabs-container px-2" @tab-change="initLoadList">
      <el-tab-pane v-for="item in orderTab" :label="item.label" :name="item.value"></el-tab-pane>
    </el-tabs>

    <el-card shadow="never" class="flex-1 flex flex-col border-0">
      <!-- 搜索 -->
      <Search class="flex items-center mb-3" :model="pageConfig" @search="handleSearch" @reset="handleReset">
        <SearchItem label="订单编号" class="mr-5">
          <el-input v-model="pageConfig.no" size="small" placeholder="请输入订单编号" clearable />
        </SearchItem>
        <template #show>
          <SearchItem label="收货人">
            <el-input v-model="pageConfig.name" size="small" placeholder="请输入收货人" clearable></el-input>
          </SearchItem>
          <SearchItem label="手机号">
            <el-input v-model="pageConfig.phone" size="small" placeholder="请输入手机号" clearable></el-input>
          </SearchItem>
          <SearchItem label="开始时间">
            <el-date-picker v-model="pageConfig.starttime" size="small" type="date" placeholder="开始日期"
              style="width: 90%;" value-format="YYYY-MM-DD" />
          </SearchItem>
          <SearchItem label="结束时间">
            <el-date-picker v-model="pageConfig.endtime" size="small" type="date" placeholder="结束日期" style="width: 90%;"
              value-format="YYYY-MM-DD" />
          </SearchItem>
        </template>
      </Search>

      <!-- 新增刷新 -->
      <ListHeader layout="delete,refresh,download" :check-keys="checkedIds" @check="handleDeleteAll"
        @refresh="onRefresh" @download="handleExportExcel" />

      <!-- 订单列表 -->
      <el-table ref="tableRef" :data="orders" stripe style="width: 100%" height="500" width="100%" class="flex-1 py-5"
        v-loading="pageConfig.loading" @selection-change="onTableSelection">
        <el-table-column type="selection" width="55" />
        <el-table-column label="商品" width="300">
          <template #default="{ row }">
            <div>
              <div class="flex text-sm">
                <div class="flex-1">
                  <p>订单号：</p>
                  <small>{{ row.no }}</small>
                </div>
                <div>
                  <p>下单时间：</p>
                  <small>{{ row.create_time }}</small>
                </div>
              </div>
              <div class="flex py-2" v-for="(item, index) in row.order_items" :key="index">
                <el-image :src="item.goods_item ? item.goods_item.cover : ''" fit="cover" :lazy="true"
                  style="width: 30px;height: 30px;"></el-image>
                <p class="text-blue-500 ml-2">
                  {{ item.goods_item ? item.goods_item.title : '商品已被删除' }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际付款" width="120" prop="total_price" align="center" />
        <el-table-column align="center" label="买家" width="120">
          <template #default="{ row }">
            <p>{{ row.user.nickname || row.user.username }}</p>
            <small>(用户ID：{{ row.user.id }})</small>
          </template>
        </el-table-column>
        <el-table-column label="交易状态" width="250" align="center">
          <template #default="{ row }">
            <div>
              付款状态：
              <el-tag v-if="row.payment_method == 'wechat'" type="success" size="small">微信支付</el-tag>
              <el-tag v-else-if="row.payment_method == 'alipay'" size="small">支付宝支付</el-tag>
              <el-tag v-else type="info" size="small">未支付</el-tag>
            </div>
            <div>
              发货状态：
              <el-tag :type="row.ship_data ? 'success' : 'info'" size="small">{{ row.ship_data ? '已发货' : '未发货'
                }}</el-tag>
            </div>
            <div>
              收货状态：
              <el-tag :type="row.ship_status == 'received' ? 'success' : 'info'" size="small">{{ row.ship_status ==
                'received' ? '已收货' : '未收货' }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button class="px-1" type="primary" size="small" text @click="handleOrderInfo(row)">订单详情</el-button>
            <el-button v-if="pageConfig.tab === 'noship'" class="px-1" type="primary" size="small" text
              @click="handleOrderShip(row)">订单发货</el-button>
            <el-button v-if="pageConfig.tab === 'refunding'" class="px-1" type="primary" size="small" text
              @click="handleRefundResponse(row.id, 1)">同意退款</el-button>
            <el-button v-if="pageConfig.tab === 'refunding'" class="px-1" type="primary" size="small" text
              @click="handleRefundResponse(row.id, 0)">拒绝退款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="order-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 导出表格 -->
      <ExportExcel ref="exportExcelRef" />

      <OrderInfo ref="orderInfoRef" />

      <OrderShip ref="formDrawerRef" :create="onOk" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Search from '@/components/Search/index.vue';
import SearchItem from '@/components/Search/SearchItem.vue';
import ListHeader from '@/components/ListHeader/index.vue';
import ExportExcel from './components/ExportExcel.vue';
import OrderInfo from './components/OrderInfo.vue';
import OrderShip from './components/OrderShip.vue';

import {
  getOrderList,
  handleRefund,
  deleteOrder,
  orderShip
} from '@/api/order';
import { messageBox, messagePrompt, toast } from '@/utils/common';
import { orderTab } from '@/contants/index';
import useTable from '@/hooks/useTable';

const orders = ref([]);

const {
  // 列表筛选数据
  pageConfig,
  formDrawerRef,
  // 选中id
  checkedIds,
  tableRef,
  // 初始化筛选数据
  initLoadConfig,
  // 获取列表
  initLoadList,
  // 刷新列表
  onRefresh,
  onOk,
  // 删除功能
  onDelete,
  onTableSelection,
  // 分页切换
  onPageChange
} = useTable({
  filterData: {
    // 订单类型
    tab: 'all',
    // 订单号
    no: '',
    // 开始时间
    starttime: '',
    // 结束时间
    endtime: '',
    // 收货人
    name: '',
    // 收货人手机号
    phone: ''
  },
  getList: {
    api: getOrderList,
    payload: ['tab', 'no', 'starttime', 'endtime', 'name', 'phone'],
    onSuccess: result => {
      const { list, cates } = result;
      orders.value = list;
    }
  },
  addApi: {
    api: orderShip
  },
  deleteApi: {
    api: deleteOrder
  }
});


// 搜索
const handleSearch = () => initLoadList();

// 重置筛选项
const handleReset = () => {
  initLoadConfig({
    tab: 'all',
    no: '',
    starttime: '',
    endtime: '',
    name: '',
    phone: ''
  });
  initLoadList();
}

// 导出表格
const exportExcelRef = ref(null);
const handleExportExcel = () => exportExcelRef.value.open();

// 批量删除
const handleDeleteAll = () => {
  onDelete?.({ ids: checkedIds.value });
}

// 订单详情
const orderInfoRef = ref(null);
const handleOrderInfo = item => orderInfoRef.value.open(item);

// 订单发货
const handleOrderShip = item => {
  formDrawerRef.value.handleResetForm({ id: item.id, express_company: '', express_no: '' });
  formDrawerRef.value.open();
}

// 退款回执
const handleRefundResponse = (id, agree) => {
  (agree ? messageBox("是否要同意该订单退款?") : messagePrompt("请输入拒绝的理由"))
    .then(({ value }) => {

      handleRefund({ id, agree, disagree_reason: value })
        .then(res => initLoadList());
      toast("操作成功");

    })
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.order-page-container {
  @apply flex-1 flex flex-col;
  max-height: 100%;

  .order-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}
</style>