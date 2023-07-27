<script setup lang="ts">
import { useRoute } from "vue-router";
import Detail from "./detail/index.vue";
import All from "./all/index.vue";

const route = useRoute();
</script>

<template>
  <div class="order">
    <!-- 展示全部订单 -->
    <div class="order-list" v-if="!route.query.id">
      <All />
    </div>
    <!-- 展示订单详情 -->
    <div class="order-info" v-else>
      <Detail :id="route.query.id" />
    </div>
  </div>
</template>

<style scoped></style>
