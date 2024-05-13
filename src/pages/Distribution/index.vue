<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:26:12
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 14:10:03
 * @FilePath: \shop-admin\src\pages\Distribution\index.vue
 * @Description: 分销员管理
-->
<template>
  <div class="distribution-page-container">
    <DistributionCount />

    <!-- 列表展示 -->
    <div class="distribution-content-container">
      <el-card shadow="never" class="flex-1 flex flex-col p-2 border-0">
        <!-- 搜索 -->
        <Search class="flex items-center mb-3" :model="pageConfig" @search="handleSearch" @reset="handleReset">
          <SearchItem label="时间选择" class="mr-5">
            <el-radio-group v-model="pageConfig.type" size="small">
              <el-radio-button value="all">全部</el-radio-button>
              <el-radio-button value="today">今天</el-radio-button>
              <el-radio-button value="yesterday">昨天</el-radio-button>
              <el-radio-button value="last7days">最近7天</el-radio-button>
            </el-radio-group>
          </SearchItem>
          <template #show>
            <SearchItem label="开始时间">
              <el-date-picker v-model="pageConfig.starttime" size="small" type="date" placeholder="开始日期"
                style="width: 90%;" value-format="YYYY-MM-DD" />
            </SearchItem>
            <SearchItem label="结束时间">
              <el-date-picker v-model="pageConfig.endtime" size="small" type="date" placeholder="结束日期"
                style="width: 90%;" value-format="YYYY-MM-DD" />
            </SearchItem>
            <SearchItem label="收货人">
              <el-input v-model="pageConfig.keyword" size="small" placeholder="关键词" clearable></el-input>
            </SearchItem>
          </template>
        </Search>

        <!-- 订单列表 -->
        <el-table :data="agents" stripe style="width: 100%" height="500" width="100%" class="flex-1 py-5"
          v-loading="pageConfig.loading">
          <el-table-column label="ID" prop="id" align="center" />
          <el-table-column label="头像" width="65">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户信息" width="200">
            <template #default="{ row }">
              <div class="text-xs">
                <p>用户：{{ row.username }}</p>
                <p>昵称：{{ row.nickname }}</p>
                <p>姓名：{{ row.user_info.name }}</p>
                <p>电话：{{ row.phone }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="推广用户数量" prop="share_num" align="center" />
          <el-table-column label="订单数量" prop="share_order_num" align="center" />
          <el-table-column label="订单金额" prop="order_price" align="center" />
          <el-table-column label="账户佣金" prop="commission" align="center" />
          <el-table-column label="已提现金额" prop="cash_out_price" align="center" />
          <el-table-column label="提现次数" prop="cash_out_time" align="center" />
          <el-table-column label="未提现金额" prop="no_cash_out_price" align="center" />
          <el-table-column fixed="right" label="操作" width="180" align="center">
            <template #default="{ row }">
              <el-button type="primary" size="small" text @click="handleAgent(row)">推广人</el-button>
              <el-button type="primary" size="small" text @click="handleAgentOrder(row)">推广订单</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="distribution-footer-container">
          <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
        </div>

      </el-card>

      <AgentModel ref="agentModelRef" :type="type" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

import DistributionCount from './component/DistributionCount.vue';
import Search from '@/components/Search/index.vue';
import SearchItem from '@/components/Search/SearchItem.vue';
import AgentModel from './component/AgentModel.vue';

import { getAgentList } from '@/api/distribution';
import useTable from '@/hooks/useTable';

const agents = ref([]);

const {
  // 列表筛选数据
  pageConfig,
  // 初始化筛选数据
  initLoadConfig,
  // 获取列表
  initLoadList,
  // 分页切换
  onPageChange
} = useTable({
  filterData: {
    // 手机号/邮箱/用户...
    keyword: '',
    // 时间段：all全部，today今天，yesterday昨天，last7days最近7天
    type: 'all',
    // 开始时间
    starttime: '',
    // 结束时间
    endtime: '',
    // 用户类型：0全部，1一级推广，2二级推广
    level: '',
    // 推广人ID
    user_id: ''
  },
  getList: {
    api: getAgentList,
    payload: ['keyword', 'type', 'starttime', 'endtime', 'level', 'user_id'],
    onSuccess: result => {
      const { list, cates } = result;
      agents.value = list;
    }
  }
});

// 搜索
const handleSearch = () => initLoadList();

// 重置筛选项
const handleReset = () => {
  initLoadConfig({
    keyword: '',
    type: 'all',
    starttime: '',
    endtime: '',
    level: '',
    user_id: ''
  });
  initLoadList();
}

const agentModelRef = ref(null);
const type = ref('');
const handleAgent = item => {
  type.value = 'agent';
  agentModelRef.value.open(item);
}
const handleAgentOrder = item => {
  type.value = 'order';
  agentModelRef.value.open(item);
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.distribution-page-container {
  @apply flex-1 flex flex-col;
  max-height: 100%;

  .distribution-content-container {
    @apply flex-1 flex flex-col;
  }

  .distribution-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}
</style>