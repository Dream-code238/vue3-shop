<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 13:52:34
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-26 23:54:26
 * @FilePath: \shop-admin\src\pages\Other\components\imageClasstify.vue
 * @Description: 图片分类组件
-->
<template>
  <el-aside v-loading="pageConfig.loading">
    <!-- 图片分类列表 -->
    <div class="classtify-list-container">
      <classtify-item v-for="item in classtifyList" :key="item.id" :active="item.id === activeId"
        @click="handleClasstifyId(item.id)" @update="handleClasstifyUpdate(item)" @delete="handleClasstifyDelete(item)">
        {{ item.name }}
      </classtify-item>
    </div>
    <!-- 底部操作 -->
    <div class="classtify-footer-container">
      <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
    </div>
  </el-aside>

  <!-- 添加编辑分类 -->
  <drawer-model ref="formDrawerRef" :title="formDrawerType === 'add' ? '新增分类' : '编辑分类'" @submit="handleSubmit">
    <el-form :model="formConfig" ref="formRef" :rules="rules" label-width="120px" label-position="left"
      label-suffix="：">
      <el-form-item prop="name" label="分类名称">
        <el-input placeholder="请输入分类名称" v-model="formConfig.name" />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="formConfig.order" :min="0" :max="1000" :step="1" />
      </el-form-item>
    </el-form>

  </drawer-model>
</template>


<script setup>
import { ref, onMounted } from 'vue';

import ClasstifyItem from '@/components/ImageClasstify/ClasstifyItem.vue';
import DrawerModel from '@/components/DrawerModel/index.vue';

import useTable from '@/hooks/useTable';
import useForm from '@/hooks/useForm';

import {
  getClasstifyList,
  addImageClasstify,
  updateImageClasstify,
  deleteImageClasstify
} from '@/api/other';

// 选中图片分类
const activeId = ref(0);
// 分类图片列表
const classtifyList = ref([]);
// 弹框类型
const formDrawerType = ref('');

const {
  pageConfig,
  formDrawerRef,
  initLoadList,
  onOk,
  onUpdate,
  onDelete,
  onPageChange
} = useTable({
  getList: {
    api: getClasstifyList,
    onSuccess: result => {
      const { list } = result;

      classtifyList.value = list;

      if (classtifyList.value?.[0] && classtifyList.value?.[0].id) {

        handleClasstifyId(classtifyList.value?.[0].id);

      }
    }
  },
  addApi: {
    api: addImageClasstify
  },
  updateApi: {
    api: updateImageClasstify
  },
  deleteApi: {
    api: deleteImageClasstify
  }
});

const {
  formRef,
  formConfig,
  rules,
  resetForm
} = useForm({
  formData: {
    id: 0,
    name: '',
    order: 50
  },
  rules: {
    name: [
      { required: true, message: '图库分类名称不能为空', trigger: 'blur' }
    ]
  }
});

// 图片分类选择
// 分类选中
const emit = defineEmits(['change']);
const handleClasstifyId = id => {
  activeId.value = id
  emit('change', id);
};

// 新增图片分类
const handleAddClasstify = () => {
  formDrawerType.value = 'add';
  resetForm({ id: 0, name: '', order: 50 });
  formDrawerRef.value.open();
};

// 更新图片分类
const handleClasstifyUpdate = item => {
  formDrawerType.value = 'update';
  resetForm(item);
  formDrawerRef.value.open();
}

// 确认提交
const handleSubmit = () => {

  formRef.value.validate(valid => {

    if (!valid) return false;

    formDrawerRef.value.showLoading();

    // 如果是添加
    if (formDrawerType.value === 'add') {

      onOk?.({
        name: formConfig.name,
        order: formConfig.order
      });

    }
    // 否则是更新
    else {

      onUpdate?.({
        id: formConfig.id,
        name: formConfig.name,
        order: formConfig.order
      });

    }

    formDrawerRef.value.close();
  });
}

// 删除图片分类
const handleClasstifyDelete = async item => {
  const { id } = item;
  onDelete?.({ id });
}

// 加载完获取列表
onMounted(() => initLoadList());



defineExpose({
  handleAddClasstify
});
</script>


<style lang="less" scoped>
.el-aside {
  width: 200px;

  @apply flex flex-col;

  .classtify-list-container {
    overflow-y: scroll;

    @apply flex-1;
  }

  .classtify-footer-container {
    height: 60px;
    @apply flex items-center justify-center;
  }
}
</style>