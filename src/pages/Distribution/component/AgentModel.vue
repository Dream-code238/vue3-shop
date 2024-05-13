<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-13 13:33:26
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 14:09:26
 * @FilePath: \shop-admin\src\pages\Distribution\component\AgentModel.vue
 * @Description: 推广人/推广订单
-->
<template>
  <el-drawer :title="drawerTitle" v-model="dialogVisible" size="70%">
    <!-- 搜索 -->
    <el-form :model="pageConfig" label-width="120px" label-position="left" label-suffix="：">

      <el-form-item label="时间选择">
        <el-radio-group v-model="pageConfig.type">
          <el-radio-button value="all">全部</el-radio-button>
          <el-radio-button value="today">今天</el-radio-button>
          <el-radio-button value="yesterday">昨天</el-radio-button>
          <el-radio-button value="last7days">最近7天</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="pageConfig.starttime" type="date" placeholder="开始日期" style="width: 90%;"
          value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="pageConfig.endtime" type="date" placeholder="结束日期" style="width: 90%;"
          value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item label="用户类型">
        <el-radio-group v-model="pageConfig.level">
          <el-radio-button :value="0">全部</el-radio-button>
          <el-radio-button :value="1">一级推广</el-radio-button>
          <el-radio-button :value="2">二级推广</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>

      <el-table :data="tableData" stripe style="width: 100%" height="500" width="100%" class="flex-1 py-5"
        v-loading="pageConfig.loading">
        <template v-if="agent">
          <el-table-column label="ID" prop="id" align="center" />
          <el-table-column label="头像" width="65">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户信息" prop="username" />
          <el-table-column label="推广数" prop="share_num" align="center" />
          <el-table-column label="推广订单数" prop="share_order_num" align="center" />
          <el-table-column label="绑定时间" prop="create_time" align="center" />
        </template>
        <template v-else>
          <el-table-column label="订单号">
            <template #default="{ row }">
              {{ row.order.no }}
            </template>
          </el-table-column>
          <el-table-column label="用户名|昵称|手机">
            <template #default="{ row }">
              <div v-if="!row.order.user">该用户已被删除</div>
              <div v-else>{{ row.order.user.username }}|{{ row.order.user.nickname }}|{{ row.order.user.phone }}</div>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="create_time" />
          <el-table-column label="返佣金额" prop="commission" />
        </template>
      </el-table>

      <!-- 分页 -->
      <div class="distribution-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';

import { getAgentList, getOrderList } from '@/api/distribution';

import useTable from '@/hooks/useTable';

const props = defineProps({
  type: {
    type: String,
    default: 'agent'
  }
});

const dialogVisible = ref(false);
const tableData = ref([]);

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
    getList: (() => props.type === 'agent' ? getAgentList : getOrderList)(),
    payload: ['keyword', 'type', 'starttime', 'endtime', 'level', 'user_id'],
    onSuccess: result => {
      const { list, cates } = result;
      tableData.value = list;
    }
  }
});

const drawerTitle = computed(() => props.type === 'agent' ? "推广人列表" : "推广订单列表");

const open = item => {
  initLoadConfig({ user_id: item.id });
  dialogVisible.value = true;
  initLoadList();
};

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


defineExpose({
  open
});
</script>
