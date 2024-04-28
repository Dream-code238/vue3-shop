<template>
  <el-row :gutter="20" class="my-5">
    <el-col :span="3" :offset="0" v-for="(item, index) in iconNavs" :key="index">
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="flex flex-col items-center justify-center cursor-pointer">
          <el-icon :size="16" :class="item.color">
            <component :is="item.icon" />
          </el-icon>
          <span class="text-sm mt-2">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { iconNavs } from '@/contants';

</script>