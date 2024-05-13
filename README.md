<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-19 20:04:25
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 14:51:18
 * @FilePath: \shop-admin\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


# 电商后台管理系统
* 线上地址：http://shopadmin.dishawang.com/#/login
* 接口文档：https://dishaxy.dishait.cn/shopadminapi/

## 技术栈
* vue3
* windicss
* ElementPlus
* vuex
* axios

## 开发进程
* 第一天：框架搭建和配置
  * router
  * windicss
  * ElementPlus
  * vite.config.js配置
* 第二天 登录页开发和功能实现
  * 登录页开发
  * 响应式
  * 图标全局引入
  * 语法糖和组合式api
  * 表单校验
  * axios引入和请求拦截实现交互
  * cookie存储token
  * 常用工具方法封装
  * vuex状态管理
  * 全局路由守卫
  * 退出登录
  * 全局loading进度条
  * 动态标题
* 第三天 后台全局Layout布局开发
  * 布局实现
    * 侧边导航
      * 数据交互
      * 伸展
      * 路由切换
    * 头部导航
      * 刷新
      * 全屏
      * 退出 修改密码
    * 主内容
    * 标签导航
      * 添加
      * 删除
      * 标签路由跳转
  * 通用弹框表单组件封装
  * 组合api代码简化
  * 菜单加载速度优化
  * 页面缓存keep-alive
  * 全局过渡动画
* 第四天 图库模块
  * 图片分类
  * 分类图片
  * 上传组件
* 第五天 公告模块
  * 公告列表
  * 基础功能（增删改）
* 第六天 管理员模块
  * 基础功能（增删改查）
* 第七天 菜单权限模块
  * 基础功能（增删改）
* 第八天 角色模块
  * 基础功能（增删改，权限配置）
* 第九天 商品规格模块
  * 组件服用
  * 拆分组合api实现多选和批量删除
* 第十天 优惠卷模块
  * 基础功能（增晒改查）
  * 优惠卷失效
* 第十一天 商品模块
  * 基础功能
  * 表格联动
  * 高级搜索组件封装
  * 批量功能 上架，下架，删除，恢复商品
  * 设置轮播图
  * 商品规格
  * 商品详情
* 第十二天 商品分类
  * 基础功能（增删改，商品推荐关联）
* 第十三天 会员和会员等级模块
  * 基础功能（增删改查）
* 第十四天 商品评论模块
  * 基础功能 （增删改查）
  * 评论回复
* 第十五天 订单模块
  * 基础功能（增删改查）
  * 表格联动
  * 订单详情
  * 物流信息
  * 退款回执
  * 订单导出
* 十六天 基础，物流和交易设置模块
  * 基础设置
  * 物流交易设置
* 十七天 分销模块
  * 分销员列表
  * 分校设置

## 项目运行
* npm run dev

## 项目打包
* npm run build