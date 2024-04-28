<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-21 17:54:58
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 17:14:01
 * @FilePath: \shop-admin\src\pages\Layout\components\FHeader.vue
 * @Description: 头部
-->
<template>
  <el-header>
    <div class="collapse-icon-container">
      <el-icon @click="handleCollapse">
        <Fold v-if="!store.state.manager.isCollapse" />
        <Expand v-else />
      </el-icon>
      <el-tooltip content="刷新" placement="bottom">
        <el-icon @click="handleRefresh">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="user-info-container">
      <el-tooltip content="全屏" placement="bottom">
        <el-icon @click="handleFullscreen">
          <Aim v-if="isFullscreen" />
          <FullScreen v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown hide-on-click @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="25" :src="store.state.manager.userInfo.avatar" />
          <span>{{ store.state.manager.userInfo.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

  <drawer-model ref="formDrawerRef" title="修改密码" destroyOnClose @submit="handleOk">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="120px" label-position="left" label-suffix="：">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input placeholder="请输入旧密码" v-model="form.oldpassword" />
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" placeholder="请输入新密码" v-model="form.password" show-password />
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" placeholder="请输入确认密码" v-model="form.repassword" show-password />
      </el-form-item>
    </el-form>
  </drawer-model>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core';
import { useStore } from 'vuex';
import DrawerModel from '@/components/DrawerModel/index.vue';

import useResetPassword from '@/hooks/useResetPassword';
import useLogout from '@/hooks/useLogout';

const store = useStore();
const {
  // 是否全屏
  isFullscreen,
  toggle
} = useFullscreen();

// 重置密码
const {
  formRef,
  formDrawerRef,
  form,
  rules,
  handleOk,
  handleUpdatePassword
} = useResetPassword();

// 退出登录
const { handleLogout } = useLogout();

// 侧边栏折叠
const handleCollapse = () => {
  // 侧边栏宽度
  const width = !store.state.isCollapse ? '64px' : '250px';
  store.commit('manager/SET_ASIDEWIDTH', width);

  store.commit('manager/SET_COLLAPSE', !store.state.isCollapse);

}

// 刷新
const handleRefresh = () => location.reload();
// 全屏
const handleFullscreen = () => toggle();

// 退出登录 | 修改密码操作
const handleCommand = value => {
  switch (value) {
    case 'updatePassword':
      handleUpdatePassword();
      break;
    default:
      handleLogout();
      break;
  }
};

</script>


<style lang="less" scoped>
.el-header {
  @apply w-auto p-0 flex justify-between items-center bg-indigo-700;
  height: 64px;

  .collapse-icon-container,
  .user-info-container {
    @apply flex items-center;

    .el-icon {
      @apply text-light-50;
      height: 64px;
      width: 64px;
      cursor: pointer;

      &:hover {
        @apply bg-indigo-500;
      }
    }

    .el-dropdown-link {
      @apply flex items-center text-light-50;
      outline: none;

      .el-avatar {
        @apply mx-2;
      }
    }
  }
}
</style>