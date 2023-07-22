<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()

// 点击logo跳转首页
const handleHomeFn = () => {
  router.replace({
    path: '/doctor/home'
  })
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
        <p class="login">登录/注册</p>
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
        margin-left: 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
