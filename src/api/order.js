/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 11:13:39
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 20:57:34
 * @FilePath: \shop-admin\src\api\other.js
 * @Description: 订单模块
 */

import request from '@/utils/request';

// 订单列表
export const getOrderList = data => {
  const { page = 1, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}&`);
    }
  }
  const url = `?${parms.join('&')}}`;
  return request.get(`/admin/order/${page}${url}`, data);
}

// 批量删除订单
export const deleteOrder = data => {
  return request.post(`/admin/order/delete_all`, data);
}

// 订单发货
export const orderShip = data => {
  const { id } = data;
  return request.post(`/admin/order/${id}/ship`, data);
}

// 拒绝or同意退款
export const handleRefund = data => {
  const { id } = data;
  return request.post(`/admin/order/${id}/handle_refund`, data);
}

// 导出订单
export const exportOrder = data => {
  const parms = [];
  for (let key in data) {
    if (data[key]) {
      parms.push(`${key}=${data[key]}&`);
    }
  }
  const url = `?${parms.join('&')}}`;
  return request.post(`/admin/order/excelexport${url}`, { responseType: 'blob' }, data);
}

// 快递公司列表
export const getCompanyList = data => {
  return request.get(`/admin/express_company/1`, data);
}

// 查看订单物流信息
export const getShipInfo = data => {
  const { id } = data;
  return request.get(`/admin/order/${id}/get_ship_info`, data);
}



// 商品评价列表
export const getCommentList = data => {
  const { page = 1, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}&`);
    }
  }
  const url = `?${parms.join('&')}}`;
  return request.get(`/admin/goods_comment/${page}${url}`,data);
}

// 修改商品评价状态
export const updateCommentStatus = data => {
  const { id } = data;
  return request.post(`/admin/goods_comment/${id}/update_status`, data);
}


// 回复商品评价
export const reviewComment = data => {
  const { id } = data;
  return request.post(`/admin/goods_comment/review/${id}`, data);
}

