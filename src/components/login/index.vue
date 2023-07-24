<script setup lang="ts">
import { ref } from "vue";
import useUserStore from "@/store/modules/user";
import { storeToRefs } from "pinia";

const { dialogVisible } = storeToRefs(useUserStore());
</script>

<template>
  <div class="login">
    <el-dialog v-model="dialogVisible" title="用户登录"> 123 </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
