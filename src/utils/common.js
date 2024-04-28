/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-20 21:44:09
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-24 22:05:35
 * @FilePath: \shop-admin\src\utils\auth.js
 * @Description: 公共方法
 */
import { useCookies } from '@vueuse/integrations/useCookies';
import nprogress from 'nprogress';

const tokenKey = 'admin-token';

const cookie = useCookies();

// 获取token
export const getToken = () => {
  return cookie.get(tokenKey);
}

// 设置token
export const setToken = token => {
  return cookie.set(tokenKey, token);
}

// 移除token
export const removeToken = () => {
  return cookie.remove(tokenKey);
}


// 成功提示
export const toast = (message, type = 'success', dangerouslyUseHTMLString = true) => {
  ElMessage({
    message,
    type,
    duration: 2000,
    dangerouslyUseHTMLString
  });
};

// 消息确认框
export const messageBox = (message, type = 'warning', title = '提示') => {
  return ElMessageBox.confirm(
    message,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )
}

export const messagePrompt = (title = '', value = '', text = '') => {
  return ElMessageBox.prompt(text, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: value
  });
}


// 显示全屏loading
export const showFullLoading = () => {
  nprogress.start();
}

// 隐藏全屏loading
export const hiddenFullLoading = () => {
  nprogress.done();
}