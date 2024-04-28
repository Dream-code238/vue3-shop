/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 13:15:26
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-23 14:30:40
 * @FilePath: \shop-admin\src\utils\perssion.js
 * @Description: 路由守卫
 */
import router, { addRoute } from '../router';
import {
  getToken,
  toast,
  showFullLoading,
  hiddenFullLoading
} from './common';
import store from '../store';

let hasGetInfo = false;

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading();
  
  const token = getToken();

  // 没有登录，强制跳转到登录页面
  if (!token && to.path != '/login') {
    toast('请先登录', 'error');
    return next({ path: '/login' });
  }

  // 防止重复登录
  if (token && to.path == '/login') {
    toast('请勿重复登录', 'error');
    return next({ path: from.path ? from.path : '/' });
  }

  // 如果用户登录了，自动获取用户信息，并存储在vuex中
  let hasNewRoutes = false;
  if (token && !hasGetInfo) {
    
    const { menus } = await store.dispatch('manager/GET_USERINFO');

    hasGetInfo = true;
    
    hasNewRoutes = addRoute(menus);

  }

  // 设置页面地标题
  const title = `${to.meta.title ? to.meta.title : ''}-电商后台管理系统`
  document.title = title;
  
  hasNewRoutes ? next(to.fullPath) : next();
});


// 全局后置守卫
router.afterEach((to, from) => hiddenFullLoading());