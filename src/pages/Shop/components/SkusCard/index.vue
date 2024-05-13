<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-30 18:17:01
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 12:03:37
 * @FilePath: \shop-admin\src\pages\Shop\components\MoreSkus.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form-item label="规格选项" v-loading="sortSkuLoading">
    <el-card shadow="never" class="w-full" v-for="(item, index) in sku_card_list" :key="item.id"
      v-loading="item.loading">
      <template #header>
        <div class="flex items-center justify-between mb-3">
          <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;" @change="updateSkuCardEvent(item)">
            <template #append>
              <el-icon class="cursor-pointer" @click="handleSkuSelect(item)">
                <more />
              </el-icon>
            </template>
          </el-input>
          <div>
            <el-button size="small" @click="sortSkuCardEvent('up', index)" :disabled="index == 0">
              <el-icon>
                <Top />
              </el-icon>
            </el-button>
            <el-button size="small" @click="sortSkuCardEvent('down', index)"
              :disabled="index === (sku_card_list.length - 1)">
              <el-icon>
                <Bottom />
              </el-icon>
            </el-button>
            <el-popconfirm title="是否要删除该选项？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="deleteSkuCardEvent(item)">
              <template #reference>
                <el-button size="small"><el-icon>
                    <Delete />
                  </el-icon></el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
      <SkusCardItem :skuCardId="item.id" />
    </el-card>
    <el-button type="success" size="small" v-loading="addSkuLoading" @click="addSkuCardEvent">添加规格选项</el-button>
  </el-form-item>

  <SkuSelect ref="skuSelectRef" />
</template>


<script setup>
import { ref } from 'vue';

import SkusCardItem from './SkusCardItem.vue';
import SkuSelect from '@/components/SkuSelect/index.vue';

import {
  sku_card_list,
  addSkuLoading,
  addSkuCardEvent,
  updateSkuCardEvent,
  deleteSkuCardEvent,
  sortSkuLoading,
  sortSkuCardEvent,
  handleSeletSetGoodsSkusCard
} from '@/hooks/useSkus';

const skuSelectRef = ref(null);
const handleSkuSelect = (item) => {
  skuSelectRef.value.open(value => {
    handleSeletSetGoodsSkusCard({
      id: item.id,
      name: value.name,
      value: value.list
    });
  });
};
</script>


<style lang="less" scoped>
.el-card__header {
  @apply !p-2 bg-gray-50;
}
</style>