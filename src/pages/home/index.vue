<script setup lang="ts">
// 引入轮播图组件
import HomeCarousel from "./carousel/index.vue";
// 引入搜索组件
import HomeSearch from "./search/index.vue";
// 引入医院等级组件
import HomeLevel from "./level/index.vue";
// 引入地区选择组件
import HomeRegion from "./region/index.vue";
</script>

<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeCarousel />

    <!-- 自动补全搜索 -->
    <HomeSearch />

    <!-- 底部展示医院结构 -->
    <el-row>
      <el-col :span="20">
        <HomeLevel />
        <HomeRegion />
      </el-col>
      <el-col :span="4">
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
