<script setup lang="ts"></script>

<template>
  <div class="bottom">
    <div class="content">
      <!-- 左侧 -->
      <div class="left">京 ICP 备 11111111号 电话挂号 010-114514</div>
      <!-- 右侧 -->
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    height: 100%;

    .right {
      span {
        margin: 0 10px;
        font-size: 14px;
        color: #555;
      }
    }
  }
}
</style>
