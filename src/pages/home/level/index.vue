<script setup lang="ts"></script>

<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul>
        <li class="active">全部</li>
        <li>三级甲等</li>
        <li>三级乙等</li>
        <li>三级丙等</li>
        <li>二级甲等</li>
        <li>二级乙等</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.level {
  color: #7f7f7f;
  margin-top: 10px;
  h1 {
    font-weight: 900;
    margin-bottom: 20px;
  }

  .content {
    display: flex;

    .left {
      margin-right: 15px;
    }

    ul {
      display: flex;

      li {
        margin-right: 15px;
        cursor: pointer;

        &.active {
          color: #55a6fe;
        }

        &:hover {
          color: #55a6fe;
        }
      }
    }
  }
}
</style>
