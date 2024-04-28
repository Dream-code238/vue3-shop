/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-19 22:09:02
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-22 21:48:06
 * @FilePath: \shop-admin\src\router\index.js
 * @Description: 组件路由
 */
import {
  createRouter,
  createWebHashHistory
} from 'vue-router';


// 动态路由，用于匹配菜单动态添加路由
const asyncRouter = [
  {
    path: '/',
    name: '/',
    meta: {
      title: '主控台'
    },
    component: () => import('@/pages/Home/index.vue')
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    meta: {
      title: '商品管理'
    },
    component: () => import('@/pages/Shop/goodList.vue')
  },
  {
    path: '/category/list',
    name: '/category/list',
    meta: {
      title: '分类管理'
    },
    component: () => import('@/pages/Shop/categoryList.vue')
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    meta: {
      title: '规格管理'
    },
    component: () => import('@/pages/Shop/skusList.vue')
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    meta: {
      title: '优惠券管理'
    },
    component: () => import('@/pages/Shop/couponList.vue')
  },
  {
    path: '/user/list',
    name: '/user/list',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/pages/User/userList.vue')
  },
  {
    path: '/level/list',
    name: '/level/list',
    meta: {
      title: '会员等级'
    },
    component: () => import('@/pages/User/levelList.vue')
  },
  {
    path: '/order/list',
    name: '/order/list',
    meta: {
      title: '订单管理'
    },
    component: () => import('@/pages/Order/orderList.vue')
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    meta: {
      title: '评论管理'
    },
    component: () => import('@/pages/Order/commentList.vue')
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    meta: {
      title: '管理员管理'
    },
    component: () => import('@/pages/Manager/managerList.vue')
  },
  {
    path: '/access/list',
    name: '/access/list',
    meta: {
      title: '权限管理'
    },
    component: () => import('@/pages/Manager/accessList.vue')
  },
  {
    path: '/role/list',
    name: '/role/list',
    meta: {
      title: '角色管理'
    },
    component: () => import('@/pages/Manager/roleList.vue')
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    meta: {
      title: '基础设置'
    },
    component: () => import('@/pages/Setting/baseList.vue')
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    meta: {
      title: '交易设置'
    },
    component: () => import('@/pages/Setting/buyList.vue')
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    meta: {
      title: '物流设置'
    },
    component: () => import('@/pages/Setting/shipList.vue')
  },
  {
    path: '/distribution/index',
    name: '/distribution/index',
    meta: {
      title: '分销员管理'
    },
    component: () => import('@/pages/Distribution/index.vue')
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    meta: {
      title: '分销设置'
    },
    component: () => import('@/pages/Distribution/setting.vue')
  },
  {
    path: '/image/list',
    name: '/image/list',
    meta: {
      title: '图库管理'
    },
    component: () => import('@/pages/Other/imageList.vue')
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    meta: {
      title: '公告管理'
    },
    component: () => import('@/pages/Other/noticeList.vue')
  },
];

// 基础路由 所有用户共享
const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/pages/Layout/index.vue')
  },
  {
    path: '/login',
    meta: {
      title: '登录页'
    },
    component: () => import('@/pages/Login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound/index.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export const addRoute = menus => {

  let hasNewRoutes = false;
  const findRouteByMenu = routes => {

    routes.forEach(route => {

      const item = asyncRouter.find(r => r.path === route.frontpath);

      if (item && !router.hasRoute(item.path)) {
        router.addRoute('layout', item);
        hasNewRoutes = true;
      }

      if (route.child && route.child.length > 0) {
        findRouteByMenu(route.child);
      }
    })
  }

  findRouteByMenu(menus);

  return hasNewRoutes;
}

export default router;