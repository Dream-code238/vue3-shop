<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 21:27:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 19:56:05
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


      <drawer-model ref="formDrawerRef" :title="drawerType === 'add' ? '新增菜单权限' : '修改菜单权限'" destroyOnClose
        @submit="handleOk">
        <el-form ref="formRef" :rules="rules" :model="formConfig" label-width="120px" label-position="left"
          label-suffix="：">

          <el-form-item prop="rule_id" label="上级菜单">
            <el-cascader v-model="formConfig.rule_id" placeholder="请选择上级菜单" :options="ruleOptions"
              :props="{ label: 'name', value: 'id', children: 'child', checkStrictly: true, emitPath: false }"
              clearable />
          </el-form-item>

          <el-form-item prop="menu" label="菜单/规则">
            <el-radio-group v-model="formConfig.menu">
              <el-radio :value="1" border>菜单</el-radio>
              <el-radio :value="0" border>权限</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="name" label="名称">
            <el-input placeholder="请输入名称" v-model="formConfig.name" />
          </el-form-item>

          <el-form-item prop="condition" label="后端规则" v-if="!formConfig.menu">
            <el-input placeholder="请输入后端规则" v-model="formConfig.condition" />
          </el-form-item>

          <el-form-item prop="icon" label="菜单图标" v-if="formConfig.menu">
            <icon-select v-model="formConfig.icon" />
          </el-form-item>

          <el-form-item prop="method" label="请求方式" v-if="!formConfig.menu">
            <el-select v-model="formConfig.method" placeholder="请选择请求方式">
              <el-option v-for="item in methods" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item prop="frontpath" label="前端路由" v-if="formConfig.menu && formConfig.rule_id">
            <el-input placeholder="请输入前端路由" v-model="formConfig.frontpath" />
          </el-form-item>

          <el-form-item prop="order" label="排序">
            <el-input-number :min="1" :max="1000" v-model="formConfig.order" />
          </el-form-item>

        </el-form>
      </drawer-model>

    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ListHeader from '@/components/ListHeader/index.vue';
import DrawerModel from '@/components/DrawerModel/index.vue';
import IconSelect from './components/IconSelect.vue';

import {
  getRuleList,
  addRule,
  updateRule,
  deleteRule,
  updateRuleStatus
} from '@/api/manager';
import { methods } from '@/contants';
import useTable from '@/hooks/useTable';
import useForm from '@/hooks/useForm';

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

const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    rule_id: 0,
    menu: 0,
    name: '',
    condition: '',
    method: '',
    status: 1,
    order: 20,
    icon: '',
    frontpath: ''
  },
  rules: {
    rule_id: [
      { required: true, message: '请选择上级菜单', trigger: 'blur' }
    ],
    menu: [
      { required: true, message: '请选择菜单/规则', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    condition: [
      { required: true, message: '请输入后端规则', trigger: 'blur' }
    ],
    icon: [
      { required: true, message: '请选择菜单图标', trigger: 'blur' }
    ],
    method: [
      { required: true, message: '请选择请求方式', trigger: 'blur' }
    ],
    frontpath: [
      { required: true, message: '请输入前端路由', trigger: 'blur' }
    ],
    order: [
      { required: true, message: '请输入排序', trigger: 'blur' }
    ]
  }
});


// 新增菜单权限
const handleAddAccess = () => {
  drawerType.value = 'add';
  resetForm({ rule_id: 0, menu: 0, name: '', condition: '', method: '', status: 1, order: 20, icon: '', frontpath: '' });
  formDrawerRef.value.open();
}

// 更新菜单权限
const handleAccessUpdate = item => {
  drawerType.value = 'update';
  resetForm(item);
  formDrawerRef.value.open();
}

// 添加子分类
const addChild = item => {
  const { id } = item;
  drawerType.value = 'add';
  resetForm({ rule_id: id, menu: 0, name: '', condition: '', method: '', status: 1, order: 20, icon: '', frontpath: '' });
  formDrawerRef.value.open();
}

// 删除菜单权限
const handleAccessDelete = item => {
  onDelete?.({ id: item.id });
}

const handleOk = () => {
  formRef.value.validate(valid => {

    if (!valid) return false;

    formDrawerRef.value.showLoading();

    // 添加
    if (drawerType.value === 'add') {
      onOk?.({
        rule_id: formConfig.rule_id,
        menu: formConfig.menu,
        name: formConfig.name,
        condition: formConfig.condition,
        method: formConfig.method,
        status: formConfig.status,
        order: formConfig.order,
        icon: formConfig.icon,
        frontpath: formConfig.frontpath
      });
    }
    // 更新
    else {

      onUpdate?.({
        rule_id: formConfig.rule_id,
        menu: formConfig.menu,
        name: formConfig.name,
        condition: formConfig.condition,
        method: formConfig.method,
        status: formConfig.status,
        order: formConfig.order,
        icon: formConfig.icon,
        frontpath: formConfig.frontpath
      });

    }

    formDrawerRef.value.close();

  });
};

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
