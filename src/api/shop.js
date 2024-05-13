/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-25 19:54:23
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-02 00:17:01
 * @FilePath: \shop-admin\src\api\shop.js
 * @Description: 商品管理接口
 */

import request from '@/utils/request';


// 商品列表
export const getGoodsList = data => {
  const { page, ...otherPames } = data;

  const parms = [];
  for (let key in otherPames) {
    if (otherPames[key]) {
      parms.push(`${key}=${otherPames[key]}&`);
    }
  }

  const url = `?${parms.join('&')}}`;

  return request.get(`/admin/goods/${page}${url.slice(0, url.length - 2)}`, {});
}

// 新增商品
export const addGood = data => {
  return request.post('/admin/goods', data);
}

// 更新商品
export const updateGood = data => {
  const { id } = data;
  return request.post(`/admin/goods/${id}`, data);
}

// 批量上架下架商品
export const updateGoodStatus = data => {
  return request.post(`/admin/goods/changestatus`, data);
}

// 批量删除商品
export const deleteGood = data => {
  return request.post(`/admin/goods/delete_all`, data);
}

// 批量恢复商品
export const resetGoodStatus = data => {
  return request.post(`/admin/goods/restore`, data);
}

// 彻底删除商品
export const deleteGoodDestroy = data => {
  return request.post(`/admin/goods/destroy`, data);
}

// 审核商品
export const checkGood = data => {
  const { id } = data;
  return request.post(`/admin/goods/${id}/check`, data);
}

// 设置商品轮播图
export const setGoodBanner = data => {
  const { id } = data;
  return request.post(`/admin/goods/banners/${id}`, data);
}

// 查看商品资料
export const readGood = data => {
  const { id } = data;
  return request.get(`/admin/goods/read/${id}`, data);
}

// 更新商品规格
export const updateGoodSkus = data => {
  const { id } = data;
  return request.post(`/admin/goods/updateskus/${id}`, data);
}

// 添加商品规格选项
export const addGoodSkusOptions = data => {
  return request.post(`/admin/goods_skus_card`, data);
}

// 修改商品规格选项
export const updateGoodSkusOptions = data => {
  const { id } = data;
  return request.post(`/admin/goods_skus_card/${id}`, data);
}

// 删除商品规格选项
export const deleteGoodSkusOptions = data => {
  const { id } = data;
  return request.post(`/admin/goods_skus_card/${id}/delete`, data);
}

// 排序商品规格选项
export const sortGoodSkusOptions = data => {
  return request.post(`/admin/goods_skus_card/sort`, data);
}

// 添加商品规格选项的值
export const addGoodSkusOptionsValue = data => {
  return request.post(`/admin/goods_skus_card_value`, data);
}

// 修改商品规格选项的值
export const updateGoodSkusOptionsValue = data => {
  const { id } = data;
  return request.post(`/admin/goods_skus_card_value/${id}`, data);
}

// 删除商品规格选项的值
export const deleteGoodSkusOptionsValue = data => {
  const { id } = data;
  return request.post(`/admin/goods_skus_card_value/${id}/delete`, data);
}

// 选择设置商品规格选项和值
export const setGoodSkusOptionsValue = data => {
  const { id } = data;
  return request.post(`/admin/goods_skus_card/${id}/set`, data);
}

// 商品分类列表
export const getCategoryList = data => {
  return request.get('/admin/category', {});
}

// 增加商品分类
export const addCategory = data => {
  return request.post('/admin/category', data);
}

// 修改商品分类
export const updateCategory = data => {
  const { id } = data;
  return request.post(`/admin/category/${id}`, data);
}

// 删除商品分类
export const deleteCategory = data => {
  const { id } = data;
  return request.post(`/admin/category/${id}/delete`, data);
}

// 更新商品分类状态
export const updateCategoryStatus = data => {
  const { id, status } = data;
  return request.post(`/admin/category/${id}/update_status`, { status });
}

// 分类关联产品列表
export const getCategoryProducts = data => {
  const { category_id } = data;
  return request.get(`/admin/app_category_item/list?category_id=${category_id}`, data);
}

// 删除关联产品
export const deleteCategoryProduct = data => {
  const { id } = data;
  return request.post(`/admin/app_category_item/${id}/delete`, data);
}

// 关联产品
export const addCategoryProduct = data => {
  return request.post(`/admin/app_category_item`, data);
}


// 获取规格列表
export const getSkusList = data => {
  const { page } = data;
  return request.get(`/admin/skus/${page}`, {});
}

// 新增规格
export const addSkus = data => {
  return request.post(`/admin/skus`, data);
}

// 更新规格
export const updateSkus = data => {
  const { id } = data;
  return request.post(`/admin/skus/${id}`, data);
}

// 删除规格
export const deleteSkus = data => {
  return request.post(`/admin/skus/delete_all`, data);
}

// 更新规格状态
export const updateSkusStatus = data => {
  const { id, status } = data;
  return request.post(`/admin/skus/${id}/update_status`, { status });
}

// 获取优惠券列表
export const getCouponList = data => {
  const { page } = data;
  return request.get(`/admin/coupon/${page}`, {});
}


// 新增优惠券
export const addCoupon = data => {
  return request.post(`/admin/coupon`, data);
}

//  更新优惠券
export const updateCoupon = data => {
  const { id } = data;
  return request.post(`/admin/coupon/${id}`, data);
}

// 删除优惠券
export const deleteCoupon = data => {
  const { id } = data;
  return request.delete(`/admin/coupon/${id}`);
}

// 获取优惠券详情
export const updateCouponStatus = data => {
  const { id } = data;
  return request.post(`/admin/coupon/${id}/update_status`, data);
}