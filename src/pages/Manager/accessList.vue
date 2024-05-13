<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:27:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:50:07
 * @FilePath: \shop-admin\src\pages\Other\noticeList.vue
 * @Description: 管理员管理
-->
<template>
  <div class="access-page-container">
    <el-card shadow="never" class="flex-1 flex flex-col border-0">
      <!-- 新增刷新 -->
      <div class="access-page-header">
        <ListHeader @add="handleAddAccess" @refresh="onRefresh" />
      </div>
      <!-- 组件树 -->
      <div class="access-main-container">
        <el-tree :data="treeData" :props="{ label: 'name', children: 'child' }" v-loading="pageConfig.loading"
          node-key="id" :default-expanded-keys="expandedKeys">
          <template #default="{ node, data }">
            <div class="tree-node">

              <div class="tree-node-left flex items-center">
                <template v-if="data?.menu">
                  <el-tag>菜单</el-tag>
                </template>
                <template v-else>
                  <el-tag type="info">权限</el-tag>
                </template>
                <el-icon v-if="data.icon" :size="16" class="mx-2">
                  <component :is="data.icon" />
                </el-icon>
                <span class="mr-2">{{ data.name }}</span>
              </div>

              <div class="tree-node-right flex items-center">
                <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                  @change="onUpdateStatus($event, data)" />
                <el-button text size="small" @click.stop="handleAccessUpdate(data)">修改</el-button>
                <el-button text size="small" @click.stop="addChild(data)">增加</el-button>
                <el-popconfirm title="是否要删除该菜单权限吗？" confirmButtonText="确认" cancelButtonText="取消"
                  @confirm="handleAccessDelete(data)">
                  <template #reference>
                    <el-button text size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>

            </div>
          </template>
        </el-tree>
      </div>
      <!-- 新增/更新 -->
      <AccessModel ref="formDrawerRef" :title="drawerType" :ruleOptions="ruleOptions" :create="onOk"
        :update="onUpdate" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';

import {
  getRuleList,
  addRule,
  updateRule,
  deleteRule,
  updateRuleStatus
} from '@/api/manager';
import useTable from '@/hooks/useTable';
import AccessModel from './components/AccessModel.vue';

// 菜单权限列表
const treeData = ref([]);
const ruleOptions = ref([]);
// 默认展开节点
const expandedKeys = ref([]);
// 弹框列表
const drawerType = ref('');

// 列表相关配置
const {
  pageConfig,
  formDrawerRef,
  initLoadList,
  onRefresh,
  onOk,
  onUpdate,
  onDelete,
  onUpdateStatus
} = useTable({
  getList: {
    api: getRuleList,
    onSuccess: result => {
      const { list, rules } = result;
      treeData.value = list;
      expandedKeys.value = list.map(item => item.id);
      ruleOptions.value = rules;
    }
  },
  addApi: {
    api: addRule
  },
  updateApi: {
    api: updateRule
  },
  deleteApi: {
    api: deleteRule
  },
  updateStatusApi: {
    api: updateRuleStatus
  }
});

// 新增菜单权限
const handleAddAccess = () => {
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ rule_id: 0, menu: 0, name: '', condition: '', method: '', status: 1, order: 20, icon: '', frontpath: '' });
  formDrawerRef.value.open();
}

// 更新菜单权限
const handleAccessUpdate = item => {
  drawerType.value = 'update';
  formDrawerRef.value.handleResetForm(item);
  formDrawerRef.value.open();
}

// 添加子分类
const addChild = item => {
  const { id } = item;
  drawerType.value = 'add';
  formDrawerRef.value.handleResetForm({ rule_id: id, menu: 0, name: '', condition: '', method: '', status: 1, order: 20, icon: '', frontpath: '' });
  formDrawerRef.value.open();
}

// 删除菜单权限
const handleAccessDelete = item => {
  onDelete?.({ id: item.id });
}

// 挂在获取列表
onMounted(() => initLoadList());
</script>


<style lang="less" scoped>
.access-page-container {
  @apply flex-1 flex flex-col p-5 rounded bg-white;
  max-height: 100%;

  :deep(.el-card__body) {
    height: 100%;
    @apply flex-1 flex flex-col;
  }

  .access-page-header {
    height: 24px;
  }

  .access-main-container {
    height: calc(100% - 24px);
    max-height: 100%;
    @apply flex-1 flex flex-col py-5;

    .el-tree {
      max-height: 100%;
      overflow-y: scroll;
      @apply flex-1 flex flex-col;
    }
  }



  .tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  :deep(.el-tree-node__content) {
    padding: 20px 0;
  }

}
</style>
