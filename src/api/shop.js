/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-25 19:54:23
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-28 14:23:43
 * @FilePath: \shop-admin\src\api\shop.js
 * @Description: 商品管理接口
 */

import request from '@/utils/request';


// 订单 销售 用户 数量
export const getGoodsList = data => {
  const { page, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    parms.push(`${key}=${otherPames[key]}&`);
  }

  const url = `?${parms.join('&')}}`;

  return request.get(`/admin/goods/${page}${url}`, {});
}


// 获取规格列表
export const getSkusList = data => {
  const { page } = data;
  return request.get(`/admin/skus/${page}`, {});
}

// 新增规格
export const addSkus = data => {
  return request.post(`/admin/skus`, data);
}

// 更新规格
export const updateSkus = data => {
  const { id } = data;
  return request.post(`/admin/skus/${id}`, data);
}

// 删除规格
export const deleteSkus = data => {
  return request.post(`/admin/skus/delete_all`, data);
}

// 更新规格状态
export const updateSkusStatus = data => {
  const { id, status } = data;
  return request.post(`/admin/skus/${id}/update_status`, { status });
}

// 获取优惠券列表
export const getCouponList = data => {
  const { page } = data;
  return request.get(`/admin/coupon/${page}`, {});
}


// 新增优惠券
export const addCoupon = data => {
  return request.post(`/admin/coupon`, data);
}

//  更新优惠券
export const updateCoupon = data => {
  const { id } = data;
  return request.post(`/admin/coupon/${id}`, data);
}

// 删除优惠券
export const deleteCoupon = data => {
  const { id } = data;
  return request.delete(`/admin/coupon/${id}`);
}