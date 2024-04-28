/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-20 22:05:41
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-26 15:31:30
 * @FilePath: \shop-admin\src\store\index.js
 * @Description: 状态管理
 */
import { createStore } from 'vuex';

import home from './modules/home';
import shop from './modules/shop';
import user from './modules/user';
import order from './modules/order';
import manager from './modules/manager';
import setting from './modules/setting';
import distribution from './modules/distribution';
import other from './modules/other';


// 创建一个新的 store 实例
const store = createStore({
  modules: {
    home,
    shop,
    user,
    order,
    manager,
    setting,
    distribution,
    other
  }
});


export default store;