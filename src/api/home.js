/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-23 14:10:05
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 18:06:31
 * @FilePath: \shop-admin\src\api\home.js
 * @Description: 主控制台
 */

import request from '@/utils/request';


// 订单 销售 用户 数量
export const getOrderList = () => {
  return request.get('/admin/statistics1');
}

// 商店交易
export const getShopTransaction = () => {
  return request.get('/admin/statistics2');
}

// 订单统计
export const getOrderCount = data => {
  const { type } = data;
  return request.get(`/admin/statistics3?type=${type}`);
}
