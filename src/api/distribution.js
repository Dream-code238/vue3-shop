/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-29 15:26:08
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 13:27:04
 * @FilePath: \shop-admin\src\api\distribution.js
 * @Description: 分销管理接口
 */

import request from '@/utils/request';


// 分销统计
export const getDistributionCount = () => {
  return request.get('/admin/agent/statistics');
}

// 分销推广员列表
export const getAgentList = data => {
  const { page = 1, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}&`);
    }
  }
  const url = `?${parms.join('&')}`;
  return request.get(`/admin/agent/${page}${url}`, data);
}

// 推广订单列表
export const getOrderList = data => {
  const { page = 1, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}`);
    }
  }
  const url = `?${parms.join('&')}`;
  return request.get(`/admin/user_bill/${page}${url}`, data);
}

// 修改分销配置
export const SetConfig = data => {
  return request.post('/admin/distribution_setting/set', data);
}

// 获取分销配置
export const getConfig = data => {
  return request.get('/admin/distribution_setting/get', data);
}