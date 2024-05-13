<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-30 18:52:12
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 12:02:46
 * @FilePath: \shop-admin\src\pages\Shop\components\SkusCardItem.vue
 * @Description: 商品规格项
-->
<template>
  <div v-loading="loading">
    <el-tag v-for="(tag, index) in item.goods_skus_card_value" :key="tag.id" class="mx-1" closable
      :disable-transitions="false" @close="handleCloseSkusValue(tag)" effect="plain">
      <el-input class="w-20 ml-[-10px]" v-model="tag.text" placeholder="选项值" size="small"
        @change="handleUpdateSkusValue($event, tag)"></el-input>
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
      @keyup.enter="handleSkusValueAdd" @blur="handleSkusValueAdd" />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
      + 添加选项值
    </el-button>
  </div>
</template>

<script setup>
import {
  initSkusCardItem
} from '@/hooks/useSkus';

const props = defineProps({
  skuCardId: [Number, String]
});

const {
  item,
  loading,
  inputValue,
  inputVisible,
  InputRef,
  showInput,
  handleSkusValueAdd,
  handleUpdateSkusValue,
  handleCloseSkusValue
} = initSkusCardItem(props.skuCardId);
</script>