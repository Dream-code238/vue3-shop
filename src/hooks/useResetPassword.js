/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-22 10:53:25
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-22 11:10:43
 * @FilePath: \shop-admin\src\hooks\useResetPassword.js
 * @Description: 重置密码功能
 */

import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { toast } from '@/utils/common';

const useResetPassword = () => {
  // store
  const store = useStore();
  // 路由
  const router = useRouter();

  // form ref
  const formRef = ref(null);
  // 获取抽屉弹框元素
  const formDrawerRef = ref(null);

  // 表单value
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  });

  // 校验规则
  const rules = reactive({
    oldpassword: [
      { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    repassword: [
      { required: true, message: '请输入确认密码', trigger: 'blur' },
    ]
  });

  // 确认提交
  const handleOk = () => {
    formRef?.value?.validate(async val => {

      if (!val) {
        return false;
      }

      formDrawerRef.value.showLoading();

      // 登录
      store.dispatch('manager/UPDATE_PASSWORD', {
        oldpassword: form.oldpassword,
        password: form.password,
        repassword: form.repassword
      })
        .then(() => {
          toast('修改密码成功');
          store.dispatch('manager/LOGOUT')
            .then(() => {

              // 跳转回登录页
              router.push('/login');

            });
        })
        .catch(() => {
          formDrawerRef.value.hideLoading();
          formDrawerRef.value.close();
        });
    });
  }

  // 更新密码
  const handleUpdatePassword = () => formDrawerRef.value.open();

  return {
    formRef,
    formDrawerRef,
    form,
    rules,
    handleOk,
    handleUpdatePassword
  };
}


export default useResetPassword;