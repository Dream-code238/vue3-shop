<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-20 12:47:23
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-25 00:18:29
 * @FilePath: \shop-admin\src\pages\Login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row class="login-page-container">
    <el-col :lg="16" :md="12" class="login-left-container flex-layout">
      <div class="login-left-content">
        <div class="title">欢迎光临</div>
        <div class="text">此站点是《vue3 + vite实战商城后台开发》视频课程地演示地址</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="login-right-container flex-layout">
      <h2 class="title">欢迎回来</h2>
      <div class="warn-tip flex-layout">
        <span class="h-[1px] line"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" show-password>
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" round color="#626aef" type="primary" @click="handleSubmit"
            :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>


<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { toast } from '@/utils/common';

const store = useStore();
const router = useRouter();
const formRef = ref(null);

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
});

const form = reactive({
  username: '',
  password: ''
});

const loading = ref(false);

const handleSubmit = () => {
  formRef?.value?.validate(async val => {

    if (!val) {
      return false;
    }

    loading.value = true;

    // 登录
    store.dispatch('manager/LOGIN', {
      username: form.username,
      password: form.password
    })
      .then(() => {
        toast('登陆成功');
        // 跳转到首页
        router.push('/');
      })
      .finally(() => {
        loading.value = false;
      });

  });
}

// 键盘处理
const handleKeyUp = evt => {
  if (evt.key === 'Enter') handleSubmit();
}

// 监听键盘事件
onMounted(() => {
  document.addEventListener('keyup', handleKeyUp);
});

// 销毁监听
onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyUp);
});



</script>


<style lang="less" scoped>
.login-page-container {
  @apply min-h-screen;
}

.flex-layout {
  @apply flex items-center justify-center;
}

.login-left-container {
  @apply bg-indigo-500;

  .title {
    @apply font-bold text-5xl text-light-50 mb-4;
  }

  .text {
    @apply text-gray-200 text-sm;
  }
}

.login-right-container {
  @apply bg-light-50 flex-col;

  .title {
    @apply font-bold text-3xl text-gray-800;
  }

  .warn-tip {
    @apply my-5 text-gray-300 space-x-2;

    .line {
      @apply w-16 bg-gray-200;
    }
  }
}
</style>