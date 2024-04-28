<template>
  <div class="upload-avatar-container flex flex-wrap">

    <div v-if="modelValue">
      <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
    </div>

    <div class="upload-avatar-btn w-[100px] h-[100px]" @click="handleUploadAvatar">
      <el-icon :size="25" class="text-gray-500">
        <Plus />
      </el-icon>
    </div>

    <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">

      <el-container class="flex flex-col bg-white rounded" style="height:70vh;">
        <el-header class="h-[60px]">
          <el-button type="primary" size="small" @click="handleCreateClassify">新增图片分类</el-button>
          <el-button type="warning" size="small" @click="handleUploadImage">上传图片</el-button>
        </el-header>
        <el-container class="image-classtify-container">
          <!-- 图片分类 -->
          <image-classtify ref="imageClasstifyRef" @change="handleClasstifyCheck"></image-classtify>
          <!-- 分类图片 -->
          <image-main ref="imageMainRef" :checked="true" @update="handleCheckAvatar"></image-main>
        </el-container>
      </el-container>

      <template #footer>
        <span>
          <el-button @click="handleUploadClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup>
import { ref } from 'vue';

import imageClasstify from '@/components/ImageClasstify/index.vue';
import imageMain from '@/components/ImageMain/index.vue';

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const dialogVisible = ref(false);

// 图片分类
const imageClasstifyRef = ref(null);
// 分类图片
const imageMainRef = ref(null);

const checkAvatar = ref('');

// 上传头像
const handleUploadAvatar = () => dialogVisible.value = true;

const handleUploadClose = () => dialogVisible.value = false

// 创建分类
const handleCreateClassify = () => imageClasstifyRef.value.handleCreate('add');

// 上传图片
const handleUploadImage = () => imageMainRef.value.handleUpload();

// 选中分类
const handleClasstifyCheck = id => imageMainRef.value.handleCurrentId(id);

const emit = defineEmits(["update:modelValue"]);
const handleCheckAvatar = item => {
  if (item && item.url) {
    checkAvatar.value = item.url;
  }
}

const handleSubmit = () => {
  if (checkAvatar.value) {
    emit("update:modelValue", checkAvatar.value);
  } else {
    toast("请上传头像", "error");
  }
  handleUploadClose();
}

</script>


<style lang="less" scoped>
.upload-avatar-container {


  .upload-avatar-btn {
    @apply rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
  }


  .image-classtify-container {
    height: calc(100% - 60px);
  }
}
</style>