<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
</script>

<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <div class="free">医保</div>
        <div class="username">aaaaa</div>
      </div>
      <div class="right">
        <el-button type="primary" :icon="Edit" circle></el-button>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
      <div class="bottom-item">证件类型：1213312312</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.visitor {
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.3);
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    background-color: #e2e2e2;
    color: #7f7f7f;
    padding: 0 25px;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;

      .free {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        font-size: 12px;
        background-color: #fff;
        margin-right: 10px;
        box-sizing: border-box;
        border-radius: 10px;
      }
    }
  }

  .bottom {
    padding: 20px;

    .bottom-item {
      line-height: 30px;
    }
  }
}
</style>
