<template>
  <el-drawer title="物流信息" v-model="dialogVisible" size="40%">

    <el-card shadow="never" class="border-0 mb-3">
      <div class="flex items-center">
        <el-image :src="info.logo" fit="fill" :lazy="true" style="width: 60px;height: 60px;"
          class="rounded border"></el-image>
        <div class="ml-3">
          <p>物流公司：{{ info.typename }}</p>
          <p>物流单号：{{ info.number }}</p>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="border-0 border-t">
      <el-timeline class="ml-[-40px]">
        <el-timeline-item :timestamp="item.time" placement="top" v-for="(item, index) in info.list" :key="index">
          {{ item.status }}
        </el-timeline-item>
      </el-timeline>
    </el-card>

  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { getShipInfo } from '@/api/order';

const dialogVisible = ref(false);
const info = ref({});

// 打开
const open = id => {
  return getShipInfo({ id })
    .then(res => {
      if (res.status != 0) {
        return toast(res.msg, 'error');
      }
      info.value = res.result;
      dialogVisible.value = true;
    });
};
// 关闭
const close = () => dialogVisible.value = false;

defineExpose({
  open
});
</script>