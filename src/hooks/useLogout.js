
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { messageBox, toast } from '@/utils/common';

const useLogout = () => {
  // store
  const store = useStore();
  // 路由
  const router = useRouter();

  // 退出登录
  const handleLogout = () => {

    messageBox('您确定要退出登录吗?')
      // 确定退出登录
      .then(() => {
        // 移除cookie里地token
        // 清除当前用户状态vuex
        store.dispatch('manager/LOGOUT')
          .then(() => {

            // 跳转回登录页
            router.push('/login');

            // 提示退出登陆成功
            toast('退出登录');

          });

      })
      .catch(() => {
        console.log('取消登录');
      });

  };


  return {
    handleLogout
  }
};



export default useLogout;