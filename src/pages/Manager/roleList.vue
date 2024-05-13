<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:22:40
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:44:54
 * @FilePath: \shop-admin\src\pages\Manager\roleList.vue
 * @Description: 角色管理
-->
<template>
  <div class="role-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">

      <!-- 新增刷新 -->
      <ListHeader @add="handleAddRole" @refresh="onRefresh" />

      <!-- 通知列表 -->
      <el-table :data="roles" stripe style="width: 100%" class="flex-1 py-5" v-loading="pageConfig.loading">
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="desc" label="角色描述" />
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :v-loading="row.loading"
              @change="onUpdateStatus($event, row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">

            <el-button type="primary" size="small" text @click="handleRoleRule(scope.row)">配置权限</el-button>

            <el-button type="primary" size="small" text @click="handleRoleUpdate(scope.row)">修改</el-button>

            <el-popconfirm title="你确定要删除此公告吗？" confirm-button-text="确定" cancel-button-text="取消"
              @confirm="handleRoleDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="role-footer-container">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
      </div>

      <!-- 新增/更新 -->
      <RoleModel ref="formDrawerRef" :title="drawerType" :create="onOk" :update="onUpdate" />

      <drawer-model ref="formRuleRef" title="权限配置" destroyOnClose @submit="handleRuleOk">
        <el-tree-v2 ref="elTreeRef" :height="rHeight" :data="ruleList" :props="{ label: 'name', children: 'child' }"
          node-key="id" :default-expanded-keys="expandedKeys" :check-strictly="checkStrictly" @check="handleNodeCheck"
          show-checkbox>
          <template #default="{ node, data }">
            <div class="flex items-center">
              <template v-if="data?.menu">
                <el-tag>菜单</el-tag>
              </template>
              <template v-else>
                <el-tag type="info">权限</el-tag>
              </template>
              <span class="ml-2 text-sm">{{ data.name }}</span>
            </div>
          </template>
        </el-tree-v2>
      </drawer-model>

    </el-card>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import DrawerModel from '@/components/DrawerModel/index.vue';
import RoleModel from './components/RoleModel.vue';

import {
  getRoleList,
  addRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
  getRuleList,
  updateRoleRule
} from '@/api/manager';
import useTable from '@/hooks/useTable';
import usePassive from '@/hooks/usePassive';
import { toast } from '@/utils/common';

usePassive();

// 角色列表
const roles = ref([]);
// 弹框列表
const drawerType = ref('');

// 权限配置
const formRuleRef = ref(null);
// 配置菜单
const elTreeRef = ref(null);
const ruleList = ref([]);
const rHeight = ref(0);
// 默认展开节点
const expandedKeys = ref([]);
const checkNode = ref([]);
const roleId = ref(0);
const checkStrictly = ref(false);

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
    api: getRoleList,
    onSuccess: result => {
      const { list } = result;

      roles.value = list.map(item => ({ ...item, loading: false }));
    }
  },
  addApi: {
    api: addRole
  },
  updateApi: {
    api: updateRole
  },
  deleteApi: {
    api: deleteRole
  },
  updateStatusApi: {
    api: updateRoleStatus
  }
});



// 新增角色
const handleAddRole = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ name: '', desc: '', status: 1 });
  formDrawerRef.value.open();
}

// 角色更新
const handleRoleUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
}

// 删除角色
const handleRoleDelete = item => {
  onDelete?.({ id: item.id });
}

const handleRoleRule = item => {
  const { id } = item;
  rHeight.value = window.innerHeight - 180;
  roleId.value = id;
  checkStrictly.value = true
  getRuleList({ page: 1 })
    .then(res => {
      const { list } = res;
      ruleList.value = list;
      expandedKeys.value = list.map(item => item.id);
      formRuleRef.value.open();

      // 当前角色拥有的权限ID
      checkNode.value = item.rules.map(item => item.id);
      setTimeout(() => {
        elTreeRef.value.setCheckedKeys(checkNode.value);
        checkStrictly.value = false;
      }, 150);
    });
}

const handleNodeCheck = (data, info) => {
  const { checkedKeys, halfCheckedKeys } = info;
  checkNode.value = [...checkedKeys, ...halfCheckedKeys];
}

const handleRuleOk = () => {
  formRuleRef.value.showLoading()
  updateRoleRule({ id: roleId.value, rule_ids: checkNode.value })
    .then(res => {
      initLoadList();
      formRuleRef.value.close()
      toast("配置成功")
    })
    .finally(() => {
      formRuleRef.value.hideLoading()
    })
}


// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.role-page-container {
  @apply flex-1 flex flex-col p-5 bg-white;
  max-height: 100%;

  .role-footer-container {
    @apply flex items-center justify-center;
    height: 60px;
  }
}


:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>