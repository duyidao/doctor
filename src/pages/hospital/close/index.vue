<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
import { storeToRefs } from 'pinia'
const { hospitalInfo } = storeToRefs(useDetailStore());
</script>

<template>
  <div class="close" v-if="hospitalInfo.hospital">
    <div class="info">
      <h1>{{ hospitalInfo.hospital.hosname }}停诊信息</h1>
    </div>
    <el-empty description="暂无停诊信息" />
  </div>
</template>

<style lang="scss" scoped>
.close {
  h1 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }
}
</style>