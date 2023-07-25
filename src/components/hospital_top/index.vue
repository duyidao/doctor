<script setup lang="ts">
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { ArrowDown } from '@element-plus/icons-vue'

const { dialogVisible, userInfo } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const router = useRouter();

// 点击logo跳转首页
const handleHomeFn = () => {
  router.replace({
    path: "/doctor/home",
  });
};

// 点击登录注册按钮
const handleLoginFn = () => {
  dialogVisible.value = true;
};

// 退出登录
const logoutFn = () => {
  logout()
  // 清空存储后跳转首页
  router.replace('/doctor/home')
}
</script>

<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="handleHomeFn">
        <img src="../../assets//images//logo.png" alt="" />
        <p>刀刀医院 预约挂号</p>
      </div>

      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="handleLoginFn" v-if="!userInfo.name">
          登录/注册
        </p>
        <el-dropdown v-else>
          <p class="el-dropdown-link">
            {{ userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logoutFn">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 70px;
  background: #fff;
  z-index: 999;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    height: 100%;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }

      p {
        color: #55a6fe;
        font-size: 20px;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: #888;
        font-size: 14px;
        cursor: pointer;

        &:first-child {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
