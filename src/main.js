
/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-19 20:04:25
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-24 10:46:16
 * @FilePath: \shop-admin\src\main.js
 * @Description: 项目入口
 */
import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'default-passive-events';

import router from './router';
import store from './store';
import './utils/auth';
import auth from '@/directives/auth';

import App from './App.vue';

import 'element-plus/dist/index.css';
import 'virtual:windi.css';
import './styles/global.css';
import 'nprogress/nprogress.css';

const app = createApp(App);

app.use(auth);
app.use(router);
app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');