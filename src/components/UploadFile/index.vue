<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 22:46:26
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 21:36:57
 * @FilePath: \shop-admin\src\components\UploadFile.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-upload drag :action="uploadImage" :headers="{ token }" name="img" :data="data" :on-success="uploadSuccess"
    :on-error="uploadError" multiple>
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup>

import { uploadImage } from '@/api/other';
import { getToken, toast } from '@/utils/common';

const token = getToken();

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['success']);

// 上传成功
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response, uploadFile, uploadFiles);
  emit('success', { response, uploadFile, uploadFiles });
}

// 上传失败
const uploadError = (error, uploadFile, uploadFiles) => {
  toast(JSON.parse(error.message).msg, 'error');
}


</script>
