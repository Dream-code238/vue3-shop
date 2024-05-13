<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-28 10:32:04
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 18:47:38
 * @FilePath: \shop-admin\src\components\TagInput\index.vue
 * @Description: 上传按钮组件
-->
<template>
  <div class="upload-avatar-container flex flex-wrap">

    <div v-if="modelValue && preview">
      <el-image v-if="typeof modelValue == 'string'" :src="modelValue" fit="cover"
        class="w-[100px] h-[100px] rounded border mr-2"></el-image>
      <div v-else class="flex flex-wrap">
        <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in modelValue" :key="index">
          <el-icon class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full" style="z-index: 10;"
            @click="handleRemoveImage(url)">
            <CircleClose />
          </el-icon>
          <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
        </div>
      </div>
    </div>

    <div v-if="preview" class="upload-avatar-btn w-[100px] h-[100px]" @click="handleUploadAvatar">
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
          <image-main ref="imageMainRef" :checked="true" :max="max" @update="handleCheckAvatar"></image-main>
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

const props = defineProps({
  modelValue: [String, Array],
  max: {
    type: Number,
    default: 1
  },
  preview: {
    type: Boolean,
    default: true
  }
});

// 弹框显示
const dialogVisible = ref(false);
const emit = defineEmits(["update:modelValue"]);
// 移除图片
const handleRemoveImage = (url) => {
  const data = props.modelValue.filter(item => item != url);
  emit("update:modelValue", data);
}
// 打开弹框
const callbackFunction = ref(null);
const handleUploadAvatar = (callback = null) => {
  callbackFunction.value = callback;
  dialogVisible.value = true;
};
// 关闭弹框
const handleUploadClose = () => dialogVisible.value = false;

// 图片分类
const imageClasstifyRef = ref(null);
// 创建分类
const handleCreateClassify = () => imageClasstifyRef.value.handleCreate('add');

// 分类图片
const imageMainRef = ref(null);
// 上传图片
const handleUploadImage = () => imageMainRef.value.handleUpload();
// 选中分类
const handleClasstifyCheck = id => imageMainRef.value.handleCurrentId(id);

// 选择图片
const checkAvatar = ref([]);
const handleCheckAvatar = item => {
  if (item && item.url) {
    checkAvatar.value = [...checkAvatar.value, item.url];
  }
}

// 提交
const handleSubmit = () => {
  let value = [];
  if (checkAvatar.value) {
    if (props.max === 1) {
      value = checkAvatar.value.slice(0, props.max);
    }
    else {
      value = props.preview ? [...props.modelValue, ...checkAvatar.value] : [...checkAvatar.value];
      if (value.length > props.max) {
        const max = props.preview ? (props.max - props.modelValue.length) : props.max
        return toast("最多还能选择" + max + "张")
      }
    }
    if (value && props.preview) {
      emit("update:modelValue", value)
    }
    if (!props.preview && typeof callbackFunction.value === "function") {
      callbackFunction.value(value);
    }
  } else {
    toast("请上传头像", "error");
  }
  handleUploadClose();
}


defineExpose({
  handleUploadAvatar
});
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