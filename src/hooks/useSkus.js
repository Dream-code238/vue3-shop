/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-30 21:05:10
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-01 18:18:47
 * @FilePath: \shop-admin\src\hooks\useSkus.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE;
 */

import { ref, nextTick, computed } from 'vue';
import {
  addGoodSkusOptions,
  updateGoodSkusOptions,
  deleteGoodSkusOptions,
  sortGoodSkusOptions,
  addGoodSkusOptionsValue,
  updateGoodSkusOptionsValue,
  deleteGoodSkusOptionsValue,
  setGoodSkusOptionsValue
} from '@/api/shop';
import {
  useArrayMoveUp,
  useArrayMoveDown,
  cartesianProductOf
} from '@/utils/common';

// 当前商品ID
export const goodsId = ref(0);

// 规格选项列表
export const sku_card_list = ref([]);

export const sku_list = ref([]);

export const initSkuCardList = item => {
  const { goods_skus_card, goods_skus } = item;
  sku_card_list.value = goods_skus_card.map(item => {
      item.text = item.name;
      item.loading = false;
      item.goods_skus_card_value.map(v => {
          v.text = v.value || "属性值";
          return v;
      });
      return item;
  });

  sku_list.value = goods_skus;
}


// 初始化规格的值
export function initSkusCardItem(id) {
    const item = sku_card_list.value.find(item => item.id == id);
    const loading = ref(false);
    const inputValue = ref('');
    const inputVisible = ref(false);
    const InputRef = ref(null);

    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value.input.focus()
      });
    }

    const handleSkusValueAdd = () => {
      if(!inputValue.value){
        inputVisible.value = false;
        return;
      }
      loading.value = true;
      addGoodSkusOptionsValue({ goods_skus_card_id: id, name: item.name, order: 50, value: inputValue.value})
      .then(result=>{
        item.goods_skus_card_value.push({
            ...result,
            text: result.value
        });
        initTableData();
      })
      .finally(()=>{
        inputVisible.value = false;
        inputValue.value = '';
        loading.value = false;
      })
    }

    const handleUpdateSkusValue = (value, tag) => {
      loading.value = true;
      updateGoodSkusOptionsValue({id: tag.id, goods_skus_card_id: id, name: item.name, order: tag.order, value: value })
      .then(() => {
        tag.value = value;
        initTableData();
      })
      .catch(() => {
        tag.text = tag.value;
      })
      .finally(()=>{
        loading.value = false;
      });
    }

    const handleCloseSkusValue = tag => {
      loading.value = true
      deleteGoodSkusOptionsValue({ id: tag.id })
      .then(() => {
        const i = item.goods_skus_card_value.findIndex( o => o.id === tag.id);
        if(i != -1){
          item.goods_skus_card_value.splice(i,1);
        }
        initTableData();
      })
      .finally(() => loading.value = false);
    }

    return {
        item,
        loading,
        inputValue,
        inputVisible,
        InputRef,
        showInput,
        handleSkusValueAdd,
        handleUpdateSkusValue,
        handleCloseSkusValue
    };
};


// 添加规格选项
export const addSkuLoading = ref(false);
export const addSkuCardEvent = async () => {
    addSkuLoading.value = true;
    const result = await addGoodSkusOptions({ goods_id: goodsId.value, name: "规格选项", order: 50, type: 0})
        .finally(() => addSkuLoading.value = false);
    sku_card_list.value.push({
        ...result,
        text: result.name,
        loading: false,
        goods_skus_card_value: []
    });
}


// 修改规格选项
export const updateSkuCardEvent = item => {
    item.loading = true;
    updateGoodSkusOptions({
        id: item.id,
        goods_id: item.goods_id,
        name: item.text,
        order: item.order,
        type: 0
    })
      .then(() => item.name = item.text)
      .catch(() => item.text = item.name)
      .finally(() => item.loading = false);
}


// 删除规格选项
export const deleteSkuCardEvent = item => {
    item.loading = true;
    deleteGoodSkusOptions({ id: item.id })
        .then(res => {
            const i = sku_card_list.value.findIndex(o => o.id == item.id);
            if (i != -1) {
                sku_card_list.value.splice(i, 1);
            }
            initTableData();
        })
}


