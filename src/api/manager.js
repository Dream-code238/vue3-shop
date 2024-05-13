/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-20 20:03:15
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 21:05:51
 * @FilePath: \shop-admin\src\api\manager.js
 * @Description: 管理员管理接口
 */
import request from '@/utils/request';

// 登录
export const login = data => {
  return request.post('/admin/login', data);
}

// 获取管理员信息和权限菜单
export const getUserInfo = () => {
  return request.post('/admin/getinfo', {});
}

// 退出登录
export const logout = () => {
  return request.post('/admin/logout', {});
}

// 修改密码
export const updatePassword = data => {
  return request.post('/admin/updatepassword', data);
}


// 获取管理员列表 
export const getManagerList = data => {
  const { page = 1, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}&`);
    }
  }

  const url = `?${parms.join('&')}}`;
  
  return request.get(`/admin/manager/${page}${url}`, {});
}

// 添加管理员
export const addManager = data => {
  return request.post('/admin/manager', data);
}

// 更新状态
export const updateManStatus = data => {
  const { id, ...otherParams } = data;

  return request.post(`/admin/manager/${id}/update_status`, otherParams);
}

// 删除管理员
export const deleteManager = data => {
  const { id } = data;

  return request.post(`/admin/manager/${id}/delete`, {});
}

// 更新管理员状态
export const updateManager = data => {
  const { id, ...otherParams } = data;

  return request.post(`/admin/manager/${id}`, otherParams);
}



// 菜单权限列表
export const getRuleList = data => {
  const { page, ...otherParams } = data;
  return request.get(`/admin/rule/${page}`, otherParams);
}

// 添加菜单权限
export const addRule = data => {
  return request.post(`/admin/rule`, data);
}

// 更新菜单权限
export const updateRule = data => {
  const { rule_id, ...otherParams } = data;
  return request.post(`/admin/rule/${rule_id}`, otherParams);
}

// 删除菜单权限
export const deleteRule = data => {
  const { id, ...otherParams } = data;
  return request.post(`/admin/rule/${id}/delete`, otherParams);
}

// 更新菜单权限状态
export const updateRuleStatus = data => {
  const { id, ...otherParams } = data;
  return request.post(`/admin/rule/${id}/update_status`, otherParams);
}


// 获取角色列表
export const getRoleList = data => {
  const { page, ...otherParams } = data;
  return request.get(`/admin/role/${page}`, otherParams);
}

// 新增角色
export const addRole = data => {
  return request.post(`/admin/role`, data);
}

// 更新角色
export const updateRole = data => {
  const { id, ...otherParams } = data;
  return request.post(`/admin/role/${id}`, otherParams);
}

// 删除角色
export const deleteRole = data => {
  const { id, ...otherParams } = data;
  return request.post(`/admin/role/${id}/delete`, otherParams);
}

// 更新角色状态
export const updateRoleStatus = data => {
  const { id, ...otherParams } = data;
  return request.post(`/admin/role/${id}/update_status`, otherParams);
}

// 配置角色权限
export const updateRoleRule = data => {
  return request.post(`/admin/role/set_rules`, data);
}






