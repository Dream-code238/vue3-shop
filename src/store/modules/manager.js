/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-23 14:16:23
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 21:07:32
 * @FilePath: \shop-admin\src\store\modules\manager.js
 * @Description: 管理员管理模块
 */

import {
  login,
  getUserInfo,
  logout,
  updatePassword
} from '@/api/manager';
import { setToken, removeToken } from '@/utils/common';

const manager = {
  namespaced: true,
  state: () => {

    return {
      userInfo: {},
      menus: [],
      role: {},
      ruleNames: [],
      asideWidth: '250px',
      // 侧边栏是否折叠
      isCollapse: false
    }
  },

  mutations: {
    // 用户信息
    SET_USERINFO (state, data) {
      state.userInfo = data;
    },
    // 侧边菜单导航
    SET_MENUS (state, data) {
      state.menus = data;
    },
    // 角色权限
    SET_RULENAMES (state, data) {
      state.ruleNames = data;
    },
    // 侧边栏是否折叠
    SET_COLLAPSE (state, data) {
      state.isCollapse = data;
    },
    // 侧边栏宽度
    SET_ASIDEWIDTH (state, data) {
      state.asideWidth = data;
    }
  },
  actions: {
    // 登录
    LOGIN(state, data) {

      return new Promise((resolve, reject) => {
        login(data)
          .then(result => {
            const { token } = result;

            // 存储用户信息和token
            setToken(token);

            resolve(result);
          })
          .catch(error => {

            reject(error);

          });
      })
    },
    // 获取用户信息
    GET_USERINFO(state) {

      return new Promise((resolve, reject) => {

        getUserInfo()
          .then(result => {
            const { menus, ruleNames } = result;
            // 存储用户信息
            state.commit('SET_USERINFO', result);

            // 侧边菜单导航
            state.commit('SET_MENUS', menus);

            // 角色权限
            state.commit('SET_RULENAMES', ruleNames);

            resolve(result);
          })
          .catch(error => {

            reject(error);

          });
      })
    },
    // 退出登录
    LOGOUT(state) {

      return new Promise((resolve, reject) => {
        
        logout()
          .finally(() => {
            // 移除cookie里地token
            removeToken();

            // 清除当前用户状态vuex
            state.commit('SET_USERINFO', {});

            resolve();
            
          })
          .catch(error => {

            reject(error);

          });
      });
    },
    // 修改密码
    UPDATE_PASSWORD(state, data) {
      
      return new Promise((resolve, reject) => {

        updatePassword(data)
          .then(() => {

            resolve();
            
          })
          .catch(error => {

            reject(error);

          });
      })
    }
  }
};


export default manager;