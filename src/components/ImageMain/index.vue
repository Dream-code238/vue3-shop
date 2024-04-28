<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 13:53:56
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-26 23:46:51
 * @FilePath: \shop-admin\src\pages\Other\components\imageMain.vue
 * @Description: 分类图片内容
-->
<template>
  <el-main v-loading="pageConfig.loading" loading-text="加载中...">
    <div class="classtify-main-container">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="item in imageList" :key="item.id">
          <image-cover :value="item" :checked="checked" @check="handleCheckImage" @update="handleUpdateName"
            @delete="handleDeleteImage"></image-cover>
        </el-col>
      </el-row>
    </div>
    <div class="classtify-footer-container">
      <el-pagination background layout="prev, pager, next" :total="pageConfig.total" @change="onPageChange" />
    </div>
  </el-main>
  <drawer-model ref="formDrawerRef" title="上传图片" :footer="false" destroyOnClose>
    <upload-file :data="{ image_class_id: currentId }" @success="handleUploadSuccess"></upload-file>
  </drawer-model>
</template>




<script setup>
import { ref, computed } from 'vue';

import ImageCover from '@/components/ImageCover/index.vue';
import DrawerModel from '@/components/DrawerModel/index.vue';
import UploadFile from '@/components/UploadFile/index.vue';

import { messagePrompt, toast } from '@/utils/common';
import {
  getClasstifyImage,
  updateImageName,
  deleteImage
} from '@/api/other';

import useTable from '@/hooks/useTable';

defineProps({
  checked: {
    type: Boolean,
    default: false
  }
});


// 选中的图片分类
const currentId = ref(1);
// 图片分类列表
const imageList = ref([]);


const {
  pageConfig,
  formDrawerRef,
  initLoadConfig,
  initLoadList,
  onUpdate,
  onDelete,
  onPageChange
} = useTable({
  getList: {
    api: getClasstifyImage,
    payload: ['id'],
    onSuccess: result => {
      const { list } = result;

      imageList.value = list.map(item => ({ ...item, checked: false }));
    }
  },
  updateApi: {
    api: updateImageName
  },
  deleteApi: {
    api: deleteImage
  }
});

// 获取图片分类
const handleCurrentId = id => {
  currentId.value = id;
  initLoadConfig({ id })
  initLoadList();
}

// 上传图片
const handleUpload = () => {
  formDrawerRef.value.open();
}

const handleUploadSuccess = () => initLoadList();

// 选择图片
const checkedImage = computed(() => imageList.value.filter(item => item.checked));
const emit = defineEmits(['update']);
const handleCheckImage = item => {
  if (item.checked && checkedImage.value.length > 1) {
    item.checked = false
    return toast(`最多只能选中1张`, 'error')
  }
  emit('update', item);
};

// 重命名
const handleUpdateName = item => {

  messagePrompt('重命名', item.name)
    .then(({ value }) => {

      onUpdate?.({
        id: item.id,
        name: value
      });

    });

}

// 删除图片
const handleDeleteImage = item => {
  onDelete?.({ ids: [item.id] });
}

defineExpose({
  handleCurrentId,
  handleUpload
});

</script>




<style lang="less" scoped>
.el-main {
  padding: 0 !important;
  @apply flex-1;

  .classtify-main-container {
    height: calc(100% - 60px);
    overflow-y: scroll;
    overflow-x: hidden;

    @apply flex-1;
  }

  .classtify-footer-container {
    height: 60px;
    @apply flex items-center justify-center;
  }
}
</style>