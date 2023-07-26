<script setup lang="ts">
import Visitor from "./components/visitor.vue";
import { User } from "@element-plus/icons-vue";
</script>

<template>
  <div class="register_info">
    <h1 class="tip">确认挂号信息</h1>

    <!-- 卡片：就诊人信息 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button :icon="User" type="primary">添加就诊人</el-button>
        </div>
      </template>
      <!-- 就诊人信息 -->
      <div class="user">
        <Visitor class="visitor-item" v-for="item in 4" :key="item" />
      </div>
    </el-card>

    <!-- 卡片：医生信息 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片表格内容 -->
      <el-descriptions :column="2" border>
        <el-descriptions-item label="就诊日期"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.register_info {
  h1 {
    height: 80px;
    line-height: 80px;
    font-weight: 900;
    color: #7f7f7f;
    font-size: 28px;
  }

  :deep(.el-card) {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    display: flex;
    flex-wrap: wrap;

    .visitor-item {
      width: 32%;
      margin: 0 16px 20px 0;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
