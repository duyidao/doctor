<script setup lang="ts">
import {
  Document,
  ChatDotSquare,
  House,
  Bell,
  MessageBox,
  Search,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter();
// 点击前往首页按钮
const handleHomeFn = () => {
  router.push({
    path: "/doctor/home",
  });
};
</script>

<template>
  <div class="user">
    <!-- 左侧导航 -->
    <div class="menu">
      <div class="top" @click="handleHomeFn">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </div>
      <el-menu
        :default-active="route.path"
        router
        class="el-menu-vertical-demo"
      >
        <el-menu-item
          :index="`/doctor/user/certification`"
        >
          <el-icon><ChatDotSquare /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item
          :index="`/doctor/user/order`"
        >
          <el-icon><document /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item
          :index="`/doctor/user/patient`"
        >
          <el-icon><Bell /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item
          :index="`/doctor/user/profile`"
        >
          <el-icon><MessageBox /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item
          :index="`/doctor/user/feedback`"
        >
          <el-icon><Search /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧会员中心 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-between;
  
  .menu {
    .top {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 25px;
      font-size: 14px;
      cursor: pointer;
      border-right: solid 1px var(--el-menu-border-color);

      &:hover {
        background-color: #ecf5ff;
      }

      span {
        margin-left: 15px;
      }
    }
  }

  .content {
    flex: 1;
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>