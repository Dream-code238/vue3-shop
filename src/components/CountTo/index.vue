<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-23 16:40:43
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-23 17:07:05
 * @FilePath: \shop-admin\src\pages\Home\components\CountTo.vue
 * @Description: 数字滚动动画组件
-->
<template>
  {{ d.num.toFixed(0) }}
</template>


<script setup>
import { reactive, watch } from 'vue';
import gsap from 'gsap';

// 接受父组件可传入的值
const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

// 内容显示
const d = reactive({
  num: 0
});

// 动画
const animateToValue = () => {
  gsap.to(d, {
    duration: 0.5,
    num: props.value
  })
}

animateToValue();

// 监听父组件传入的值去执行动画效果
watch(() => props.value, () => animateToValue());
</script>


<style lang="less" scoped></style>