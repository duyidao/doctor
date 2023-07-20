<script setup lang="ts">
// 引入图标
import { Search } from "@element-plus/icons-vue";
</script>

<template>
  <div class="search">
    <el-autocomplete
      :trigger-on-focus="false"
      clearable
      class="form"
      placeholder="请输入要查询的医院名称"
    />
    <el-button type="primary" size="default" :icon="Search"></el-button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;

  :deep(.form) {
    width: 600px;
    margin-right: 15px;
  }
}
</style>
