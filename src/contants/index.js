
// 请求方式
export const methods = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' }
];

export const iconNavs = [
  {
    icon: "user",
    color: "text-light-blue-500",
    title: "用户",
    path: "/user/list"
  },
  {
    icon: "shopping-cart",
    color: "text-violet-500",
    title: "商品",
    path: "/goods/list"
  },
  {
    icon: "tickets",
    color: "text-fuchsia-500",
    title: "订单",
    path: "/order/list"
  },
  {
    icon: "chat-dot-square",
    color: "text-teal-500",
    title: "评价",
    path: "/comment/list"
  },
  {
    icon: "picture",
    color: "text-rose-500",
    title: "图库",
    path: "/image/list"
  },
  {
    icon: "bell",
    color: "text-green-500",
    title: "公告",
    path: "/notice/list"
  },
  {
    icon: "set-up",
    color: "text-grey-500",
    title: "配置",
    path: "/setting/base"
  },
  {
    icon: "files",
    color: "text-yellow-500",
    title: "优惠券",
    path: "/coupon/list"
  }
];

export const goodsTab = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '审核中',
    value: 'checking'
  },
  {
    label: '出售中',
    value: 'saling'
  },
  {
    label: '已下架',
    value: 'off'
  },
  {
    label: '库存预警',
    value: 'min_stock'
  },
  {
    label: '回收站',
    value: 'delete'
  }
];

// 订单类型：all全部，nopay待支付，noship待发货，shiped待收货，received已收货，finish已完成，closed已关闭，refunding退款中
export const orderTab = [
  { label: '全部',value: 'all' },
  { label: '待支付',value: 'nopay' },
  { label: '待发货',value: 'noship' },
  { label: '待收货',value: 'shiped' },
  { label: '已收货',value: 'received' },
  { label: '已完成',value: 'finish' },
  { label: '已关闭',value: 'closed' },
  { label: '退款中',value: 'refunding' }
];

export const ORDER_KEY = {
  all: '全部',
  nopay: '待支付',
  noship: '待发货',
  shiped: '待收货',
  received: '已收货',
  finish: '已完成',
  closed: '已关闭',
  refunding: '退款中'
};

// 基础设置
export const baseTab = [
  { label: '注册与访问', value: 'first' },
  { label: '上传设置', value: 'second' },
  { label: 'Api安全', value: 'third' }
]

// 交易设置
export const buyTab = [
  { label: '支付设置', value: 'first' },
  { label: '购物设置', value: 'second' }
];

export const buyData = [
  {
    name:"支付宝支付",
    desc:"该系统支持即时到账接口",
    src:"/alipay.png",
    key:"alipay"
  },
  {
    name:"微信支付",
    desc:"该系统支持微信网页支付和扫码支付",
    src:"/wepay.png",
    key:"wxpay"
  }
];

export const BUY_KEY = {
  alipay: '支付宝支付',
  wxpay: '微信支付'
}
