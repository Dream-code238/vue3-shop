<template>
  <div class="icon-select-container flex items-center">
    <el-icon class="mx-2" v-if="modelValue">
      <component :is="modelValue" />
    </el-icon>
    <el-select width="100%" :modelValue="modelValue" placeholder="请选择菜单图标" @change="handleIconChange">
      <el-option v-for="item in icon" :key="item" :label="item" :value="item">
        <div class="flex items-center justify-between">
          <el-icon>
            <component :is="item" />
          </el-icon>
          <span>{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import * as ElementPlusIcons from '@element-plus/icons-vue';

const icon = ref(Object.keys(ElementPlusIcons));

const emit = defineEmits(['update:modelValue']);
const handleIconChange = evt => {
  emit('update:modelValue', evt);
}

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
</script>



<style lang="less" scoped>
.icon-select-container {
  width: 100%;
}
</style>
