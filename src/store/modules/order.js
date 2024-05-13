/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 14:46:38
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 20:40:38
 * @FilePath: \shop-admin\src\store\modules\other.js
 * @Description: 订单模块
 */

const order = {
  namespaced: true,
  state: () => {

    return {
      orderList: []
    };
  },

  mutations: {
    SET_ORDERLIST(state, data) {
      state.orderList = data;
    }
  },
  actions: {}
};


export default order;