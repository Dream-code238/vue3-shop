<template>
  <div>
    <el-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
      <template #extra>
        <el-button type="primary" @click="() => $router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>