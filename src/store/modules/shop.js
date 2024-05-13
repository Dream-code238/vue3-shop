/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 14:46:38
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-28 19:21:51
 * @FilePath: \shop-admin\src\store\modules\other.js
 * @Description: 商品模块
 */

const shop = {
  namespaced: true,
  state: () => {

    return {
      // 商品分类列表
      categoryList: []
    };
  },

  mutations: {
    SET_CATEGORYLIST(state, data) {
      state.categoryList = data;
    }
  },
  actions: {}
};


export default shop;