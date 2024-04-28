<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">订单统计</span>
        <div>
          <el-check-tag v-for="item in checkOptions" :key="item.value" :checked="current === item.value"
            style="margin-right: 8px;" @click="handleTagCheck(item)">
            {{ item.label }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <div ref="el" id="chart" style="width: 100%;height: 300px;"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core';

import {
  getOrderCount
} from '@/api/home';


const store = useStore();
// 图标
let myChart;
// 监听元素等比例缩放
const el = ref(null);
// 订单数量时间选择
const current = ref('month');

const checkOptions = [
  {
    label: '近1个月',
    value: 'month'
  },
  {
    label: '近1个周',
    value: 'week'
  },
  {
    label: '近24小时',
    value: 'hour'
  }
]

// 获取订单数量
const initLoadList = async type => {
  myChart.showLoading();
  const { x, y } = await getOrderCount({ type })
    .finally(() => {
      myChart.hideLoading();
    });
  const option = {
    xAxis: {
      type: 'category',
      data: x
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: y,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  option && myChart.setOption(option);
}

onMounted(() => {
  const chartDom = document.getElementById('chart');

  myChart = echarts.init(chartDom);

  initLoadList(current.value);
});

//优化手段： 组件销毁图标释放 避免白屏 
onBeforeUnmount(() => {
  if (myChart) myChart.dispose();
});

// 时间选择
const handleTagCheck = async evt => {
  current.value = evt.value;
  initLoadList(evt.value);
}
//优化手段： 监听缩放变化
useResizeObserver(el, entries => {
  const entry = entries[0]
  const { width } = entry.contentRect
  myChart.resize({ width });
});
</script>