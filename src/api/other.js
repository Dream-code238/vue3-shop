/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-24 11:13:39
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 12:16:43
 * @FilePath: \shop-admin\src\api\other.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request from '@/utils/request';

// 图库分类列表
export const getClasstifyList = data => {
  const { page, limit } = data;
  return request.get(`/admin/image_class/${page}?limit=${limit}`);
}
// 新增图库分类
export const addImageClasstify = data => {
  return request.post('/admin/image_class', data);
}

// 更新图库分类
export const updateImageClasstify = data => {
  
  const { id, name, order } = data;

  return request.post(`/admin/image_class/${id}`, { name, order });
}

// 删除图库分类
export const deleteImageClasstify = data => {
  const { id } = data;
  return request.post(`/admin/image_class/${id}/delete`);
}

// 分类下的图库列表
export const getClasstifyImage = data => {
  const { page, limit, id } = data;
  
  return request.get(`/admin/image_class/${id}/image/${page}?limit=${limit}`);
}

// 图片重命名
export const updateImageName = data => {
  const { id, name } = data;
  return request.post(`/admin/image/${id}`, { name });
}

// 删除图片
export const deleteImage = data => {
  return request.post(`/admin/image/delete_all`, data);
}

// 上传图片
export const uploadImage = '/api/admin/image/upload';

// 获取公告列表
export const noticeList = data => {
  const { page, limit } = data;
  return request.get(`/admin/notice/${page}?limit=${limit}`, data);
}

// 添加公告
export const addNotice = data => {
  return request.post('/admin/notice', data);
}

// 删除公告
export const deleteNotice = data => {
  const { id } = data;
  return request.post(`/admin/notice/${id}/delete`, {});
}

// 更新公告
export const updateNotice = data => {
  const { id, title, content } = data;
  return request.post(`/admin/notice/${id}`, { title, content });
}