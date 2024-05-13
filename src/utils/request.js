/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-20 20:00:12
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-11 21:44:06
 * @FilePath: \shop-admin\src\utils\request.js
 * @Description: 接口请求二次封装 路由相应拦截
 */
import axios from 'axios';

import { getToken, toast } from './common';
import store from '../store';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 在header中添加token

    const token = getToken('admin-token');

    if (token) {
      config.headers['token'] = token;
    }
    
    return config;
  }, 
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const contentType = response.headers['content-type'];
    
    // 对响应数据做点什么
    if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      return response.data;
    }
    return  response.data.data;
  }, 
  error => {
    // 对响应错误做点什么 响应拦截器进行统一处理
    const msg = error.response.data.msg || '请求失败';
    if (msg === '非法token，请先登录！') {
      store.dispatch('LOGOUT')
        .finally(() => {

          // 刷新页面
          location.reload();

        });
    }

    toast(msg, 'error');

    return Promise.reject(error);
  }
);



export default service;