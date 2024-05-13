<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-29 22:17:45
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 14:03:49
 * @FilePath: \shop-admin\src\pages\Shop\components\Banner.vue
 * @Description: 商品规格
-->
<template>
  <drawer-model ref="formDrawerRef" title="设置商品规格" size="70%" destroyOnClose @submit="handleOk">
    <el-form :model="form" label-width="80px">
      <el-form-item label="规格类型" prop="sku_type">
        <el-radio-group v-model="form.sku_type">
          <el-radio :value="0" border>单规格</el-radio>
          <el-radio :value="1" border>多规格</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.sku_type === 0">
        <el-form-item label="市场价格">
          <el-input v-model="form.sku_value.oprice" style="width:35%;">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销售价格">
          <el-input v-model="form.sku_value.pprice" style="width:35%;">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="成本价格">
          <el-input v-model="form.sku_value.cprice" style="width:35%;">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.sku_value.weight" style="width:35%;">
            <template #append>公斤</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品体积">
          <el-input v-model="form.sku_value.volume" style="width:35%;">
            <template #append>立方米</template>
          </el-input>
        </el-form-item>
      </template>
      <template v-else>
        <SkusCard />
        <SkusTable />
      </template>
    </el-form>
  </drawer-model>
</template>
<script setup>
import { ref, reactive } from 'vue';

import DrawerModel from '@/components/DrawerModel/index.vue';
import SkusCard from '../components/SkusCard/index.vue';
import SkusTable from './SkusTable.vue';

import {
  readGood,
  updateGoodSkus
} from '@/api/shop';
import { toast } from '@/utils/common';

import {
  goodsId,
  initSkuCardList,
  sku_list
} from '@/hooks/useSkus';

// 抽屉弹框
const formDrawerRef = ref(null);

const form = reactive({
  sku_type: 0,
  sku_value: {
    oprice: 20,
    pprice: 30,
    cprice: 20,
    weight: 10,
    volume: 20
  },
})

const open = async item => {
  const { id } = item;
  goodsId.value = id;
  item.skusLoading = true;
  const { sku_type, sku_value } = await readGood({ id: item.id }).finally(() => item.skusLoading = false);
  form.sku_type = sku_type;
  form.sku_value = sku_value || { oprice: 0, pprice: 0, cprice: 0, weight: 0, volume: 0 };
  initSkuCardList(item);
  formDrawerRef.value.open();
}

const emit = defineEmits(["refresh"]);
const handleOk = async () => {
  formDrawerRef.value.showLoading();
  let data = {
    sku_type: form.sku_type,
    sku_value: form.sku_value
  };
  if (form.sku_type == 1) {
    data.goodsSkus = sku_list.value;
  }
  await updateGoodSkus({ id: goodsId.value, ...data }).finally(() => formDrawerRef.value.hideLoading());
  formDrawerRef.value.close();
  emit("refresh");
  toast("商品规格设置成功");
}

defineExpose({
  open
});
</script>
