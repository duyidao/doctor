<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
import { storeToRefs } from 'pinia'
const { hospitalInfo } = storeToRefs(useDetailStore());
</script>

<template>
  <div class="notice" v-if="hospitalInfo.hospital">
    <h1>{{ hospitalInfo.hospital.hosname }}预约挂号须知</h1>
    <div class="top">为方便您早日就医康复，请您仔细阅读预约挂号通知：</div>
    <div class="info">
      <div class="tip">一、预约实名制</div>
      <div class="text">大大</div>
    </div>
    <div class="info">
      <div class="tip">二、预约挂号</div>
      <div class="text">大大</div>
    </div>
    <div class="info">
      <div class="tip">三、取消预约</div>
      <div class="text">大大</div>
    </div>
    <div class="info">
      <div class="tip">四、爽约处理</div>
      <div class="text">大大</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notice {
  h1 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }

  .top {
    color: #999;
    margin-bottom: 20px;
  }

  .info {
    margin-bottom: 20px;
    .tip {
      color: red;
      font-weight: bold;
    }

    .text {
      color: #7f7f7f;
      margin-top: 15px;
      line-height: 20px;
    }
  }
}
</style>