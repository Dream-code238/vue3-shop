/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-12 19:29:07
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-12 22:20:45
 * @FilePath: \shop-admin\src\api\setting.js
 * @Description: 系统设置
 */
import request from '@/utils/request';

// 获取原有系统设置
export const getSysConfig = data => {
  return request.get(`/admin/sysconfig`, data);
}

// 修改系统设置
export const setSysConfig = data => {
  return request.post(`/admin/sysconfig`, data);
}

// 上传文件
export const uploadAction = '/api/admin/sysconfig/upload';