// 排序规格选项
export const sortSkuLoading = ref(false);
export const sortSkuCardEvent = (action, index) => {
  const data = JSON.parse(JSON.stringify(sku_card_list.value));
  const func = action == "up" ? useArrayMoveUp : useArrayMoveDown;
  func(data, index);
  const sortData = data.map((item, i) => ({ id: item.id, order: i + 1 }));
    sortSkuLoading.value = true;
    sortGoodSkusOptions({ sortdata: sortData })
      .then(() => {
        func(sku_card_list.value, index);
        initTableData();
      })
      .finally(() => sortSkuLoading.value = false)
}


// 选择设置规格
export const handleSeletSetGoodsSkusCard = data => {
    const { id, name, value } = data;
    const item = sku_card_list.value.find(item => item.id == id);
    item.loading = true
    setGoodSkusOptionsValue({ id, name, value })
    .then(res=>{
        item.name = item.text = res.goods_skus_card.name;
        item.goods_skus_card_value = res.goods_skus_card_value.map(o=>{
            o.text = o.value || "属性值";
            return o;
        });
        initTableData();
    })
    .finally(()=>{
        item.loading = false;
    })
}



// 初始化表格
export const initSkuTable = () => {
    const skuLabels = computed(() => sku_card_list.value.filter(v => v.goods_skus_card_value.length > 0));

    // 获取表头
    const tableThead = computed(()=>{
      const length = skuLabels.value.length;
      return [
        {
          name:"商品规格",
          colspan:length,
          width:"",
          rowspan:length > 0 ? 1 : 2
        },
        {
          name:"销售价",
          width:"100",
          rowspan:2
        },
        {
          name:"市场价",
          width:"100",
          rowspan:2
        },
        {
          name:"成本价",
          width:"100",
          rowspan:2
        },
        {
          name:"库存",
          width:"100",
          rowspan:2
        },
        {
          name:"体积",
          width:"100",
          rowspan:2
        },
        {
          name:"重量",
          width:"100",
          rowspan:2
        },
        {
          name:"编码",
          width:"100",
          rowspan:2
        }
      ]
    })

    return {
        skuLabels,
        tableThead,
        sku_list
    }
}

const getBeforeSkuItem = (skus,beforeSkuList) =>{
    const skusId = skus.sort((a,b) => a.id - b.id).map(s => s.id).join(",");
    return beforeSkuList.find(o=>{
      if(skus.length > o.skus.length){
        return skusId.indexOf(o.skusId) != -1;
      }
      return o.skusId.indexOf(skusId) != -1;
    })
}

// 获取规格表格数据
const initTableData = () => {
    setTimeout(() => {
     
      if(sku_card_list.value.length === 0) return [];

      let list = []
      sku_card_list.value.forEach(item =>{
          if(item.goods_skus_card_value && item.goods_skus_card_value.length > 0){
              list.push(item.goods_skus_card_value);
          }
      });

      if(list.length == 0){
          return [];
      }

      let arr = cartesianProductOf(...list);
       
      
      // 获取之前的规格列表，将规格ID排序之后转化成字符串
      let beforeSkuList = JSON.parse(JSON.stringify(sku_list.value)).map(o=>{
        if(!Array.isArray(o.skus)){
          o.skus = Object.keys(o.skus).map(k=>o.skus[k]);
        }
        o.skusId = o.skus.sort((a,b)=>a.id - b.id).map(s=>s.id).join(",");
        return o;
      })

      sku_list.value = [];
      sku_list.value = arr.map(skus=>{
          let o = getBeforeSkuItem(JSON.parse(JSON.stringify(skus)),beforeSkuList);
          return {
            code: o?.code || "",
            cprice:o?.cprice || "0.00",
            goods_id: goodsId.value,
            image: o?.image || "",
            oprice: o?.oprice || "0.00",
            pprice: o?.pprice || "0.00",
            skus,
            stock:o?.stock ||  0,
            volume:o?.volume ||  0,
            weight:o?.weight ||  0,
          }
      })
    }, 200)
}

