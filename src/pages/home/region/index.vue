<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHospitalDictCodeApi } from '@/apis/home/index.ts'
import type { DictCodeResponseType, DictCodeType } from '@/apis/home/type.ts'

const hospitalRegionArr = ref<DictCodeType[]>([])
// 获取医院地区
const getHospitalDictCodeFn = async () => {
  const res: DictCodeResponseType = await getHospitalDictCodeApi('Beijin')
  if(res.code === 200) {
    hospitalRegionArr.value = res.data
  }
}
onMounted(() => getHospitalDictCodeFn())

// 点击改变医院地区
const regionActive = ref('')
const changeRegionFn = (e: string = '') => {
  regionActive.value = e
}
</script>

<template>
  <div class="region">
    <div class="left">地区：</div>
    <ul>
      <li :class="{'active': regionActive === ''}">全部</li>
      <li :class="{'active': regionActive === item.value}" v-for="item in hospitalRegionArr" :key="item.value" @click="changeRegionFn(item.value)">{{ item.name }}</li>
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