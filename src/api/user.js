/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-10 14:22:07
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 16:31:53
 * @FilePath: \shop-admin\src\api\user.js
 * @Description: 用户管理
 */
import request from '@/utils/request';

// 用户列表
export const getUserList = data => {
  const { page = 1, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}&`);
    }
  }

  const url = `?${parms.join('&')}}`;
  return request.get(`/admin/user/${page}${url}`, data);
}


// 增加用户
export const addUser = data => {
  return request.post('/admin/user', data);
}


// 修改用户
export const updateUser = data => {
  const { id } = data;
  return request.post(`/admin/user/${id}`, data);
}


// 修改用户状态
export const updateUserStatus = data => {
  const { id } = data;
  return request.post(`/admin/user/${id}/update_status`, data);
}

// 删除用户
export const deleteUser = data => {
  const { id } = data;
  return request.post(`/admin/user/${id}/delete`, data);
}




// 会员等级列表
export const getLevelList = data => {
  const { page, limit } = data;
  return request.get(`/admin/user_level/${page}`, data);
}


// 增加会员等级
export const addLevel = data => {
  return request.post('/admin/user_level', data);
}


// 修改会员等级
export const updateLevel = data => {
  const { id } = data;
  return request.post(`/admin/user_level/${id}`, data);
}


// 修改会员等级状态
export const updateLevelStatus = data => {
  const { id } = data;
  return request.post(`/admin/user_level/${id}/update_status`, data);
}


// 删除会员等级
export const deleteLevel = data => {
  const { id } = data;
  return request.post(`/admin/user_level/${id}/delete`, data);
}

