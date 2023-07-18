<script setup lang="ts"></script>

<template>
  <el-carousel trigger="click" height="350px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img src="../../../assets/images/web-banner-1.png" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
