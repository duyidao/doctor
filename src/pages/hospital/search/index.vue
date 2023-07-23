<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
import { storeToRefs } from 'pinia'
const { hospitalInfo } = storeToRefs(useDetailStore());
</script>

<template>
  <div class="search" v-if="hospitalInfo.hospital">
    <div class="info">
      <h1>{{ hospitalInfo.hospital.hosname }}查询信息</h1>
    </div>
    <el-empty description="暂无查询信息" />
  </div>
</template>

<style lang="scss" scoped>
.search {
  h1 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }
}
</style>