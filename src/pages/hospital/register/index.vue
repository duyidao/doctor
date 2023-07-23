<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
import { storeToRefs } from 'pinia'
const { hospitalInfo } = storeToRefs(useDetailStore());
</script>

<template>
  <div class="register" v-if="hospitalInfo.hospital">
    <div class="top">
      <div class="title">{{ hospitalInfo.hospital.hosname }}</div>
      <div class="level">
        <svg
          t="1689859384317"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2361"
          width="16"
          height="16"
        >
          <path
            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
            p-id="2362"
          ></path>
        </svg>
        <span>{{ hospitalInfo.hospital.param.hostypeString }}</span>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${hospitalInfo.hospital.logoData}`" alt="">
      </div>
      <div class="right">
        <p>挂号规则</p>
        <div class="time">
          预约周期：{{ hospitalInfo.bookingRule.cycle }}天  放号时间：{{ hospitalInfo.bookingRule.releaseTime }}  停挂时间：{{ hospitalInfo.bookingRule.stopTime }}
        </div>
        <div class="address">
          具体位置：{{ hospitalInfo.hospital
.fullAddress }}
        </div>
        <div class="route">
          具体路线：{{ hospitalInfo.hospital
.route }}
        </div>
        <div class="releaseTime">
          退号时间：就诊前一工作日{{ hospitalInfo.bookingRule.quitTime }}点前取消
        </div>
        <div class="rule">预约挂号规则</div>
        <div v-for="(item, index) in hospitalInfo.bookingRule.rule" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  .top {
    display: flex;
    align-items: center;

    .title {
      font-size: 35px;
      margin-right: 30px;
    }

    .level {
      display: flex;
      align-items: center;
      color: #7f7f7f;

      span {
        margin-left: 10px;
      }
    }
  }

  .content {
    display: flex;
    margin-top: 35px;

    .left {
      width: 80px;

      img {
        width: 100%;
        height: 80px;
        border-radius: 50%;
      }
    }

    .right {
      flex: 1;
      margin-left: 20px;

      div:not(.rule) {
        font-size: 14px;
        color: #7f7f7f;
        margin-top: 15px;
      }

      .rule {
        margin-top: 15px;
      }
    }
  }
}
</style>
