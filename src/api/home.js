
import request from '@/utils/request';


// 订单 销售 用户 数量
export const getOrderList = () => {
  return request.get('/admin/statistics1');
}

// 商店交易
export const getShopTransaction = () => {
  return request.get('/admin/statistics2');
}

// 订单统计

export const getOrderCount = data => {
  const { type } = data;
  return request.get(`/admin/statistics3?type=${type}`);
}
