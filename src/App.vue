<script setup lang="ts">
</script>

<template>
  <div class="container">
    <HospitalTop />
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <HospitalBottom />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  .content {
    width: 1200px;
    min-height: calc(100vh - 130px);
    margin-top: 75px;
  }

  .bottom {
    width: 100%;
    height: 50px;
    background-color: #edf6ff;
  }
}
</style>
