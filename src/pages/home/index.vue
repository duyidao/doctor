<script setup lang="ts">
// 引入轮播图组件
import HomeCarousel from "./carousel/index.vue";
import HomeSearch from "./search/index.vue";
</script>

<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeCarousel />

    <!-- 自动补全搜索 -->
    <HomeSearch />
  </div>
</template>

<style lang="scss" scoped></style>
