/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-26 15:58:21
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-29 21:44:18
 * @FilePath: \shop-admin\src\hooks\useTableList.js
 * @Description: 通用列表配置
 */

import { onMounted, reactive, ref } from 'vue';

import { toast } from '@/utils/common';

const useTable = config => {

  const {
    filterData = {},
    getList = {},
    addApi = {},
    updateApi = {},
    deleteApi = {},
    updateStatusApi = {}
  } = config;

  // 列表
  const tableRef = ref(null);
  // 抽屉弹框
  const formDrawerRef = ref(null);
  // 表单
  const formRef = ref(null);


  // 筛选数据
  const pageConfig = reactive({
    // 页码
    page: 1,
    // 页数
    limit: 10,
    // 总条数
    total: 0,
    // 加载
    loading: false
  });
  // 全选id
  const checkedIds = ref([]);

  // 初始化筛选数据
  const initLoadConfig = values => {
    if (!Object.keys(values).length) {
      return false;
    }
    // 循环传入的配置选项
    for (const key in values) {
      // 当ES6语法判断传入的key和默认配置选项的key是否一致时，将传入的配置选项赋值给默认配置选项
      pageConfig[key] = values[key];
    }
  };

  const initOtherParams = data => {
    const { payload, extraPayload, ...otherConfig } = data;

    // 列表筛选参数
    let obj = {};

    if (payload && payload?.length > 0) {
      payload?.forEach(item => {
        obj = { ...obj, [item]: otherConfig?.[item] }
      })
    }
    // 传递额外的参数
    const otherPayload = extraPayload ? extraPayload : {};

    return { ...obj, ...otherPayload };
  }

  // 获取列表
  const initLoadList = async () => {
    // 基础列表参数
    const { page, limit, ...otherConfig } = pageConfig;
    // 额外参数
    const payload = initOtherParams({ payload: getList?.payload, ...otherConfig, extraPayload: getList?.extraPayload });
    // 列表加载
    pageConfig.loading = true;

    const { totalCount, ...otherParams } = await getList.api({ page, limit, ...payload }).finally(() => pageConfig.loading = false);
    // 获取成功以后将结果返回抛出
    getList?.onSuccess && getList?.onSuccess(otherParams);
    // 更新返回结果数量
    pageConfig.total = totalCount;
    
  }

  // 刷新
  const onRefresh = () => initLoadList();

  // 批量选择
  const onTableSelection = checked => {
    checkedIds.value = checked.map(item => item.id);
  }

  // 添加功能
  const onOk = async data => {
    if (!addApi?.api) {
      return toast('地址不能为空，请检查请求地址！');
    }
    // 额外参数
    const payload = initOtherParams({ payload: addApi?.payload, ...pageConfig, extraPayload: addApi?.extraPayload });
    // 调用接口
    formDrawerRef.value.showLoading();
    const result = await addApi?.api({ ...data, ...payload })
      .then(() => initLoadList())
      .finally(() => formDrawerRef.value.hideLoading());
    // 获取成功以后将结果返回抛出
    addApi?.onSuccess && addApi?.onSuccess(result);
    toast('添加成功');
  };

  // 更新功能
  const onUpdate = async data => {
    if (!updateApi?.api) {
      return toast('地址不能为空，请检查请求地址！');
    }
    // 额外参数
    const payload = initOtherParams({ payload: updateApi?.payload, ...pageConfig, extraPayload: updateApi?.extraPayload });
    // 调用接口
    formDrawerRef.value.showLoading();
    const result = await updateApi?.api({ ...data, ...payload })
      .then(() => initLoadList())
      .finally(() => formDrawerRef.value.hideLoading());
    // 获取成功以后将结果返回抛出
    updateApi?.onSuccess && updateApi?.onSuccess(result);
    toast('更新成功');
  }

  // 删除功能
  const onDelete = async data => {
    if (!deleteApi?.api) {
      return toast('地址不能为空，请检查请求地址！');
    }
    // 额外参数
    const payload = initOtherParams({ payload: deleteApi?.payload, ...pageConfig, extraPayload: deleteApi?.extraPayload })
    // 调用接口
    
    const result = await deleteApi?.api({ ...data, ...payload })
      .then(() => {
        if (tableRef?.value) {
          tableRef?.value?.clearSelection();
        }
        initLoadList();
      });
    // 获取成功以后将结果返回抛出
    deleteApi?.onSuccess && deleteApi?.onSuccess(result);
    toast('删除成功');
  }

  // 更新状态
  const onUpdateStatus = async (value, item) => {
    if (!updateStatusApi?.api) {
      return toast('地址不能为空，请检查请求地址！');
    }
    // 额外参数
    const payload = initOtherParams({ payload: updateStatusApi?.payload, ...pageConfig, extraPayload: updateStatusApi?.extraPayload })
    // 调用接口
    item.loading = true;
    const result = await updateStatusApi?.api({ id: item.id, status: value, ...payload })
      .then(() => item.status = value)
      .finally(() => item.loading = false);
    // 获取成功以后将结果返回抛出
    updateStatusApi?.onSuccess && updateStatusApi?.onSuccess(result);
    toast('更新成功');
  }

  // 切换分页
  const onPageChange = (page, limit) => {
    pageConfig.page = page;
    pageConfig.limit = limit;
    initLoadList();
  }


  onMounted(() => initLoadConfig(filterData));

  return {
    pageConfig,
    checkedIds,
    tableRef,
    formDrawerRef,
    formRef,
    initLoadConfig,
    initLoadList,
    onRefresh,
    onTableSelection,
    onOk,
    onUpdate,
    onDelete,
    onUpdateStatus,
    onPageChange
  };
};



export default useTable;