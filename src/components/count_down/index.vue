<script setup lang="ts">
import { ref, watch } from "vue";

const times = ref<number>(5);
const timer = ref<any>(null);
const props = defineProps(["flag"]);
const emit = defineEmits(["timeOverFn"]);

// 倒计时
watch(
  () => props.flag,
  () => {
    timer.value = setInterval(() => {
      if (times.value <= 1) {
        clearInterval(timer.value);
        timer.value = null;
        emit("timeOverFn");
        return;
      }
      times.value -= 1;
    }, 1000);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <span>获取验证码({{ times }}s)</span>
</template>

<style scoped></style>
