<script setup lang="ts">

</script>

<template>
  <div class="region">
    <div class="left">地区：</div>
    <ul>
      <li class="active">全部</li>
      <li>天河区</li>
      <li>黄埔区</li>
      <li>增城区</li>
      <li>越秀区</li>
      <li>花都区</li>
      <li>荔湾区</li>
      <li>白云区</li>
      <li>南昌区</li>
      <li>嘀嘀嘀</li>
      <li>嘀嘀4嘀</li>
      <li>嘀嘀2嘀</li>
      <li>嘀嘀嘀1</li>
      <li>嘀r嘀嘀</li>
      <li>嘀g嘀嘀</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.region {
  display: flex;
  margin-top: 20px;
  color: #7f7f7f;

  .left {
    // width: 48px;
    margin-right: 15px;
    white-space: nowrap;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-right: 15px;
      margin-bottom: 15px;
      cursor: pointer;

      &.active, &:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>